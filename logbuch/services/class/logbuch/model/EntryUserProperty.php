<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen

   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * Models the properties of a user's view of an entry
 * @todo this should be modeled with qcl's "dependency link" mechanism
 */
class logbuch_model_EntryUserProperty
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
  protected $tableName = "data_EntryUserProperties";

  /**
   * The model properties
   */
  private $properties = array(

    /**
     * The id of the entry
     */
    'entryId' => array (
      'check' => 'integer',
      'sqltype' => 'int(11) NOT NULL'
    ),

    /**
     * The id of the user
     */
    'personId' => array (
      'check' => 'integer',
      'sqltype' => 'int(11) NOT NULL'
    ),

    /**
     * Flag to indicate that
     * the record has been displayed
     */
    'displayed' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) DEFAULT 0',
      'nullable'  => false,
      'init'      => false
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
    //$this->addRelations( $this->relations, __CLASS__ );
  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */

  /**
   *
   * @see qcl_data_model_AbstractActiveRecord::cleanup()
   */
  public function cleanup()
  {
    // FIXME implement: purge all references to non-existing users or
    // non-existing entries
  }

}
?>