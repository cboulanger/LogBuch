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
#asset(qcl/*)

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

  properties :
  {
    
    
    /**
     * The current date, as an integer value
     * @type String
     */
    date :
    {
      check     : "Integer",
      nullable  : true,
      event     : "changeData",
      apply     : "_applyDate"
    }    
    
  },
  
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
   
    
    
    /*
    ---------------------------------------------------------------------------
       INITIALIZATION
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
      
      if ( ! window.console )
      {
        var _this = this;
        window.console = {
          log : function( msg ){
            _this.info( msg );
          },
          warn : function( msg ){
            _this.warn( msg );
          }
        };
      }
      
      /*
       * application core providing application functionality
       */
      core = new qcl.application.Core();
      
      /*
       * create and show popup
       */
      core.createPopup();
      core.showNotification(this.tr("Starting application..."));
      
      /*
       * initalize server communication, access and config
       */
      core.setServerUrl("../services/server.php");
      core.setAccessService("logbuch.access");
      core.setConfigService("logbuch.config");      
      
      /*
       * visual modules
       */
      this.__loginDialog = new logbuch.component.Login( core );
      this.__mainWorkspace = this._createMainWorkspace();
      this.__messageModules = this._createMessageModule();
      this.__setupDialog = this._createSetupDialog();
      this.__userManagement = this._createUserManagement();
      this.__organizationManagement = this._createOrganizationManagement();
      this.__registrationDialog = this._createRegistrationDialog();
      this.__reportDialog = this._createReportDialog();
      
      /*
       * build and start all modules 
       */
      core.buildModules();
      core.startModules();
      
      /*
       * add widgets to the document
       * FIXME create on demand
       */
      this.getRoot().add( this.__mainWorkspace, { edge: 0 } );
      this.getRoot().add( this.__messageModules, { top: 100, left : 100 } );
      this.getRoot().add( this.__setupDialog, { top: 100, left : 100 } );
      this.getRoot().add( this.__registrationDialog, { top: 100, left : 100 } );
      this.getRoot().add( this.__reportDialog, { top: 100, left : 100 } );
      this.getRoot().add( this.__userManagement, { left : 100, top : 100 } ); 
      this.getRoot().add( this.__organizationManagement, { left : 100, top : 100 } ); 
      this.getRoot().add( this.__loginDialog, { left : 100, top : 100 } ); 
       
      /*
       * determine ui changes on application state change / authentication
       */
      core.addListener("changeActiveUser", function(e){
        core.publish("authenticated", ! e.getData().isAnonymous() );
        var state = core.getApplicationState("view");
        core.setApplicationState( "view", 
          e.getData().isAnonymous() 
            ? ( state == "register" ? "register" : "login" ) 
            : ( state == "login" ? "main" : state ) 
        );
      },this);       
      core.onApplicationStateChange( "view", this._updateView, this );      
      
      /*
       *  allow incoming server dialogs
       */
      core.allowServerDialogs(true);

      /*
       * save the current date in the application state
       */
      core.subscribe("change-date",function(e){
        core.getStateManager().setState("date", e.getData().getTime() );
      },this);

      /*
       * get messages from the server but only
       * if authenticated
       */
      var queue = [];
      core.subscribe("message", function(e){
        

        var msg = qx.lang.Object.clone(e.getData());
        if ( msg.fromServer ) return; 
        
        msg.date          = msg.date.toString();
        msg.itemDateStart = msg.itemDateStart.toString();
        msg.itemDateEnd   = msg.itemDateEnd.toString();        
        queue.push( msg );
      }, this );
      
      /*
       * periodically forward messages to the server and pick up the
       * server messages
       */      
      var timerId = qx.util.TimerManager.getInstance().start(function(){
        
        if ( ! core.isAuthenticatedUser()  )
        {
          return;
        }
        core.getRpcManager().execute(
          "logbuch.message","send", [queue], 
          function(){},this
        );
        queue = [];

      },10000,this,null,0);
      
      /*
       * stop the polling on error
       */
      qx.event.message.Bus.subscribe("qcl.data.store.JsonRpc.error",function(e){
        qx.util.TimerManager.getInstance().stop( timerId );
      },this);
      
      /*
       * resend messages received from the server
       */
      qx.event.message.Bus.subscribe("logbuch/message", function(e){
        var msg = e.getData();
        msg.fromServer    = true;
        msg.date          = new Date( msg.date );
        msg.itemDateStart = new Date( msg.itemDateStart );
        msg.itemDateEnd   = new Date( msg.itemDateEnd );
        core.publish("message", msg );
      },this);
      
      /*
       * run setup, then authenticate
       */
      this.info("Setting up application...");
      core.showNotification( this.tr("Setting up application...") );
      core.getRpcManager().execute(
        "logbuch.setup","setup",[], 
        this._connect, this
      );      
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
      core.showNotification( this.tr("Connecting with server...") );
      core.connect(function()
      {
        /*
         * add logout event
         */
        core.subscribe("logout", function(){
          core.showNotification( this.tr("Logging out ...") );
          core.logout( function(){
            core.hideNotification();
          },this);
        },this);
        
        /*
         * load config values and continue 
         */
        core.showNotification( this.tr( "Loading configuration ...") );
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
      core.hideNotification();
      core.createPopup();
      core.publish("ready");
      this.info("Application ready.");
    },       
    

    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */
   
    
   
    _applyDate : function( value, old )
    {
      core.publish("change-date", new Date( value ) );
    },    
    
    /*
    ---------------------------------------------------------------------------
       INTERNAL (HELPER) METHODS
    ---------------------------------------------------------------------------
    */
    
    _getLayoutConfigInit : function()
    {
      return {
	      categories : {
	        ids : [ "event", "goal", "documentation", "diary", "inspiration" ],
	        structure : {
	          event : { 
	            label   : this.tr("Event"),
	            fields  : {
	              subject      : this.tr("Subject"),
	              location     : this.tr("Location"),
                participants : this.tr("Participants"),
                notes        : this.tr("Notes")
	            }
	          },
            goal : {
              label   : this.tr("Goal"),
              fields  : {
                subject         : this.tr("Subject"),
                location        : this.tr("Location"),
                participants    : this.tr("Participants"),
                notes           : this.tr("Notes")
              }
            },
            documentation : {
              label   : this.tr("Documentation"),
              fields  : {
                process         : this.tr("Consultancy process"),
                result          : this.tr("Result"),
                heureka         : this.tr("Heureka!"),
                stumblingBlock  : this.tr("Stumbling block"),
                incentive       : this.tr("Incentive"),
                miscellaneous   : this.tr("Miscellaneous")
              }
            },
            diary : {
              label   : this.tr("Diary"),
              fields  : {
                heureka         : this.tr("Heureka!"),
                encounters      : this.tr("Encounters"),
                stumblingBlock  : this.tr("Stumbling block"),
                incentive       : this.tr("Incentive"),
                miscellaneous   : this.tr("Miscellaneous")
              }
            },
            inspiration : {
              label   : this.tr("Inspiration"),
              fields  : {
                idea            : this.tr("Idea"),
                source          : this.tr("Inspiration source"),
                links           : this.tr("Links")
              }
            }
	        }
	      },
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
	        categories      : [ "event", "goal", "documentation", "diary", "inspiration" ],
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
	        buttonWidth     : 100
	      },
	      event :
	      {
	        rowHeight         : 65,
	        leftColumnWidth   : 150,
	        rightColumnWidth  : 250 
	      },
	      documentation :
	      {
	        rowHeight         : 55
	      }
      };
    },    
    
    /**
     * Return true if the current user has been authenticated as a registered
     * user.
     * @return {Boolean}
     */
    _isRegisteredUser : function()
    {
      return core.getActiveUser() !== null && ! core.getActiveUser().isAnonymous(); 
    },
    
    
    _showIfTrue : function( widget, condition )
    {
      widget.setVisibility( condition ? "visible" : "hidden" );
    },
    
    /**
     * Callback for application state change. Updates the current UI state
     */
    _updateView : function( e )
    {
      var view = e.getData().value;
      
      // FIXME
      if ( view == "undefined" )
      {
        core.setApplicationState("view", this._isRegisteredUser() ? "main" : "login" );
      }
      
      
      // login
      this._showIfTrue( this.__loginDialog, view == "login" );
      
      // main 
      this._showIfTrue( core.getModuleById("sidebar"), view == "main" );
      this._showIfTrue( core.getModuleById("footer"), view == "main" );
      this._showIfTrue(  this.__mainWorkspace.getUserData( "workspace"), view == "main" );
    
      // registration
      this._showIfTrue( this.__registrationDialog, view == "register" );
      
      // messages
      this._showIfTrue( this.__messageModules, view == "messages" );
      
      // report
      this._showIfTrue( this.__reportDialog, view == "report" );     
      
      // user management
      this._showIfTrue( this.__userManagement, view == "users" );
      
      // organization management
      this._showIfTrue( this.__organizationManagement, view == "organizations" && core.hasPermission("logbuch.members.manage") );      
      
      // setup
      this._showIfTrue( this.__setupDialog, view == "setup" && core.hasPermission("logbuch.setup") );
    },
    
    /**
     * create main layout, register modules with core and add 
     * uninitialized module ui to the layout.
     * @return {qx.ui.container.Composite}
     */
    _createMainWorkspace : function()
    {
      var ui = new qx.ui.container.Composite( new qx.ui.layout.Dock() );
      ui.set( this.getLayoutConfig(true).viewport ); 
      
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
      core.register( "main", calendarModule ); // FIXM
      workspace.add( calendarModule, { edge: 0 } );

      var categories =[];
      
      /*
       * events
       */
      var eventModule = new logbuch.module.Event();
      categories.push( eventModule.getName() );
      core.register( eventModule.getName(), eventModule );
      sidebar.addModule( eventModule );
      workspace.add( eventModule, { edge: 0 } );
      
      /*
       * goals
       */
      var goalModule = new logbuch.module.Goal();
      categories.push( goalModule.getName() );
      core.register( goalModule.getName(), goalModule );
      sidebar.addModule( goalModule );
      workspace.add( goalModule, { edge: 0 } );

      /*
       * documentation
       */
      var docModule = new logbuch.module.Documentation();
      categories.push( docModule.getName() );
      core.register(  docModule.getName(), docModule );
      sidebar.addModule( docModule );
      workspace.add( docModule, { edge: 0 } );      

      /*
       * diary
       */
      var diaryModule = new logbuch.module.Diary();
      categories.push( diaryModule.getName() );
      core.register( diaryModule.getName(), diaryModule );
      sidebar.addModule( diaryModule );
      workspace.add( diaryModule, { edge: 0 } );       
      
      /*
       * inspiration
       */
      var inspirationModule = new logbuch.module.Inspiration();
      categories.push( inspirationModule.getName() );
      core.register( inspirationModule.getName(), inspirationModule );
      sidebar.addModule( inspirationModule );
      workspace.add( inspirationModule, { edge: 0 } ); 
      
      return ui;
      
    },
    
    _createMessageModule : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.MessageBoard( this.tr("logBUCH Messages") );
      core.register("messageBoard", left );  
      hbox.add( left, { flex : 3 } );
      
      var right = new logbuch.module.MessageConsole( this.tr("Message") );
      core.register("messageConsole", right );
      hbox.add( right, { flex : 1 } );
      
      left.setUserData("buddy",right);
      right.setUserData("buddy",left);      
      
      return hbox;
    },
    
    _createSetupDialog : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.Setup( this.tr("Setup project") ).set({
        maxWidth : 400
      });
      core.register("setup-project", left );  
      hbox.add( left, { flex : 1 } );
      
      var right = new logbuch.module.PersonForm( this.tr("Administrator") ).set({
        maxWidth : 400
      });
      core.register("setup-administrator", right );
      hbox.add( right, { flex : 1 } );
      
      right.addListener("cancel",function(){
        core.setApplicationState("view","main");
      },this);   
      
      left.setUserData("buddy",right);
      right.setUserData("buddy",left);
      
      
      return hbox;
    },
    
    _createRegistrationDialog : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.Registration( this.tr("Registration") ).set({
        maxWidth : 400
      });
      core.register("registration", left );  
      hbox.add( left, { flex : 1 } );
      
      var right = new logbuch.module.PersonForm( this.tr("Personal Information") ).set({
        maxWidth : 400
      });
      core.register("personal-information", right );
      hbox.add( right, { flex : 1 } );
      
      right.addListener("cancel",function(){
        core.setApplicationState("view", core.isAuthenticatedUser() ? "main" : "login" );
      },this);
      
      right.addListener("completed",function(){
        core.setApplicationState("view", "main" );
      },this);      
      
      left.setUserData("buddy",right);
      right.setUserData("buddy",left);
      
      return hbox;
    },    
    
    _createReportDialog : function()
    {
      var report = new logbuch.module.Report().set({
        width : 800, height : 500, visibility: "hidden"
      });
      core.register("report", report );
      return report;
    },
    
    
    _createUserManagement : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.UserList( this.tr("Users") ).set({
        maxWidth : 400
      });
      core.register("user-list", left );    
      hbox.add( left, { flex : 1 } );
      
      var right = new logbuch.module.PersonForm( this.tr("User data") ).set({
        maxWidth : 400
      });
      core.register("user-data", right );
      hbox.add( right, { flex : 1 } );
      
      right.addListener("cancel",function(){
        core.setApplicationState("view","main");
      },this);
      
      left.setUserData("buddy",right);
      right.setUserData("buddy",left);
      
      return hbox;
    },
    
    
    _createOrganizationManagement : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.OrganizationList( this.tr("Organizations") ).set({
        maxWidth : 400
      });
      core.register("organization-list", left );
      hbox.add( left, { flex : 1 } );
      
      var right = new logbuch.module.OrganizationForm( this.tr("Organization data") ).set({
        maxWidth : 400
      });
      core.register("organization-data", right );
      hbox.add( right, { flex : 1 } );
      
      right.addListener("cancel",function(){
        core.setApplicationState("view","main");
      },this);
         
      left.setUserData("buddy",right);
      right.setUserData("buddy",left);
      
      return hbox;
    },
    
     /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
    /**
     * Returns object or qx.core.Object (default) with values used for application layout.
     * @param nativeObject {Boolean|undefined} 
     * @return {qx.core.Object|Object}
     */
    getLayoutConfig : function( nativeObject )
    {
      if ( ! this.__layoutConfigModel )
      {
        this.__layoutConfigObject = this._getLayoutConfigInit();
        this.__layoutConfigModel  = qx.data.marshal.Json.createModel( this.__layoutConfigObject );
      }
      if ( nativeObject )
      {
        return this.__layoutConfigObject
      }
      return this.__layoutConfigModel;
    }     
  }
});