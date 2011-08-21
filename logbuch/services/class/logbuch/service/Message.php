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
qcl_import("logbuch_model_AccessControlList");
qcl_import("qcl_util_registry_Session");

/**
 *
 */
class logbuch_service_Message
  extends logbuch_service_Controller
{

  /**
   * shorthand method
   * @see qcl_core_Object::log()
   */
  function log( $msg )
  {
    parent::log( $msg, LOGBUCH_LOG_MESSAGE );
  }

	/**
	 * Broadcasts the messages from one client to all others
	 * @param $msgQueue
	 */
	function method_broadcast( $msgQueue=array() )
	{

		/*
		 * person
		 */
		try
		{
      $personModel = $this->getPersonModel();
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
		  /*
		   * only count time differences below 60 seconds, all others are due
		   * to timeouts etc.
		   * @todo this needs to be synchronized with the polling interval
		   * Disabled for the moment.
		   */
		  if( $seconds < 60 )
		  {
  		  //$personModel->set( "worktime", $personModel->get("worktime") + $seconds );
  		  //$personModel->save();
		  }
		  else
		  {
		    //$this->warn( $personModel->getFullName() . " has been disconnected for $seconds seconds.");
		  }
		}
		else
		{
      /*
       * purge expired messages
       */
      qcl_event_message_db_Message::getInstance()->cleanup();

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
		  $this->getMessageBus()->broadcast( $channel, $data, $aclData );

		}
		return "OK";
	}


	/**
	 * Subscribes the client to a channel
	 * @param string|array $channels
	 */
	public function method_subscribe( $channels )
	{
	  foreach( (array) $channels as $channel )
	  {
  	  qcl_event_message_Bus::getInstance()->addChannel( $channel );
	  }
	  return "OK";
	}

  /**
   * Unsubscribes the client from a channel
   * @param string|array $channels
   */
	public function method_unsubscribe( $channels )
	{
	  foreach( (array) $channels as $channel )
	  {
	    qcl_event_message_Bus::getInstance()->removeChannel( $channel );
	  }
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
	 * @param object $filter
	 */
	function method_collect( $filter )
	{
	  qcl_assert_object($filter);
	  qcl_import("logbuch_service_Entry");
	  $entryController = new logbuch_service_Entry();
	  $result = $entryController->method_list($filter);
	  foreach( $result['data'] as $entry )
	  {
	    if( $entry['id'] )
	    {
	      $this->dispatchClientMessage("entry.created",$entry);
	    }
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
			$dsModel	 = $this->getDatasourceModel();

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
/*
		$this->log( sprintf(
    	"\n%s => user: %s, author: %s, recipient: %s, access: %s",
    	$data['subject'],
    	$activeUserPerson->getFullName(),
    	$sender->getFullName(),
    	$recipient->getFullName(),
    	($access === true ? "yes" : "no" )
    , __CLASS__, __LINE__ ) );
*/
  	return $access;
  }

  /**
   * callback method called when user logs in
   * @param unknown_type $msg
   */
  public function onLogin()
  {
    $activeUser = $this->getActiveUser();
    if ( ! $activeUser->get("online") )
    {
      $personModel = $this->getActiveUserPerson();
  		$logins = $personModel->get("countLogins") + 1;
      $personModel->set( "countLogins", $logins );
      $personModel->save();
    }
    else
    {
      $this->log( "User already online, not incrementing login count.");
    }
  }

  /**
   * callback method called when user logs out
   * @param unknown_type $msg
   */
  public function onLogout()
  {
    // do nothing for the moment
  }
}
?>