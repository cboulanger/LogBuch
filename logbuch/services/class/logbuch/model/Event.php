<?php
/* ************************************************************************

   logBuch: Die Online-Plattform fŸr Unternehmenszusammenarbeit

   Copyright:
     2010 JŸrgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * 
 */
class logbuch_model_Event
  extends qcl_data_model_db_ActiveRecord
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

	/**
	 * The name of the table of this model
	 * @var string
	 */
  protected $tableName = "data_Event";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "EventId";  

  /**
   * model properties
   */
  private $properties = array(

 );

  /**
   * Relations
   */
  private $relations = array(
    
  );

  /*
  *****************************************************************************
     INITIALIZATION
  *****************************************************************************
  */

  function __construct( $datasourceModel )
  {
    parent::__construct( $datasourceModel );
    //$this->addProperties( $this->properties );
    //$this->addRelations( $this->relations, __CLASS__ );

  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */

}
?>