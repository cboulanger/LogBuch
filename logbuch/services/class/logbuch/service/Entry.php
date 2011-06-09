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
qcl_import("qcl_ui_dialog_Alert");
qcl_import("logbuch_model_AccessControlList");
qcl_import("logbuch_service_Notification");

/**
 *
 */
class logbuch_service_Entry
  extends logbuch_service_Controller
{

	/**
	 * Creates an entry
	 * @param $category
	 * @param $data
	 * @param $acl
	 */
	function method_create( $data )
	{
		//$this->debug($data);
		
		
		$datasourceModel = $this->getDatasourceModel("demo"); // FIXME 
		$entryModel = $datasourceModel->getModelOfType( "entry" );
		$categoryModel = $datasourceModel->getModelOfType("category");
		 
		$itemData = array();

		/*
		 * set date
		 */
		if ( is_array($data->eventTime) )
		{
  		$itemData['dateStart'] = date ("Y-m-d H:i:s", strtotime( $data->eventTime[0] ) );
  		$itemData['dateEnd'] 	 = date ("Y-m-d H:i:s", strtotime( $data->eventTime[1] ) );
		}
		
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
			throw new InvalidJsonRpcArgumentException( 
				$this->tr("Only registered users can enter data into the LogBuch.")
			);
		}
		$itemData["personId"] = $personModel->id();
		
		/*
		 * subject and text
		 */
		$text = str_replace(array("<br>","<br />","<br/>"), "", $data->text);
		qcl_import("qcl_data_xml_SimpleXMLElement");
		$xml = '<?xml version="1.0" encoding="utf-8"?><html>' . $text  . '</html>';
		$xmlDoc = qcl_data_xml_SimpleXMLElement::createFromString($xml);
		$headNode = $xmlDoc->div;
		
		if ( ! $headNode )
		{
        throw new InvalidJsonRpcArgumentException( 
				  "Titel des Eintrages fehlt."
			);
		}
		
		$subject = (string) $headNode;
		unset($xmlDoc->div);
		$text = trim(str_replace(array('<?xml version="1.0" encoding="utf-8"?>','<html>','</html>'), "", $xmlDoc->asXML()));
		$this->debug( "$subject\n$text", __CLASS__, __LINE__ );
		$itemData['subject'] = $subject;
		$itemData['text'] = $text;
		
		/*
		 * acl
		 */
		$aclModel = new logbuch_model_AccessControlList();		
		$aclData  = $aclModel->set($data->acl);
		
		/*
		 * merge item and acl data to create record
		 */
		$itemData = array_merge( $itemData, $aclData->data() );
    $entryModel->create( $itemData );
		
		/*
		 * link categories
		 */
		foreach( $data->categories as $category )
		{
		  $categoryModel->namedIdExists($category) ?
		    $categoryModel->load( $category ) :
		    $categoryModel->create( $category );    
		  $categoryModel->linkModel( $entryModel );
		}
		
		/*
		 * done
		 */
		return "OK";
	}	
	
	
	function method_list($filter)
	{
	  $datasourceModel = $this->getDatasourceModel( "demo" ); // FIXME 
		$entryModel      = $datasourceModel->getInstanceOfType( "entry" );
		$categoryModel   = $datasourceModel->getInstanceOfType("category");
		$personModel     = $datasourceModel->getInstanceOfType("person");
		$activePerson    = $this->getActiveUserPerson("demo");
		$filterCategories = array_keys( get_object_vars( $filter->category ) );
		qcl_import("logbuch_model_AccessControlList");
    $aclModel        = new logbuch_model_AccessControlList();
		
		// prepare filter
		$where = array();
		if( $filter->from || $filter->to )
		{
		  $from = strtotime( $filter->from );
		  $to   = strtotime( $filter->to );

  		if ( $filter->from && $filter->to )
  		{
  		  if( $from > $to )
  		  {
  		    throw new InvalidArgumentException("Das Enddatum muss nach dem Startdatum liegen!");
  		  }  		  
  		  $where['created'] = array( 
  		  	"BETWEEN", 
  		    date("Y-m-d 00:00:00", $from ), 
  		    date("Y-m-d 23:59:59", $to  ) 
  		  );
  		}
  		elseif ($filter->from)
  		{
  		  $where['created'] = array( ">=", date("Y-m-d 00:00:00", $from ) );
  		}
  		elseif ($filter->to)
  		{
  		  $where['created'] = array( "<=", date("Y-m-d 23:59:59", $to ) );
  		}
		}
				
		if ( count( $filter->personId ) )
		{
		  $where['personId'] = array("IN",$filter->personId);
		}
		
		qcl_import("qcl_data_db_Query");
		$query = new qcl_data_db_Query(array(
		  'where'			=> $where,
			'orderBy'		=> "created DESC"
		));
		
		$entryModel->find($query);
		$result = array();
		
		while( $entryModel->loadNext($query) )
		{
		  
		  
		  /*
		   * categories
		   */
		  $categories = $entryModel->categories();

		  if( count($filterCategories) )
		  {    
		    if( count( array_intersect( $categories, $filterCategories ) ) < count( $filterCategories ) )
		    {
		      continue;
		    }
		  }
		  
		  /*
		   * group
		   */
		  $display = true;
		  $personModel->load($entryModel->get("personId"));

		  // own company
  		if ( $filter->group->ownCompany )
  		{
  			if ( $personModel->get("organizationId") != $activePerson->get("organizationId") )
  			{
  				$display = false;
  			}
  		}
  		
  		// own consultant
  		if ( $filter->group->ownConsultant )
  		{
  			if ( $personModel->get("organizationId") != $activePerson->get("organizationId") 
  			     or $personModel->get("position") != "consultant" )
				{
					$display = false;
				}
  		}
  		
  		// all consultants
  		if ( $this->group->allConsultants )
  		{
  			if ( $personModel->get("position") != "consultant"  ) 
  			{
  				$display = false;
  			}
  		}
  		
  		// analyst
  		if ( $this->group->analyst )
  		{
  			if ( $personModel->get("position") == "analyst" )
  			{
  				$display = false;
  			}
  		}
  		
  		/*
  		 * ACL
  		 */
  		$access = true;
  		// administrators can see everything
  		if ( ! $this->getActiveUser()->hasRole( QCL_ROLE_ADMIN ) )
  		{
    		$aclModel->setAcl( $entryModel->aclData() ); 		
    		// check access only if the entry doesn't belong to the current user
    		if ( $activePerson->id()	!= $personModel->id() )
    		{
    			$access = $aclModel->checkAccess( $personModel, $activePerson );
    		}  		
      }
  		
  		/*
  		 * continue if no access
  		 */
  		if ( ! $access or !$display ) continue;
  		
		  /*
		   * create data
		   */
	    $result[] = array(
	      'id'			  => "entry" . $entryModel->id(),
	      'date'			=> date ("d.m.Y", strtotime( $entryModel->get("created") ) ),
	      'subject'   => $entryModel->get("subject"),
	      'author'	  => $entryModel->authorName(),
	      'text'		  => $entryModel->get("text"),
	      'categories'=> $categories
	    );		  
		}
		return $result;
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
     * whether the current user has access to this item at all
     */
    $aclModel->setAcl($data['acl']);
    $activeUserPerson = $this->getActiveUserPerson("demo");
    $access = $aclModel->checkAccess($personModel, $activeUserPerson);
    $isAuthor = $activeUserPerson->id() == $personModel->id();
    if( ! $access and ! $isAuthor )
    {
      throw new qcl_access_AccessDeniedException("Sie haben keinen Zugriff zu diesem Eintrag.");
    }
    
	  /*
	   * whether to allow to edit or delete the item
	   */
	  $data['deletable'] = $data['editable'] = $isAuthor;  
	  
    /*
     * whether to notify by email
     */
    $data['acl']['notify'] = $model->get("notify");	  
	  
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
		$authorModel = $this->getDatasourceModel( "demo" )->getPersonModel(); //FIXME
		try 
		{
		  $authorModel->loadByUserId( $this->getActiveUser()->id() );
		}
		catch ( qcl_data_model_RecordNotFoundException $e)
		{
		  return new qcl_ui_dialog_Alert("Nur registrierte Nutzer dŸrfen DatensŠtze bearbeiten."); // FIXME tr
		}
		
		if ( $authorModel->id() != $model->get("personId") )
		{
		  $authorModel->load( $model->get("personId") );
		  $name = $authorModel->getFullName();
		  throw new JsonRpcException("Die VerŠnderungen wurden nicht gespeichert. Nur der/die Verfasser/in des Datensatzes ($name) darf ihn bearbeiten."); // FIXME tr
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
    $aclChanged = false;
    
		foreach( $oldAcl as $key => $value )
		{
			if ( is_bool($value) )
			{
				$newAcl[$key] = ( $value === false && $acl->$key === true );
				if ( $oldAcl[$key] != $newAcl[$key] )
				{
				  $aclChanged = true;
				}	
			}
			elseif ( is_array( $value) )
			{
				$newAcl[$key] = array_diff( $acl->$key, $value );
				if ( count($newAcl[$key]) )
			  {
          $aclChanged = true;
        }
			}
			
		}	
		
    /*
     * set new acl 
     */
    $model->set( $acl );
    
    /*
     * publish messages
     */
		$bus = qcl_event_message_Bus::getInstance();
		$dataArr = array();
		foreach( $model->createMessages( "logbuch/display-category-item" ) as $message )
		{
			$message->setAcl( $newAcl );
			$message->setBroadcast( true );
			$message->setExcludeOwnSession( false );
			$data = $message->getData();
			$dataArr[] = $data;
			$data['isPrivate'] = $model->isPrivate();
			$message->setData( $data );			
			$bus->publish($message);
		}
		
    /*
     * notify
     */
    if ( $acl->notify and ( $model->get("new") or $aclChanged ) )
    {
      unset( $acl->notify );
      $author = $authorModel->getFullName();
      $subject = "Neuer Logbuch-Eintrag";
      $body = "Sehr geehrte/r LogBuch-Teilnehmer/in,\n\n";
      $body .= "$author hat einen neuen Eintrag erstellt oder aktualisiert: \n\n";
      foreach ( $dataArr as $data )
      {
        $body .= 
          date("d.m.Y", strtotime( $data['itemDateStart']) ) . "\n" .
          $data['label'] . ": " . 
          $data['subject'] . "\n\n";
      }

      $body .= "\nSie kšnnen den Eintrag unter dem folgenden Link abrufen: \n\n";
      $body .= dirname( dirname( qcl_server_Server::getUrl() ) ) . 
            "/build/#showItem~" . urlencode($data['itemId']); // FIXME
      
      $body .= "\n\n---\n\nBitte antworten Sie nicht auf diese E-Mail.";
      
      $notification = new logbuch_service_Notification();
      $notification->notifyAll("demo", $subject, $body, $acl); // FIXME
      $model->set("new", false);
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
}
?>