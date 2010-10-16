<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_data_controller_Controller");
qcl_import("logbuch_model_AccessControlList");

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
		$itemData['dateEnd'] 	 = date ("Y-m-d H:i:s", strtotime( $date ) + 3600 * 8 );
		
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
		$model->load( $id );		
		
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
	   * whether to allow to delete the item
	   */
	  //$personModel->loadByUserId( $this->getActiveUser()->id() )
	  $data['allowDelete'] = true; // FIXME 
	  
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
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		$model->load( $id );
		
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
		$bus = qcl_event_message_Bus::getInstance();
		foreach( $model->createMessages() as $message )
		{
			$message->setAcl( $newAcl );
			$message->setBroadcast( true );
			$message->setExcludeOwnSession( false );
			$bus->dispatch($message);
		}
		
		/*
		 * set new acl 
		 */
		$model->set( $acl );
				
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
				new qcl_ui_dialog_Alert( $this->tr( "You cannot delete this entry because you do not own it.") );	
			}
		}
		return "OK";
	}		
	
	public function method_createReport( $data )
	{
		$reportLink = qcl_server_Server::getUrl() .
      "?service="   . $this->serviceName() .
      "&method="    . "displayReport" .
      "&params="    . urlencode(serialize( $data )) . 
			"&sessionId="	. $this->getSessionId();
		return $reportLink;
	}
	
	public function method_displayReport( $data )
	{
		print_r( unserialize( urldecode( $data ) ) ); 
		exit;
	}
}
?>