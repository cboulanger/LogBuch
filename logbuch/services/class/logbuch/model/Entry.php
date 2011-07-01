<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "logbuch_model_Model" );

/**
 * The model of a logbuch entry
 */
class logbuch_model_Entry
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
  protected $tableName = "data_Entry";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "EntryId";  

  /**
   * The model properties
   */
  private $properties = array(

     
    /**
     * The subject of the entry
     */
    'subject' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * The text of the entry
     */
    'text' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    )
  );
  
  /**
   * Relations
   */
  private $relations = array(
  
    /*
     * Each entry has zero or more categories
     */
    'Entry_Category' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "logbuch_model_Category" )
    ),
    
    /*
     * Each entry can have a parent entry 
     */
		'Entry_ParentEntry' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class' => "logbuch_model_Entry" ),
      'foreignKey'	=> "parentEntryId"
    ),
    
    /*
     * Each entry has zero or more attachments
     */
    'Attachment_Entry' => array(
      'type'        => QCL_RELATIONS_HAS_MANY,
      'target'      => array( 'class'    => "logbuch_model_Attachment" )
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
    $this->addRelations( $this->relations, __CLASS__ );
  }
  
  /**
   * Returns the names of the properties defined in this class only. Must
   * be defined in each class that wants to expose its private properties.
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
  
  function uiElementModel()
  {
     $this->notImplemented(__CLASS__); 
  }
  
  
  /**
   * Returns the named ids of the categories that are linked to the current
   * model record
   * @return array
   */
  function categories()
  {
    $categoryModel = $this->datasourceModel()->getInstanceOfType("category");
    $categories = array();
    try 
    {
      $categoryModel->findLinked($this);
      while($categoryModel->loadNext())
      {
        $categories[] = $categoryModel->namedId();
      }
    } catch( qcl_data_model_RecordNotFoundException $e ){}
    return $categories;
  }
  
  /**
   * Creates one or message object(s) with the category record data.
   * @param string $messageName The name of the message
   * @return qcl_event_message_ClientMessage[]
   */
  function createMessages( $messageName )
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$data = $this->data();  	
  	qcl_import( "qcl_event_message_ClientMessage" );
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
  		$label = "Eintrag";
  		$body  = $data['subject'];
  	}
  	
  	$prefix  = "event_" . $this->id();
  	$attachments = count( glob( "../html/valums/server/uploads/$prefix*") );
  	if ( $attachments > 0 )
  	{
  	  $label = "<img src='resource/logbuch/icon/12/attachment.png'/>" . $label;
  	  $body  .= " ($attachments " . ( $attachments > 1 ?  "Anhänge" : "Anhang") . ")";
  	}
  	$body .= " [Doppelklicken zum öffnen...]";
  	
    $message = new qcl_event_message_ClientMessage( $messageName, array(
  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
  		'sender'				=> $this->authorName(),
	 		'senderId'			=> $this->authorId(),
    	'initials'			=> $this->authorInitials(),
  		'subject'				=> $subject,
    	'label'					=> $label,
  		'body'					=> $body,
  		'category'			=> "entry",
  		'itemId'				=> "entry/" . $this->id(),
  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
  	));
  	return array( $message );
  }
}
?>