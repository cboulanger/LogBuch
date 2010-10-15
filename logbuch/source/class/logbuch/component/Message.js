/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(qx/icon/${qx.icontheme}/16/actions/dialog-close.png)
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
   * @param sender {String}
   * @param subject {String}
   * @param body {String} HTML to display in the message
   */
  construct : function( date, sender, subject, body, category, itemId )
  {
    this.base(arguments);
    
    this.setAppearance("logbuch-messageitem");
    this.set({
      date      : date,
      sender    : sender,
      subject   : subject,
      body      : body,
      category  : category,
      itemId    : itemId
    });
    
    this._setLayout(new qx.ui.layout.HBox(3));
    
    var hbox1 = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
    var vbox  = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
    
    hbox1.add( this.getChildControl("date") );
    hbox1.add( this.getChildControl("sender") );
    
    vbox.add(hbox1);
    vbox.add( this.getChildControl("subject") );
    vbox.add( this.getChildControl("body") ); 
    
    this.add(vbox,{flex:1});
//    this.add( this.getChildControl("deleteButton").set({
//      alignY : "middle"
//    }) );
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    category :
    {
      check     : "String",
      nullable  : true,
      event     : "changeCategory"
    },
    
    itemId :
    {
      check : "String",
      nullable : true
    },
    
    /**
     * The date of a message
     * @type String
     */
    date : 
    {
      check    : "Date",
      nullable : true,
      event    : "changeDate"
    },
    
    /**
     * The sender of the message
     * @type String
     */
    sender : 
    {
      check    : "String",
      nullable : true,
      event    : "changeSender"
    },
    
    /**
     * The message subject
     * @type String
     */
    subject : 
    {
      check    : "String",
      nullable : true,
      event    : "changeSubject"
    },
    
    /**
     * The body of a message
     * @type String
     */
    body : 
    {
      check    : "String",
      nullable : true,
      event    : "changeBody"
    },
    
    /**
     * The tags attached to a message
     * @type String[]
     */
    tags : 
    {
      check    : "Array",
      nullable : true,
      event    : "changeTags"
    },
    
    model :
    {
      check     : "qx.core.Object",
      nullable  : true,
      event     : "changeData"
    },
    
    allowDelete :
    {
      check     : "Boolean",
      init      : false
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :  
  {
    "delete" : "qx.event.type.Event"
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
          control = new qx.ui.basic.Label();
          this.bind( "date", control, "value", {
            converter : function(value){
              return logbuch.component.Message.getFormatter().format( value )
            }
          });
          break;
          
        case "sender":
          control = new qx.ui.basic.Label();
          this.bind( "sender", control, "value" );
          break;
          
        case "subject":
          control = new qx.ui.basic.Label().set({
            rich : true,
            font : "bold"
          });
          this.bind( "subject", control, "value" );
          break;          
          
        case "body":
          control = new qx.ui.basic.Label();
          control.setRich(true);
          this.bind( "body", control, "value" );
          break;
          
        case "deleteButton":
          control = new qx.ui.basic.Image("icon/16/actions/dialog-close.png").set({
            visibility : "hidden"
          });
          this.addListener("mouseover",function(){
            control.setVisibility("visible");
          },this);
          this.addListener("mouseout",function(){
            control.setVisibility("hidden");
          },this);
          control.addListener("click",function(){
            this.fireEvent("delete");
          },this);
          break;

      }
      return control || this.base(arguments, id);
    }
  }
});
