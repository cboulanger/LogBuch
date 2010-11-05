<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_data_controller_Controller");
qcl_import("logbuch_model_AccessControlList");
qcl_import("qcl_ui_dialog_Alert");

/**
 *
 */
class logbuch_service_Category
  extends qcl_data_controller_Controller
{

	/**
	 * Creates a category entry
	 * @param $category
	 * @param $data
	 * @param $acl
	 */
	function method_create( $category, $date )
	{
		
		$datasourceModel = $this->getDatasourceModel("demo"); // FIXME 
		$model = $datasourceModel->getModelOfType( $category ); 
		$itemData = array();

		/*
		 * set date
		 */
		$itemData['dateStart'] = date ("Y-m-d H:i:s", strtotime( $date ) + 3600 * 8 );
		$itemData['dateEnd'] 	 = $category == "goal" ?
		  date ("Y-m-d H:i:s") :
		  date ("Y-m-d H:i:s", strtotime( $date ) + 3600 * 8 );
		
		/*
		 * set author
		 */
		$activeUser 	= $this->getActiveUser();
		$personModel 	= $datasourceModel->getModelOfType("person");
		try 
		{
			$personModel->loadByUserId( $activeUser->id() );
		}
		catch ( qcl_data_model_RecordNotFoundException $e )
		{
			qcl_import("qcl_ui_dialog_Dialog");
			throw new InvalidJsonRpcArgumentException( 
				$this->tr("Only registered users can enter data into the LogBuch.")
			);
		}
		$itemData["personId"] = $personModel->id();
		
		/*
		 * acl
		 */
		$aclModel = new logbuch_model_AccessControlList();
		$aclData  = $aclModel->data(); // initial state will only dispatch to the author and admin users
		
		/*
		 * merge item and acl data to create record
		 */
		$data = array_merge( $itemData, $aclData );
		$id = $model->create( $data );
		
		/*
		 * return the data of the newly created record
		 */
		return $this->method_read($category, $id);
	}	
	
	/**
	 * Reads a category entry
	 * @param string $category The category type
	 * @param string|int $id Numeric id or id in the form of "<string type>/<numeric id>" FIXME 
	 */
	function method_read( $category, $id )
	{
		if( is_string( $id ) and  strstr( $id,"/") )
		{
			$i = explode("/",$id);
			$id = (int) $i[1];
		}
		elseif ( ! is_numeric( $id ) )
		{
			throw new InvalidJsonRpcArgumentException("Invalid id");
		}
		
		$data = array();

		/*
		 * load record
		 */
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		try 
		{
			$model->load( $id );
		}
		catch( qcl_data_model_RecordNotFoundException $e )
		{
			qcl_import("qcl_ui_dialog_Alert");
			return new qcl_ui_dialog_Alert( $this->tr("This record has been deleted.") );
		}		
		
		/*
		 * item data
		 */
		$data['item'] = $model->data(array(
			'include'	=> $model->ownProperties() 
		));
		
		/*
		 * add id
		 */
		$data['item']['id'] = $model->id();
		
		/*
		 * marshal date data
		 */
		$data['item']['dateStart'] 	= date("Y/m/d", strtotime( $model->get('dateStart') ) ); 
	  $data['item']['dateEnd'] 		= date("Y/m/d", strtotime( $model->get('dateEnd') ) );		
		$data['item']['timeStart'] 	= date("H:i", 	strtotime( $model->get('dateStart') ) ); 
	  $data['item']['timeEnd'] 		= date("H:i", 	strtotime( $model->get('dateEnd') ) );
	  
		/*
		 * author label
		 */
		$personModel = $this->getDatasourceModel( "demo" )->getModelOfType( "person" ); // FIXME
		$personModel->load( $model->get("personId") );		
		$data['authorLabel'] = 
			$personModel->get("givenName") . " " . $personModel->get("familyName") .
			" (" . $model->getCreated()->format("d.m.Y H:i") . ")";
		
		/*
		 * acl
		 */
		$aclModel = new logbuch_model_AccessControlList();
		$data['acl'] = $model->data( array(
			'include' 	=> $aclModel->getAclNames()
		));
	  
	  /*
	   * whether to allow to  or editdelete the item
	   */
		$authorId = $personModel->id();
	  $personModel->loadByUserId( $this->getActiveUser()->id() );
	  $isAuthor = $authorId == $personModel->id();
	  
	  $data['deletable'] = $isAuthor;  
	  $data['editable'] = $isAuthor; 
	  
		return $data;
	}
	
	/**
	 * Updates a category entry
	 * @param $category
	 * @param $id
	 * @param $data
	 * @param $acl
	 */
	function method_update( $category, $id, $data, $acl )
	{
		/*
		 * load record
		 */
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category ); // FIXME
		$model->load( $id );
		
		/*
		 * only owner can update record
		 */
		$authorModel = $this->getDatasourceModel( "demo" )->getModelOfType( "person" ); //FIXME
		try 
		{
		  $authorModel->loadByUserId( $this->getActiveUser()->id() );
		}
		catch ( qcl_data_model_RecordNotFoundException $e)
		{
		  return new qcl_ui_dialog_Alert("Nur registrierte Nutzer dürfen Datensätze bearbeiten."); // FIXME tr
		}
		
		if ( $authorModel->id() != $model->get("personId") )
		{
		  $authorModel->load( $model->get("personId") );
		  $name = $authorModel->getFullName();
		  throw new JsonRpcException("Die Veränderungen wurden nicht gespeichert. Nur der/die Verfasser/in des Datensatzes ($name) darf ihn bearbeiten."); // FIXME tr
		}
		
		/*
		 * unmarshal date data
		 */
		$dateStart = strtotime( $data->dateStart );
		$timeStart = explode( ":", $data->timeStart );
		$timeStart = 3600 * $timeStart[0] + 60 * $timeStart[1];
		
		$dateEnd   = strtotime( $data->dateEnd );
		$timeEnd   = explode( ":", $data->timeEnd );
		$timeEnd 	 = 3600 * $timeEnd[0] + 60 * $timeEnd[1];
		
		$data->dateStart = date ("Y-m-d H:i:s", $dateStart + $timeStart );
		$data->dateEnd 	 = date ("Y-m-d H:i:s", $dateEnd + $timeEnd );		
		
		/*
		 * set data
		 */
		$model->set( $data );
		
		/*
		 * if acl and data has changed, send messages to the added 
		 * acl group
		 */
		$aclModel = new logbuch_model_AccessControlList();
		$oldAcl = $model->data( array(
			'include' => $aclModel->getAclNames()
		));
		$newAcl = array();
		
		foreach( $oldAcl as $key => $value )
		{
			if ( is_bool($value) )
			{
				$newAcl[$key] = ( $value === false && $acl->$key === true );	
			}
			elseif ( is_array( $value) )
			{
				$newAcl[$key] = array_diff( $acl->$key, $value );
			}
		}	
		
    /*
     * set new acl 
     */
    $model->set( $acl );
    		
		$bus = qcl_event_message_Bus::getInstance();
		foreach( $model->createMessages( "logbuch/display-category-item" ) as $message )
		{
			$message->setAcl( $newAcl );
			$message->setBroadcast( true );
			$message->setExcludeOwnSession( false );
			$data = $message->getData();
			$data['isPrivate'] = $model->isPrivate();
			$message->setData( $data );			
			$bus->dispatch($message);
		}
		
		/*
		 * save  
		 */
		$model->save();
		return "OK";
	}
	
	/**
	 * Deletes a category entry
	 * @param $category
	 * @param $id
	 */
	function method_delete( $category, $id)
	{
		
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		$model->load( $id );
		
		if( $this->getActiveUser()->hasRole( QCL_ROLE_ADMIN ) ) // FIXME permission
		{
			$model->delete();
		}
		else
		{
			$personModel = $this->getDatasourceModel( "demo" )->getModelOfType( "person" );
			$personModel->loadWhere( array( "userId" => $this->getActiveUser()->id() ) );
			if( $model->get("personId") == $personModel->id() )
			{
				$model->delete();	
			}
			else
			{
				qcl_import("qcl_ui_dialog_Alert");
				throw new JsonRpcError( $this->tr( "You cannot delete this entry because you do not own it.") );	
			}
		}
		return "OK";
	}		
	
	
	/**
	 * Returns the time period where this project has entries
	 * FIXME in report class
	 */
	public function method_getDatePeriod()
	{
		$dateStart = time();
		$dateEnd   = time();
		
		$dsModel = $this->getDatasourceModel("demo");
		foreach( array("event","goal","documentation","diary","inspiration") as $type )
		{
			$model = $dsModel->getInstanceOfType($type);
			$date = $model->getQueryBehavior()->fetchValues("dateStart", new qcl_data_db_Query(array(
				'orderBy' 			=> "dateStart",
				'numberOfRows'	=> 5
			)));
			if ( count( $date) and strtotime( $date[0] ) < $dateStart )
			{
				$dateStart = strtotime( $date[0] );
			}
			$date = $model->getQueryBehavior()->fetchValues("dateStart", new qcl_data_db_Query(array(
				'orderBy' 			=> "dateEnd DESC",
				'numberOfRows'	=> 1
			)));
			if ( count( $date ) and strtotime( $date[0] ) > $dateEnd )
			{
				$dateEnd = strtotime( $date[0] );
			}
			//$this->debug( $type . ": " . date("Y/m/d",  $dateStart ) . " - " . date("Y/m/d",  $dateEnd ) , __CLASS__, __LINE__ );
		}
		$data = array();
		$data['dateStart'] 	= date("Y/m/d",  $dateStart ); 
	  $data['dateEnd'] 		= date("Y/m/d",  $dateEnd );		
		return $data;
	}
	
	/**
	 * @todo move into report service
	 */
	public function method_createReport( $data )
	{
		$_SESSION['reportData'] = $data;
		$reportLink = qcl_server_Server::getUrl() .
      "?service=logbuch.report"   .
      "&method=display" .
			"&params=" .
			"&sessionId="	. $this->getSessionId();
		return $reportLink;
	}
}
?>