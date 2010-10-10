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
			  marginTop   : lc.getWorkspace().getMarginTop()-2,
			  marginRight : lc.getCalendar().getHGridLineWidth(),
			  marginLeft  : lc.getSidebar().getMarginLeft()
			});
      
	    var yearBox = new qx.ui.container.Composite().set({
	      layout      : new qx.ui.layout.HBox(1),
	      appearance  : "logbuch-label-box",
	      height      : lc.getCalendar().getDateRowHeight()
	    }); 
      yearBox.add( new qx.ui.core.Spacer(), {flex:1});
      this.addBefore( yearBox, this.getChildren()[0] );
      
      this.__sandbox.subscribe("activate-category",function(e){
        if ( e.getData() !== null )
        {
          yearBox.addState("disabled");
        }
        else
        {
          yearBox.removeState("disabled");
        }
      },this );
      
	    var yearLabel = new qx.ui.basic.Label().set({
	      font        : "logbuch-label-box",
        alignY      : "middle"
	    });
      yearBox.add(yearLabel);
      
      this.__sandbox.subscribe("change-date",function(e){
        yearLabel.setValue( "" + e.getData().getFullYear() );
      },this );
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