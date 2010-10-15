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
class logbuch_service_Message
  extends qcl_data_controller_Controller
{

	/**
	 * Sends the messages from one client to all others
	 * @param $msgQueue
	 */
	function method_send( $msgQueue )
	{
		// FIXME try this again:
		$this->getApplication()->getAccessController()->getUserModel()->cleanup();
		qcl_access_model_Session::getInstance()->cleanup();
		qcl_event_message_db_Message::getInstance()->cleanup();
		
		foreach( $msgQueue as $message )
		{
			// FIXME no messages for anonymous clients!
			$this->broadcastClientMessage("logbuch/message", $message, true );
		}
		return "OK";
	}
	
	/**
	 * Returns all messages in a specific period and category and 
	 * @param string $date_start
	 * @param string $date_end
	 * @param array $categories
	 * @param array $acl
	 * 		Associated array with the acces control list for the messages
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
				$where = array_merge( $acl, array(
					"dateStart" => array( ">=", $dateStart ),
				 	"dateEnd"		=> array( "<=", $dateEnd )
				));
				$model->findWhere( $where );
				$bus = qcl_event_message_Bus::getInstance();
				while( $model->loadNext() )
				{
					foreach( $model->createMessages() as $message )
					{
						$message->setAcl( $model->aclData() );
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
	 * @param qcl_access_model_Session $sessionModel
	 * @param qcl_access_model_User $userModel
	 * @return boolean True if message should be broadcast, false if not.
	 */
	public function filterMessage( $message, $sessionModel, $userModel )
	{
		
		/*
		 * no filtering for the administrators
		 */
		if ( $this->hasRole( QCL_ROLE_ADMIN ) )
		{
			return true;
		}
		
		/*
		 * check if message contains acl data, if not acces is permitted
		 */
		if( ! $message->getAcl() )
		{
			return true;
		}

		/*
		 * no message to anonymous clients
		 */
		if ( $userModel->isAnonymous() ) return false;		
		
		/*
		 * configure models
		 */
		static $sender 		= null;
		static $recipient = null;
		static $aclModel  = null;
		if( $sender === null )
		{
			qcl_import("logbuch_model_AccessControlList");
			$aclModel  = new logbuch_model_AccessControlList();
			$dsModel	 = $this->getDatasourceModel("demo");//FIXME
			$sender 	 = $dsModel->createInstanceOfType("person");
			$recipient = $dsModel->getInstanceOfType("person"); 
			try 
			{
				$sender->loadByUserId( $this->getActiveUser()->id() );
			} 
			catch( qcl_data_model_RecordNotFoundException $e )
			{
				return false;
			}	
		}
		
		/*
		 * load recipient, set acl and check access
		 */
		try 
		{
			$recipient->loadByUserId( $userModel->id() );
		} 
		catch( qcl_data_model_RecordNotFoundException $e )
		{
			return false;
		}				
		$aclModel->setAcl( $message->getAcl() ); 		
		$access = $aclModel->checkAccess($sender, $recipient);
				
		return $access;
	}
	

}
?>