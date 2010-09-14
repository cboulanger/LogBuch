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
 * A message with different kinds of information
 */
qx.Class.define("logbuch.component.Message",
{
  extend : qx.ui.container.Composite,
  
  statics :
  {
    getFormatter : function()
    {
      return new qx.util.format.DateFormat("dd.MM.yyyy");
    }
  },

 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   * @param date {Date}
   * @param creator {String}
   * @param title {String}
   * @param message {String} HTML to display in the message
   */
  construct : function( date, creator, title, message )
  {
    this.base(arguments);
    this.setAppearance("logbuch-messageitem");
    
    if ( date instanceof Date )
    {
      var formatter = logbuch.component.Message.getFormatter();
      this.__date = formatter.format( date );
    }
    else
    {
      this.__date = date;      
    }

    this.__creator = creator;
    this.__title = title;
    this.__message = message;
    
    this._setLayout(new qx.ui.layout.VBox(3));
    
    var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
    hbox.add( this.getChildControl("date") );
    hbox.add( this.getChildControl("creator") );
    this.add(hbox);
    this.add( this.getChildControl("title") );
    this.add( this.getChildControl("message") ); 
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
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "date":
          control = new qx.ui.basic.Label( this.__date );
          break;
          
        case "creator":
          control = new qx.ui.basic.Label( this.__creator );
          break;
          
        case "title":
          control = new qx.ui.basic.Label( this.__title );
          break;          
          
        case "message":
          control = new qx.ui.basic.Label( this.__message );
          control.setRich(true);
          break;                    

      }

      return control || this.base(arguments, id);
    }
    
  }
});
