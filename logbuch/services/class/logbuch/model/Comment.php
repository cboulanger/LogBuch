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
class logbuch_model_Comment
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
  protected $tableName = "data_Comment";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "CommentId";  

  /**
   * model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     * FIXME create association with different categories
     */
    'channel' => array (
      'check' => 'string',
      'sqltype' => 'varchar(100)'
    ),  	
      
    /**
     * Enter description here ...
     */
    'message' => array (
      'check' => 'string',
      'sqltype' => 'text'
    ),    
 );

  /**
   * Relations
   */
 	private $relations = array(
    'Comment_Person' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class'    => "logbuch_model_Person" )
    )
  );

  /*
  *****************************************************************************
     INITIALIZATION
  *****************************************************************************
  */

  function __construct( $datasourceModel )
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
  
  public function getAuthorId()
  {
    return $this->get("PersonId");
  }
}
?>