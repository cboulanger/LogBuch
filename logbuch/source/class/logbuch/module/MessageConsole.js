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
 * the login Widget 
 */
qx.Class.define("logbuch.module.MessageConsole",
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
      this.getChildControl("container").setLayout( new qx.ui.layout.VBox(5));
      
      var titleField = new logbuch.component.InputField( this.tr("Message title") );
      this.add( titleField );
      
      var messageField = new logbuch.component.InputField( this.tr("Message text"), null, "textarea" );
	    this.add( messageField, { flex : 1 } );
      
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      var sendButton = new qx.ui.form.Button( this.tr("Send" ) );
      var cancelButton = new qx.ui.form.Button( this.tr("Cancel" ) );
      hbox.add( sendButton );
      hbox.add( cancelButton );
      this.add( hbox );
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
