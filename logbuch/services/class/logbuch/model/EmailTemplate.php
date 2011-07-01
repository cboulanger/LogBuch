<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     J�rgen Breiter/Christian Boulanger
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * The model of a template for an email/survey 
 */
class logbuch_model_EmailTemplate
extends qcl_data_model_db_ActiveRecord
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  /**
   * The name of the table of this model
   */
  protected $tableName = "data_EmailTemplate";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "TemplateId";  

  /**
   * The properties of the category model
   */
  private $properties = array(
    /**
     * The subject of the email
     */
    'subject' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * The text of the body of the email
     */
    'body' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),

    /**
     * The frequency
     */
    'frequency' => array (
      'check' => 'string',
      'sqltype' => 'varchar(20)',
      'nullable' => true,
    ),

    /**
     * The day within the interval
     */
    'day' => array (
      'check' => 'string',
      'sqltype' => 'int(11)',
      'nullable' => true,
    )    
  );
  
  /**
   * Relations
   */
  private $relations = array(
    'EmailSurvey_EmailTemplate' => array(
      'type'        => QCL_RELATIONS_HAS_MANY,
      'target'      => array( 'class' => "logbuch_model_EmailSurvey" )
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