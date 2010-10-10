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
qx.Class.define("logbuch.module.OrganizationForm",
{
  extend : logbuch.component.IndexCard,

  implement : [ 
    qcl.application.IModule, 
    qcl.application.IWidgetModule,
    qcl.application.IFormModule
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

    __form : null,
    __controller : null,
    
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
      this.getChildrenContainer().setLayout( new qx.ui.layout.VBox(0) );
      
      var form = this.__form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      
      var formContainer = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
      this.add( formContainer, {flex:1});
      
      /*
       *  name
       */
      field = new logbuch.component.InputField( this.tr("Organization name" ) );
      field.setRequired(true);
      field.addToForm( form, "name" );
      formContainer.add( field );

      /*
       *  url
       */
      field = new logbuch.component.InputField( this.tr("Internet address" ) );
      field.setRequired(true);
      field.addToForm( form, "url" );
      formContainer.add( field );
      
      /*
       * notes
       */
      field = new logbuch.component.InputField( this.tr("Notes" ), null, "textarea" );
      field.addToForm( form, "notes" );
      formContainer.add( field, {flex : 1 } );      
      
      /*
       * logo
       */
      field =  new logbuch.component.ImageField( this.tr("Logo" ) ).set({
        height    : 200
      });
      field.addToForm( form, "image" );
      formContainer.add( field  );
      
      /*
       * buttons
       */
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      hbox.add( new qx.ui.core.Spacer(), {flex:1} );
      this.add(hbox);
      
      /*
       * save
       */
      var saveButton = new qx.ui.form.Button("Save").set({
        enabled : false
      });
      hbox.add( saveButton );
      saveButton.addListener("execute",function(){
        var data = qx.util.Serializer.toNativeObject( this.__controller.getModel() );
        this.__sandbox.showNotification( this.tr("Saving ...") );
        this.__sandbox.rpcRequest( 
          "logbuch.record", "update", 
          [ null, "organization", this.__id, data ],
          function( data ){
            this.__sandbox.hideNotification();
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
      var cancelButton = new qx.ui.form.Button("Cancel");
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
            this.__sandbox.showNotification( this.tr("Loading data ...") );
            this.__sandbox.rpcRequest( 
              "logbuch.record", "read", [ null, "organization", id ],
              function(data){
                this.__sandbox.hideNotification();
                delete data.groupId;//FIXME
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
    
    getFormModel : function()
    {
      return this.__controller.getModel();
    },    
    
    /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
    dummy : null

  
  }
});
