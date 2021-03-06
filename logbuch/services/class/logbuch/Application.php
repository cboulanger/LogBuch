<?php
/* ************************************************************************

   logBuch: Die Online-Plattform für Unternehmenszusammenarbeit

   Copyright:
     2010 Jürgen Breiter (Konzeption) Christian Boulanger (Programmierung)

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
qcl_import("logbuch_service_Survey");

define( 'LOGBUCH_THUMBNAIL_PATH', QCL_UPLOAD_PATH . "/thumbs" ); // @todo streamline this with QCL_UPLOAD_PATH, we don't need two
if( ! file_exists( LOGBUCH_THUMBNAIL_PATH ) )
{
  mkdir( LOGBUCH_THUMBNAIL_PATH, 0777 );
}

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
  protected $applicationName = "LogBuch: Die Online-Plattform für Unternehmenszusammenarbeit";

  /**
   * The version of the application
   * @var string
   */
  protected $applicationVersion = "2.0";

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
   * The RPC services of this application
   * @var array
   */
  private $services = array(
    "logbuch.setup"      		=> "logbuch_service_Setup",
  	"logbuch.registration" 	=> "logbuch_service_Registration",
  	"logbuch.access"     		=> "logbuch_service_Access",
  	"logbuch.data"     			=> "logbuch_service_Data",
  	"logbuch.message"  			=> "logbuch_service_Message",
  	"logbuch.entry"   		  => "logbuch_service_Entry",
  	"logbuch.record"	   		=> "logbuch_service_Record",
  	"logbuch.report"	   		=> "logbuch_service_Report",
    "logbuch.file"          => "logbuch_service_File",
    "logbuch.notify"        => "logbuch_service_Notification",
    "logbuch.survey"        => "logbuch_service_Survey",
  	"logbuch.category"      => "logbuch_service_Category",
  	"logbuch.config"     		=> "qcl_config_Service",
   	"logbuch.acltool"     	=> "qcl_access_ACLTool"
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
     * debugging
     * set filters in __init__.php
     */
    $this->getLogger()->divider(true);

    /*
     * log request
     */
    if( $this->getLogger()->isFilterEnabled( LOGBUCH_LOG_APPLICATION ) )
    {
      $request = qcl_server_Request::getInstance();
      $this->log( sprintf(
        "Starting LogBuch service: %s.%s( %s )",
        $request->getService(),
        $request->getMethod(),
        json_encode($request->getParams())
      ), LOGBUCH_LOG_APPLICATION );
    }

    /*
     * Clear internal caches. This is only necessary during development
     * As long as you modify the properties of models.
     */
    //qcl_data_model_db_ActiveRecord::resetBehaviors();

    /*
     * check whether the application is setup
     */
    $this->checkSetup();

    /*
     * initialize locale manager
     */
    qcl_locale_Manager::getInstance();

    /**
     * Register the services provided by this application
     */
    $this->registerServices( $this->services );

    /*
     * register callback to filter messages by ACLs
     */
    qcl_import("logbuch_service_Message");
    $this->getMessageBus()->registerOnBeforeBroadcastCallback(array(
    	new logbuch_service_Message(), "filterMessage"
    ));

    /*
     * check whether a survey has to be sent out
     */
    $surveyController = new logbuch_service_Survey();
    $surveyController->checkAutosend();

    /*
     * callbacks for login and logoff
     */
    $this->getMessageBus()->subscribe("qcl/access/login",		"logbuch_service_Message", "onLogin");
    $this->getMessageBus()->subscribe("qcl/access/logout",	"logbuch_service_Message", "onLogout");
  }
  
  /**
   * Check whether the application has been set up
   */
  protected function checkSetup()
  {
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
    $method = $request->getService() . "." . $request->getMethod();
    switch( $method )
    {
      case "logbuch.access.authenticate":
        session_regenerate_id(); // to avoid to loose the last session used.
      case "logbuch.setup.setup":
      case "logbuch.registration.confirmEmail":
        $this->log( "Authentication for '$method' is not required.", QCL_LOG_ACCESS );
        return true;
      default:
        $this->log( "Authentication required for '$method'", QCL_LOG_ACCESS );
        return false;
    }
  }

  public function getCategoryLabels()
  {
  	return array(
      event => array(
        label   => $this->tr("Event"),
        fields  => array(
          subject      => $this->tr("Subject"),
          location     => $this->tr("Location"),
          participants => $this->tr("Participants"),
          notes        => $this->tr("Notes")
        )
      ),
      goal => array(
        label   => $this->tr("Goal"),
        fields  => array(
          subject       => $this->tr("Subject"),
          location      => $this->tr("Location"),
          participants	=> $this->tr("Participants"),
          notes      		=> $this->tr("Notes")
        )
      ),
      documentation => array(
        label   => $this->tr("Documentation"),
        fields  => array(
          process      		=> $this->tr("Consultancy process"),
          result      		=> $this->tr("Result"),
          heureka       	=> $this->tr("Heureka!"),
          stumblingBlock  => $this->tr("Stumbling block"),
          incentive       => $this->tr("Incentive"),
          miscellaneous   => $this->tr("Miscellaneous")
        )
      ),
      diary => array(
        label   => $this->tr("Diary"),
        fields  => array(
          heureka       	=> $this->tr("Heureka!"),
          encounters      => $this->tr("Encounters"),
          stumblingBlock  => $this->tr("Stumbling block"),
          incentive       => $this->tr("Incentive"),
          miscellaneous   => $this->tr("Miscellaneous")
        )
      ),
      inspiration => array(
        label   => $this->tr("Inspiration"),
        fields  => array(
          idea      	=> $this->tr("Idea"),
          source      => $this->tr("Inspiration source"),
          links       => $this->tr("Links")
        )
      )
  	);
  }
}
?>