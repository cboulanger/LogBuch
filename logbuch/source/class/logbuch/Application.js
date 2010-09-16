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

  properties :
  {
    
    /**
     * The current view of the application
     * @type String
     */
    view :
    {
      check     : "String",
      nullable  : true,
      event     : "changeView",
      apply     : "_applyView"
    },
    
    /**
     * The current category
     * @type String
     */
    category :
    {
      check     : "String",
      nullable  : true,
      event     : "changeCategory",
      apply     : "_applyCategory"
    },
    
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
    },
    
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
       * visual modules
       */
      this.__mainWorkspace = this._createMainWorkspace();
      this.__messageModules = this._createMessageModule();
      this.__setupDialog = this._createSetupDialog();
      this.__registrationDialog = this._createRegistrationDialog();
      
      /*
       * build and start all modules 
       */
      core.buildModules();
      core.startModules();
      
      /*
       * add widgets to the document
       */
      this.getRoot().add( this.__mainWorkspace, { edge: 0 } );
      this.getRoot().add( this.__messageModules, { top: 100, left : 100 } );
      this.getRoot().add( this.__setupDialog, { top: 100, left : 100 } );
      this.getRoot().add( this.__registrationDialog, { top: 100, left : 100 } );
      
      /*
       * add login dialog
       */
      var loginDialog = new logbuch.component.Login( core );
      this.getRoot().add( loginDialog, { left : 100, top : 100 } ); 
      core.subscribe("authenticated",function(e){
        e.getData() ? this.hide() : this.show();
      }, loginDialog ); 
      
      /*
       * determine ui changes on authentication state change
       */
      core.subscribe("authenticated",this._updateView, this );      
      
      /*
       * initalize server communication, access and config
       */
      core.setServerUrl("../services/server.php");
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
       * save the current date in the application state
       */
      core.subscribe("change-date",function(e){
        core.getStateManager().setState("date", e.getData().getTime() );
      },this);
      
      /*
       * save the current category in the application state
       */
      core.subscribe("activate-category",function(e){
        var category = e.getData();
        if ( category )
        {
          core.getStateManager().setState("category", category );
        }
        else
        {
          core.getStateManager().removeState("category");
        }
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
    

    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */
    
    _applyView : function( value, old )
    {
      this._updateView();
    },
    
    _applyCategory : function( value, old )
    {
      //core.publish("activate-category", value);
    },
    
    
    _applyDate : function( value, old )
    {
      core.publish("change-date", new Date( value ) );
    },    
    
    /*
    ---------------------------------------------------------------------------
       INTERNAL (HELPER) METHODS
    ---------------------------------------------------------------------------
    */
    
    /**
     * Return true if the current user has been authenticated as a registered
     * user.
     * @return {Boolean}
     */
    _isRegisteredUser : function()
    {
      return core.getActiveUser() !== null && ! core.getActiveUser().isAnonymous(); 
    },
    
    /**
     * Updates the current UI state
     */
    _updateView : function()
    {
      if ( this._isRegisteredUser() )
      {
//        this.__registrationDialog.show();
//        this.__setupDialog.show();
//          messageModules.show();
        core.getModuleById("sidebar").show();
        core.getModuleById("footer").show();
        this.__mainWorkspace.getUserData( "workspace").show();
      }
      else
      {
//          registrationDialog.hide();
//          setupDialog.hide();
//          messageModules.hide();
        core.getModuleById("sidebar").hide();
        core.getModuleById("footer").hide();
        this.__mainWorkspace.getUserData("workspace").hide();
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
      
      /*
       * create new entry
       */
      core.subscribe("activate-calender-cell",function(e){
        var data = e.getData();
        var category = categories[Math.abs(data.row-1)];
        if( category )
        {
          core.publish("activate-category",category);
        }
        else
        {
          this.warn("No category associated to row number");
        }
      },this );      
      
      return ui;
      
    },
    
    _createMessageModule : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var messageBoard = new logbuch.module.MessageBoard( this.tr("logBUCH Messages") );
      core.register("messageBoard", messageBoard );  
      hbox.add( messageBoard, { flex : 3 } );
      
      var messageConsole = new logbuch.module.MessageConsole( this.tr("Message") );
      core.register("messageConsole", messageConsole );
      hbox.add( messageConsole, { flex : 1 } );
      
      // fake messages
      for( var i=0; i<20; i++ )
      {
        messageBoard.addMessage( new logbuch.component.Message( 
          new Date(),
          "D.B. Blubb GmbH",
          "Neuer Flugzeugtreibstoff auf der Grundlage von Erdbeereis gefunden!",
          "Man kann es <b>kaum</b> glauben: Aber <a href='http://www.google.de'>google</a> weiß alles über Dich! Holterdipolter und was weiß ich? Lirum larum Löffelstiel"
        ));
      }
      
      return hbox;
    },
    
    _createSetupDialog : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.Setup( this.tr("Setup project") );
      core.register("setup-project", left );  
      hbox.add( left, { flex : 1 } );
      
      var right = new logbuch.module.PersonForm( this.tr("Administrator") );
      core.register("setup-administrator", right );
      hbox.add( right, { flex : 1 } );
      
      return hbox;
    },
    
    _createRegistrationDialog : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        width   : 800,
        height  : 500,
        visibility : "hidden"
      });
      
      var left = new logbuch.module.Registration( this.tr("Registration") );
      core.register("registration", left );  
      hbox.add( left, { flex : 1 } );
      
      var right = new logbuch.module.PersonForm( this.tr("Personal Information") );
      right.setEnabled( false );
      core.register("personal-information", right );
      hbox.add( right, { flex : 1 } );
      
      left.addListener("completed",function(){
        right.setEnabled(true);
      },this);
      
      return hbox;
    },    
    
     /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
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