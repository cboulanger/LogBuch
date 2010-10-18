/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(qx/icon/${qx.icontheme}/32/mimetypes/*)

************************************************************************ */

/**
 * 
 */
qx.Class.define("logbuch.module.Attachments",
{
  extend : logbuch.module.AbstractModule,

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function( name )
  {
    this.base(arguments, name );
  },    
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
    clientUrl :
    {
      check : "String",
      init  : "../html/valums/client/index.php"
    },
    
    category :
    {
      check : "String",
      nullable : true
    },
    
    itemId :
    {
      check : "String",
      nullable : true
    }
    
  },  
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    

  events : 
  {
    
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
      this.base(arguments, false);
      this.setLayout(new qx.ui.layout.VBox(5));
      this.setAppearance("logbuch-access-control");
      
      this.__iframe = new qx.ui.embed.Iframe().set({
        decorator : null
      });
      this.add( this.__iframe, {flex:1} );
    },
    
 
 
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */
    

    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    load : function()
    {
      this.__iframe.setSource( 
        this.getClientUrl() + 
        "?category="  + this.getCategory() + 
        "&itemId="    + this.getItemId() + 
        "&sessionId=" + this.__sandbox.getSessionId() + 
        "&nocache="   + (new Date).getTime()
      );
      
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