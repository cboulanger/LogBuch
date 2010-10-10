/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * 
 */
qx.Class.define("logbuch.module.AbstractModule",
{
  extend : qx.ui.container.Composite,
  
  type : "abstract",
  
  implement : [ 
    qcl.application.IModule, 
    qcl.application.IWidgetModule
  ],  
  
 /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  
  events :
  {
    /**
     * Can be used to indicate that the user has completed some action
     * that needs to be performed in the module.
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
    if ( ! name )
    {
      this.error( "You must supply a name for this module!" );
    }    
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
     * The name of the module
     * @type 
     */
    __name : null,
    
    /**
     * Whether the UI has already been built
     * @type Boolean
     */
    __built : false,
    
    /*
    ---------------------------------------------------------------------------
       INTERFACE METHODS
    ---------------------------------------------------------------------------
    */    
    
    
    /**
     * This method must be called by the overriding method. It checks
     * that the widget is not build more than once.
     */
	  build : function( defaultLayout )
	  {
      if ( this.__built )
      {
        this.error( this.getName() + " has already been built!");
      }
      this.__built = true;
    },
    
    // overrridden
    show : function()
    {
      if ( ! this.__built )
      {
        this.build();
      }
      this.base(arguments);
    },
    
    /**
     * Starts the module and attaches message subscribers to the sandbox
     */
    start : function()
    {
      // does nothing
    },
    
    /**
     * Stops the module and removeds message subscribers
     */    
    stop : function()
    {
      // does nothing
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
    
    
    dummy : null
  }
});