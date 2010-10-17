/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

#asset(qx/icon/${qx.icontheme}/22/actions/application-exit.png)

************************************************************************ */

/**
 * The header
 */
qx.Class.define("logbuch.module.Header",
{
  extend : qx.ui.container.Composite,
  
  implement : [ qcl.application.IModule, qcl.application.IWidgetModule ],
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    
  
  construct : function()
  {
    this.base(arguments);
    this.set({
      layout        : new qx.ui.layout.HBox(20),
      height        : 80,
      decorator     : "logbuch-header",
      padding       : 10,
      marginBottom  : 20
    });
    this.getLayout().setAlignY("bottom");
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
      /*
       * application title
       */
      var appTitle = "logBUCH"; // FIXME
      this.add( new qx.ui.basic.Label( appTitle ).set({
        appearance : "title-application"
      }));
      
      /*
       * project title
       */
      var projectTitle = "Nachhaltiger Business Travel in Berlin"; // FIXME
      this.add( new qx.ui.basic.Label( projectTitle ).set({
        appearance  : "title-project"
      })); 
      
      /*
       * spacer
       */
      this.add( new qx.ui.core.Spacer, {flex:1} );

      /*
       * logged in user
       */
      userNameLabel = new qx.ui.basic.Label().set({
        appearance  : "title-project"
      });
      this.__sandbox.subscribe("authenticated",function(e){
        userNameLabel.setValue(
          e.getData() ? this.__sandbox.getActiveUserData().fullname : null        
        );
      },this);
      this.add( userNameLabel );

      /*
       * log out button
       */
      var logoutButton = new qx.ui.form.Button( null, "icon/22/actions/application-exit.png" ).set({
        maxHeight : 28,
        visibility : "hidden"
      });
      logoutButton.addListener("execute",function(){
        this.__sandbox.publish("logout");
      },this);
      this.__sandbox.subscribe("authenticated",function(e){        
          e.getData() ? logoutButton.show() : logoutButton.hide(); 
      },this);      
      
      this.add( logoutButton );
	  },
    
    start : function(){},
    stop : function(){}
  }
});
