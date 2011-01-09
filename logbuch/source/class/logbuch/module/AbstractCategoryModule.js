/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(logbuch/icon/24/documents.png)
#asset(logbuch/icon/24/cloud.png)
#asset(logbuch/icon/24/photo.png)
#asset(logbuch/icon/24/cancel.png)
#asset(logbuch/icon/24/save.png)
#asset(logbuch/icon/24/calendar.png)
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
    },
    
    itemId :
    {
      check    : "Integer",
      nullable : true,
      event    : "changeItemId"
    },
    
    editable :
    {
      check   : "Boolean",
      init    : false,
      event   : "changeEditable"
    },
    
    deletable :
    {
      check   : "Boolean",
      init    : false,
      event   : "changeEditable"
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
    "edit-extended-field" : "qx.event.type.Data",
    
    /**
     * Can be used to indicated that a field is edited in extended mode. The
     * field name is sent as data
     * @type qx.event.type.Data
     */
    "load" : "qx.event.type.Event"    
    
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
      
      /*
       * remove item id when hidden FIXME
       */
      this.addListener("disappear",function(){        
        this.setItemId(null);
        this.__sandbox.removeApplicationState("itemId");
      },this);
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
    
    _getInitialExplanation : function( row )
    {
      return "Hier erscheinen Hilfen zu den einzelnen Feldern, wenn Sie in die Felder klicken.";
    },
    
    _getExplanation : function( row )
    {
      return "Keine Hilfe vorhanden";
    },
    
    _createRightColumn : function( grid, numRows )
    {
      var lc = this.__sandbox.getLayoutConfig();
      var rightColumnWidth  = lc.getEvent().getRightColumnWidth();
      
      /*
       * stack
       */
      var stack = new qx.ui.container.Stack();
      grid.add( stack, { row : 0, column : 3, rowSpan : numRows-1 } );
      
      /*
       * explanation
       */
      var explanationBox = new qx.ui.basic.Label().set({
        appearance : "logbuch-field",
        maxWidth   : rightColumnWidth,
        rich       : true,
        allowGrowY : true,
        allowGrowX : true,
        value      : this._getInitialExplanation()
      });
      stack.add( explanationBox );
      
      this.addListener("focusRow", function(e){
        stack.setSelection( [explanationBox] );
        attachmentButton.setValue(false);
        commentButton.setValue(false);
        explanationBox.setValue( this._getExplanation(e.getData()) || "");
      },this);
      stack.setSelection( [explanationBox] );
      
      /*
       * attachments
       */
      var attachmentBox = new logbuch.module.Attachments("attachments_" + this.getName() ).set({
        maxWidth : rightColumnWidth,
        category : this.getName()
      });
      attachmentBox.init( this.__sandbox );
      attachmentBox.build();
      
      this._controller.bind("model.id", attachmentBox, "itemId", {
        converter : function( id ) {
          attachmentBox.getIframe().setSource("about:blank"); // FIXME
          if ( id ){
            attachmentBox.setItemId( "" + id );
            //attachmentButton.setEnabled(false);
            attachmentBox.load();
            return "" + id;            
          }
          return ""; // FIXME
        }
      });
      
      
      this.bind("editable",attachmentBox,"editable");
      stack.add( attachmentBox );
      
      /*
       * buttons
       */
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        marginTop    : ( numRows == 7 ) ? 0 : 10,
        maxHeight    : 35,
        maxWidth     : rightColumnWidth
      });
      
      /*
       * attachment box button
       */
      var attachmentButton = new qx.ui.form.ToggleButton().set({
        icon : "logbuch/icon/24/documents.png",
        toolTipText : "Anhänge"//, // FIXME
//        enabled : false
      });
      
      attachmentBox.bind("length", attachmentButton, "label", {
        converter : function( v ){
          attachmentButton.setEnabled(true);
          switch ( v )
          {
            case 1: 
              return "1 Anhang";
            default:
              return v + " Anhänge";
          }
        }
      });
      
      attachmentButton.addListener("execute",function(){
        attachmentButton.setValue(true);
        stack.setSelection( [attachmentBox] );
        commentButton.setValue(false);        
      },this);

      /*
       * show attachments if requested
       */
      this.addListener("appear",function(){
        if( ! this.__sandbox.getApplicationState("showComments") ) // FIXME
        {
          stack.setSelection( [attachmentBox] );
          attachmentButton.setValue(true);
          commentButton.setValue(false);
        }
      },this);      
      
      hbox.add(attachmentButton);        
      
      /*
       * commments
       */
      var commentBox = new logbuch.module.Comments("comments_" + this.getName() ).set({
        category : this.getName(),
        maxWidth : rightColumnWidth
      });
      commentBox.init( this.__sandbox );
      commentBox.build();
      this.bind( "itemId", commentBox, "itemId" );
      stack.add( commentBox );
      
      /*
       * comment box button
       */
      var commentButton = new qx.ui.form.ToggleButton().set({
        icon : "logbuch/icon/24/cloud.png",
        toolTipText : "Kommentare"//, // FIXME
//        enabled : false
      }); 
      commentButton.addListener("execute",function(){
        commentButton.setValue(true);
        stack.setSelection( [commentBox] );
        attachmentButton.setValue(false);
      },this);
      
      commentBox.bind("length", commentButton, "label", {
        converter : function( v ){
          commentButton.setEnabled(true);
          switch ( v )
          {
            case 1: 
              return "1 Kommentar";
            default:
              return v + " Kommentare";
          }
        }
      });      
      
      
      /*
       * when the item editor becomes visible ...
       */
      this.addListener("appear",function(){
        
        /*
         * first show attachments to trigger the loading 
         * of the iframe
         */
        stack.setSelection( [attachmentBox] );
        commentButton.setValue(false);
        attachmentButton.setValue(true);        
        
        /*
         * if we're to show the comments, defer that a bit 
         */
        if( this.__sandbox.getApplicationState("showComments") )
        {        
          qx.util.TimerManager.getInstance().start(function(){
            stack.setSelection( [commentBox] );
            commentButton.setValue(true);
            attachmentButton.setValue(false);
            this.__sandbox.removeApplicationState("showComments");
          },null,this,null,100);
        }
      },this);          
      
      hbox.add(commentButton);
      
      this.addListener("disappear", function(){
        commentButton.setValue(false);
        attachmentButton.setValue(false);
        //this.__sandbox.removeApplicationState("showAttachments");
        this.__sandbox.removeApplicationState("showComments");
      },this);
      
      
      /*
       * Photo Gallery
       */
