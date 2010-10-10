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
		//$this->getApplication()->getAccessController()->getUserModel()->cleanup();
		//qcl_access_model_Session::getInstance()->cleanup();
		//qcl_event_message_db_Message::getInstance()->cleanup();
		
		foreach( $msgQueue as $message )
		{
			$this->broadcastClientMessage("logbuch/message", $message, true );
		}
		return "OK";
	}
	
	/**
	 * Returns all messages in a specific period and category
	 * @param string $date_start
	 * @param string $date_end
	 * @param array $categories
	 */
	function method_collect( $date_start, $date_end, $categories=array() )
	{
		$dateStart = date ("Y-m-d", strtotime( $date_start ) );
		$dateEnd   = date ("Y-m-d", strtotime( $date_end ) );
		$this->info( "Getting messages for $dateStart - $dateEnd ");
		
		if( count( $categories) == 0 )
		{
			$categories = array( "event", "goal", "documentation", "diary", "inspiration" );
		}
		
		foreach( $categories as $category )
		{
			$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
			try 
			{
				$model->findWhere( array(
					"dateStart" => array( ">=", $dateStart ),
				 	"dateEnd"		=> array( "<=", $dateEnd )
				) );
				while( $model->loadNext() )
				{
					$this->dispatchClientMessage("logbuch/message", $model->createMessage() );					
				}
			}
			catch( qcl_data_model_RecordNotFoundException $e ){}
		}
		
		return "OK";
	}
}
?>