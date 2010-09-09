/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * The category box
 */
qx.Class.define("logbuch.module.Category",
{
  extend : qx.ui.container.Composite,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */  

  construct : function( name, sandbox )
  {
    this.__name = name;
    this.__sandbox = sandbox;
    this.base(arguments);
    this.set({
      layout      : new qx.ui.layout.VBox(1),
      appearance  : "logbuch-label-box"
    });
    this.build();
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    build : function()
    {
	    this.add( new qx.ui.core.Spacer(), {flex:1} );
	    var label = new qx.ui.basic.Label( this.__name );
	    label.set({
        textColor   : "white",
        font        : "logbuch-label-box",
        alignX      : "right"
      });
	    this.add( label );      
    }
  }
});