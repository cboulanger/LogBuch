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
    this.__index = {};
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
			  layout      : new qx.ui.layout.VBox(lc.getCalendarDayBox().getHorizontalGridLineWidth()),
			  width       : lc.getSidebar().getWidth(), 
			  marginTop   : lc.getSidebar().getMarginTop(), 
			  marginRight : lc.getCalendarDayBox().getHorizontalGridLineWidth(),
			  marginLeft  : lc.getSidebar().getMarginLeft()
			});
         
	    var categories = ["Termine","Zielplanung","Dokumentation","Tagebuch","Inspiration"]; // FIXME
      for( var i=0; i < categories.length; i++ )
      {
        var categoryId    = categories[i]; // FIXME
        var categoryName  = categories[i]; // FIXME
        var categoryWidget = new logbuch.module.Category( categoryName, this.__sandbox );
        categoryWidget.setHeight( lc.getCalendarDayBox().getHeight() - 5 );
        this.__index[categoryId] = categoryWidget;
        this.add( categoryWidget );
      }
	  },
    
    start : function(){},
    stop : function(){}
    
    
  }
});