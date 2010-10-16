/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(logbuch/*)
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
     PROPERTIES
  *****************************************************************************
  */
  
  properties : 
  {
    dateStart :
    {
      check    : "Date",
      nullable : true,
      event    : "changeDateStart"
    },
    
    dateEnd :
    {
      check    : "Date",
      nullable : true,
      event    : "changeDateEnd"
    },
    
    authorLabel :
    {
      check    : "String",
      nullable : true,
      event    : "changeAuthorLabel"
    }
  },
  
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
       "PROTECTED"
    ---------------------------------------------------------------------------
    */       

    /**
     * The form object
     * @type qx.ui.form.Form
     */
    _form : null,
    
    /**
     * The form controller
     * @type qx.data.controller.Form
     */
    _controller : null,
       
        
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
      var acl = logbuch.module.AccessControl.getInstance();
      if ( ! acl.sandbox ) acl.sandbox = this.__sandbox;
    },
    
    /**
     * Builds the UI
     * @param defaultLayout {Boolean} If false, do not create the standard 
     * category page layout. Otherwise, do.
     */
	  build : function( defaultLayout )
	  {
      this.base( arguments );
      
      this._form       = new qx.ui.form.Form(); 
      this._controller = new qx.data.controller.Form( null, this._form );
      
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
      this.__sandbox.subscribe("new-category-item", this._onSandboxNewCategoryItem, this);
      this.__sandbox.subscribe("activate-category", this._onSandboxActivateCategory, this);
      this.__sandbox.subscribe("load-category-item", this._onSandboxLoadCategoryItem, this);
      
      this.__sandbox.subscribe("change-date", function(e){
        this.setDateStart( e.getData() );
        this.setDateEnd( e.getData() );
      }, this);
    },
    
    /**
     * Stops the module and removeds message subscribers
     */    
    stop : function()
    {
      this.__sandbox.unsubscribe("new-category-item", this._onSandboxNewCategoryItem, this);
      this.__sandbox.unsubscribe("activate-category", this._onSandboxActivateCategory, this);
      this.__sandbox.unsubscribe("load-category-item", this._onSandboxLoadCategoryItem, this);
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
      if ( e.getData() != this.getName() )
      {
        this.hide();
      }
    },
    
    /**
     * Called when the "new-category-item" message is received
     * @param e {qx.event.type.Data}
     */
    _onSandboxNewCategoryItem : function(e)
    {
      var data = e.getData();
      if ( data.category != this.getName() )
      {
        return;
      }
      this.create( data.date );
    },
    
    _onSandboxLoadCategoryItem  : function(e)
    {
      var data = e.getData();
      if ( data.category != this.getName() )
      {
        return;
      }
      this.load( data );
    },    

    
    /*
    ---------------------------------------------------------------------------
       WIDGET CREATION
    ---------------------------------------------------------------------------
    */
    
    _extendField : function( field, name, label )
    {
      // fire event to grey out field
      this.fireDataEvent("edit-extended-field",name);
      
      if ( ! this.__extendedFields[name] )
      {
        var ef = new logbuch.component.ExtendedField( field, name, this._form, label, this._controller ).set({
          width  : field.getBounds().width + 40, // FIXME
          height : this.getBounds().height - 55// FIXME
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
      
      
//      // documents
//      var button4 = new qx.ui.form.Button( null, "logbuch/icon/24/documents.png" ).set({
//        toolTipText :this.tr("Documents")
//      });
//      button4.addListener("execute",this.showAttachments,this);
//      hbox.add(button4);      
//      
//      // photos
//      var button2 = new qx.ui.form.Button( null, "logbuch/icon/24/photo.png" ).set({
//        toolTipText :this.tr("Photo Gallery")
//      });
//      button2.addListener("execute",this.showPhotoGallery,this);
//      hbox.add(button2);
//      
//      // discussion
//      var button3 = new qx.ui.form.Button( null, "logbuch/icon/24/cloud.png" ).set({
//        toolTipText :this.tr("Discussion")
//      });
//      button3.addListener("execute",this.showDiscussion,this);
//      hbox.add(button3);
//      
//      // upload
//      var button1 = new qx.ui.form.Button( null, "logbuch/icon/24/arrow-up.png").set({
//        toolTipText : this.tr("Upload Files")
//      });
//      button1.addListener("execute",this.uploadPhotos,this);
//      hbox.add(button1);

      // spacer
      hbox.add( new qx.ui.core.Spacer(), {flex:1});
      
      // close
      var button = new qx.ui.form.Button(this.tr("Close")); //,"logbuch/icon/24/cancel.png").set({
      button.addListener("execute",this.close,this);
      hbox.add(button);      
      
      grid.add( hbox, { row : numRows-1, column : 3 } );     
    },
    
    
    _createAuthorLabel : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox() );
      var label =  new qx.ui.basic.Label().set({
        textColor : "logbuch-text-grey",
        rich      : true,
        alignY    : "bottom"
      });
      this.addListener("changeAuthorLabel", function(e){
        label.setValue( 
          this.tr("Created by %1", e.getData() )  
        ); 
      },this);
      hbox.add( label, {flex:1} );
      return hbox;
    },
    
    /**
     * Creates panel with Save, Send, and Cancel buttons
     * @return {qx.ui.container.Composite}
     */
    _createItemActionButtonPanel : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        height    : 30  // FIXME
      });
      
      // save 
      var button = new qx.ui.form.Button(this.tr("Save"));//,"logbuch/icon/24/save.png").set({
      button.addListener("execute",this.save,this);
      hbox.add(button);
      this.__saveButton = button;
      
      
      // delete 
      var deleteButton = new qx.ui.form.Button(this.tr("Delete"));//,"logbuch/icon/24/save.png").set({
      deleteButton.addListener("execute",this.deleteItem,this);
      deleteButton.setEnabled(false);
      this.__deleteButton = deleteButton;
      hbox.add(deleteButton);
      
      // invite/Send
