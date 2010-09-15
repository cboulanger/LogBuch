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
    "cancel" : "qx.event.type.Event", 
    
    /**
     * Can be used to mark when the user focuses a row in the form contained on
     * the page
     * @type qx.event.type.Event
     */
    "focusRow" : "qx.event.type.Data", // FIXME rename "focus-row"
    
    /**
     * Can be used to indicated that a field is edited in extended mode. The
     * field name is sent as data
     * @type qx.event.type.Data
     */
    "edit-extended-field" : "qx.event.type.Data"
    
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
       INTERNAL METHODS
    ---------------------------------------------------------------------------
    */
    
    _extendField : function( field, name )
    {
      // fire event to grey out field
      this.fireDataEvent("edit-extended-field",name);
      
      if ( ! this.__extendedFields[name] )
      {
        var ef = new logbuch.component.ExtendedField( field, name, this.__form ).set({
          width  : field.getBounds().width + 40, // FIXME
          height : this.getBounds().height - 20// FIXME
        });
      
        this.getLayoutParent().add( ef, {
          left : 165, // FIXME
          top  : 44 //FIXME
        });
        
        this.__extendedFields[name] = ef;
      }
      else
      {
        var ef = this.__extendedFields[name];
      }
      
      ef.show();
      this.addListenerOnce("focusRow",function(){
      
      },this);
      
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
      this.error("Not implemented!");
    },
    
    /**
     * Returns the category module's translated item type
     * @return {String}
     */
    getItemType : function()
    {
      this.error("Not implemented!");
    },     
    
    /**
     * Returns the category module's color
     * @return {String}
     */
    getColor : function()
    {
      return "logbuch-category-" + this.__name;
    },
    
    /**
     * Saves the 
     */
    save : function()
    {
      this.fireDataEvent("focusRow",null);
      
      var bounds = this.getBounds(),
          acl    = logbuch.module.AccessControl.getInstance();
      acl.set({
        height  : bounds.height - 10
      }).setLayoutProperties({
        left : 5,
        top  : 5
      });
      acl.addListenerOnce("completed",function(){
        // save event
        dialog.Dialog.alert( this.tr("%1 saved.",  this.getItemType() ), function(){
          this.__sandbox.publish("activate-category",null);
        },this );
      },this);
      
      acl.show();
      
//      var selection= this.__form.getItems()['participants'].getSelection();
//      console.log(selection);
//      acl._addAllowedItems( selection );
    },    
    
    uploadPhotos : function()
    {
      var win =  new qx.ui.window.Window( this.tr("Upload photos") ).set({
        width  : 400,
        height : 400,
        layout : new qx.ui.layout.Grow()
      });
      win.add( new qx.ui.embed.Iframe("../html/fancyupload/multiple.html"));
      qx.core.Init.getApplication().getRoot().add( win );
      win.addListener("appear",win.center,win);
      win.open();
      
    },
    
    showPhotoGallery : function()
    {
      var win =  new qx.ui.window.Window( this.tr("Gallery") ).set({
        width  : 800,
        height : 600,
        layout : new qx.ui.layout.Grow()
      });
      win.add( new qx.ui.embed.Iframe("../html/mbgallery/gallery.php"));
      qx.core.Init.getApplication().getRoot().add( win );
      win.addListener("appear",win.center,win);
      win.open();
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