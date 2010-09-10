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
       * create initial layout config object
       */
      this.__layoutConfig = qx.data.marshal.Json.createModel( this.__layoutConfigInit, true);
      
      /*
       * create main layout and core application object, register
       * modules with core and add uninitialized module ui to 
       * the layout.
       */
      var ui = new qx.ui.container.Composite( new qx.ui.layout.Dock() );
      ui.set( this.__layoutConfigInit.viewport );
      var core = new qcl.application.Core();
      
      var header = new logbuch.module.Header();
      core.register("header", header );
      ui.add( header,{ edge : "north" } );
      
      var footer = new logbuch.module.Footer();
      core.register("footer", footer );
      ui.add( footer,{ edge : "south" } );      
      
      var sidebar = new logbuch.module.Sidebar();
      core.register("sidebar", sidebar );
      ui.add( sidebar,{ edge : "west" } );
      
      /*
       * main workspace stack
       */
      var workspace = new qx.ui.container.Composite( new qx.ui.layout.Canvas() );
      ui.add( workspace,{ edge : "center" } );
      
      var calendarModule = new logbuch.module.Calendar();
      core.register( "main", calendarModule );
      workspace.add( calendarModule, { edge: 0 } );
      
      var eventModule = new logbuch.module.Event();
      core.register( "event", eventModule );
      sidebar.addModule( eventModule );
      workspace.add( eventModule, { edge: 0 } );
      
      var goalModule = new logbuch.module.Goal();
      core.register( "goal", goalModule );
      sidebar.addModule( goalModule );
      workspace.add( goalModule, { edge: 0 } );

      var docModule = new logbuch.module.Documentation();
      core.register( "documentation", docModule );
      sidebar.addModule( docModule );
      workspace.add( docModule, { edge: 0 } );      

      var diaryModule = new logbuch.module.Diary();
      core.register( "diary", diaryModule );
      sidebar.addModule( diaryModule );
      workspace.add( diaryModule, { edge: 0 } );       
      
      var inspirationModule = new logbuch.module.Inspiration();
      core.register( "inspiration", inspirationModule );
      sidebar.addModule( inspirationModule );
      workspace.add( inspirationModule, { edge: 0 } );          
      
      /*
       * build and start all modules 
       */
      core.buildModules();
      core.startModules();
      
      /*
       * add the main layout to the document
       */
      this.getRoot().add( ui, { edge: 0 } );
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
