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
 * The header
 */
qx.Class.define("logbuch.module.Sidebar",
{
  extend : qx.ui.container.Composite,
  
  implement : [ qcl.application.IModule, qcl.application.IWidgetModule ],
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  construct : function()
  {
    this.base(arguments);
    this.hide();
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
    __index : null,
   
    /**
     * 
     * @type qcl.application.Sandbox
     */
    __sandbox : null,
    
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
			this.set({
			  layout      : new qx.ui.layout.VBox(lc.getCalendar().getHGridLineWidth()),
			  width       : lc.getSidebar().getWidth(), 
			  marginTop   : lc.getSidebar().getMarginTop(), 
			  marginRight : lc.getCalendar().getHGridLineWidth(),
			  marginLeft  : lc.getSidebar().getMarginLeft()
			});
	  },
    
    start : function(){},
    stop : function(){},
    
    /*
    ---------------------------------------------------------------------------
       SIDEBAR METHODS
    ---------------------------------------------------------------------------
    */
    
    /**
     * Adds a category box to the sidebar, given the category module
     * @param categoryModule {logbuch.module.AbstractCategoryModule}
     */
    addModule : function( categoryModule )
    {      
      var categoryWidget = new logbuch.module.CategoryBox( categoryModule, this.__sandbox );
      this.add( categoryWidget );      
    }
    
  }
});