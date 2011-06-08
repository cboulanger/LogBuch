<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
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
    //$this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );
  }
  
  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  

}
?>