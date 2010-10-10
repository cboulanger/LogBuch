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
 * The category box
 */
qx.Class.define("logbuch.module.CategoryBox",
{
  extend : qx.ui.container.Composite,
  
 
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  /**
   * Creates a new category box
   * @param categoryModule {logbuch.module.AbstractCategoryModule}
   * @param sandbox {qcl.application.Sandbox}
   */
  construct : function( categoryModule, sandbox )
  {
    this.base(arguments);    
    this.__sandbox = sandbox;
    this.__name  = categoryModule.getName();
    this.__color = categoryModule.getColor();
    
    /*
     * build UI
     */
    var lc = this.__sandbox.getLayoutConfig();
    this.set({
      layout      : new qx.ui.layout.VBox(1),
      appearance  : "logbuch-label-box",
      height      : lc.getCalendar().getBoxHeight() - 5
    }); 
    
    this.add( new qx.ui.core.Spacer(), {flex:1} );
    var label = new qx.ui.basic.Label( categoryModule.getLabel() );
    label.set({
      font        : "logbuch-label-box",
      alignX      : "right"
    });
    
    this.add( label );    
    
    /*
     * mouseover effect
     */
    this.addListener("mouseover", function(){
      this.setBackgroundColor( this.__color );
    },this);
    this.addListener("mouseout", function(){
      this.resetBackgroundColor();
    },this);
    
    /*
     * listen or activate message
     */
    this.__sandbox.subscribe("activate-category",function(e){
      
      /*
       * activate this box
       */
      if ( e.getData() == this.__name )
      {
        this.setActivated( true );
        this.removeState("disabled");
      }
      
      /*
       * if another category is active, disable this one
       */
      else if ( e.getData() !== null )
      {
        this.setActivated( false );
        this.addState("disabled");
      }
      
      /*
       * no category is active, this box is not active but enabled
       */
      else
      {
        this.setActivated( false );
        this.removeState("disabled");
      }
      
      
    },this);
  },
  
  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */  
  properties :
  {
    activated : 
    {
      check : "Boolean",
      init  : false,
      event : "changeActivated",
      apply : "_applyActivated"
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
     * The parent's widget sandbox
     * @type qcl.application.Sandbox
     */
    __sandbox : null,
    
    /**
     * The name of the category
     * @type String
     */
    __name : null,
    
    /**
     * The color of the module
     * @type 
     */
    __color : null,
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    
    _applyActivated : function( value, old )
    {
      if ( value )
      {
        this.setBackgroundColor( this.__color );  
      }
      else
      {
        this.resetBackgroundColor();
      }
    },
    
    dummy : null
  }
});