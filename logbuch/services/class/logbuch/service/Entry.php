<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     J�rgen Breiter
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
 
  private $locale = array(
    "event"           => "Termin",
    "consult"         => "Beratungsprozess",
    "stumble"         => "Stolperstein",
    "document"        => "Dokument",
    "minutes"         => "Protokoll",
    "result"          => "Ergebnis",
    "idea"            => "Idee",
    "coop"            => "Kooperation",
    "hint"            => "Tipps",
    "photo"           => "Photo",
    "misc"            => "Sonstiges",
    "ownCompany"      => "Eigenes Unternehmen",
    "ownConsultant"   => "Berater (Eigenes Unternehmen)",
    "allConsultants"  => "Alle Berater/innen",
    "analyst"         => "Wissenschaftliche Begleitung",
    "allMembers"      => "Alle",
    "moreMembers"     => "Einzelne Teilnehmer/innen"  
  );
  
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
		$entryModel = $this->getEntryModel();
		$where = array();
		$parameters = array();
		$from = null;
    $to   = null;
    
		/*
		 * a specific entry and its comment?
		 */
		if( $filter->id )
		{
  		$query = new qcl_data_db_Query(array(
  		  'where'			  => "id = :id OR parentEntryId = :id",
  		  'parameters'	=> array(
  		    ':id'	=> $filter->id
  		  ),
  			'orderBy'		  => "created"
  		) );				  
		}
		
		elseif ( is_string( $filter->search ) )
		{
  		$query = new qcl_data_db_Query( array(
  		  'where'       => "subject LIKE :fragment or text LIKE :fragment",
  		  'parameters'  => array(
  		    ":fragment"	=> "%{$filter->search}%"
  		  )
  		) );		  
		}
		
		else 
		{
  		/*
  		 * date
  		 */
		  
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
    		  //$where['created'] = array( 
    		  //	"BETWEEN", 
    		  //  date("Y-m-d 00:00:00", $from ), 
    		  //  date("Y-m-d 23:59:59", $to  ) 
    		  //);
    		  $where = "created between :from and :to or dateStart between :from and :to";
    		  $parameters = array(
    		    ":from" => date("Y-m-d 00:00:00", $from ),
    		    ":to"		=> date("Y-m-d 23:59:59", $to  )
    		  );
    		  
    		}
    		elseif ($filter->from)
    		{
    		  //$where['created'] = array( ">=", date("Y-m-d 00:00:00", $from ) );
    		  $where = "created >= :from or dateStart >= :from";
    		  $parameters = array(
    		    ":from" => date("Y-m-d 00:00:00", $from )
    		  );    		  
    		}
    		elseif ($filter->to)
    		{
    		  //$where['created'] = array( "<=", date("Y-m-d 23:59:59", $to ) );
    		  $where = "created <= :to or dateStart <= :to";
    		  $parameters = array(
    		    ":to"		=> date("Y-m-d 23:59:59", $to )
    		  );      		  
    		}
  		}
  				
  		/*
  		 * author
  		 */
  		if ( count( $filter->personId ) )
  		{
  		  $where['personId'] = array("IN",$filter->personId);
  		}
  
  		
  		$query = new qcl_data_db_Query(array(
  		  'where'			  => $where,
  			'orderBy'		  => either($filter->orderBy, "created DESC"),
  		  'parameters'	=> $parameters
  		));		
		}
		
		/*
		 * paging
		 */
		$paging = false;
  	if( is_numeric($filter->offset) && is_numeric( $filter->limit ))
		{
  		$paging = true;
		}
				
		/*
		 * execute query
		 */
		$entryModel->find($query);
		$result = array();
		$counter1 = 0;
		$counter2 = 0;
		$denied = 0;
		$skipped = 0;
		while( $entryModel->loadNext($query) )
		{ 
		  $data = $this->_getEntryData($entryModel, $filter);
		  if ( is_array($data) )
		  {
		    // update from/to 
		    $timestampFrom = either( $data['timeStampStart']/1000, strtotime( $data['created'] ) );
		    if ( ! $from or $timestampFrom < $from )
		    {
		      $from = $timestampFrom;
		    }
		    $timestampTo = either( $data['timeStampEnd']/1000, strtotime( $data['created'] ) );
		    if ( ! $to or $timestampTo > $to )
		    {
		      $to = $timestampTo;
		    }
		    
		    // paging
		    if( $paging ) 
		    {   
		      if( $counter2 >= $filter->offset and count($result) < $filter->limit )
		      {
		        $result[] = $data;
		      }
		      else
		      {
		        $skipped++;
		      }
		    }
		    else
		    {
		      $result[] = $data;
		    }
		    $counter2++;
		  }
		  else
	    {
	      $denied++;
	    }
	    $counter1++;
		}
	  
		if( $paging )
		{
		  $available = $counter2;
		  $retrieved = count($result);
		  $nextOffset = $filter->offset + $filter->limit;
  		$remaining = max(array($available - $nextOffset ,0));
  		/*
		  $this->debug( array(
		    'filter'		=> $filter,
		    'records'   => $counter1,
		    'denied'	  => $denied,
		    'retrieved'	=> $retrieved,
		    'available'	=> $available,
		    'skipped'		=> $skipped,
		    'remaining'	=> $remaining,
		    'nextOffset'=> $nextOffset
		  ), __CLASS__, __LINE__ );*/
		  
  		if( $remaining )
  		{
  		  $limit  = min(array( 10, $remaining ) );
  		  $result[] = array( // @todo move this next to from and to
  	      "offset"	  => $nextOffset,
  		    "remaining"	=> $remaining,
  		    "limit"			=> $limit
  		  );
  		}
		}
		return array( 
		  "data" => $result,
		  "from" => $from*1000,
		  "to"   => $to*1000
		);
	}
	
	function _getEntryData( $entryModel, $filter=null )
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
	  static $parentEntryModel = null;
	  if( $admin === null )
	  {
  	  $admin           = $this->getActiveUser()->hasRole( QCL_ROLE_ADMIN );
  	  $datasourceModel = $this->getDatasourceModel(); 
  		$entryModel      = $this->getEntryModel();
  		$parentEntryModel= $datasourceModel->createInstanceOfType("entry");
  		$categoryModel   = $this->getCategoryModel();
  		$personModel     = $this->getPersonModel();
  		$activePerson    = $this->getActiveUserPerson();
  		$aclModel        = new logbuch_model_AccessControlList();	 
  		 
	  }
	  
    $personModel->load($entryModel->get("personId"));
    	  
    $categories = $entryModel->categories();
    $display = true;
    
    /*
     * filter
     */
	  if ( $filter )
	  {
	    
  		/*
  	   * by categories
  	   */	    
	    if ( $filter->category )
	    {
    	  $filterCategories = array_keys( get_object_vars( $filter->category ) );
    
    	  if( count($filterCategories) )
    	  {    
    	    if( ! count( array_intersect( $categories, $filterCategories ) ) )
    	    {
    	      return null;
    	    }
    	  }
	    }
	      
  	  /*
  	   * by group
  	   */
	    if( $filter->group )
	    {
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
    		if ( $filter->group->allConsultants )
    		{
    			if ( $personModel->get("position") != "consultant"  ) 
    			{
    				$display = false;
    			}
    		}
    		
    		// analyst
    		if ( $filter->group->analyst )
    		{
    			if ( $personModel->get("position") == "analyst" )
    			{
    				$display = false;
    			}
    		}
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
		 * access for particular users? 
		 */
		$members = null;
		if( count( $aclModel->get("moreMembers") ) )
		{
		  $personModel->findWhere( array( 
		  	"id" => array( "IN", $aclModel->get("moreMembers") ) 
		  ) );
		  while( $personModel->loadNext() )
		  {
		    $members[] = $personModel->getFullName();
		  }
		}
		
		
		/*
		 * retrieve number of comments of this entry
		 */
		$ids = $parentEntryModel->linkedModelIds($entryModel);
		$comments = count($ids);
		
		
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
		$timeStamp = $entryModel->getCreated()->getTimestamp();
    $data = array(
      'id'			    => $entryModel->id(),
      'created'		  => date ("d.m.Y H:i", $timeStamp ), // @todo-localize on client, not here
      'updated'		  => date ("d.m.Y H:i", $entryModel->getModified()->getTimestamp() ),
      'timestamp'		=> $timeStamp *1000,
      'subject'     => $entryModel->get("subject"),
      'author'	 	  => $entryModel->authorName(),
      'text'		    => $entryModel->get("text"),
      'acl'					=> $entryModel->aclData(),
      'members'			=> $members,
      'editable'	  => $editable,
      'deletable'		=> $editable && ($comments==0),
      'categories'  => $categories,
      'comments'	  => $comments,
      'attachments' => $this->_getAttachmentData($entryModel),
      'isPrivate'		=> $aclModel->isPrivate()
    );	
    
    /*
     * events
     */
    if( in_array("event", $categories) )
    {
      $data['timestampStart']      = strtotime( $entryModel->get('dateStart') )*1000;
      $data['timestampEnd']        = strtotime( $entryModel->get('dateEnd') )*1000;
      $data['dateStart'] 	= date("d.m.Y", strtotime( $entryModel->get('dateStart') ) ); // @todo localize on client
  	  $data['dateEnd'] 		= date("d.m.Y", strtotime( $entryModel->get('dateEnd') ) );		
  		$data['timeStart'] 	= date("H:i", 	strtotime( $entryModel->get('dateStart') ) ); 
  	  $data['timeEnd'] 		= date("H:i", 	strtotime( $entryModel->get('dateEnd') ) );
    }
    
		/*
		 * replies
		 */
		if( $replyToId = $entryModel->_get("parentEntryId") )
		{
		  $parentEntryModel->load($replyToId);
		  $data['replyToId'] = $parentEntryModel->id();
      $data['replyToSubject'] = $parentEntryModel->get("subject") ;
      $data['replyToAuthor'] =  $parentEntryModel->authorName();
		}    
    return $data;
	}
	
	function _getAttachmentData( $entryModel )
	{
	  $data = array();
	  static $attModel= null;
	  if( $attModel === null )
	  {
	    $attModel = $this->getAttachmentModel();
	  }
	  
	  try 
	  {
  	  $attModel->findLinked($entryModel);
  	  while( $attModel->loadNext() )
  	  {
  	    $filename = $attModel->get("filename");
  	    
         /*
          * get icon for file
          */
         $file_extension = strtolower(substr(strrchr($filename,"."),1));
         $iconpath = "img/fileicons/$file_extension.png";
         if( ! file_exists("../html/teamblog/" . $iconpath ) )
         {
           $iconpath = "img/page_error.png";
         }   	    
  	    
  	    $data[] = array(
  	      'id'    => $attModel->id(),
  	      'name'  => $filename,
  	      'icon'	=> $iconpath,
  	      'size'	=> qcl_format_filesize( $attModel->get("size") ),
  	      'mime'  => $attModel->get("mime")
  	    );
  	  }
	  }
	  catch( qcl_data_model_RecordNotFoundException $e ){}
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
		$entryModel = $this->getEntryModel();
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
		$entryModel      = $this->getEntryModel();
		$categoryModel   = $this->getCategoryModel();
		$personModel 	   = $this->getPersonModel();
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
		$text = str_replace(array("<br>","<br />","<br/>","dummyText"), "", $data->text);
		qcl_import("qcl_data_xml_SimpleXMLElement");
		$xml = '<?xml version="1.0" encoding="utf-8"?><html>' . $text  . '</html>';
		$xmlDoc = qcl_data_xml_SimpleXMLElement::createFromString($xml);
		$children = $xmlDoc->children();
		$itemData['text'] = "";
		$counter = 0;
		foreach( $children as $tag => $node )
		{
	    if( $counter++ == 0 )
	    {
	      $itemData['subject'] =  trim( strip_tags( $node->asXML() ) ) ;
	    }
	    else 
	    {
	      $itemData['text'] .= trim( $node->asXML() );
	    }
	    
		}
		
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
			/*
  		 * if this is a reply, set the parentEntryId
  		 */
  		if ( is_numeric( $data->replyToId ) )
  		{
  		  $itemData['parentEntryId'] = $data->replyToId;
  		}		  
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
		
		/*
		 * attachments
		 */
		if( is_array( $data->attachmentIds ) )
		{
		  $attModel = $this->getAttachmentModel();
		  $before   = $attModel->linkedModelIds( $entryModel );
		  $after    = $data->attachmentIds;
		  $added    = array_diff( $after, $before );
		  $deleted  = array_diff( $before, $after );
		  foreach( $added as $attId )
		  {
		    if( ! is_integer($attId) ) continue; //FIXME hack
		    $attModel->load($attId);
		    $attModel->linkModel($entryModel);
		  }
		  
		  foreach( $deleted as $attId )
		  {
		    $attModel->load($attId);
		    $attModel->unlinkModel($entryModel);
		    $attModel->delete();
		  }
		}
		
		/*
		 * notify other clients
		 */
		$data = $this->_getEntryData($entryModel);
		$data['editable'] = false;
		$data['deletable'] = false;
		if( $id )
		{
		  $this->broadcastClientMessage("entry.updated",$data, true );
		}
		else 
		{
		  $this->broadcastClientMessage("entry.created", $data, true );
		}
		
		// replies
		if ( $data['replyToId'] )
		{
		  unset($data['text']);
		  $this->broadcastClientMessage("entry.reply", $data, true );
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
	function method_delete( $id )
	{
		$model = $this->getEntryModel();
		$model->load( $id );
		if( $this->getActiveUser()->hasRole( QCL_ROLE_ADMIN ) ) // FIXME permission
		{
			$model->delete();
		}
		else
		{
			$personModel = $this->getPersonModel();
			$personModel->loadWhere( array( "userId" => $this->getActiveUser()->id() ) );
			if( $model->get("personId") == $personModel->id() )
			{
				$model->delete();	
			}
			else
			{
				throw new JsonRpcError( $this->tr( "Sie d�rfen diesen Eintrag nicht l�schen.") );	
			}
		}
		$this->broadcastClientMessage("entry.deleted",$id,true);
		return "OK";
	}		
	
	/**
	 * Generates data for the querybox widget
	 * @param string $fragment
	 */
	function method_querybox($fragment)
	{
	  $result = array( 
	    "query"   => $fragment,
	    "results"	=> array()
	  );
		$entryModel      = $this->getEntryModel();
		$entryModel->find( new qcl_data_db_Query( array(
		  where       => "subject LIKE :fragment or text like :fragment",
		  parameters  => array(
		    ":fragment"	=> "%$fragment%"
		  )
		) ) );
		
	  while ( $entryModel->loadNext() )
	  {
	    if( $this->_getEntryData($entryModel))
	    {
  	    foreach( $entryModel->categories() as $category )
  	    {
    	    $result['results'][] = array(
    	      "title"        => $entryModel->get("subject"),
    	      "link"         => "javascript:loadSingleEntry(" . $entryModel->id() . ")",
    	      "description"  => $entryModel->authorName() . " (" .
    	                          date ("d.m.Y H:i", strtotime( $entryModel->get("modified") ) ) . ")" ,
    	      "id"           => $entryModel->id(),
    	      "category"	   => $this->locale[$category]
    	    );
  	    }
	    }
	  }
		
		return $result;
	}
}
?>