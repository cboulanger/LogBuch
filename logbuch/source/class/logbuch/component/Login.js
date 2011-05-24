/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(logbuch/image/sponsoren.jpg)
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
      paddingRight  : 10,
      paddingTop    : 150,
      paddingBottom : 30
    });
    
    var usernameInput, passwordInput, loginButton;
    
    /*
     * user name
     */
    usernameInput = new logbuch.component.InputField( this.tr("Enter name or alias") ).set({
      liveUpdate : true,
      maxWidth      : 300
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
      liveUpdate : true,
      maxWidth      : 300
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
    this.add(hbox);
    
    /*
     * login button
     */
    loginButton = new qx.ui.form.Button( this.tr("Login") ).set({
      maxHeight : 25
    });
    loginButton.addListener("execute", function(){
      core.showNotification( this.tr("Logging in ...") ); //FIXME autohide
      core.authenticate( usernameInput.getValue(), passwordInput.getValue(), function(){
        core.hideNotification();
      },this );
    },this );
    hbox.add( loginButton );
    
    /*
     * register button
     */
    var registerButton = new qx.ui.form.Button( this.tr("Register") ).set({
      maxHeight : 25
    });
    registerButton.addListener("execute", function(){
      core.setApplicationState("view","register");
    },this );
    hbox.add( registerButton );    
    
    /*
     * reset password 
     */
//    var resetPwButton = new qx.ui.form.Button(this.tr("Reset Password"));
//    resetPwButton.addListener("execute", function(){
//      dialog.Dialog.prompt( this.tr("Please enter the email address:"), function(email){
//	      if ( ! email ) return;
//        this.__sandbox.rpcRequest(
//	        "logbuch.registration", "resetPasswordByEmail", [ email ]
//	      );      
//      },this);
//    },this);    
//    hbox.add( resetPwButton ); 
    
    
    
    /*
     * sponsorenlogos
     */
     hbox.add( new qx.ui.core.Spacer, {flex:1});
     hbox.add( new qx.ui.basic.Image("logbuch/image/sponsoren.jpg") );
    
    
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