//      var button2 = new qx.ui.form.Button().set({
//        icon : "logbuch/icon/24/photo.png",
//        toolTipText : "Bilder" // FIXME
//      });
//      button2.addListener("execute",function(){
//        
//        var galleryUrl = "../html/gallery/index.php" +
//                        "?category="  + this.getName() + 
//                        "&itemId="    + this._controller.getModel().getId() + 
//                        "&sessionId=" + this.__sandbox.getSessionId() + 
//                        "&nocache="   + (new Date).getTime();  
//                        
//        if ( ! logbuch.__galleryWindow || logbuch.__galleryWindow.closed )
//        {
//          logbuch.__galleryWindow = window.open(galleryUrl);
//          if ( ! logbuch.__galleryWindow )
//          {
//            dialog.Dialog.alert("Kann die Fotogalerie nicht öffnen. Bitte deaktivieren Sie den Popup-Blocker.");
//            return;
//          }
//          this.addListener("appear",function(){
//            if ( logbuch.__galleryWindow )
//            {
//              logbuch.__galleryWindow.location.href = "../html/gallery/index.php" +
//                        "?category="  + this.getName() + 
//                        "&itemId="    + this._controller.getModel().getId() + 
//                        "&sessionId=" + this.__sandbox.getSessionId() + 
//                        "&nocache="   + (new Date).getTime(); 
//            }
//          },this);
//            this.addListener("disappear",function(){
//            if ( logbuch.__galleryWindow && ! logbuch.__galleryWindow.closed )
//            {
//              logbuch.__galleryWindow.location.href = "about:blank";
//            }
//          },this);          
//        }
//        else
//        {
//          logbuch.__galleryWindow.location.href = galleryUrl;
//        }
//        logbuch.__galleryWindow.focus();
//      },this);
//      hbox.add(button2);

      grid.add( hbox, { row : numRows-1, column : 3 } );
            
    },
    
    /**
     * Creates the author label
     * @return {}
     */
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
      hbox.add( label );
      var label2 =  new qx.ui.basic.Label().set({
        textColor : "logbuch-text-grey",
        value     : "[Direktlink]",
        alignY    : "bottom"
      });
      hbox.add( new qx.ui.core.Spacer(), {flex:1});
      label2.addListener("click",function(){
        dialog.Dialog.prompt("Direkter Link zu diesem Eintrag:",null,null,this._createDirectLink());
      },this);
      hbox.add( label2 );
      return hbox;
    },
    
    /**
     * Creates a Link that can be used to call the item directly.
     * returns HTML markup
     */
    _createDirectLink : function()
    {
      var dl = document.location;
      return dl.protocol + "//" + dl.host + dl.pathname +
        '#showItem~' + this.getName() + '/' + this.getItemId();
    },
    
    /**
     * Creates panel with Save, Send, and Cancel buttons
     * @return {qx.ui.container.Composite}
     */
    _createItemActionButtonPanel : function()
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        height    : 35  // FIXME
      });
      
      /*
       * save
       */ 
      var saveButton = new qx.ui.form.Button().set({
        icon : "logbuch/icon/24/save.png",
        toolTipText :  this.tr("Save")
      });
      saveButton.addListener("execute",this.save,this);
      this.bind( "editable", saveButton, "enabled" );
