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
class logbuch_model_Attachment
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
  protected $tableName = "data_Attachment";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "AttachmentId";  

  /**
   * model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'filename' => array (
      'check' => 'string',
      'sqltype' => 'varchar(50)'
    ),  	
      
    /**
     * Enter description here ...
     */
    'mime' => array (
      'check' => 'string',
      'sqltype' => 'varchar(30)'
    )  
 );

  /**
   * Relations
   */
 	private $relations = array(
    'Attachment_Person' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class'    => "logbuch_model_Person" )
    ),
    'Attachment_Organization' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class'    => "logbuch_model_Organization" )
    ),
    'Attachment_Entry' => array(
      'type'        => QCL_RELATIONS_HAS_ONE,
      'target'      => array( 'class'    => "logbuch_model_Entry" )
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
  
  public function delete()
  {
  	// FIXME!!
  	$this->checkLoaded();
  	$sizes = array( 16, 64, 80 );
  	$filename =  $this->get("filename");
		@unlink( LOGBUCH_UPLOADS_PATH . $filename );
		foreach( $sizes as $size )
		{
			@unlink( LOGBUCH_UPLOADS_PATH . "$size/" . $filename );	
		}
  	parent::delete();
  }
}
?>