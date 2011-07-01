<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter/Christian Boulanger
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "logbuch_model_Model" );

/**
 * The model of an email survey 
 */
class logbuch_model_EmailSurvey
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
  protected $tableName = "data_EmailSurvey";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "SurveyId";  

  /**
   * The properties of the category model
   */
  private $properties = array(
    /**
     * The id of the entry that this survey is connected with
     */
    'entryId' => array (
      'check' => 'integer',
      'sqltype' => 'int(11)',
      'nullable' => true,
    )   
  );
  
  /**
   * Relations
   */
  private $relations = array(
    'EmailSurvey_EmailTemplate' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class' => "logbuch_model_EmailTemplate" )
    ),
    'EmailSurvey_Person' => array(
      'type'        => QCL_RELATIONS_HAS_AND_BELONGS_TO_MANY,
      'target'      => array( 'class' => "logbuch_model_Person" )
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