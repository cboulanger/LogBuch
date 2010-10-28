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
      check     : "String",
      nullable  : true,
      event     : "changeCategory",
      apply     : "_applyCategory"
    },
    
    itemId :
    {
      check     : "String",
      nullable  : true,
      event     : "changeItemId",
      apply     : "_applyItemId"
    },
    
    editable :
    {
      check     : "Boolean",
      init      : false,
      event     : "changeEditable"
    },
    
    /*
     * number of attachments
     */
    length :
    {
      check     : "Integer",
      init      : 0,
      event     : "changeLength"
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
       APPLY METHODS
    ---------------------------------------------------------------------------
    */       

    _applyCategory : function( value, old )
    {
      // FIXME 
    },
    
    _applyItemId : function( value, old )
    {
      //
    },
    
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
      
      // communication with iframe
      this.__iframe.addListener("load",function(){
        this.__iframe.getDocument().__parentWidget = this;
      },this);      
      
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
        "&editable="  + ( this.getEditable() ? "1" : "0" ) + 
        "&nocache="   + (new Date).getTime()
      );
    },
    
    getIframe: function()
    {
      return this.__iframe;
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