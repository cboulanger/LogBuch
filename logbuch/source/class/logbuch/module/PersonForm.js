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
qx.Class.define("logbuch.module.PersonForm",
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
  
    /*
    ---------------------------------------------------------------------------
       PRIVATE MEMBERS
    ---------------------------------------------------------------------------
    */       

    /**
     * The form
     * @type qx.ui.form.Form
     */
    __form : null,
    
    /**
     * The form controller
     * @type qx.data.controller.Form
     */
    __controller : null,
    
    /**
     * The application sandbox
     * @type qcl.application.Sandbox
     */
    __sandbox : null,
    
    /**
     * The id of the current record
     * @type int|String
     */
    __id : null,
    
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
      this.getChildrenContainer().setLayout( new qx.ui.layout.VBox() );
      
      var form = this.__form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      
      var field, hbox, vbox;
      var formContainer = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
      this.add( formContainer, {flex:1});
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
      hbox.add(vbox, {flex:1});
      
      formContainer.add(hbox);
      
      qx.ui.core.FocusHandler.getInstance().addRoot(formContainer);
      
      var fields = [];
      
      /*
       * last name
       */
      field = new logbuch.component.InputField( this.tr("Last name" ) );
      field.setRequired(true);
      field.addToForm( form, "familyName" );
      vbox.add( field );
      fields.push( field );
      
      /*
       * first name
       */
      field = new logbuch.component.InputField( this.tr("First name" ) );
      field.setRequired(true);
      field.addToForm( form, "givenName" );
      vbox.add( field );
      fields.push( field );
      
      /*
       * photo
       */
      field =  new logbuch.component.ImageField( this.tr("Portrait" ) ).set({
        width     : 100,
        imageSize : 80
      });
      field.addToForm( form, "image" );
      hbox.add( field  );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      formContainer.add(hbox);
      fields.push( field );
      
      /*
       * academic title
       */
      field = new logbuch.component.InputField( this.tr("Academic title" ) );
      field.addToForm( form, "academicTitle" );
      hbox.add( field, {flex : 3} );
      fields.push( field );
      
      /*
       * initials
       */
      field = new logbuch.component.InputField( this.tr("Initials" ) );
      field.addToForm( form, "initials" );
      hbox.add( field, {flex: 1} );   
      fields.push( field );
      
      /*
       * company / organization
       * FIXME create Widget for this!
       */
      field = new logbuch.component.InputField( this.tr("Company/Organization" ), null, "selectbox" );
      
      var selectBoxController1 = new qx.data.controller.List(null,field.getInputControl(),"label").set({
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
      field.addListener("appear",function(){
	     this.__sandbox.rpcRequest( 
	        "logbuch.record", "list", 
          [ null, "organization" ],
	        function( listModel ){
            listModel.unshift( { label: ""+this.tr("Please select the organization"), icon:null, value:null});
	          selectBoxController1.setModel( qx.data.marshal.Json.createModel(listModel) );
	        }, this
	      );
      },this);
      form.add( field.getInputControl(), null, null, "organizationId" );
      
      formContainer.add( field );     
      fields.push( field );
      
      /*
       * Position/Role
       */
      field = new logbuch.component.InputField( this.tr( "Position/Responsibility" ), null, "selectbox" );
      
      var selectBoxController2 = new qx.data.controller.List(null,field.getInputControl(),"label");
      selectBoxController2.setDelegate({
        bindItem : function(controller, item, id) {
          controller.bindDefaultProperties(item, id);
          controller.bindProperty("value", "model", null, item, id);
        }
      });
      field.addListener("appear",function(){
       this.__sandbox.rpcRequest( 
          "logbuch.record", "getRoleList", 
          [ null, "role" ],
          function( listModel ){
            listModel.unshift( { label: ""+this.tr("Please select the position/responsibility"), icon:null, value:null});
            selectBoxController2.setModel( qx.data.marshal.Json.createModel(listModel) );
          }, this
        );
      },this);
      form.add( field.getInputControl(), null, null, "position" );
      formContainer.add( field );     
      fields.push( field );
      
      /*
       * E-Mail
       */
      field = new logbuch.component.InputField( this.tr("Email" ) );
      field.setRequired(true);
      field.addToForm( form, "email", qx.util.Validate.email(this.tr("No valid email address.") ) );
      formContainer.add( field );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      formContainer.add(hbox);
      fields.push( field );
      
      /*
       * Telephone
       */
      field = new logbuch.component.InputField( this.tr("Telephone" ) );
      field.addToForm( form, "telephone" );
      hbox.add( field, { flex : 1 } );
      fields.push( field );
      
      /*
       * Mobile phone
       */
      field = new logbuch.component.InputField( this.tr("Mobile" ) );
      field.addToForm( form, "mobile" );
      hbox.add( field, { flex : 1 } );
      fields.push( field );
      
      /*
       * disable form and set readonly state
       */
      formContainer.setEnabled(false);
//      this.__sandbox.addPermissionListener("logbuch.members.manage", function(e){
//        fields.forEach(function(field){
//          field.setEditable( e.getData() );
//        },this);
//      },this);
      
      /*
       * buttons
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        marginTop : 20,
        height    : 30
      });
      hbox.add( new qx.ui.core.Spacer(), {flex:1});
      this.add(hbox);
      
      /*
       * save
       */
      var saveButton = new qx.ui.form.Button(this.tr("Save")).set({
        enabled : false,
        visibility : "excluded"
      });
      
//      this.__sandbox.bindPermissionState("logbuch.members.manage", saveButton, "visibility", {
//        converter : function( v ){ return v ? "visible" : "excluded"; }
//      });        
      hbox.add( saveButton );
      saveButton.addListener("execute", function(){ 
        var data = qx.util.Serializer.toNativeObject( this.__controller.getModel() );
        this.__sandbox.showNotification( this.tr("Saving ...") );
        this.__sandbox.rpcRequest( 
          "logbuch.record", "update", 
          [ null, "person", this.__id, data ],
          function( data ){
            this.__sandbox.hideNotification();
            this.fireEvent("completed");
            this.fireDataEvent( "action", {
              'action' : 'update',
              'id'     : this.__id,
              'data'   : data
            });
          }, this
        );
      }, this );
      
      /*
       * cancel
       */
      var cancelButton = new qx.ui.form.Button( this.tr("Cancel") );
      hbox.add( cancelButton );
      cancelButton.addListener("execute",function(){
        this.fireEvent("cancel");
        this.__form.reset();
        formContainer.setEnabled(false);
        saveButton.setEnabled(false);
      },this);
      
      /*
       * load event
       */
      this.getUserData("buddy").addListener("action",function(e){
        var data = e.getData();
        switch( data.action )
        {
          case "load":
            var id = data.id;    
            this.__form.reset();
            formContainer.setEnabled(false);
            saveButton.setEnabled(false);
            cancelButton.setEnabled(false);
            this.__sandbox.showNotification( this.tr("Loading data ...") );
            this.__sandbox.rpcRequest( 
              "logbuch.record", "read", [ null, "person", id ],
              function(data){
                this.__sandbox.hideNotification();
                
                // FIXME
				        fields.forEach(function(field){
				          field.setEditable( data.editable );
				        },this);
                saveButton.setVisibility( data.editable ? "visible" : "excluded");
        
                delete data.editable;//FIXME
                delete data.userId;//FIXME
                
                var model = qx.data.marshal.Json.createModel(data);
                this.__controller.setModel( model );
                this.__id = id;
                saveButton.setEnabled(true);
                cancelButton.setEnabled(true);
                formContainer.setEnabled(true);
              },this
            );
            break;
            
          case "deleted":
            this.__form.reset();
            this.setEnabled(false);
            break;
        }
      },this);
      
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
