/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#asset(logbuch/*)

************************************************************************ */

  
/**
 * The core application object
 * @type qcl.application.Core
 */
var core;

/**
 * This is the main application class of your custom application "logbuch".
 * 
 * Documentation of the messages that are passed between the modu
 */
qx.Class.define("logbuch.Application",
{
  extend : qx.application.Standalone,
  
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    
    /*
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */       
    
    /**
     * The core application library 
     * @type {qcl.application.Core}
     */
    __core : null,
    
    /**
     * An object containing values for the application layout
     * @type {Object}
     */
    __layoutConfig : null,
    
    /**
     * the initial layout config values
     * @type {Object}
     */
    __layoutConfigInit : 
    {
      viewport :
      {
        maxHeight : 610,
        minHeight : 610,
        maxWidth  : 1000,
        minWidth  : 1000
      },
      workspace : {
        marginTop     : 10,
        marginRight   : 10,
        marginBottom  : 10
      },
      calendar:
      {
        dateRowHeight   : 30,
        boxHeight       : 78,
        boxWidth        : 120,
        hGridLineWidth  : 5
      },
      sidebar : {
        marginTop  : 44,
        marginLeft : 10,
        width      : 120
      },
      footer : {
        marginTop       : 10,
        controlsHeight  : 20,
        buttonWidth     : 70
      }
    },
    
    
    
    
    /*
    ---------------------------------------------------------------------------
       INTERFACE METHODS
    ---------------------------------------------------------------------------
    */         
    
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }
      
      /*
       * application core providing app functionality
       */
      core = new qcl.application.Core();
      
      /*
       * create and show popup
       */
      core.createPopup();
      core.showPopup(this.tr("Starting application..."));
      
      /*
       * create initial layout config object
       */
      this.__layoutConfig = qx.data.marshal.Json.createModel( this.__layoutConfigInit, true);
      
      /*
       * creeate main workspace and hide parts of it as 
       * long as no authenticated user exists
       */
      var ui = this._createUI();
      core.subscribe("authenticated",function(e){
        if ( e.getData() )
        {
          core.getModuleById("sidebar").show();
          core.getModuleById("footer").show();
          ui.getUserData( "workspace").show();
        }
        else
        {
          core.getModuleById("sidebar").hide();
          core.getModuleById("footer").hide();
          ui.getUserData("workspace").hide();
        }
      }, this );
      
      /*
       * build and start all modules 
       */
      core.buildModules();
      core.startModules();
      
      /*
       * add the main layout to the document
       */
      this.getRoot().add( ui, { edge: 0 } );
      
      /*
       * add login dialog
       */
      var loginDialog = new logbuch.component.Login( core );
      this.getRoot().add( loginDialog, { left : 100, top : 100 } ); 
      core.subscribe("authenticated",function(e){
        e.getData() ? this.hide() : this.show();
      }, loginDialog );      
      
      /*
       * initalize server communication
       */
      core.setServerUrl("../services/server.php");
      
      /*
       * access and config
       */
      core.setAccessService("logbuch.access");
      core.setConfigService("logbuch.config");
      
      /*
       *  allow incoming server dialogs
       */
      core.allowServerDialogs(true);
      
      /*
       * publish a message when the authentication state changes
       */
      core.addListener("changeActiveUser", function(e){
        core.publish("authenticated", ! e.getData().isAnonymous() );
      },this);      
      
      /*
       * run setup, then authenticate
       */
      this.info("Setting up application...");
      core.showPopup( this.tr("Setting up application...") );
      core.getRpcManager().execute(
        "logbuch.setup","setup",[], 
        this._connect, this
      );      
    },
    
    /**
     * create main layout, register modules with core and add 
     * uninitialized module ui to the layout.
     * @return {qx.ui.container.Composite}
     */
    _createUI : function()
    {
      var ui = new qx.ui.container.Composite( new qx.ui.layout.Dock() );
      ui.set( this.__layoutConfigInit.viewport );
      
      /*
       * header
       */
      var header = new logbuch.module.Header();
      core.register("header", header );
      ui.add( header,{ edge : "north" } );
      
      /*
       * footer
       */
      var footer = new logbuch.module.Footer();
      core.register("footer", footer );
      ui.add( footer,{ edge : "south" } );
      
      /*
       * sidebar
       */
      var sidebar = new logbuch.module.Sidebar();
      core.register("sidebar", sidebar );
      ui.add( sidebar,{ edge : "west" } );
      
      /*
       * main workspace stack
       */
      var workspace = new qx.ui.container.Composite( new qx.ui.layout.Canvas() ).set({
        visibility : "hidden"
      });
      ui.add( workspace,{ edge : "center" } );
      ui.setUserData( "workspace", workspace );
      
      /*
       * calendar
       */
      var calendarModule = new logbuch.module.Calendar();
      core.register( "main", calendarModule );
      workspace.add( calendarModule, { edge: 0 } );

      /*
       * events
       */
      var eventModule = new logbuch.module.Event();
      core.register( "event", eventModule );
      sidebar.addModule( eventModule );
      workspace.add( eventModule, { edge: 0 } );
      
      /*
       * goals
       */
      var goalModule = new logbuch.module.Goal();
      core.register( "goal", goalModule );
      sidebar.addModule( goalModule );
      workspace.add( goalModule, { edge: 0 } );

      /*
       * documentation
       */
      var docModule = new logbuch.module.Documentation();
      core.register( "documentation", docModule );
      sidebar.addModule( docModule );
      workspace.add( docModule, { edge: 0 } );      

      /*
       * diary
       */
      var diaryModule = new logbuch.module.Diary();
      core.register( "diary", diaryModule );
      sidebar.addModule( diaryModule );
      workspace.add( diaryModule, { edge: 0 } );       
      
      /*
       * inspiration
       */
      var inspirationModule = new logbuch.module.Inspiration();
      core.register( "inspiration", inspirationModule );
      sidebar.addModule( inspirationModule );
      workspace.add( inspirationModule, { edge: 0 } ); 
      
      return ui;
      
    },
    
    /**
     * Connect to the server: authenticate and laod configuration
     */
    _connect : function()
    {
      this.info("Connecting ...");
      
      /*
       * (re-) authenticate
       */
      core.showPopup( this.tr("Connecting with server...") );
      core.connect(function()
      {
        /*
         * add logout event
         */
        core.subscribe("logout", function(){
          core.showPopup( this.tr("Logging out ...") );
          core.logout( function(){
            core.hidePopup();
          },this);
        },this);
        
        /*
         * load config values and continue 
         */
        core.showPopup( this.tr( "Loading configuration ...") );
        core.getConfigManager().load(this._initializeState, this );
        
      },this);
    },
        
    /**
     * Initializes the application state
     */
    _initializeState : function()
    {
      this.info("Initializing application state ...");
      /*
       * initialize application state
       */
      core.getStateManager().setHistorySupport(true);
      core.getStateManager().updateState();
      
      this._finalize();
    },    
    
    
    /**
     * Finalizes the application 
     */
    _finalize :  function() 
    {
      /*
       * reset popup to remove splash screen
       */
      core.hidePopup();
      core.createPopup();
      core.publish("ready");
      this.info("Application ready.");
    },    
    
    /**
     * Returns qx.core.Object with values used for application layout
     * @return {qx.core.Object}
     */
    getLayoutConfig : function()
    {
      return this.__layoutConfig;
    }     
  }
});