<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen

   Copyright: Konzeption:     JŸrgen Breiter/Christian Boulanger
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
      'check' => 'integer',
      'sqltype' => 'int(11)',
      'nullable' => true,
    ),

    /**
     * Enter description here ...
     */
    'dateLastSent' => array (
      "check"    => "qcl_data_db_Timestamp",
      "sqltype"  => "timestamp",
      'nullable' => true,
    ),
    
    /**
     * recipient ids
     */
    'recipients' 	=> array (
      'check' 		=> 'array',
      'serialize' => true,
      'sqltype' 	=> 'text',
      'init' 			=> array()
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