//      var button = new qx.ui.form.Button(null,"logbuch/icon/24/mail.png").set({
//        toolTipText : this.tr("Send")
//      });
//      button.addListener("execute",this.send,this);
//      hbox.add(button,{flex:1});
      
      return hbox;
    },
    
    
    /**
     * Takes a date object and a string time and returns a new date with the
     * given time
     * @param date {Date} A date object which must be at 00:00
     * @param time {String} A string of the format HH:mm
     * @return {Date}
     */
    _getDateTime : function( date, time )
    {
      var t = time.split(":");
      return new Date( date.getTime() + ( parseInt(t[0]) * 1000 * 60 * 60 ) + ( parseInt(t[1]) * 1000 * 60 ) ); 
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
    
    getModel : function()
    {
      return this._controller.getModel() || this._controller.createModel();
    },
    
    setModel : function()
    {
      return this._controller.setModel(model);
    },
    
    getData : function()
    {
       return qx.util.Serializer.toNativeObject( this.getModel() );
    },   
    
    getRpcSafeData : function()
    {
      return qx.util.Json.parse( qx.util.Serializer.toJson( this.getModel() ) );      
    },
    
    /**
     * Creates messages from the category data
     * @return {Array}
     */
    createMessages : function()
    {
      this.error("Not implemented in category " + this.getName() );
    },     
    
    
    /**
     * Creates a category item of the current type
     */    
    create : function( date )
    {
      if ( ! date instanceof Date )
      {
        this.error("Argument must be a Date object");
      }
      
      /*
       * reset forms
       */
      this._form.reset();
      logbuch.module.AccessControl.getInstance().reset();
      
      /*
       * create item on the server
       */
      this.__isUnsaved = true;
      this.__sandbox.showNotification(this.tr("Creating %1", this.getLabel() ) );
      this.__sandbox.rpcRequest(
        "logbuch.category", "create", 
        [ this.getName(), date.toString() ], 
        this._populateForms, this 
      );

    },
        
    /**
     * Populates the category form and the acl form with the server data
     * @param itemData {Object} 
     * @return {void}
     */
    load : function( itemData )
    {
      this._form.reset();
      this.__sandbox.showNotification(this.tr("Loading record ..."));
      this.__sandbox.publish("activate-category", this.getName() );
      this.__sandbox.rpcRequest(
        "logbuch.category","read",[ this.getName(), itemData.id ],
        this._populateForms, this
      );
    },
    
    /**
     * Populates the category form and the acl form with the server data
     * @param data {Object}
     * @return {void}
     */
    _populateForms : function( data )
    {
      this.__sandbox.hideNotification();
      
      if( data.authorLabel )
      {
        this.setAuthorLabel( data.authorLabel );
      }
      
      var aclModel  = qx.data.marshal.Json.createModel( data.acl ); 
      var itemModel = qx.data.marshal.Json.createModel( data.item );
      
      logbuch.module.AccessControl.getInstance().setModel( aclModel );
      this._controller.setModel( itemModel );
      
      this.__itemModel = itemModel; // save for resetting
      
      this.__deleteButton.setEnabled( data.allowDelete );
      
      this.__sandbox.publish("activate-category", this.getName() );
      
      this.show();
    },
        
    
    /**
     * Saves category data after showing the ACL dialag
     */
    save : function()
    {
      this.fireDataEvent("focusRow",null);
      var acl = logbuch.module.AccessControl.getInstance();
      acl.set({
        callback : this._save,
        context  : this
      });
      if( this._controller.getModel().getParticipants )
      {
        acl.getModel().set('moreMembers',  this._controller.getModel().getParticipants() );
      }
      acl.show();
    },
      
    
    /**
     * Called when acl data has been set, 
     */
    _save : function( proceed )
    {
      if ( ! proceed ) return;
      
      var itemData = this.getData();
      var aclData  = logbuch.module.AccessControl.getInstance().getData();
      
      var id = itemData.id;
      delete itemData.id;
      
      this.__sandbox.showNotification(this.tr("Updating %1", this.getLabel() ) );
      this.__sandbox.rpcRequest(
        "logbuch.category", "update", 
        [ this.getName(), id, itemData, aclData ], 
        function(){
          this.__sandbox.hideNotification();
          this.__sandbox.publish("activate-category",null);
          if ( ! this.__isUnsaved )
          {
            this.__sandbox.publish("reload-calendar");  
          }
          this.__isUnsaved = false;
        }, this
      );
    },    
    
    /**
     * Deletes the current category data
     */
    deleteItem : function()
    {
      dialog.Dialog.confirm( this.tr("Do you really want to delete this item?"), function(yes){
        if ( ! yes ) return;
	      this.__sandbox.showNotification(this.tr("Deleting %1", this.getLabel() ) );
	      this.__sandbox.rpcRequest(
	        "logbuch.category", "delete", 
	        [ this.getName(), this._controller.getModel().getId() ], 
	        function(){
	          this.__sandbox.hideNotification();
	          this.__sandbox.publish("activate-category",null);
	          this.__sandbox.publish("reload-calendar",null);
	        }, this
	      );      
      },this);
    },   
    
    /**
     * Closes the category form
     */
    close : function()
    {
      if ( false ) //this.__isUnsaved )
      {
//        dialog.Dialog.select( 
//          this.tr("You have not yet saved this record. Do you want to save or discard it?"),
//          [ { label: this.tr("Save"), value: true}, { label: this.tr("Discard"), value: false} ],
//          function( doSave ){
//            if ( doSave === true ) {
//              this.save();
//            } else {
//              this.deleteItem();
//            }
//          },this, false
//        ); 
      }
      else
      {
	      this._form.reset();
	      this.__sandbox.publish("activate-category",null);      
	      this.__deleteButton.setEnabled( false );
	      this.hide();
      }
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