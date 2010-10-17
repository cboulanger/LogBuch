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
      
      this.addListener("appear",function(){
        this.__form.reset();
        formContainer.setEnabled(false);
        saveButton.setEnabled(false);      
      },this);
      
      var fields = [];
      
      /*
       * last name
       */
      var field1 = new logbuch.component.InputField( this.tr("Last name" ) );
      field1.setRequired(true);
      field1.addToForm( form, "familyName" );
      vbox.add( field1 );
      fields.push( field1 );
      var updateInitials = function(e)
      {
        if( field1.getValue() && field2.getValue() && ! field5.getValue() )
        {
          field5.setValue( field2.getValue().substring(0,2) + "." + field1.getValue().substring(0,2) + "." );
        }
      };
      field1.addListener("changeValue", updateInitials,this);
      
      /*
       * first name
       */
      var field2 = new logbuch.component.InputField( this.tr("First name" ) );
      field2.setRequired(true);
      field2.addToForm( form, "givenName" );
      vbox.add( field2 );
      fields.push( field2 );
      field2.addListener("changeValue", updateInitials, this );
      
      /*
       * photo
       */
      var field3 =  new logbuch.component.ImageField( this.tr("Portrait" ) ).set({
        width     : 100,
        imageSize : 80
      });
      field3.addToForm( form, "image" );
      hbox.add( field3  );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      formContainer.add(hbox);
      fields.push( field3 );
      
      /*
       * academic title
       */
      var field4 = new logbuch.component.InputField( this.tr("Academic title" ) );
      field4.addToForm( form, "academicTitle" );
      hbox.add( field4, {flex : 3} );
      fields.push( field4 );
      
      /*
       * initials
       */
      var field5 = new logbuch.component.InputField( this.tr("Initials" ) );
      field5.addToForm( form, "initials" );
      hbox.add( field5, {flex: 1} );   
      fields.push( field5 );
      
      /*
       * company / organization
       * FIXME create Widget for this!
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
      organizationField.addListener("appear",function(){
	     this.__sandbox.rpcRequest( 
	        "logbuch.record", "list", 
          [ null, "organization" ],
	        function( listModel ){
            listModel.unshift( { label: ""+this.tr("Please select the organization"), icon:null, value:null});
	          selectBoxController1.setModel( qx.data.marshal.Json.createModel(listModel) );
	        }, this
	      );
      },this);
      // only manager can change organization
      organizationField.addListener("changeEditable",function(e){
        if ( e.getData() )
        {
          organizationField.setEditable( this.__sandbox.hasPermission("logbuch.members.manage") );
        }
      },this);      
      form.add( organizationField.getInputControl(), null, null, "organizationId" );
      
      formContainer.add( organizationField );     
      fields.push( organizationField );
      
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
      roleField.addListener("appear",function(){
       this.__sandbox.rpcRequest( 
          "logbuch.record", "getRoleList", 
          [ null, "role" ],
          function( listModel ){
            listModel.unshift( { label: ""+this.tr("Please select the role in the project"), icon:null, value:null});
            selectBoxController2.setModel( qx.data.marshal.Json.createModel(listModel) );
          }, this
        );
      },this);
      // only manager can change role
      roleField.addListener("changeEditable",function(e){
        if ( e.getData() )
        {
          roleField.setEditable( this.__sandbox.hasPermission("logbuch.members.manage") );
        }
      },this);

      form.add( roleField.getInputControl(), null, null, "position" );
      formContainer.add( roleField );     
      fields.push( roleField );
      
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
       * close
       */
      var cancelButton = new qx.ui.form.Button( this.tr("Close") );
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
                
                // hack
                var position = model.getPosition();
                var organizationId = model.getOrganizationId();
                model.setPosition(null);
                model.setOrganizationId(0);
                model.setPosition(position);
                model.setOrganizationId(organizationId);
                
                
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
