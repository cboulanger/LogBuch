/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * An abstract implementation of a category module that is displayed as 
 * a popup page
 */
qx.Class.define("logbuch.module.AbstractCategoryModule",
{
  extend : qx.ui.container.Composite,
  
  implement : [ 
    qcl.application.IModule, 
    qcl.application.IWidgetModule,
    qcl.application.IFormModule
  ],  
  
 /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  
  events :
  {
    /**
     * Can be used to indicate that a form has been completed.
     * @type qx.event.type.Event
     */
    "completed" : "qx.event.type.Event",
    
    /**
     * Can be used to indicate that some action on the card has been canceled.
     * @type qx.event.type.Event
     */
    "cancel" : "qx.event.type.Event"    
    
  },  
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function( name )
  {
    this.base(arguments);
    this.__name = name;
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
     * 
     * @type qcl.application.Sandbox
     */
    __sandbox : null, 
    
    /**
     * The name of the module
     * @type 
     */
    __name : null,
    
    /*
    ---------------------------------------------------------------------------
       INTERFACE METHODS
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Initializes the module
     * @param sandbox {qcl.application.Sandbox}
     */
    init : function( sandbox )
    {
      this.__sandbox = sandbox;
    },
    
    /**
     * Builds the UI
     */
	  build : function()
	  {
      var lc = this.__sandbox.getLayoutConfig();
      
      /*
       * basic layout
       */      
	    this.set({
	      layout           : new qx.ui.layout.VBox(),
        visibility       : "hidden",
        appearance       : "logbuch-category-page",
	      marginRight      : lc.getWorkspace().getMarginRight(),
        marginTop        : lc.getWorkspace().getMarginTop() + 
                           lc.getCalendar().getDateRowHeight() - 2,
        marginBottom     : lc.getWorkspace().getMarginBottom()                          
	    });
    },
    
    /**
     * Starts the module and attaches message subscribers to the sandbox
     */
    start : function()
    {
      this.__sandbox.subscribe("activate-category", this._onSandboxActivateCategory, this);
    },
    
    /**
     * Stops the module and removeds message subscribers
     */    
    stop : function()
    {
      this.__sandbox.unsubscribe("activate-category", this._onSandboxActivateCategory, this);
    },
    
    /**
     * Empty stub
     */
    getFormModel : function(){},
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    

    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */
    
    /**
     * Called when the "activate-category" message is received
     * @param e {qx.event.type.Data}
     */
    _onSandboxActivateCategory : function(e)
    {
      if ( e.getData() == this.__name )
      {
        this.show();  
      }
      else
      {
        this.hide();
      }
    },
    

    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns the category module's name
     * @return {String}
     */
    getName : function()
    {
      return this.__name; 
    },
    
    /**
     * Returns the category module's (translated) label
     * @return {String}
     */
    getLabel : function()
    {
      this.error("You need to implement getLabel()");
    },
    
    /**
     * Returns the category module's color
     * @return {String}
     */
    getColor : function()
    {
      return "logbuch-category-" + this.__name;
    },  
    
    dummy : null
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {

  }
});