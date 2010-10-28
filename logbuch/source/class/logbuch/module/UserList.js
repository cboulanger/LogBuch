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
 * the setup Widget 
 */
qx.Class.define("logbuch.module.UserList",
{
  extend : logbuch.component.IndexCard,

  implement : [ 
    qcl.application.IModule, 
    qcl.application.IWidgetModule
  ],

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
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
      this._build("person");
    },
    
    /**
     * Implementation
     */
    _build : function( modelType )
    {
      this.getChildrenContainer().setLayout( new qx.ui.layout.VBox(5) );
      this.__modelType = modelType;
      
      if ( modelType == "person" )
      {
      
	      /*
	       * company / organization
	       */
	      var organizationField  = new logbuch.component.InputField( this.tr("Company/Organization" ), null, "selectbox" );
	      
	      var selectBoxController1 = new qx.data.controller.List(null,organizationField.getInputControl(),"label").set({
	        iconPath : "icon",
	        iconOptions : {
	          converter : function( value ){
	            return ( value ? "../html/fancyupload/uploads/16/" + value : null );
	          }
	        }
	      });
	      selectBoxController1.setDelegate({
	        bindItem : function(controller, item, id) {
	          controller.bindDefaultProperties(item, id);
	          controller.bindProperty("value", "model", null, item, id);
	        }
	      });
	      this.__organizationSelectBox = selectBoxController1;
	      selectBoxController1.addListener("changeSelection",this._loadList,this);
	      
        /*
         * (re) load organization list on appear and on change
         */
        var loadOrganizationListFunc = function(){
         this.__sandbox.rpcRequest( 
            "logbuch.record", "list", 
            [ null, "organization", null, "name"],
            function( listModel ){
              listModel.unshift( { label: ""+this.tr("All participating organizations"), icon:null, value:null});
              selectBoxController1.setModel( qx.data.marshal.Json.createModel(listModel) );
            }, this
          );
        };
        organizationField.addListenerOnce("appear",loadOrganizationListFunc,this);   
        this.__sandbox.subscribeToChannel("organizations-updated",loadOrganizationListFunc, this);
        
	      this.add( organizationField );
	      
	      /*
	       * Position/Role
	       */
	      var roleField = new logbuch.component.InputField( this.tr( "Project role" ), null, "selectbox" );
	      var selectBoxController2 = new qx.data.controller.List(null,roleField.getInputControl(),"label");
	      selectBoxController2.setDelegate({
	        bindItem : function(controller, item, id) {
	          controller.bindDefaultProperties(item, id);
	          controller.bindProperty("value", "model", null, item, id);
	        }
	      });
	      selectBoxController2.addListener("changeSelection",this._loadList,this);
	      this.__roleSelectBox = selectBoxController2;
	      roleField.addListenerOnce("appear",function(){
	       this.__sandbox.rpcRequest( 
	          "logbuch.record", "getRoleList", 
	          [ null, "role" ],
	          function( listModel ){
	            listModel.unshift( { label: ""+this.tr("All roles"), icon:null, value:null});
	            selectBoxController2.setModel( qx.data.marshal.Json.createModel(listModel) );
	          }, this
	        );
	      },this);
	      this.add( roleField );
      
      }

      
      /*
       * user list
       */
      var list = this.__list = new qx.ui.list.List().set({
        selectionMode : "single",
        itemHeight : 70,
        labelPath: "label",
        iconPath: "icon",
        iconOptions : {
          converter : function(value){
            if ( value ){
              return "../html/fancyupload/uploads/64/" + value; //FIXME 
            }
            return  "../html/fancyupload/assets/person.jpg";
          }
        },
        delegate : {
	        configureItem : function(item) {
	          item.setRich(true);
	        }
        }
      });
      
      /*
       * load list on appear
       */
      if ( modelType == "organization" )
      {
        list.addListener("appear", this._loadList, this );
        this.__sandbox.subscribeToChannel("organizations-updated",function(){
          if ( this.isSeeable() )
          {
            this._loadList();
          }
        }, this);
      }

      /*
       * remove selection on appear
       */
      list.addListener("appear",function(){
        list.getSelection().removeAll();
      },this);
      
      /*
       * load data in external editor when selected
       */
      list.getSelection().addListener("change",function(e){
        var selection = list.getSelection();
        if( selection.length )
        {
          this.fireDataEvent("action", {
            'action' : 'load',
            'id'     : selection.getItem(0).getValue()
          });          
        }
      },this);
      
      /*
       * update list when changed
       */
      this.getUserData("buddy").addListener("action",function(e){
        var data = e.getData();
        if ( data.action == "update" )
        {
          list.getModel().forEach( function(item) {
            if ( item.getValue() == data.id )
            {
              item.set( data.data );
            }
          }, this);
        }
      },this);
      
      this.add( list, {flex:1} );
      
      /*
       * buttons
       */
      var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      this.add(hbox);
      this.__sandbox.bindPermissionState("logbuch.members.manage", hbox, "visibility", {
        converter : function( v ){ return v ? "visible" : "excluded"; }
      });      
      
      
      /*
       * add 
       */
      var addButton = new qx.ui.form.Button(null, "qcl/icon/button-plus.png");
      hbox.add(addButton);
      this.__sandbox.bindPermissionState("logbuch.members.manage", addButton, "enabled");// FIXME
      addButton.addListener("execute", function(){
        this.__sandbox.showNotification(this.tr("Creating new record ..."));
        this.__sandbox.rpcRequest( 
          "logbuch.record", "create", [ null, modelType ],
          function(data){
            this.__sandbox.hideNotification();
            var itemModel = qx.data.marshal.Json.createModel( data );
            list.getPane().getRowConfig().setItemSize(list.getModel().getLength(), 64);
            list.getModel().unshift( itemModel );
            list.getSelection().removeAll();
            list.getSelection().push( itemModel );
          }, this
        );
      }, this);

      /*
       * remove
       */
      var removeButton = new qx.ui.form.Button(null,"qcl/icon/button-minus.png");
      hbox.add(removeButton);
      removeButton.setEnabled(false);
      list.getSelection().addListener( "change", function(){
        removeButton.setEnabled( 
          list.getSelection().getLength() > 0 
          //&& this.__sandbox.hasPermission( "qcl.users.delete" ) 
        ); 
      }, this);
      removeButton.addListener("execute", function(){
        dialog.Dialog.confirm( 
          this.tr("Are you sure you want to remove the selected item(s)?"), function(proceed){
            var itemModel = list.getSelection().getItem(0);
		        this.__sandbox.rpcRequest( 
		          "logbuch.record", "delete", [ null, modelType, itemModel.getValue() ],
		          function( data ){
		            list.getSelection().removeAll();
                list.getModel().remove( itemModel );
                this.fireDataEvent("action",{
                  'action' : 'deleted'
                });
		          }, this
		        );
          }, this
        );
      }, this);
      hbox.add( new qx.ui.core.Spacer(), {flex:1} );
      
      /*
	     * reload
	     */
	    
	    
	    /*
	     * reset password
	     */
      if ( modelType == "person")
      {
	      var resetPwButton = new qx.ui.form.Button(this.tr("Reset Password")).set({
          'visibility' : "excluded"
        });
        this.__sandbox.bindPermissionState( "logbuch.password.reset", resetPwButton, "visibility",{
          converter : function(value) { return value ? "visible": "excluded"; }
        })
	      hbox.add(resetPwButton);
        list.getSelection().addListener("change",function(){
          resetPwButton.setEnabled( list.getSelection().length > 0 );
        },this);
	      resetPwButton.addListener("execute", function(){
          this.__sandbox.rpcRequest(
            "logbuch.registration", "resetPassword", 
            [ list.getSelection().getItem(0).getValue() ]
          );
        },this);
      }
    },
    
    _loadList : function()
    {
      if ( this.__isLoading ) return;

      var list = this.__list;
      
      /*
       * disable and clear controls
       */
      this.setEnabled(false);
      list.resetModel();
      list.getSelection().removeAll();
      
      /*
       * filter
       */
      var where, orderBy;
      if (  this.__organizationSelectBox )
      {
        var orgSel  = this.__organizationSelectBox.getSelection();
	      var roleSel = this.__roleSelectBox.getSelection();
	      where  = {};
	      if ( orgSel.length > 0 && orgSel.getItem(0) !== null )
	      {
	        where['organizationId'] = orgSel.getItem(0);
	      }
	      if ( roleSel.length > 0 && roleSel.getItem(0) !== null )
	      {
	        where['position'] = roleSel.getItem(0);
	      }
	      if ( ! ( 'organizationId' in where || 'position' in where) )
	      {
	        where = null;
	      }
        orderBy = "familyName";
      }
      else
      {
        where = null;
        orderBy = "name";
      }
     
      /*
       * load
       */
      this.__isLoading = true;
      this.__sandbox.showNotification(this.tr("Loading list ..."));
      this.__sandbox.rpcRequest( 
        "logbuch.record", "list", 
        [ null, this.__modelType, where, orderBy ],
        function( data ){
          this.__isLoading = false;
          this.__sandbox.hideNotification();
          this.setEnabled(true);
          var model = qx.data.marshal.Json.createModel( data );
          list.setModel( model );
          // FIXME replace with itemHeight?
          var rowConfig = list.getPane().getRowConfig();
          for (var i = 0; i < model.length; i++)
          {
            rowConfig.setItemSize(i, 70);//
          }
        }, this
      );      
    },
    
    
    
    start : function(){},
    stop : function(){},
    
    /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
    dummy : null

  
  }
});

