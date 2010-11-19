<?php
/* ************************************************************************

   logBuch: Die Online-Plattform f�r Unternehmenszusammenarbeit

   Copyright:
     2010 J�rgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "logbuch_model_Model" );

/**
 * Enter description here ...
 */
class logbuch_model_Documentation
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
  protected $tableName = "data_Documentation";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "DocumentationId";  

  /**
   * The model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'process' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'result' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'heureka' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'stumblingBlock' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'incentive' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'miscellaneous' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'process_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'result_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'heureka_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'stumblingBlock_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'incentive_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'miscellaneous_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    )
  );

  /**
   * Relations
   */
  private $relations = array(
    
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
  	//$this->addRelations( $this->relations, __CLASS__ );

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
  	$fields = array( "process", "result", "heureka", "stumblingBlock", "incentive", "miscellaneous" );
  	$transl = array( "Beratung", "Ergebnis", "Aha-Erlebnis","Stolperstein", "Denkanstoß", "Sonstiges");
  	
  	$data = $this->data();
  	$messages = array();
  	
  	qcl_import( "qcl_event_message_ClientMessage" );  	
  	foreach( $fields as $field )
  	{
  		if( ! trim( $data[$field] ) ) continue;
  		
      $body    = $data[ $field . '_extended' ];
      $label   = $transl[array_search($field, $fields)];
      $subject = $data[ $field ];
      
      $prefix  = "documentation_" . $this->id();
      $attachments = count( glob( "../html/valums/server/uploads/$prefix*") );
      if ( $attachments > 0 )
      {
        $label = "<img src='resource/logbuch/icon/12/attachment.png'/>" . $label;
        $body  .= " ($attachments " . ( $attachments > 1 ?  "Anhänge" : "Anhang") . ")";
      }
      $body .= " [Doppelklicken zum öffnen...]";    
      		
  		$messages[] = new qcl_event_message_ClientMessage( $messageName, array(
	  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
	  		'sender'				=> $this->authorName(),
	  		'senderId'			=> $this->authorId(),
  			'initials'			=> $this->authorInitials(),
        'label'         => $label,      
        'subject'       => $subject,
        'body'          => $body,  		
	  		'category'			=> "documentation",
	  		'itemId'				=> "documentation/" . $this->id(),
	  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
	  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
	  	));
  	}
  	return $messages;
  }  
}
?>