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
qx.Class.define("logbuch.module.AbstractCategoryModule",
{
  extend : logbuch.module.AbstractModule,
  
  //type : "abstract",
   
  implement : [  
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
     * @param defaultLayout {Boolean} If false, do not create the standard 
     * category page layout. Otherwise, do.
     */
	  build : function( defaultLayout )
	  {
      this.base( arguments );
      
      var lc = this.__sandbox.getLayoutConfig();
      
      /*
       * basic layout
       */
      if ( defaultLayout !== false )
      {
		    this.set({
		      layout           : new qx.ui.layout.VBox(),
	        visibility       : "hidden",
	        appearance       : "logbuch-category-page",
		      marginRight      : lc.getWorkspace().getMarginRight(),
	        marginTop        : lc.getWorkspace().getMarginTop() + 
	                           lc.getCalendar().getDateRowHeight() - 2,
	        marginBottom     : lc.getWorkspace().getMarginBottom()                          
		    });
      }
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
    
    _extendField : function( field, name, label )
    {
      // fire event to grey out field
      this.fireDataEvent("edit-extended-field",name);
      
      if ( ! this.__extendedFields[name] )
      {
        var ef = new logbuch.component.ExtendedField( field, name, this.__form, label ).set({
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
    
    _createRightColumn : function( grid, numRows )
    {
      var lc = this.__sandbox.getLayoutConfig();
      var rightColumnWidth  = lc.getEvent().getRightColumnWidth();
      
      /*
       * attachments
       */
      var name = this.getName() + "-attachments";
      var attachments = new logbuch.module.Attachments( name, attachments ).set({
        maxWidth : rightColumnWidth
      });
      this.__sandbox.register(name, attachments);
      attachments.show();
      grid.add( attachments, { row : 0, column : 3, rowSpan : numRows-1 } );

      /*
       * buttons
       */
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        marginTop    : ( numRows == 7 ) ? 0 : 10,
        maxHeight    : 30,
        maxWidth     : rightColumnWidth
      });
      
      
      // documents
      var button4 = new qx.ui.form.Button( null, "resource/logbuch/icon/24/documents.png" ).set({
        toolTipText :this.tr("Documents")
      });
      button4.addListener("execute",this.showAttachments,this);
      hbox.add(button4);      
      
      // photos
      var button2 = new qx.ui.form.Button( null, "resource/logbuch/icon/24/photo.png" ).set({
        toolTipText :this.tr("Photo Gallery")
      });
      button2.addListener("execute",this.showPhotoGallery,this);
      hbox.add(button2);
      
      // discussion
      var button3 = new qx.ui.form.Button( null, "resource/logbuch/icon/24/cloud.png" ).set({
        toolTipText :this.tr("Discussion")
      });
      button3.addListener("execute",this.showDiscussion,this);
      hbox.add(button3);
      
      // spacer
      hbox.add( new qx.ui.core.Spacer(), {flex:1});
      
      // upload
      var button1 = new qx.ui.form.Button( null, "resource/logbuch/icon/24/arrow-up.png").set({
        toolTipText : this.tr("Upload Files")
      });
      button1.addListener("execute",this.uploadPhotos,this);
      hbox.add(button1);
      
      grid.add( hbox, { row : numRows-1, column : 3 } );     
    },
    
    
    _createAuthorLabel : function()
    {
      var label =  new qx.ui.basic.Label().set({
        textColor : "background-application",
        rich      : true,
        font      : "bold"
      });
      
      label.setValue("Eintragung von: Max Mustermann, Oberammergauer Altmetallverarbeitungs GmbH");
      
      return label;
    },
    

    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
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
      return "logbuch-category-" + this.getName();
    },
    
    /**
     * Saves the 
     */
    save : function()
    {
      this.fireDataEvent("focusRow",null);
      
      var acl = logbuch.module.AccessControl.getInstance();
      
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
    
    send : function()
    {
      dialog.Dialog.alert("Ich tu jetzt so, als würde ich was senden.");
    },
    
    uploadPhotos : function()
    {
      var win =  new qx.ui.window.Window( this.tr("Upload photos") ).set({
        width  : 400,
        height : 400,
        layout : new qx.ui.layout.Grow(),
        backgroundColor : "transparent"
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
    
    showDiscussion : function()
    {
      
    },
    
    showAttachments : function()
    {
      
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