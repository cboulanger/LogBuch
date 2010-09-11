<?php
/* ************************************************************************

   logBuch: Die Online-Plattform f�r Unternehmenszusammenarbeit

   Copyright:
     2010 J�rgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_application_Application" );
qcl_import( "qcl_locale_Manager" );
qcl_import("logbuch_ApplicationCache");
qcl_import("qcl_util_system_Lock");

/**
 * Main application class
 * @todo move setup stuff into "call once per loading" service
 */
class logbuch_Application
  extends qcl_application_Application
{

  /**
   * The id of the application, usually the namespace
   * @var string
   */
  protected $applicationId = "logbuch";

  /**
   * The descriptive name of the application
   * @var string
   */
  protected $applicationName = "logBUCH: Die Online-Plattform f�r Unternehmenszusammenarbeit";

  /**
   * The version of the application
   * @var string
   */
  protected $applicationVersion = "0.1-pre";

  /**
   * The path to the application ini-file
   * @var string
   */
  protected $iniPath = "logbuch/application.ini.php";

  /**
   * The default datasource schema used by the application
   * @var string
   */
  protected $defaultSchema = "logbuch.schema.Project";

  /**
   * A map with model types as keys and the path to xml files containing
   * the model data as values.
   * The order of importing matters!
   * @var array
   */
  protected $initialDataMap = array(
    'user'        => "logbuch/data/User.xml",
    'role'        => "logbuch/data/Role.xml",
    'permission'  => "logbuch/data/Permission.xml",
    'config'      => "logbuch/data/Config.xml"
   );

  /**
   * Returns the singelton instance of this class. Note that
   * qcl_application_Application::getInstance() stores the
   * singleton instance for global access
   * @return logbuch_Application
   */
  static public function getInstance()
  {
    return parent::getInstance();
  }

  /**
   * Getter for map needed for loading the initial data
   * @return array
   */
  public function getInitialDataMap()
  {
    return $this->initialDataMap;
  }

  /**
   * Starts the application, does on-the-fly database setup
   * objects
   */
  public function main()
  {
    /*
     * log filters
     */
    $this->getLogger()->setFilterEnabled( QCL_LOG_SETUP, true );
    //$this->getLogger()->setFilterEnabled( BIBLIOGRAPH_LOG_APPLICATION, true );
    //$this->getLogger()->setFilterEnabled( QCL_LOG_DB, true );

    /*
     * log request
     */
    if( $this->getLogger()->isFilterEnabled( LOGBUCH_LOG_APPLICATION ) )
    {
      $request = qcl_server_Request::getInstance();
      $this->log( sprintf(
        "Starting LogBuch service: %s.%s( %s ) ...",
        $request->getService(), $request->getMethod(), json_encode($request->getParams())
      ), LOGBUCH_LOG_APPLICATION );
    }

    /*
     * Clear internal caches. This is only necessary during development
     * As long as you modify the properties of models.
     */
    //qcl_data_model_db_ActiveRecord::resetBehaviors();

    /*
     * check whether the application has been set up
     */
    $lock = new qcl_util_system_Lock("logbuch_setup_lock");

    /*
     * abort if setup procedure blocks all other actions
     */
    if ( $lock->isLocked() )
    {
      throw new JsonRpcException("Setup in progress. Please wait..." );
    }

    $cache = logbuch_ApplicationCache::getInstance();
    if ( ! $cache->get("setup") )
    {
      /*
       * no, then deny all requests except the one for the "setup" service
       */
      if ( $this->getServerInstance()
                ->getRequest()
                ->getService() != "logbuch.setup" )
      {
        throw new JsonRpcException("Setup in progress. Please wait..." );
      }

      /*
       * Load initial data into models
       */
      if ( ! $cache->get("initial_data_imported") )
      {
         $this->log("Importing data ....", QCL_LOG_SETUP );
         $this->importInitialData( $this->getInitialDataMap() );
      }
      $cache->set( "initial_data_imported", true );
    }

    /*
     * initialize locale manager
     */
    qcl_locale_Manager::getInstance();

    /**
     * Register the services provided by this application
     */
    $this->registerServices( array(
      "logbuch.setup"      		=> "logbuch_service_Setup",
    	"logbuch.access"     		=> "logbuch_service_Access",
      "logbuch.config"     		=> "qcl_config_Service",
      "logbuch.plugin"     		=> "qcl_application_plugin_Service",
      "logbuch.person"     		=> "logbuch_service_Person",
      "logbuch.company"    		=> "logbuch_service_Company",
      "logbuch.event"  		 		=> "logbuch_service_Event",
      "logbuch.goal"       		=> "logbuch_service_Goal",
      "logbuch.documentation" => "logbuch_service_Documentation",
      "logbuch.diary"     		=> "logbuch_service_Diary",
      "logbuch.inspiration"   => "logbuch_service_inspiration",
      "logbuch.actool"     		=> "logbuch_service_ACLTool",
      
      
    ) );

    /**
     * Plugins
     */
    $this->pluginPath = dirname(__FILE__) . "/plugin/";

  }

  /**
   * Overridden to create config key
   * @see qcl_application_Application#createDatasource($namedId, $data)
   */
  function createDatasource( $namedId, $data= array() )
  {
    parent::createDatasource( $namedId, $data );

    /*
     * create config keys for the datasource
     * @todo generalize this
     */
    $configModel = $this->getApplication()->getConfigModel();
    $key = "datasource.$namedId.fields.exclude";
    $configModel->createKeyIfNotExists( $key, QCL_CONFIG_TYPE_LIST, false, array() );
  }

  /**
   * Overridden to skip authentication for selected methods.
   * @return bool
   */
  public function skipAuthentication()
  {
    $request = $this->getServerInstance()->getRequest();
    switch( $request->getService() . "." . $request->getMethod() )
    {
      case "logbuch.actool.confirmEmail":
        return true;
      default:
        return false;
    }
  }
}
?>