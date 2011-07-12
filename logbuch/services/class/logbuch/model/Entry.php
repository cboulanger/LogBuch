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
    ),
    
    /**
     * Whether recipients should be notified when the entry
     * has been created
     * @deprecated Column will be removed
     */
    'notify' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) NOT NULL DEFAULT 1',
      'nullable'  => false,
      'init'      => true
    ),
    
    /**
     * Whether the recipients of this entry should should be notified 
     */
    'notify_recipients' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) NOT NULL DEFAULT 0',
      'nullable'  => false,
      'init'      => false
    ),    
    
    /**
     * Whether the author of this entry should should be notified 
     * someone replies to this entry
     */
    'notify_reply' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) NOT NULL DEFAULT 0',
      'nullable'  => false,
      'init'      => false
    ),
    
    /**
     * Whether all recipients of this entry should should be notified 
     * someone replies to this entry
     */
    'notify_reply_all' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) NOT NULL DEFAULT 0',
      'nullable'  => false,
      'init'      => false
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
}
?>