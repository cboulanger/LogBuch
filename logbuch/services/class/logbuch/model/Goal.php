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
  
  function createMessages()
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$data = $this->data();
   	if ( strstr( $data['subject'], ":") )
  	{
  		$s = explode( ":", $data['subject'] );
  		$label = $s[0];
  		$body  = $s[1];
  	}
  	else
  	{
  		$label = "Ziel"; //$this->tr("Goal");
  		$body  = $data['subject'];
  	}  	
  	qcl_import( "qcl_event_message_ClientMessage" );
    $message = new qcl_event_message_ClientMessage( "logbuch/message",  array(
  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
  		'sender'				=> $this->authorName(),
    	'senderId'			=> $this->authorId(),
    	'initials'			=> $this->authorInitials(),
  		'subject'				=> $data['timeStart'] . ": " . $label,
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