/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Autoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(logbuch/icon/16/cancel.png)
#asset(logbuch/icon/16/button-plus.png)
************************************************************************ */

/**
 * @todo use virtual list instead
 */
qx.Class.define("logbuch.component.MessageList",
{
  extend : qx.ui.container.Composite,

 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   */
  construct : function( sandbox )
  {
    this.base(arguments);
    
    this.__sandbox = sandbox;
    
    this.set({
      layout     : new qx.ui.layout.VBox(5),
      appearance : "logbuch-category-page",
      visibility : "hidden"
    });
   
    var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
    
    /*
     * add button
     */
    var addButton = new qx.ui.form.Button(null,"logbuch/icon/16/button-plus.png");
    this.bind("addButtonLabel", addButton, "label" );
    addButton.addListener("execute",function(){
      this.getAddButtonCallback()(); // callback
    },this);
    hbox.add(addButton);
    
    /*
     * spacer
     */
    hbox.add( new qx.ui.core.Spacer(), {flex:1} );
    
    /*
     * close button 
     */
    var closeButton = new qx.ui.basic.Image( "logbuch/icon/16/cancel.png" );
    closeButton.addListener("click",function(){
      this.hide();
    },this );
        
    hbox.add( closeButton );
    this.add( hbox );
    
    var scroller =  new qx.ui.container.Scroll();
    this.add(scroller,{flex:1});
    scroller.addListener("appear",function(){
      scroller.scrollToY(0);
    },this);
    
    this.__messageContainer = new qx.ui.container.Composite( new qx.ui.layout.VBox() ).set({
      appearance  : "logbuch-field",
      minHeight   : 10000,
      padding     : 0
    });
    
    scroller.add( this.__messageContainer );
    
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    addButtonLabel :
    {
      check     : "String",
      nullable  : true,
      event     : "changeAddButtonLabel"
    },
    
    addButtonCallback :
    {
      check     : "Function",
      nullable  : true
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    "changeSelection" : "qx.event.type.Data" //FIXME
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
      API
    ---------------------------------------------------------------------------
    */
    
    /**
     * Adds a message to the messageboard
     * @param {} message
     */
    addMessage : function( message )
    {
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );

      message.addListener( "mouseover", function(){      
         message.addState("selected");
      },this);
      message.addListener( "mouseout", function(){      
         message.removeState("selected");
      },this);
      
      message.addListener( "delete", function(){      
         dialog.Dialog.alert("Löschen ... (Noch nicht implementiert)");
      },this);
      
      message.addListener("dblclick", function(e){
        this.hide();
        this.__sandbox.publish( "load-category-item", {
          category : message.getCategory(),
          id       : message.getItemId()
        });
      },this);

      
      if ( this.__messageContainer.hasChildren() )
      {
        this.__messageContainer.addBefore( message, this.__messageContainer.getChildren()[0] );
      }
      else
      {
        this.__messageContainer.add( message );
      }
    },
    
    reset : function()
    {
      this.__messageContainer.removeAll();
    }
    
  }
});