//      this.addListener("changeItemId",function(e){
//        if( ! e.getData() ){
//          saveButton.setEnabled(false);
//        }
//      },this);
      hbox.add(saveButton);
      
      /*
       * delete
       */ 
      var deleteButton = new qx.ui.form.Button().set({
        icon : "logbuch/icon/24/cancel.png",
        toolTipText :  this.tr("Delete")      
      });
      deleteButton.addListener("execute",this.deleteItem,this);
      this.bind( "deletable", deleteButton, "enabled" );
//      this.addListener("changeItemId",function(e){
//        if( ! e.getData() ){
//          deleteButton.setEnabled(false);
//        }
//      },this);      
      hbox.add(deleteButton);
      
      /*
       * close
       */
      var closeButton = new qx.ui.form.Button().set({
        icon        : "logbuch/icon/24/calendar.png",
        toolTipText : "Zurück zur Kalenderübersicht" // FIXME
        //label : "Schließen" // FIXME
      });
      closeButton.addListener("execute",this.close,this);
      hbox.add(closeButton);            

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
      this.setItemId( null );
      this.__sandbox.rpcRequest(
        "logbuch.category","read",[ this.getName(), itemData.id ],
        this._populateForms, this
      );
      this.fireEvent("load" );
    },
    
    /**
     * Populates the category form and the acl form with the server data
     * @param data {Object}
     * @return {void}
     */
    _populateForms : function( data )
    {
      this.__sandbox.hideNotification();
      
      /*
       * record id
       */
      this.setItemId( data.item.id );
      
      /*
       * make the module fields editable or not 
       */
      this.setEditable( data.editable );
      
      /*
       * make record deletable or not
       */
      this.setDeletable( data.deletable );
      
      /*
       * author label
       */
      if( data.authorLabel )
      {
        this.setAuthorLabel( data.authorLabel );
      }
      
      /*
       * form data
       */
      var aclModel  = qx.data.marshal.Json.createModel( data.acl ); 
      var itemModel = qx.data.marshal.Json.createModel( data.item );
      
      logbuch.module.AccessControl.getInstance().setModel( aclModel );
      this._controller.setModel( itemModel );
      
      this.__itemModel = itemModel; // save for resetting
      this.__oldData   = data.item;
      
      /*
       * show category 
       */
      this.__sandbox.publish("activate-category", this.getName() );
      
      this.show();
    },
    
    _check : function()
    {
      var data = this.getData();
      var oldData = this.__oldData;
      var oldContainsValues = false;
      var newContainsValues = false;
      var valuesChanged = false; 
      for ( var field in data )
      {
        switch ( field )
        {
          case "id":
            break;
            
          case "dateStart": 
          case "dateEnd":
          case "timeStart":
          case "timeEnd":
            if ( oldData[field] != data[field] )
            {
              valuesChanged = true;
            }
            break;
            
          case "participants":
            if ( qx.lang.Type.isArray( oldData[field] ) && oldData[field].count > 0 )
            {
              oldContainsValues = true;
            }
            if ( qx.lang.Type.isArray( data[field] ) && data[field].count > 0 )
            {
              newContainsValues = true;
              qx.lang.Array.equals( oldData[field], data[field] )
              {
                valuesChanged = true; 
              }
            }
            break;
            
          default:
            if ( oldData[field] )
            {
              oldContainsValues = true;
            }
            if ( data[field] ) 
            {
              newContainsValues = true;
              if ( oldData[field] != data[field] )
              {
                valuesChanged = true;
              }              
            }
            break;
        }
      }
//
//      console.warn( oldData );
//      console.warn( data );
//      console.warn( "oldContainsValues: " + oldContainsValues );
//      console.warn( "newContainsValues: " + newContainsValues );
//      console.warn( "valuesChanged: "  + valuesChanged);
      
      return {
        data : data,
        oldData : oldData,
        oldContainsValues : oldContainsValues,
        newContainsValues : newContainsValues,
        valuesChanged : valuesChanged
      };
    },
      
        
    
    /**
     * Saves category data after showing the ACL dialag
     */
    save : function()
    {
      var check = this._check();
      if ( ! check.newContainsValues ) 
      {
        dialog.Dialog.warning("Sie haben in diesem Datensatz keine Eingaben gemacht. Bitte füllen Sie mindestens ein Feld aus.");
        return;
      }
      
      this.fireDataEvent("focusRow",null);
      var acl = logbuch.module.AccessControl.getInstance();
      acl.set({
        callback : this._save,
        context  : this
      });
      var formModel = this._controller.getModel();
      if( formModel.getParticipants && formModel.getParticipants().length )
      {
        var participants = formModel.getParticipants().toArray();
        var members = acl.getModel().get('moreMembers').toArray();
        acl.getModel().set('moreMembers',  new qx.data.Array( qx.lang.Array.unique( qx.lang.Array.append(
          participants,members
        ) ) ) );
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
	      this._delete();
      },this);
    },   
    
    _delete : function()
    {      
      this.__sandbox.rpcRequest(
        "logbuch.category", "delete", 
        [ this.getName(), this._controller.getModel().getId() ], 
        function(){
          this.__sandbox.hideNotification();
          this.__sandbox.publish("activate-category",null);
          this.__sandbox.publish("reload-calendar",null);
        }, this
      );       
    },
    
    /**
     * Closes the category form
     */
    close : function()
    {
      var check = this._check();
      if ( ! check.oldContainsValues && ! check.newContainsValues ) 
      {
        this._delete();
        return;
      }
      else if ( check.valuesChanged )
      {
        dialog.Dialog.confirm( "Sie haben im Datensatz Veränderungen vorgenommen. Wollen Sie diese speichern?", function(save){ // FIXME
          if( save )
          {
            this._controller.setModel( qx.data.marshal.Json.createModel( check.data ) ); // hack
            this.save(); 
            return;
          }
          else
          {
            if ( ! check.oldContainsValues ) 
            {
              this._delete();
              return;
            }
          }
        },this); 
      }
      
      this._form.reset();
      this.__sandbox.publish("activate-category",null);
      this.hide();
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