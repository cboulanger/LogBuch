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
    ),
    
    'hash' => array(
      'check' => 'string',
      'sqltype' => 'varchar(32)'
    ),
    
    'size' => array(
      'check' => 'integer',
      'sqltype' => 'int(11)'
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
  
  public function filepath($name=null)
  {
    if ( ! $name )
    {
      $name = $this->get("hash");
    }
    return QCL_UPLOAD_PATH . "/$name";
  }
  
  /**
   * @override
   * @see qcl_data_model_AbstractActiveRecord::create()
   */
  public function create($data)
  {
    if( ! $data["size"] )
    {
      $file = $this->filepath( $data['hash'] );
      $data["size"] = filesize( $file );
      $data['mime'] = qcl_get_content_type( $data['filename'] );
    }
    return parent::create($data);
  }

  /**
   * @override
   * @see qcl_data_model_AbstractActiveRecord::delete()
   */
  public function delete()
  {
    unlink( $this->filepath() );
    return parent::delete();
  }
  
  public function deleteThumbnails()
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