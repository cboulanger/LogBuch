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
qcl_import("logbuch_model_Attachment");

/**
 *
 */
class logbuch_service_Entry
  extends logbuch_service_Controller
{

	/**
	 * Creates an entry
	 * @param $data
	 */
	function method_create( $data )
	{
		return $this->method_update(null, $data);
	}	
	
	function method_list($filter)
	{
	  $datasourceModel = $this->getDatasourceModel( "demo" ); // FIXME 
		$entryModel      = $datasourceModel->getInstanceOfType( "entry" );
		
		$filterCategories = array_keys( get_object_vars( $filter->category ) );
		
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
		$query = new qcl_data_db_Query(array(
		  'where'			=> $where,
			'orderBy'		=> "created DESC"
		));
		
		$entryModel->find($query);
		$result = array();
		
		while( $entryModel->loadNext($query) )
		{
		  $data = $this->_getEntryData($entryModel);
		  if ( is_array($data) )
		  {
		    $result[] = $data;
		  }
		}
		return $result;
	}
	
	function _getEntryData( $entryModel )
	{
	  /*
	   * create some static vars that are cached during request time
	   */
	  static $admin = null;
	  static $datasourceModel = null;
	  static $entryModel = null;
	  static $categoryModel = null;
	  static $personModel = null;
	  static $activePerson = null;
	  static $aclModel = null;
	  if( $admin === null )
	  {
  	  $admin           = $this->getActiveUser()->hasRole( QCL_ROLE_ADMIN );
  	  $datasourceModel = $this->getDatasourceModel( "demo" ); // FIXME 
  		$entryModel      = $datasourceModel->getInstanceOfType( "entry" );
  		$categoryModel   = $datasourceModel->getInstanceOfType("category");
  		$personModel     = $datasourceModel->getInstanceOfType("person");
  		$activePerson    = $this->getActiveUserPerson("demo");
  		$aclModel        = new logbuch_model_AccessControlList();	  
	  }
	  
		/*
	   * categories
	   */
	  $categories = $entryModel->categories();

	  if( count($filterCategories) )
	  {    
	    if( count( array_intersect( $categories, $filterCategories ) ) < count( $filterCategories ) )
	    {
	      return null;
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
		$access = true; $owner = false;
		// administrators can see everything
		if ( ! $admin )
		{
  		$aclModel->setAcl( $entryModel->aclData() ); 		
  		// check access only if the entry doesn't belong to the current user
  		if ( $activePerson->id()	!= $personModel->id() )
  		{
  			$access = $aclModel->checkAccess( $personModel, $activePerson );
  		}  		
  		else 
  		{
  		  $owner = true;
  		}
    }
		
		/*
		 * continue if no access
		 */
		if ( ! $access or !$display ) return null;
		
		/*
		 * retrieve number of comments of this entry
		 */
		$comments = $entryModel->countLinksWithModel($entryModel);
		
		/*
		 * number of attachments
		 */
		$attModel = $datasourceModel->getInstanceOfType("attachment");
		$attachments = $entryModel->countLinksWithModel($attModel);
		
		/*
		 * is it editable?
		 */
		$editable = ( $admin || $owner );
		    		
	  /*
	   * create data
	   */
    $data = array(
      'id'			    => $entryModel->id(),
      'date'			  => date ("d.m.Y", strtotime( $entryModel->get("created") ) ),
      'subject'     => $entryModel->get("subject"),
      'author'	 	  => $entryModel->authorName(),
      'text'		    => $entryModel->get("text"),
      'acl'					=> $entryModel->aclData(),
      'editable'	  => $editable,
      'categories'  => $categories,
      'comments'	  => 3, //$comments,
      'attachments' => 10 //$attachments
    );	
    
    if( in_array("event", $categories) )
    {
      $data['dateStart'] 	= date("Y-m-d", strtotime( $entryModel->get('dateStart') ) ); 
  	  $data['dateEnd'] 		= date("Y-m-d", strtotime( $entryModel->get('dateEnd') ) );		
  		$data['timeStart'] 	= date("H:i", 	strtotime( $entryModel->get('dateStart') ) ); 
  	  $data['timeEnd'] 		= date("H:i", 	strtotime( $entryModel->get('dateEnd') ) );
    }
    return $data;
	}
	
	
	/**
	 * Reads a category entry
	 * @param string $category The category type
	 * @param string|int $id Numeric id or id in the form of "<string type>/<numeric id>" FIXME 
	 */
	function method_read($id )
	{
		if ( ! is_numeric( $id ) )
		{
			throw new InvalidJsonRpcArgumentException("Invalid id");
		}
		
		$data = array();

		/*
		 * load record
		 */
		$entryModel = $this->getDatasourceModel( "demo" )->getModelOfType( "entry" );
		try 
		{
			$entryModel->load( $id );
		}
		catch( qcl_data_model_RecordNotFoundException $e )
		{
			throw new InvalidJsonRpcArgumentException("Der Datensatz existiert nicht (mehr).");
		}		
		
		return $this->_getEntryData($entryModel);
	}
	
	/**
	 * Updates a category entry
	 * @param $category
	 * @param $id
	 * @param $data
	 * @param $acl
	 */
	function method_update( $id, $data )
	{
		//$this->debug($data);
		
		$activeUser 	   = $this->getActiveUser();
		$datasourceModel = $this->getDatasourceModel("demo"); // FIXME 
		$entryModel      = $datasourceModel->getModelOfType( "entry" );
		$categoryModel   = $datasourceModel->getModelOfType("category");
		$personModel 	   = $datasourceModel->getModelOfType("person");
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
		if( ! $id )
		{
  		try 
  		{
  			$personModel->loadByUserId( $activeUser->id() );
  		}
  		catch ( qcl_data_model_RecordNotFoundException $e )
  		{
  			throw new InvalidJsonRpcArgumentException( 
  				$this->tr("Kein Zugriff.")
  			);
  		}
  		$itemData["personId"] = $personModel->id();
		}
		
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
		$itemData['subject'] = $subject;
		$itemData['text'] = $text;
		
		/*
		 * acl
		 */
		$aclModel = new logbuch_model_AccessControlList();		
		$aclData  = $aclModel->set($data->acl);
		
		/*
		 * merge item and acl data 
		 */
		$itemData = array_merge( $itemData, $aclData->data() );
				
		/*
		 * create or update record
		 */
		if( $id === null )
		{
		  $newId = $entryModel->create( $itemData );  
		}
		elseif ( $id and is_numeric( $id ) )
		{
		  try {
		    $entryModel->load( $id );
		    $entryModel->set($itemData);
		    $entryModel->save();
		  }
		  catch( qcl_data_model_RecordNotFoundException $e)
		  {
		    throw new InvalidArgumentException("Datensatz existiert nicht (mehr)");
		  }
		}
    else
    {
      throw new InvalidArgumentException("Invalid id");
    }
		
		/*
		 * link categories
		 */
		foreach( $data->categories as $category )
		{
		  $categoryModel->namedIdExists($category) ?
		    $categoryModel->load( $category ) :
		    $categoryModel->create( $category ); 
		  try {  
		    $categoryModel->linkModel( $entryModel );
		  } catch( qcl_data_model_RecordExistsException $e) {}
		}
		
		if( $id )
		{
		  //$this->broadcastClientMessage("entry.updated",$itemData);
		}
		else 
		{
		  //$this->broadcastClientMessage("entry.created",$itemData);
		}
		
		/*
		 * done
		 */
		return $this->_getEntryData($entryModel);
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