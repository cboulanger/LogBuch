<?php
/* ************************************************************************

   logBuch: Die Online-Plattform für Unternehmenszusammenarbeit

   Copyright:
     2010-2011
     Jürgen Breiter (Konzeption)
     Christian Boulanger (Programmierung)

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

  /**
   * The size in pixels of the thumbnails to create
   */
  public $thumbnailSizes = array( 16, 64, 80);

  /**
   * The container directory of the attachments
   * @var unknown_type
   */
  public $container = QCL_UPLOAD_PATH;

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

  /**
   * Returns the path of the attachment file
   * @param string $name If given, return the path of the file
   * with that name, otherwise of the current record
   */
  public function filepath($name=null)
  {
    if ( ! $name )
    {
      $names = array( $this->get("hash"), $this->get("filename") );
      foreach( $names as $name )
      {
        if ( file_exists( $this->container . "/$name" ) )
        {
          return $this->container . "/$name";
        }
      }
    }
    return $this->container . "/$name";
  }

  /**
   * Return the path to the thumbnail of the attachment
   * linked to the current record
   * @param string|number $size
   */
  public function thumbnailPath($size)
  {
    return LOGBUCH_THUMBNAIL_PATH . "/$size/" .
      $this->getHash() . substr( $this->get("filename"), -4 );
  }

  /**
   * @override
   * @see qcl_data_model_AbstractActiveRecord::create()
   */
  public function create($data)
  {
    if( ! $data["size"] )
    {
      if ( isset( $data['hash'] ) )
      {
        $file = $this->filepath( $data['hash'] );
      }
      else
      {
        $file = $this->filepath( $data['filename'] );
        $data['hash'] = substr( $data['filename'], 0, 32 );
      }
      $data["size"] = filesize( $file );
      $data['mime'] = qcl_get_content_type( $data['filename'] );
    }

    $id = parent::create($data);

    /*
     * create thumbnails from images
     */
    if ( substr( $data['mime'], 0, 6 ) == "image/" )
    {
      $this->createThumbnails();
    }

    return $id;
  }

  /**
   * @overridden
   * @see qcl_data_model_AbstractActiveRecord::save()
   */
  public function save()
  {
    if ( substr( $this->get("mime"), 0, 6 ) == "image/" )
    {
      $this->createThumbnails();
    }
    return parent::save();
  }

  /**
   * @override
   * @see qcl_data_model_AbstractActiveRecord::delete()
   */
  public function delete()
  {
    $path = $this->filepath();
    if( ! file_exists($path) )
    {
      $this->warn("Attachment '$path' does not exist. Not deleting.");
    }
    elseif( ! is_file( $path ) )
    {
      $this->warn("Attachment '$path' is not a file. Not deleting.");
    }
    elseif ( ! is_writable($path) )
    {
      $this->warn("Attachment '$path' cannot be deleted. Check file permissions.");
    }
    else
    {
      unlink( $path );
    }

    /*
     * create thumbnails from images
     */
    if ( substr( $this->get('mime'), 0, 6 ) == "image/" )
    {
      $this->deleteThumbnails();
    }

    return parent::delete();
  }

  /**
   * Create thumbnails from images
   */
  public function createThumbnails()
  {
    require_once 'qcl/lib/img/Image.php';
		foreach( $this->thumbnailSizes as $size )
		{
		  /*
		   * check path and containing directory
		   */
		  $path = $this->thumbnailPath($size);
			$dir  = dirname( $path );
			if( ! file_exists($dir) )
			{
			  $this->raiseError( "Please create thumbnail directory '$dir'!" );
			}
		  if( ! is_writable($dir) )
			{
			  $this->raiseError( "Thumbnail directory '$dir' is not writable!" );
			}

			/*
			 * create if it doesn't already exist
			 */
		  if( ! file_exists( $path ) )
		  {
  			$img = new Image( $this->filepath() );
  			$img->resize($size, $size);
  			$img->save( $path );
		  }
		}
  }

  /**
   * Delete the thumbnails that belong to this attachment
   */
  public function deleteThumbnails()
  {
		foreach( $this->thumbnailSizes as $size )
		{
			$path = $this->thumbnailPath($size);
			if( ! file_exists( $path ) )
			{
			  $this->warn("Cannot delete thumbnail '$path' - doesn't exist");
			}
			else
			{
			  unlink( $path );
			}
		}
  }

  /**
   * Purges orphaned files that belong to no attachment
   * @see qcl_data_model_AbstractActiveRecord::cleanup()
   */
  public function cleanup()
  {
    $files = glob( $this->container . "/*" );
    foreach( $files as $file )
    {

      $filename = basename($file);
      $path = $this->container . "/$filename";
      if ( ! is_file($path) ) continue;

      $this->findWhere(array( 'hash' => $filename ) );
      if( $this->foundSomething() ) continue;
      $this->findWhere(array( 'filename' => $filename ) );
      if( $this->foundSomething() ) continue;

      if( ! @unlink( $path ) )
      {
        $this->warn( "Could not delete orphaned file '$path'" );
      }
    }
  }
}
?>