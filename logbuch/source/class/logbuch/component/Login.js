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
   */
  construct : function()
  {
    this.base(arguments, this.tr("Login") );
    this.set({
      height : 500,
      margin : [100,100,100,100] // FIXME
    });
    
    this.getChildrenContainer().set({
      layout        : new qx.ui.layout.VBox(5),
      paddingLeft   : 250,
      paddingRight  : 250,
      paddingTop    : 150,
      paddingBottom : 30
    });
    
    var name = new logbuch.component.InputField( "Name oder Autorenkürzel eingeben");
    this.add( name );
    
    var password = new logbuch.component.InputField( "Persönliches Password eingeben", null, "password");
    this.add( password );
    
    this.add( new qx.ui.core.Spacer(), {flex:1} );
    
    var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox( 5 ) );
    var loginButton = new qx.ui.form.Button( this.tr("Login") );
    hbox.add( loginButton );
    var cancelButton = new qx.ui.form.Button( this.tr("Cancel" ) );
    hbox.add( cancelButton );
    this.add(hbox);
    
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
