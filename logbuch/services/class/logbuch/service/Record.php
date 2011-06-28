<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("logbuch_service_Controller");

/**
 * A classical CRUD controller which also features a list item generator 
 */
class logbuch_service_Record
  extends logbuch_service_Controller
{
	
	/**
   * Class-based access control list. 
   * Determines what role has access to what kind of model data.
   * @var array
   */
  private $modelAcl = array(

    array(
      /*
       * this ruleset
       */
      'datasource'  => "*", // FIXME only datasource of a given schema
      'modelType'   => array("person","organization","attachment", "entry"),

      /*
       * only registered users have access
       */
      'roles'       => array(QCL_ROLE_USER),

      /*
       * record-level access rules not used here since we're
       * going to use permissions to do that. 
       */
      'rules'         => array()
    ),
    
    array(
      /*
       * this ruleset
       */
      'datasource'  => "*", // FIXME only datasource of a given schema
      'modelType'   => array("organization"),

      /*
       * organization data can be accessed by anonymous // FIXME why??
       */
      'roles'       => array(QCL_ROLE_ANONYMOUS),

      /*
       * record-level access rules not used here since we're
       * going to use permissions to do that. 
       */
      'rules'         => array()
    )    
  );	

  /**
   * Constructor. Adds the ACL for this controller
   */
  function __construct()
  {
    $this->addModelAcl( $this->modelAcl );
  }  
  
	/**
	 * Creates a model record on the server and returns the 
	 * UI element model of it. 
	 * @param string $datasource
	 * @param string $modelType
	 * @return array
	 */
	function method_create( $datasource, $modelType ) // FIXME signature
	{
		$model = $this->getDatasourceModel()->getInstanceOfType( $modelType );
		$model->create();
			
		switch( $modelType )
		{
			case "person":
			  // create new user and link person
				$userModel = $this->getUserModel();
				$userModel->create( "person/" . $model->id() );
				// determine role
				$roleModel = $this->getRoleModel();
				$roleModel->load( QCL_ROLE_USER );
				$userModel->linkModel( $roleModel );
				$model->set( "userId", $userModel->id() );
				$model->save();
				break;
				
			case "organization":
				// create new group and link organization
			  $groupModel = $this->getGroupModel();
				$groupModel->create( "organization/" . $model->id() );
				$model->set( "groupId", $groupModel->id() );
				$model->save();
				// link to datasource
				$groupModel->linkModel($this->getDatasourceModel());
				break;
		}
		
		return $model->uiElementModel("value");
	}
	
	/**
	 * Returns the model record as json data
	 * @param string $datasource
	 * @param string $modelType
	 * @param int|string $recordId
	 */
	function method_read( $datasource, $modelType, $recordId )// FIXME signature
	{
		$model = $this->getDatasourceModel()->getInstanceOfType( $modelType );
		$model->load( $recordId );
		$data = $model->data( array(
			'exclude'	=> array('created','modified','id','initialPassword','userId')
		));
		
		if( $modelType == "person" )
		{
			$data['editable']  = 
				( $this->hasPermission("logbuch.members.manage") 
					or $this->getActiveUser()->id() == $model->get("userId") );
		}
		
		return $data;
	}
	
	/**
	 * Updates the model record. Returns the record's UI element model.
	 * @param string $datasource
	 * @param string $modelType
	 * @param int|string $recordId
	 * @return array
	 */
	function method_update( $datasource, $modelType, $recordId, $data ) // FIXME signature
	{
		$model = $this->getDatasourceModel()->getInstanceOfType($modelType);
		$model->load( $recordId );
	
		/*
		 * manage image attachments
		 */
		if( $data->image )
		{
			$attachmentModel = $this->getAttachmentModel();
			$oldImage = $model->getImage();
			$newImage = $data->image;
			$sizes = array( 16, 64, 80 );
			
			if( $oldImage != $newImage )
			{
				/*
				 * delete the old image
				 */
				if ( $oldImage )
				{
					try 
					{
						$attachmentModel->findLinked( $model );
						while( $attachmentModel->loadNext() )
						{
							if ( $attachmentModel->getFilename() == $oldImage )
							{
								$attachmentModel->delete();
							}
						}	
					} 
					catch (qcl_data_model_RecordNotFoundException $e) {}
				}
	
				$newImagePath = LOGBUCH_UPLOADS_PATH . $newImage;
				
				if ( ! file_exists( $newImagePath ) )
				{
					$this->raiseError( "Image does not exist : $newImagePath" );
				}
				
				/*
				 * create thumbnails
				 */
				require_once 'qcl/lib/img/Image.php';
				foreach( $sizes as $size )
				{
					$img = new Image( $newImagePath );
					$img->resize($size, $size);
					$img->save( LOGBUCH_UPLOADS_PATH . "$size/" . $newImage);
				}
				
				/*
				 * attach new image
				 */			
				$attachmentModel->create(array(
					'filename' 	=> $newImage,
					'mime'			=> $img->getMimeType()
				));
				$attachmentModel->linkModel( $model );
			}
		}

		/*
		 * person
		 */
		if ( $modelType == "person" )
		{
			/*
			 * check necessary information
			 */
			$requiredFields = array( 
				"email" 						=>  $this->tr("E-Mail"),
				"familyName" 				=> 	$this->tr("Family name"),
				"givenName"					=>  $this->tr("Given name" ),
				"organizationId"		=>  $this->tr("Organisation" ),
				"position"					=>  $this->tr("Project role" ),
				"initials"					=>  $this->tr("Initials" )
			);
			foreach( $requiredFields as $key => $label )
			{
				if ( ! $data->$key )
				{
					qcl_import("qcl_ui_dialog_Alert");
					return new qcl_ui_dialog_Alert( $this->tr( "You need to enter a value in field '%s'.", $label ) );
				}
			}
			
			/*
			 * update the corresponding user 
			 */
			$userModel = $this->getUserModel();
			$userModel->load( $model->get("userId") );
			$userModel->set( array(
				'name' 	=> $data->givenName . " " . $data->familyName,
				'email'	=> $data->email 
			));
			$userModel->save();
				
			/*
			 * A person's organization is linked through the
			 * user/group association
			 */			
			$organizationId = $data->organizationId;
			if ( ! $organizationId )
			{
				throw new InvalidJsonRpcArgumentException( $this->tr( "You need to select an organization.") );
			}
			if ( $model->get("organizationId") != $organizationId )
			{
				$orgModel = $this->getOrganizationModel();
				$orgModel->load( $organizationId );
				$groupModel = $this->getGroupModel();
				
				/*
				 * unlink all group model associations and link 
				 * only the current one
				 */
				$userModel->unlinkAll( $groupModel );
				$groupModel->load( $orgModel->get("groupId") );
				$userModel->linkModel( $groupModel );
			}
		}
		elseif ( $modelType == "organization" )
		{
			/*
			 * update the corresponding group 
			 */
			$groupModel = $this->getGroupModel();
			$groupModel->load( $model->get("groupId") );
			$groupModel->set( array(
				'name' => $model->label()
			));
			$groupModel->save();
		}
		
		/*
		 * clean data
		 */
		foreach( $data as $key => $value )
		{
			if ( is_string( $data->$key ) )
			{
				$data->$key = trim( $data->$key );
			}
		}
		
		/*
		 * set properties and save
		 */
		$model->set( $data );
		$model->save();
		
		/*
		 * send registration mail
		 */
		if ( $modelType == "person" and $model->get("initialPassword") == false )
		{
			qcl_import("logbuch_service_Registration");
			$service = new logbuch_service_Registration;
			$service->sendRegistrationEmail( $userModel, $model );
			$model->set("initialPassword",true);
			$model->save();
		}		
		
		return $model->uiElementModel("value");
	}	

	/**
	 * Deletes a model record.
	 * @param string $datasource
	 * @param string $modelType
	 * @param int|string $recordId
	 * @return "OK"
	 * FIXME remove entries
	 */
	function method_delete( $datasource, $modelType, $recordId ) // FIXME Signature
	{
		$model = $this->getDatasourceModel()->getInstanceOfType( $modelType);
		$model->load( $recordId );
		
		switch( $modelType )
		{
			case "person":
				$userModel = $this->getUserModel();
				$userModel->load( $model->get("userId") );
				$userModel->delete();
				break;

			case "organization":
				$groupModel = $this->getGroupModel();
				$groupModel->load( $model->get("groupId") );
				$groupModel->delete();
				break;
		}		
		
		$model->delete();
		return "OK";
	}
	
	/**
	 * Returns the list model of the given model type.
	 * @param string $datasource
	 * 		The name of the datasource
	 * @param string $modelType
	 * 		The type of the model
	 * @param array|null $where
	 * 		An optional where query condition
	 * @param string|null $orderBy 
	 * 		An optional order by information
	 * @param strign $modelKey 
	 * 		The key of the model data value in the json data. Defaults
	 * 		to "value"
	 */
	function method_list( $datasource, $modelType, $where=null, $orderBy=null, $modelKey="value" )
	{
		$model = $this->getDatasourceModel()->getInstanceOfType( $modelType );
		if ( $where ) 
		{
			$model->findWhere( $where, $orderBy );
		}
		else 
		{
			$model->findAllOrderBy($orderBy);	
		}
		$listModel = array();
		while( $model->loadNext() )
		{
			$listModel[] = $model->uiElementModel( $modelKey );
		}
		return $listModel;
	}	
	
	/**
	 * Returns data for a list of persons
	 * Enter description here ...
	 * @param $datasource
	 * @param $identifier
	 */
	function method_personList( $datasource, $identifier )
	{
		if ( is_array( $identifier ) )
		{
			$list = implode( ",", $identifier );
			$query = new qcl_data_db_Query(array( 
				where 						=> "id IN($list) " // FIXME
			));
		}
		elseif ( trim( $identifier ) == "alle" )  
		{
			$query = new qcl_data_db_Query(array( 
				where 			=> null
			));
		}
		elseif ( is_string( $identifier ) ) 
		{
			$query = new qcl_data_db_Query(array( 
				where 			=> "familyName LIKE :search OR givenName LIKE :search",
				parameters 	=> array( ':search' => "%$identifier%")
			));
		}
		else
		{
			throw new InvalidArgumentException("Invalid identifier");
		}
		
		$listModel = array();
		$model = $this->getPersonModel();
		
//		$this->getLogger()->setFilterEnabled(QCL_LOG_DB, true);
		$model->find( $query );
//		$this->getLogger()->setFilterEnabled(QCL_LOG_DB, false);
		
		if( $model->foundNothing() )
		{
			return $listModel;
		}
		while( $model->loadNext() )
		{
			$listModel[] = array(
				'label'		=> $model->getFullName(),
				'value'		=> $model->id()
			);
		}
		return $listModel;
	}
	
	// FIXME
	function method_getRoleList()
	{
		return array(
			array( 'value' => "employee", 	'label' => "Mitarbeiter/in" ), // 'label' => $this->tr("Employee") ), // 
			array( 'value' => "external", 	'label' => "Dienstleister/in" ), // 'label' => $this->tr("External employee") ), // 
			array( 'value' => "consultant", 'label' => "Berater/in" ), // 'label' => $this->tr("Consultant") ),
			array( 'value' => "scientist", 	'label' => "Wissenschaftliche Begleitung" ) // 'label' => $this->tr("Scientific expert") )
		);
	}
	
	/**
	 * Returns a list of users with their organization and online status
	 */
	public function method_getUserItemList()
	{ 
    $listModel = array();
		$personModel = $this->getPersonModel();
		$orgModel    = $this->getOrganizationModel();  
		
		$personModel->findAllOrderBy( "familyName" );
		while( $personModel->loadNext() )
		{
			$listModel[] = array(
			  'selected'			=> false,
				'id'		        => $personModel->id(),
				'name'		      => $personModel->get("familyName") . ", " . $personModel->get("givenName"),
				'organization'	=> $orgModel->load( $personModel->get("organizationId") )->get("name"),
			  'online'				=> $this->getAccessController()->checkOnlineStatus( $personModel->getUserId() )
			);
		}
		return array('items' => $listModel);
	}
}
?>