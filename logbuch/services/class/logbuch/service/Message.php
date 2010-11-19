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
qcl_import("logbuch_model_Comment");
qcl_import("qcl_util_registry_Session");

/**
 * 
 */
class logbuch_service_Message
  extends qcl_data_controller_Controller
{

	/**
	 * Broadcasts the messages from one client to all others
	 * @param $msgQueue
	 */
	function method_broadcast( $msgQueue )
	{
		// FIXME is this the right place to do this?
		$this->getApplication()->getAccessController()->getUserModel()->cleanup();
		qcl_access_model_Session::getInstance()->cleanup();
		qcl_event_message_db_Message::getInstance()->cleanup();
		
		/*
		 * person
		 */
		try 
		{
      $personModel = $this->getDatasourceModel("demo")->getInstanceOfType("person"); // FIXME
      $personModel->loadByUserId( $this->getActiveUser()->id() );		
		}
		catch ( Exception $e )
		{
		  return "OK"; // FIXME
		}
		
		/*
		 * record time users are logged in
		 */
		$time = time();
		if ( qcl_util_registry_Session::has("lastPing") )
		{
		  $seconds = (int) $time - qcl_util_registry_Session::get("lastPing");
		  $personModel->set( "worktime", $personModel->get("worktime") + $seconds );
		  $personModel->save();
		}
		else
		{
		  // count the logins
      $personModel->set( "countLogins", $personModel->get("countLogins") + 1 );
      $personModel->save();		  
		}
		qcl_util_registry_Session::set( "lastPing", $time );
		
		/*
		 * broadcast to all 
		 */
		foreach( $msgQueue as $messageData )
		{
		  $channel = $messageData->channel;
		  $data    = object2array( $messageData->data );
		  $aclData = null;
		  $prefix = implode("/", array_slice( explode("/",$channel), 0,2 ) );
		  switch( $prefix  )
		  {
		    case "logbuch/comment":
		      $categoryModel = $this->getDatasourceModel("demo")->getInstanceOfType($data['category']); // FIXME
		      $categoryModel->load( (int) $data['itemId'] );
		      $aclData = $categoryModel->aclData();
		      
		      /*
		       * add missing data to the outgoing message
		       */
		      $data['senderId'] = $personModel->id(); // FIXME
		      $data['icon'] = $personModel->get( "image" );
		      $data['label'] = 
		        "<b>" . $personModel->getFullName() . // "<br/>" .
		        //date( "d.m.Y H:i", strtotime( $data['date'] ) ) . 
		        "</b><br/>" .
		        $this->createLinks( $data['message'] );
		        
		       /*
		        * save a copy in the database
		        */
		       $commentModel = $this->getDatasourceModel("demo")->getInstanceOfType("comment");
		       $commentModel->create(array(
		          'channel' => $channel,
		          'message' => $data['message']
		       ));
		       $commentModel->save();
		       $personModel->linkModel( $commentModel );
		       break;
		  }
		  $this->getMessageBus()->broadcast( $channel, $data, $aclData);
			
		}
		return "OK";
	}
	
	/**
	 * from http://buildinternet.com/2010/05/how-to-automatically-linkify-text-with-php-regular-expressions/
	 * @param $text
	 */
  protected function createLinks($text)
  {
      $text= preg_replace("/(^|[\n ])([\w]*?)((ht|f)tp(s)?:\/\/[\w]+[^ \,\"\n\r\t<]*)/is", "$1$2<a href=\"$3\" target=\"_blank\">$3</a>", $text);
      $text= preg_replace("/(^|[\n ])([\w]*?)((www|ftp)\.[^ \,\"\t\n\r<]*)/is", "$1$2<a href=\"http://$3\" target=\"_blank\">$3</a>", $text);
      $text= preg_replace("/(^|[\n ])([a-z0-9&\-_\.]+?)@([\w\-]+\.([\w\-\.]+)+)/i", "$1<a href=\"mailto:$2@$3\">$2@$3</a>", $text);
      return($text);
  }	
	
	/**
	 * Subscribes the client to a channel
	 * @param unknown_type $channel
	 */
	public function method_subscribe( $channel )
	{
	  qcl_event_message_Bus::getInstance()->addChannel( $channel );
    $aclData = null;
    $parts = explode("/",$channel);
    $prefix = implode("/", array_slice( $parts, 0, 2 ) );
    switch( $prefix  )
    {
      case "logbuch/comment":
         
        $commentModel = $this->getDatasourceModel("demo")->getInstanceOfType("comment");
        $query = $commentModel->findWhere(array(
            'channel' => $channel
         ));
         
        if ( $commentModel->foundNothing() )
        {
          break;
        }

        $personModel = $this->getDatasourceModel("demo")->getInstanceOfType("person"); // FIXME
        while( $commentModel->loadNext($query) )
        {
          try 
          {
            $personModel->load( $commentModel->get("PersonId") ); // FIXME
          }
          catch( qcl_data_model_RecordNotFoundException $e )
          {
            // no person for this comment, delete
            $commentModel->delete();
            continue;
          }
          $data = array();
          $data['senderId'] = $personModel->id(); // FIXME
          $data['icon'] = $personModel->get( "image" );
          $data['label'] = 
            "<b>" . $personModel->getFullName() . // "<br/>" .
            //$commentModel->getCreated()->format("d.m.Y H.i") . 
            "</b><br/>" .
            $this->createLinks( $commentModel->get("message") );        

          // FIXME add ACL for security  
          $this->getMessageBus()->publishClientMessage( $channel, $data );
        }
    }
	  return "OK";	
	}
	
  /**
   * Unsubscribes the client from a channel
   * @param unknown_type $channel
   */	
	public function method_unsubscribe( $channel )
	{
	  qcl_event_message_Bus::getInstance()->removeChannel( $channel );
	  return "OK";
	}
	
  /**
   * Subscribes the client to a channel
   */ 
  public function method_unsubscribeAll()
  {
    qcl_event_message_Bus::getInstance()->removeAllChannels();
    return "OK";
  }	
	
	/**
	 * Returns all messages in a specific period and category and 
	 * @param string $date_start
	 * @param string $date_end
	 * @param array $categories
	 * @param array $acl
	 * 		Associated array with the acces control list for the messages
	 * @todo Do we need the acl part? If yes, re-implement
	 */
	function method_collect( $date_start, $date_end, $categories=array(), $acl = array() )
	{
		$dateStart = date ("Y-m-d", strtotime( $date_start ) );
		$dateEnd   = date ("Y-m-d", strtotime( $date_end ) );
		
		//$this->info( "Getting messages for $dateStart - $dateEnd ");
		
		if( count( $categories) == 0 )
		{
			$categories = array( "event", "goal", "documentation", "diary", "inspiration" );
		}
		
		foreach( $categories as $category )
		{
			$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
			try 
			{
//				$where = array_merge( $acl, array(
//					"dateStart"  => array( ">=", $dateStart ),
//				 	"dateStart"	 => array( "<=", $dateEnd )
//				));
        $query = new qcl_data_db_Query(array(
          'where'       => "dateStart BETWEEN :dateStart AND :dateEnd",
          'parameters'  => array(
            ':dateStart'  => $dateStart,
            ':dateEnd'    => $dateEnd 
          )
        ));
				$model->find( $query );
				$bus = qcl_event_message_Bus::getInstance();
				while( $model->loadNext( $query ) )
				{
					foreach( $model->createMessages( "logbuch/display-category-item" ) as $message )
					{
						$message->setAcl( $model->aclData() );
						$data = $message->getData();
						$data['isPrivate'] = $model->isPrivate();
						$message->setData( $data );
						$bus->dispatch( $message );
					}
				}
			}
			catch( qcl_data_model_RecordNotFoundException $e ){}
		}
		
		return "OK";
	}
	
	/**
	 * Filters message according to acl
	 * @param qcl_event_message_ClientMessage $message
	 * 		The message to dispatch. The message data must be an object
	 *    which contains at least a 'senderId' property by which the 
	 *    sender can be identified. FIXME
	 * @param qcl_access_model_Session $sessionModel
	 * 		The loaded model of the session that is to receive the message
	 * @param qcl_access_model_User $userModel
	 * 		The loaded model of the user that is to receive the message
	 * @return boolean True if message should be broadcast, false if not.
	 */
	public function filterMessage( 
		qcl_event_message_ClientMessage $message, 
		qcl_access_model_Session $sessionModel, 
		qcl_access_model_User $userModel )
	{

		/*
		 * administrators can see everything
		 */
		if ( $userModel->hasRole( QCL_ROLE_ADMIN ) )
		{
			return true;
		}		
				
		/*
		 * check if message contains acl data, if not access is permitted
		 */
		if( ! $message->getAcl() )
		{
			return true;
		}

		/*
		 * no message to anonymous clients
		 */
		if ( $userModel->isAnonymous() ) {
			return false;		
		}
	
		/*
		 * configure models
		 */
		$data = $message->getData();
		static $sender 		= null;
		static $recipient = null;
		static $aclModel  = null;
		static $activeUserPerson = null;
		if( $sender === null )
		{
			qcl_import("logbuch_model_AccessControlList");
			$aclModel  = new logbuch_model_AccessControlList();
			$dsModel	 = $this->getDatasourceModel("demo");//FIXME
			
			/*
			 * sender is the author of the message
			 */
			$sender = $dsModel->createInstanceOfType("person");

			/*
			 * the recipient is dependen on the session checked
			 */
			$recipient = $dsModel->createInstanceOfType("person");
			
			/*
			 * the active user's person model
			 */
			$activeUserPerson = $dsModel->createInstanceOfType("person");
		}
		
		/*
		 * load sender
		 */
		$sender->load( $data['senderId'] ); // FIXME
		
		/*
		 * load recipient
		 */
		$recipient->loadByUserId( $userModel->id() );		
		
		/*
		 * load active user's person model
		 */
		try 
		{
			$activeUserPerson->loadByUserId( $this->getActiveUser()->id() );
		} 
		catch( qcl_data_model_RecordNotFoundException $e )
		{
			$this->warn( "The active user has no person model");
			return false;
		}			
		
		/*
		 * set acl
		 */
		$aclModel->setAcl( $message->getAcl() ); 		
		
		/*
		 * check access for others
		 */
		$access = $aclModel->checkAccess( $sender, $recipient );
		
		/*
		 * if current user is the recipient and the author, grant access
		 */
		if ( $activeUserPerson->id()	== $sender->id()
				and $activeUserPerson->id() == $recipient->id() )
		{
			$access = true;
		}
		
//$this->debug( sprintf(
//	"\n%s => user: %s, author: %s, recipient: %s, access: %s",
//	$data['subject'],
//	$activeUserPerson->getFullName(),
//	$sender->getFullName(),
//	$recipient->getFullName(),
//	($access === true ? "yes" : "no" )
//), __CLASS__, __LINE__ );		
				
		return $access;
	}
}
?>