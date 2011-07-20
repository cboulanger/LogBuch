<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen

   Copyright: Konzeption:     Jürgen Breiter
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

  public $locale = array(
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
    "question"				=> "Frage",
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
	  /*
	   * update method does all the work
	   */
		return $this->method_update(null, $data);
	}

	/**
	 * Returns a filtered list of entries
	 * @param stdClass $filter
	 */
	function method_list(stdClass $filter)
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
		  $filter->search = trim( $filter->search );
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

	/**
	 * Returns data that represent an entry
	 * @param logbuch_model_Entry $entryModel
	 * @param object $filter
	 */
	function _getEntryData( logbuch_model_Entry $entryModel, stdClass $filter=null )
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
          /*
           * create a list of custom and non-custom categories
           */
    	    static $cat = null;
    	    if( $cat === null )
    	    {
    	      $cat = array(array(),array());
      	    foreach( $filterCategories as $category )
      	    {
      	      $categoryModel->load($category);
      	      if( $categoryModel->get("custom") )
      	      {
      	        $cat[0][] = $category;
      	      }
      	      else
      	      {
      	        $cat[1][] = $category;
      	      }
      	    }
    	    }
    	    /*
    	     * require that both custom and non-custom
    	     * categories have to be in the category list
    	     * (boolean AND)
    	     */
    	    if( count( $cat[0] ) and ! count( array_intersect( $categories,  $cat[0] ) ) )
    	    {
    	      return null;
    	    }
    	    if( count( $cat[1] ) and ! count( array_intersect( $categories,  $cat[1] ) ) )
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
		$attModel = $this->getAttachmentModel();
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
      'authorId'		=> $entryModel->get("personId"),
      'author'	 	  => $entryModel->authorName(),
      'initials'		=> $entryModel->authorInitials(),
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
     * cleanup hacks
     */
    if ( in_array(null,$data['acl']['moreMembers']) )
    {
      foreach( $data['acl']['moreMembers'] as $i => $value )
      {
        if( $value === null ) unset( $data['acl']['moreMembers'][$i] );
      }
    }

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

		/*
		 * images
		 */
		$personModel->load( $data['authorId'] );
		$path = "../../services/" . LOGBUCH_THUMBNAIL_PATH;
		if( $authorImage = $personModel->get("image") )
		{
		  $data['authorImage'] =  $path . "/64/" . $authorImage;
		}
    $orgModel = $this->getOrganizationModel();
		$orgModel->load( $personModel->get("organizationId") );
		if( $organizationLogo = $orgModel->get("image") )
		{
		  $data['organizationLogo'] = $path . "/64/" . $organizationLogo;
		}

		/*
		 * entry metadata
		 */
		$userPropModel = $this->getEntryUserPropertyModel();
		try
		{
		  $userPropModel->loadWhere(array(
		  	'entryId'   => $data['id'],
		    'personId'	=> $activePerson->id()
		  ) );
		}
		catch( qcl_data_model_RecordNotFoundException $e)
		{
      $userPropModel->create(array(
		  	'entryId'   => $data['id'],
		    'personId'	=> $activePerson->id()
		  ) );
		}
		$data['new'] = !$userPropModel->get("displayed");
	  if( $data['new'] )
	  {
	    $userPropModel->set( "displayed", true )->save();
	  }

		/*
		 * finally, return the entry data
		 */
    return $data;
	}

	/**
	 * Returns data about the attachments of an entry
	 * @param logbuch_model_Entry $entryModel
	 */
	function _getAttachmentData( logbuch_model_Entry $entryModel )
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
		$activePerson    = $this->getActiveUserPerson();
	  $activePersonId  = $activePerson->id();
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
		$text = str_replace(array("dummyText"), "", $data->text);
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
		 * fix broken editor content
		 */
		if( strlen( trim( strip_tags( $itemData['text'] ) ) ) == 0
		    or strlen( $itemData['subject'] ) > 255 )
		{
		  $p = strpos( $itemData['subject'], "<br" );
		  if( $p === false and strlen( $itemData['subject'] ) > 255 )
		  {
		    $p = strpos( $itemData['subject'], " ", 200 );
		  }
		  if( $p !== false )
		  {
		    $itemData['text']    = substr( $itemData['subject'], $p ) . " " . $itemData['text'];
		    $itemData['subject'] = substr( $itemData['subject'], 0, $p ) ;
		  }
		}
		$itemData['text']    = str_replace("entry-headline", "dummy", $itemData['text'] );

		/*
		 * acl
		 */

		$aclModel = new logbuch_model_AccessControlList();
		$aclData  = $aclModel->set($data->acl);

		/*
		 * notifications
		 */
    foreach( array("notify_recipients","notify_reply") as $key )
    {
      if( isset( $data->$key ) ) $itemData[$key] = $data->$key;
    }

		/*
		 * merge item and acl data
		 */
    $aclData = $aclData->data();
		$itemData = array_merge( $itemData, $aclData );

		/*
		 * entry must be visible at least for the author
		 * of the entry
		 */
		//if( ! $aclModel->checkAccess($activePerson, $activePerson) )
		//{
  	//  $itemData['moreMembers'] = array_unique( array_merge(
  	//    $itemData['moreMembers'],
  	//    array( $activePerson->id() )
  	//  ));
		//}

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
  		  $entryModel->load( $data->replyToId );
  		}
  		/*
  		 * create the entry
  		 */
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
    $old     = $entryModel->categories();
    $new     = $data->categories;
	  $added   = array_diff( $new, $old );
	  $deleted = array_diff( $old, $new );
    //$this->debug( array( //FIXME
    //  'old'	=> $old, 'new' => $new,
    //	'added'=>$added,'deleted'=>$deleted
    //), __CLASS__, __LINE__ );
		foreach( $added as $category )
		{
		  if( ! $category ) continue;
		  $categoryModel->namedIdExists($category) ?
		    $categoryModel->load( $category ) :
		    $categoryModel->create( $category );
		  try {
		    $categoryModel->linkModel( $entryModel );
		  } catch( qcl_data_model_RecordExistsException $e) {}
		}
		foreach ( $deleted as $category )
		{
		  if( ! $category ) continue;
		  if( $categoryModel->namedIdExists( $category ) )
		  {
		    $categoryModel->unlinkModel( $entryModel );
		  }
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
     * get entry data for client
     */
    $clientdata = $this->_getEntryData($entryModel);

		/*
		 * notify other clients
		 */
		$data = $clientdata;
		$data['editable'] = false;
		$data['deletable'] = false;
		$data['new'] = true;
		if( $id )
		{
		  $this->broadcastEntry("entry.updated", $data, $aclData );
		  if ( ! $data['replyToId'] ) $this->sendEmail("update", $entryModel );
		}
		else
		{
		  $this->broadcastEntry("entry.created", $data, $aclData );
		  if ( ! $data['replyToId'] ) $this->sendEmail("create", $entryModel );
		}

		// replies
		if ( $data['replyToId'] )
		{
		  unset($data['text']);
		  $this->broadcastEntry("entry.reply", $data, $aclData );
		  $this->sendEmail("reply", $entryModel );
		}

		/*
	   * create "unread" flags for all users that have not
	   * yet seen the entry
	   */
	  $entryPropModel = $this->getEntryUserPropertyModel();
	  $aclModel = new logbuch_model_AccessControlList($aclData);
	  $personModel->findAll();
	  $entryId = $data['id'];

	  while( $personModel->loadNext() )
	  {
	    if( $personModel->id() == $activePersonId ) continue;

	    //$this->debug( "Checking entries for " . $personModel->getFullName(), __CLASS__, __LINE__ );
	    /*
	     * check access
	     */
  	  if( $aclModel->checkAccess( $activePerson, $personModel ) )
  	  {
  	    try
  	    {
    	    $entryPropModel->create(array(
    	      'entryId'		=> $entryId,
    	      'personId'	=> $personModel->id()
    	    ));
  	    }
  	    catch( qcl_data_model_RecordExistsException $e )
  	    {
  	      // ignore
  	    }
  	  }
  	  else
  	  {
  	    // ignore
  	  }

  	  /*
  	   * find number of unread messages
  	   */
  	  $count = $entryPropModel->countWhere(array(
  	    'personId'	=> $personModel->id(),
  	    'displayed'	=> false
  	  ));

  	  if ( $count == 0 ) continue;

  	  $number = 10; // FIXME make this configurable!

  	  /*
  	   * we have the threashold number
  	   */
  	  if( ( $count % $number ) == 0 )
  	  {
  	    $entryPropModel->findWhere(array(
    	    'personId'	=> $personModel->id(),
    	    'displayed'	=> false
    	  ));
    	  $emailData = array(
    	    'number'	    => $count,
    	    'headlines'		=> array()
    	  );
  	    while( $entryPropModel->loadNext() )
  	    {
  	      try
  	      {
  	        $entryModel->load( $entryPropModel->get("entryId") );

  	      }
  	      catch( qcl_data_model_RecordNotFoundException $e)
  	      {
  	        // the entry no longer exists
  	        $entryPropModel->delete();
  	        continue;
  	      }
  	      $emailData['headlines'][] =
  	        $entryModel->get("subject") .
  	        " (" . $entryModel->authorName() .")";
  	    }

  	    $this->sendEmailToPerson("unread-messages",$personModel,$emailData);
  	  }
	  }

		/*
		 * done
		 */
		return $clientdata;
	}

	/**
	 * Broadcast new entry to other clients
	 * @param string $message
	 * @param array $data
	 * @param array $aclData
	 */
	protected function broadcastEntry( $message, $data, $aclData )
	{
	  $data['senderId'] = $this->getActiveUserPerson()->id();
	  $this->getMessageBus()->broadcast( $message, $data, $aclData, true );
	}

	/**
	 * Sends an email
	 * @param string $action
	 * @param logbuch_model_Entry $entryModel
	 */
	function sendEmail( $action, $entryModel )
	{

	  qcl_import("logbuch_service_Notification");
	  $notificationController = new logbuch_service_Notification;
	  $notificationController->sender = "LogBuch";
	  $notificationController->senderEmail = "nicht_antworten@logbuch-business-travel.de";

    $aclData       = $entryModel->aclData();
    $userName      = $this->getActiveUserPerson()->getFullName();
    $entrySubject  = $entryModel->get("subject");
    $entryId       = $entryModel->id();

    $body = "Sehr geehrte/r LogBuch-Teilnehmer/in,\n\n";

    switch( $action )
    {
      case "create":
        if( ! $entryModel->get("notify_recipients") ) return false;
        $subject = "Neuer Logbuch-Eintrag: $entrySubject";
        $body .= "$userName hat einen neuen Eintrag mit dem Betreff '$entrySubject' erstellt.\n\n";
        break;

      case "update":
        if( ! $entryModel->get("notify_recipients") ) return false;
        $subject = "Logbuch-Eintrag aktualisiert: $entrySubject";
        $body .= "$userName hat den Eintrag mit dem Betreff '$entrySubject' aktualisiert.\n\n";
        break;

      case "reply":
        /*
         * load the original entry
         */
        $entryModel->load( $entryModel->get("parentEntryId") );
        $entrySubject  = $entryModel->get("subject");
        $subject = "Antwort auf Logbuch-Eintrag: $entrySubject";

        /*
         * if the original author is the same as the replying author,
         * no email notification is neccessary
         */
        if( $this->getActiveUserPerson()->id() == $entryModel->get("personId") )
        {
          $entryModel->load( $entryId );
          return false;
        }

        /*
         * if only the author should be notified,
         * overwrite acl data
         */
        if( $entryModel->get("notify_reply") )
        {
          $body .= "$userName hat auf Ihren Eintrag '$entrySubject' geantwortet.\n\n";
          $aclData= array( 'moreMembers' => array( $entryModel->get("personId") ) );
          $entryModel->load( $entryId );
          break;
        }

        /*
         * notify all recipients
         */
        elseif ( $entryModel->get("notify_reply_all") )
        {
          $originalAuthor = $entryModel->authorName();
          $body .= "$userName hat auf den Eintrag '$entrySubject' von $originalAuthor geantwortet.\n\n";
          $entryModel->load( $entryId );
          break;
        }

        /*
         * no notification
         */
        else
        {
          $entryModel->load( $entryId );
          return false;
        }

      default:
        throw new InvalidArgumentException( "Invalid action '$action'" );
    }
    $body .= "\nSie können den Eintrag unter dem folgenden Link abrufen: \n\n";
    $body .= dirname( dirname( qcl_server_Server::getUrl() ) ) .
          		"/html/teamblog/?showEntry=$entryId" .
              "&ds=" . $this->getDatasourceName();
    $body .= "\n\n---\n\nBitte antworten Sie nicht auf diese E-Mail.";
    $notificationController->notifyAll( $subject, $body, $aclData);
    return true;
	}

	/**
	 * Sends an email reminder to a specific person
	 * @param string $action
	 * @param logbuch_model_Person $personModel
	 * @param array $data Optional data for the reminder
	 */
	function sendEmailToPerson( $action, $personModel, $data )
	{

	  qcl_import("logbuch_service_Notification");
	  $notificationController = new logbuch_service_Notification;
	  $notificationController->sender = "LogBuch";
	  $notificationController->senderEmail = "nicht_antworten@logbuch-business-travel.de";

    $userName  = $personModel->getFullName();
    $url = dirname( dirname( qcl_server_Server::getUrl() ) ) .
    			"/html/teamblog/?ds=" . $this->getDatasourceName();
    $aclData = array( 'moreMembers' => array($personModel->id() ));

    $body = "Sehr geehrte/r $userName,\n\n";

    switch( $action )
    {
      case "unread-messages":
        $number = $data['number'];
        $subject = "$number neue Logbuch-Einträge";
        $body .= "Seit Ihrer letzen Anmeldung im LogBuch wurden $number neue Einträge erstellt:\n\n";
        $body .= implode( "\n", $data['headlines'] );
        $body .= "\n\nSchauen Sie doch einmal im LogBuch vorbei: \n\n";
        $body .= $url;
        break;

      default:
        throw new InvalidArgumentException( "Invalid action '$action'" );
    }


    $body .= "\n\n---\n\nBitte antworten Sie nicht auf diese E-Mail.";

    $this->debug( "Sending Email to " . $personModel->getFullName(), __CLASS__, __LINE__ );
    $notificationController->notify( $subject, $body, $personModel, $aclData);
    return true;
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
	    "query"   => trim($fragment),
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