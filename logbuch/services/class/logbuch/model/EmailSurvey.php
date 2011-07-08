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
    ),

    /**
     * A random 5-character hash to identify the survey
     */
    'hash' => array (
      'check' => 'string',
      'sqltype' => 'varchar(5)',
      'nullable' => true,
    ),
    
    /**
     * Whether the author should be notified when there
     * are responses to the survey.
     * Currently not implemented
     */
    'notify' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) NOT NULL DEFAULT 1',
      'nullable'  => false,
      'init'      => true
    )    
  );

  /**
   * Relations
   */
  private $relations = array(
    'EmailSurvey_EmailTemplate' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class' => "logbuch_model_EmailTemplate" )
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