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
qx.Class.define("logbuch.component.Login",
{
  extend : logbuch.component.IndexCard,

 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   * @param core {qcl.application.Core}
   */
  construct : function( core )
  {
    this.__core = core;
    this.base(arguments, this.tr("Login") );
    this.set({
      visibility : "hidden",
      height     : 450,
      width      : 810
    });
    
    this.getChildrenContainer().set({
      layout        : new qx.ui.layout.VBox(5),
      paddingLeft   : 250,
      paddingRight  : 250,
      paddingTop    : 150,
      paddingBottom : 30
    });
    
    var usernameInput, passwordInput, loginButton;
    
    /*
     * user name
     */
    usernameInput = new logbuch.component.InputField( this.tr("Enter name or alias") ).set({
      liveUpdate : true
    });
    usernameInput.getInputControl().addListener("keypress",function(e){
      if ( e.getKeyIdentifier() == "Enter" ) 
      {
        passwordInput.focus();
      }    
    },this);
    this.add( usernameInput );
    
    /*
     * password
     */
    passwordInput = new logbuch.component.InputField( this.tr( "Enter your password" ), null, "password").set({
      liveUpdate : true
    });
    passwordInput.getInputControl().addListener("keypress",function(e){
      if ( e.getKeyIdentifier() == "Enter" ) 
      {
        loginButton.focus();
        loginButton.execute();
      }    
    },this);
    this.add( passwordInput );
    
    this.add( new qx.ui.core.Spacer(), {flex:1} );
    
    var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox( 5 ) );
    
    /*
     * login button
     */
    loginButton = new qx.ui.form.Button( this.tr("Login") );
    loginButton.addListener("execute", function(){
      core.showNotification( this.tr("Logging in ...") );
      core.authenticate( usernameInput.getValue(), passwordInput.getValue(), function(){
        core.hideNotification();
      },this );
    },this );
    hbox.add( loginButton );
    
    /*
     * register button
     */
    registerButton = new qx.ui.form.Button( this.tr("Register") );
    registerButton.addListener("execute", function(){
      core.setApplicationState("view","register");
    },this );
    hbox.add( registerButton );    
    
    /*
     * cancel
     */
//    var cancelButton = new qx.ui.form.Button( this.tr("Cancel" ) );
//    hbox.add( cancelButton );
    this.add(hbox);
    
    /*
     * empty form and set focus when shown
     */
    this.addListener("appear",function(e){
      usernameInput.setValue(null);
      passwordInput.setValue(null);
      usernameInput.focus();
    }, this );
    
    
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

    
    
    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

  
  }
});
