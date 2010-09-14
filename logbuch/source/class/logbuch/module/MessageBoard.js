/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * the login Widget 
 */
qx.Class.define("logbuch.module.MessageBoard",
{
  extend : logbuch.component.IndexCard,
  
  implement : [ qcl.application.IModule, qcl.application.IWidgetModule ],

 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   * @param label {String}
   */
  construct : function( label, icon )
  {
    this.base(arguments, label, icon );
    this.__vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5)).set({
      appearance : "logbuch-field"
    }); // @todo add separator FIXME
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
     * The vbox containing the messages
     * @type qx.ui.container.Composite
     */
    __vbox : null,
    

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
      this.getChildControl("container").set({
        layout : new qx.ui.layout.VBox(),
        paddingBottom : 50
      });
	    
      var scroller =  new qx.ui.container.Scroll();
      scroller.add( this.__vbox );
      this.add( scroller, {flex : 1} );
	    
    },
    
    start : function(){},
    stop : function(){},
    
    /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
    /**
     * Adds a message to the messageboard
     * @param {} message
     */
    addMessage : function( message )
    {
      if ( this.__vbox.hasChildren() )
      {
        this.__vbox.addBefore( message, this.__vbox.getChildren()[0] );
      }
      else
      {
        this.__vbox.add( message );
      }
    }
    
  }
});
