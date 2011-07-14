<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     J�rgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_model_db_NamedActiveRecord" );

/**
 * The model of a logbuch entry's category (tag). The model can later be extended
 * to support different locales. 
 */
class logbuch_model_Category
extends qcl_data_model_db_NamedActiveRecord
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  /**
   * The name of the table of this model
   */
  protected $tableName = "data_Category";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "CategoryId";  

  /**
   * The properties of the category model
   */
  private $properties = array(
  
    /**
     * The full name of the category
     */
    'name' => array (
      'check'     => 'string',
      'sqltype'   => 'varchar(100)',
      'nullable'	=> true
    ),
    
    /**
     * The description  of the category
     */
    'description' => array (
      'check'     => 'string',
      'sqltype'   => 'varchar(200)',
      'nullable'	=> true
    ),    
      
    /**
     * Whether this is a custom, user-created category (true) 
     * or a category supplied by the application (false)
     */
    'custom' => array (
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
    'Entry_Category' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "logbuch_model_Entry" )
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
  
  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  

}
?>