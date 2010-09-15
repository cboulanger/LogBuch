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
      this.getChildrenContainer().setLayout( new qx.ui.layout.VBox(5) );
      
      var form = this.__form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      
      var field, hbox, vbox;
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
      hbox.add(vbox, {flex:1});
      this.add(hbox);
      
      /*
       * last name
       */
      field = new logbuch.component.InputField( this.tr("Last name" ) );
      field.setRequired(true);
      field.addToForm( form, "lastName" );
      vbox.add( field );
      
      /*
       * first name
       */
      field = new logbuch.component.InputField( this.tr("First name" ) );
      field.setRequired(true);
      field.addToForm( form, "firstName" );
      vbox.add( field );
      
      /*
       * photo
       */
      field =  new logbuch.component.ImageField( this.tr("Portrait" ) ).set({
        value     : "empty.png",
        width     : 100
      });
      field.addToForm( form, "portrait" );
      hbox.add( field  );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this.add(hbox);
      
      /*
       * academic title
       */
      field = new logbuch.component.InputField( this.tr("Academic title" ) );
      field.setRequired(true);
      field.addToForm( form, "academicTitle" );
      hbox.add( field, {flex : 3} );
      
      /*
       * initials
       */
      field = new logbuch.component.InputField( this.tr("Initials" ) );
      field.setRequired(true);
      field.addToForm( form, "initials" );
      hbox.add( field, {flex: 1} );   
      
      /*
       * company / organization
       */
      field = new logbuch.component.InputField( this.tr("Company/Organization" ) );
      field.setRequired(true);
      field.addToForm( form, "organization" );
      this.add( field );     
      
      /*
       * Position/ responsibility
       */
      field = new logbuch.component.InputField( this.tr("Position/Responsibility" ) );
      field.setRequired(true);
      field.addToForm( form, "position" );
      this.add( field );
      
      /*
       * E-Mail
       */
      field = new logbuch.component.InputField( this.tr("Email" ) );
      field.setRequired(true);
      field.addToForm( form, "email", qx.util.Validate.email(this.tr("No valid email address.") ) );
      this.add( field );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this.add(hbox);
      
      /*
       * Telephone
       */
      field = new logbuch.component.InputField( this.tr("Telephone" ) );
      field.setRequired(true);
      field.addToForm( form, "telephone" );
      hbox.add( field, { flex : 1 } );

      /*
       * Mobile phone
       */
      field = new logbuch.component.InputField( this.tr("Mobile" ) );
      field.setRequired(true);
      field.addToForm( form, "mobile" );
      hbox.add( field, { flex : 1 } );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        marginTop : 20,
        height    : 30
      });
      hbox.add( new qx.ui.core.Spacer(), {flex:1});
      this.add(hbox);
      
      /*
       * form
       */
      var model = this.__controller.createModel(true);
      model.addListener("changeBubble",function(){
        saveButton.setEnabled(form.validate());
      },this);
      
      /*
       * save
       */
      var saveButton = new qx.ui.form.Button("Save").set({
        enabled : false
      });
      hbox.add( saveButton );
      saveButton.addListener("execute",function(){
        this.fireEvent("completed");
      },this );
      
      /*
       * cancel
       */
      var button = new qx.ui.form.Button("Cancel");
      hbox.add( button );
      button.addListener("execute",function(){
        this.fireEvent("cancel");
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
