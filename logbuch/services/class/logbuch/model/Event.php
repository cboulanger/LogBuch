<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "logbuch_model_Model" );

/**
 * Enter description here ...
 */
class logbuch_model_Event
extends logbuch_model_Model
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  /**
   * The name of the table of this model
   */
  protected $tableName = "data_Event";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "EventId";  

  /**
   * The model properties
   */
  private $properties = array(
    
    /**
     * Enter description here ...
     */
    'subject' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'location' => array (
      'check' 	 => 'string',
      'sqltype'  => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'participants' => array (
      'check'     => 'array',
      'sqltype'   => 'varchar(255)',
    	'serialize'	=> true,
      'nullable'  => false,
    	'init'			=> array()
    ),
    
    /**
     * Enter description here ...
     */
    'notes' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    )
  );


  /*
  *****************************************************************************
     INITIALIZATION
  *****************************************************************************
  */

  function __construct( $datasourceModel=null )
  {
    parent::__construct( $datasourceModel );
    $this->addProperties( $this->properties );
  }
  
  /**
   * Returns the names of the properties defined in this class only.
   */
  public function ownProperties()
  {
  	return array_keys( $this->properties );
  }  

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  
  /**
   * Creates one or message object(s) with the category record data.
   * @return qcl_event_message_ClientMessage[]
   */
  function createMessages()
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$data = $this->data();  	
  	qcl_import( "qcl_event_message_ClientMessage" );
  	if ( strstr( $data['subject'], ":") )
  	{
  		$s = explode( ":", $data['subject'] );
  		$label = $s[0];
  		$body  = $s[1];
  	}
  	else
  	{
  		$label = "Ereignis"; //$this->tr("Event");
  		$body  = $data['subject'];
  	}
    $message = new qcl_event_message_ClientMessage( "logbuch/message", array(
  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
  		'sender'				=> $this->authorName(),
	 		'senderId'			=> $this->authorId(),
    	'initials'			=> $this->authorInitials(),
  		'subject'				=> date( "H:i", strtotime( $data['dateStart'] ) ) . ": " . $label,
    	'label'					=> $label,
  		'body'					=> $body,
  		'category'			=> "event",
  		'itemId'				=> "event/" . $this->id(),
  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
  	));
  	return array( $message );
  }
}
?>