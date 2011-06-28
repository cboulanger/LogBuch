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

qcl_import("logbuch_service_Controller");
qcl_import( "logbuch_ApplicationCache" );
qcl_import("qcl_util_system_Lock");

/**
 * Setup class. This class is called on application startup, i.e.
 * when the "main" method of the application is executed.
 *
 */
class logbuch_service_Setup
  extends logbuch_service_Controller
{

  /**
   * Configuration keys to be created if they do not already
   * exist.
   * @var array
   */
  private $configKeys = array(
    "application.title" => array(
      "type"      => "string",
      "custom"    => false,
      "default"   => "LogBuch",
      "final"     => false
    ),
    "project.title" => array(
      "type"      => "string",
      "custom"    => false,
      "default"   => "LogBuch",
      "final"     => false
    ),    
    "application.logo" => array(
      "type"      => "string",
      "custom"    => false,
      "default"   => "logbuch/image/tuev_logo.png",
      "final"     => false
    )
  );


  public function method_setup()
  {
    
    
    /*
     * do the setup
     */
    $app = $this->getApplication();

    /*
     * create config keys
     */
    $app->setupConfigKeys( $this->configKeys );

    /*
     * check whether the application has been set up
     */
    $cache = logbuch_ApplicationCache::getInstance();
    $lock = new qcl_util_system_Lock("logbuch_setup_lock");

    /*
     * if we're already set up, release any lock that might exist
     * and return
     */
    if ( $cache->get("setup") )
    {
      if( $lock->isLocked() )
      {
        $lock->release();
      }
      return;
    }

    /*
     * check if another process is already running
     */
    if ( ! $lock->getExclusive() )
    {
      throw new JsonRpcException("Another setup process is already running. Aborting ..." );
    }

    /*
     * do the setup
     */
    try
    {
      $this->setup();
      $cache->set("setup", true);
      $cache->savePersistenceData();
      $lock->release();
      throw new JsonRpcException( "Setup has finished. Please reload the application" );
    }
    catch( Exception $e )
    {
      $lock->release();
      throw $e;
    }
  }

  /**
   * Setup the application
   */
  public function setup()
  {
    qcl_data_model_db_ActiveRecord::resetBehaviors();

    $app = $this->getApplication();

    /*
     * get the persistent cache object
     */
    $cache = logbuch_ApplicationCache::getInstance();

    /*
     * set a lock
     */
    $lock = new qcl_util_system_Lock("logbuch_setup_lock");

    /*
     * register logbuch project datasource schema
     */
    if ( ! $cache->get("schemas_registered") )
    {
      $this->log("Registering datasource schemas ....", QCL_LOG_SETUP );
      
      qcl_import( "logbuch_model_ProjectDatasource");
      $model = logbuch_model_ProjectDatasource::getInstance();
      try
      {
        $model->registerSchema();
      }
      catch( qcl_data_model_RecordExistsException $e ){}

      $cache->set( "schemas_registered", true );
    }
    
    /*
     * create initial logbuch datasource
     */
    $def_ds_name = $this->getIniValue("database.default_datasource_name");
  	try 
		{
			$datasourceModel = $this->getDatasourceModel( $def_ds_name );
		}
		catch( InvalidArgumentException $e )
		{
		  try {
  			$this->getDatasourceManager()->createDatasource($def_ds_name, "project", array(
  				'database' => "logbuch_devel_user"
  			) );
		  }
		  catch( qcl_data_model_RecordExistsException $e ){}
		  $datasourceModel = $this->getDatasourceModel( $def_ds_name );
		}    

    /*
     * remote and local file storage datasources
     */
    if (  ! $cache->get("file_storage_datasource_registered") )
    {
      try
      {
        qcl_import("qcl_io_filesystem_local_Datasource");
        qcl_io_filesystem_local_Datasource::getInstance()->registerSchema();
      }
      catch( qcl_data_model_RecordExistsException $e){}

      try
      {
        //qcl_import("qcl_io_filesystem_remote_Datasource");
        //qcl_io_filesystem_remote_Datasource::getInstance()->registerSchema();
      }
      catch( qcl_data_model_RecordExistsException $e){}

      $cache->set( "file_storage_datasource_registered", true );
    }

    /*
     * make sure an administrator email is specified and set admin
     * email in the user model.
     */
    $adminEmail = $app->getIniValue("email.admin");
    if ( ! $adminEmail )
    {
      throw new JsonRpcException( "You need to set an admin email in the application.ini.php file (email.admin)" );
    }
    else
    {
      $userModel = $app->getAccessController()->getUserModel();
      $userModel->load( "admin" ); // will throw an error if user setup hasn't worked
      $userModel->set( "email", $adminEmail );
      $userModel->save();
    }
  }
}
?>