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
qx.Class.define("logbuch.module.Setup",
{
  extend : logbuch.component.IndexCard,

  implement : [ qcl.application.IModule, qcl.application.IWidgetModule ],
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
  
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
      
      var form = new qx.ui.form.Form(); 
      var controller = new qx.data.controller.Form( null, form );
      
      var field, elem, hbox, vbox;
      
      /*
       * project title
       */
      field = new logbuch.component.InputField( this.tr("Project title" ) );
      field.setRequired(true);
      field.addToForm( form, "projectTitle" );
      //this.__sandbox.bindConfigKey("project.title", field, "value", true );
      this.add( field );
      
      hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this.add(hbox);
      
      /*
       * admin password 
       */      
      vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
      hbox.add(vbox);
      field =  new logbuch.component.InputField( this.tr("Enter administrator passwort" ), null, "password" );
      field.setRequired(true);
      field.addToForm( form, "password" );
      vbox.add( field );
      
      field =  new logbuch.component.InputField( this.tr("Repeat administrator passwort" ), null, "password" );
      field.setRequired(true);
      field.addToForm( form, "password2" );
      vbox.add( field );
      hbox.add( vbox, {flex:1} );
      
      /*
       * photo
       */
      field =  new logbuch.component.ImageField( this.tr("Logo hochladen" ) ).set({
        value     : "assets/uploading.png",
        width     : 100
      });
      field.addToForm( form, "logo" );
      hbox.add( field  );
      
      this.add( new qx.ui.basic.Label( this.tr("label_setup_project") ).set({
        rich : true
      }));
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
