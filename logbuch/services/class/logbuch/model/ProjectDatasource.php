<?php
/* ************************************************************************

   logBuch: Die Online-Plattform fŸr Unternehmenszusammenarbeit

   Copyright:
     2010 JŸrgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_datasource_DbModel" );

/**
 * model for logbuch datasources based on an sql database
 */
class logbuch_model_ProjectDatasource
  extends qcl_data_datasource_DbModel
{

  /**
   * The name of the datasource schema
   * @var string
   */
  protected $schemaName = "logbuch.schema.Project";

  /**
   * The description of the datasource schema
   * @var string
   */
  protected $description =
    "The schema of logbuch project datasources";

 /**
   * The model properties
   * @override
   */
  private $properties = array(
    'schema' => array(
      'nullable'  => false,
      'init'      => "logbuch.schema.Project"
    )
  );

  /**
   * Constructor, overrides some properties
   */
  function __construct()
  {
    parent::__construct();
    $this->addProperties( $this->properties );
  }

  /**
   * Returns singleton instance of this class.
   * @return logbuch_model_ProjectDatasource
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }

  /**
   * Initialize the datasource, registers the models
   */
  public function init()
  {
    if ( parent::init() )
    {
      $this->registerModels( array(
      	'person'   => array(
          'model' => array(
            'class'   => "logbuch_model_Person"
          )
        ),
      	'organization'   => array(
          'model' => array(
            'class'   => "logbuch_model_Organization"
          )
        ),        
        'attachment'  => array(
          'model'    => array(
            'class'    => "logbuch_model_Attachment"
          )
        ),
        'entry'  => array(
          'model'    => array(
            'class'    => "logbuch_model_Entry"
          )
        ),
        'category'  => array(
          'model'    => array(
            'class'    => "logbuch_model_Category"
          )
        )
      ) );
    }
  }

  /**
   * Returns the singleton instance of a person model object
   * @return logbuch_model_Person
   */
  function getPersonModel()
  {
    return $this->getInstanceOfType("person");
  }    
  
  /**
   * Creates a new person model object
   * @return logbuch_model_Person
   */
  function createPersonModel()
  {
    return $this->createInstanceOfType("person");
  }  
  
	/**
   * Returns the singleton instance of the entry model
   * @return logbuch_model_Entry
   */
  function getEntryModel()
  {
  	return $this->getInstanceOfType("entry");
  }  
	/**
   * Returns the singleton instance of the organization model
   * @return logbuch_model_Organization
   */
  function getOrganizationModel()
  {
  	return $this->getInstanceOfType("organization");
  }   
  
	/**
   * Returns the singleton instance of the category model
   * @return logbuch_model_Category
   */
  function getCategoryModel()
  {
  	return $this->getInstanceOfType("category");
  } 
  
	/**
   * Returns the singleton instance of the category model
   * @return logbuch_model_Attachment
   */
  function getAttachmentModel()
  {
  	return $this->getInstanceOfType("attachment");
  }     
}
?>