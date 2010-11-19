<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     J�rgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */
qcl_import( "logbuch_model_Model" );

/**
 * Enter description here ...
 */
class logbuch_model_Goal
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
  protected $tableName = "data_Goal";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "GoalId";  

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
    'timeStart' => array (
      'check' => 'string',
      'sqltype' => 'varchar(6)',
      'nullable' => true
    ),
    
    /**
     * Enter description here ...
     */
    'timeEnd' => array (
      'check' => 'string',
      'sqltype' => 'varchar(6)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'location' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
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
   * @param string $messageName The name of the message
   * @return qcl_event_message_ClientMessage[]
   */  
  function createMessages($messageName)
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$data = $this->data();
   	if ( strstr( $data['subject'], ":") )
  	{
  		$s = explode( ":", $data['subject'] );
  		$label = $s[0];
  		$body  = $s[1];
  		$subject = date( "H:i", strtotime( $data['dateStart'] ) );
  	}
  	else
  	{
  	  $subject = date( "H:i", strtotime( $data['dateStart'] ) );
  		$label = "Ziel"; //$this->tr("Goal");
  		$body  = $data['subject'];
  	}  	
  	
    $prefix  = "goal_" . $this->id();
    $attachments = count( glob( "../html/valums/server/uploads/$prefix*") );
    if ( $attachments > 0 )
    {
      $label = "<img src='resource/logbuch/icon/12/attachment.png'/>" . $label;
      $body  .= " ($attachments " . ( $attachments > 1 ?  "Anhänge" : "Anhang") . ")";
    }
    $body .= " [Doppelklicken zum öffnen...]";  	
  	
  	qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( $messageName,  array(
  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
  		'sender'				=> $this->authorName(),
    	'senderId'			=> $this->authorId(),
    	'initials'			=> $this->authorInitials(),
  		'subject'				=> $subject,
    	'label'					=> $label,
  		'body'					=> $body,
  		'category'			=> "goal",
  		'itemId'				=> "goal/" . $this->id(),
  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
  	));
  	return array( $message );
  }

}
?>