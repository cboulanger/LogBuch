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
       * parse querystring
       */
      window.location.params = {};
      window.location.search.replace( 
        new RegExp( "([^?=&]+)(=([^&]*))?", "g" ), 
        function( $0, $1, $2, $3 ){
          window.location.params[ $1 ] = $3;
        }
      );      
      
      /*
       * application core providing application functionality
       */
      core = new qcl.application.Core();
      
      core.set({
        applicationId   : "logbuch",
        applicationName : "logBuch Nachhaltiger Business Travel in Berlin",
        confirmQuit     : true
      });
      
      /*
       * create and show popup
       */
      core.createPopup();
      core.showNotification(this.tr("Starting application..."));
      
      /*
       * initalize server communication, access and config
       */
      var ds = window.location.params.ds;
      core.setServerUrl("../services/server.php" + ( ds ? "?ds="+ds : "" ) );
      core.setAccessService("logbuch.access");
      core.setConfigService("logbuch.config");
      core.setDelayChannelSubscriptionsUntilAuthenticated(true);
      
  
      
      /*
       * visual modules
       */
      this.__loginDialog = new logbuch.component.Login( core );
      this.__mainWorkspace = this._createMainWorkspace();
      this.__setupDialog = this._createSetupDialog();
      this.__userManagement = this._createUserManagement();
      this.__organizationManagement = this._createOrganizationManagement();
      this.__registrationDialog = this._createRegistrationDialog();
      
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
      this.getRoot().add( this.__setupDialog, { top: 100, left : 100 } );
      this.getRoot().add( this.__registrationDialog, { top: 100, left : 100 } );
      this.getRoot().add( this.__userManagement, { left : 100, top : 100 } ); 
      this.getRoot().add( this.__organizationManagement, { left : 100, top : 100 } ); 
      this.getRoot().add( this.__loginDialog, { left : 100, top : 100 } ); 
       
      /*
       * dispatch "authenticated" message when the active user
       * changes
       */
      core.addListener("changeActiveUser", function(e){
        new qx.util.DeferredCall( function(){
          core.publish("authenticated", e.getData() !==null && ! e.getData().isAnonymous()  );
        },this).schedule();
      },this);
      
      /*
       * method called when the "view" state changes
       */
      core.onApplicationStateChange( "view", this._updateView, this );      
      
      /*
       * action to be taken on login/logout
       */
      core.subscribe("authenticated", this._onChangeAuthenticated,this);

      /*
       * synchronize current date with the application state
       * @todo move into method
       */
      core.subscribe("change-date",function(e){
        if ( ! e.getData() instanceof Date ) return;
        this.__doNotChangeDate = true;
        core.setApplicationState("time", e.getData().getTime() );
        this.__doNotChangeDate = false;
      },this);
      
      core.onApplicationStateChange( "time", function(e){
        if ( this.__doNotChangeDate ) return;
        var time = parseInt( e.getData().value);
        if ( ! time || isNaN( time ) ) {
          this.warn( "Invalid time " + e.getData().value );
          return;
        }
        core.publish("change-date", new Date( time ) );
      },this );

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
        core.subscribe("logout", this._onLogout, this);          
        
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
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */    
    
    
    /*
     * called when the authenticated message is published
     */
    _onChangeAuthenticated : function(e)
    {
      /*
       * change view when authentication changes
       */
      var state = core.getApplicationState("view");
      core.setApplicationState( "view", 
        e.getData()
          ? ( state == "login" ? "main" : state ) 
          : ( state == "register" ? "register" : "login" )  
      );
      
      /*
       * (dis-) allow server dialogs
       */
      core.allowServerDialogs(e.getData()!==null);
      
      /*
       * start or stop message transport, using rpc-polling
       */        
      if( e.getData() )
      {
        core.startMessageTransport({
          mode          : "poll",
          transport     : "rpc",
          service       : "logbuch.message",
          interval      : 10,
          authenticated : true,
          stopOnError   : false
        });
      }
      else
      {
        core.stopMessageTransport();
      }
    },
    
    /**
     * Called when the logout event is fired
     */
    _onLogout : function(){
      core.removeApplicationState("time");  
      core.showNotification( this.tr("Logging out ...") );          
      core.logout( function(){
        core.hideNotification();
      },this);
    },
    
    /*
    ---------------------------------------------------------------------------
       INTERNAL (HELPER) METHODS
    ---------------------------------------------------------------------------
    */
    
    _getLayoutConfigInit : function()
    {
      return {
	   
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
	        rowLabels       : ["<","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00",">"],
          dateRowHeight   : 30,
	        boxHeight       : 30,
	        boxWidth        : 122,
          vGridLineWidth  : 2,
	        hGridLineWidth  : 2
          
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
        return;
      }
      
      
      // login
      this._showIfTrue( this.__loginDialog, view == "login" );
      
      // main 
      this._showIfTrue( core.getModuleById("sidebar"), view == "main" );
      this._showIfTrue( core.getModuleById("footer"), view == "main" );
      this._showIfTrue(  this.__mainWorkspace.getUserData( "workspace"), view == "main" );
    
      // registration
      this._showIfTrue( this.__registrationDialog, view == "register" );  
      
      // user management
      this._showIfTrue( this.__userManagement, view == "users" );
      
      // organization management
      this._showIfTrue( this.__organizationManagement, view == "organizations" && core.hasPermission("logbuch.members.manage") );      
      
      // setup
      this._showIfTrue( this.__setupDialog, view == "setup" && core.hasPermission("logbuch.setup") );
      
      // deferred loading of item
      if ( view == "main" && core.getApplicationState("showItem") )
      {
        core.setApplicationState("itemId", core.getApplicationState("showItem") );
        core.removeApplicationState("showItem");
      }
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
      
      return ui;
      
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
        core.publish("reload-calendar");
      },this);      
      
      left.setUserData("buddy",right);
      right.setUserData("buddy",left);
      
      return hbox;
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
    },
    
    /**
     * Called before the page is closed.
     * @return
     */
    close : function()
    {  
      if( ! core.getActiveUser().isAnonymous() )
      {
        return "Sie sind noch angemeldet. Wenn Sie auf OK klicken, schließen Sie das Fenster, ohne sich abzumelden. Bitte klicken Sie auf 'Abbrechen' und melden sich zuerst ab.";
      }
      return undefined;
    },
    
    /**
     * Called when the page is closed. Calls the terminate() method of the
     * rpc manager. Override by definining a terminate() method in your application
     * class
     */
    terminate : function()
    {
      core.terminate();
    },
    
    dummy : function()
    {
      this.tr("Yes");
      this.tr("No");
    }
  }
});