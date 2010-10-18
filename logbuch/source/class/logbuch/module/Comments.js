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
 * 
 */
qx.Class.define("logbuch.module.Comments",
{
  extend : logbuch.module.AbstractModule,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function( name )
  {
    this.base(arguments, name );
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
      check : "String"
    },
    
    itemId :
    {
      check : "Integer"
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    

  events : 
  {
    "comment" : "qx.event.type.Event"
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
      this.base(arguments, false);
      this.setLayout(new qx.ui.layout.VBox(5));
      this.setAppearance("logbuch-access-control");
      this.setVisibility("visible");
      
      /*
       * comment list
       */
      var list = this.__list = new qx.ui.list.List().set({
        selectionMode : "single",
        itemHeight : 70,
        labelPath: "label",
        iconPath: "icon",
        iconOptions : {
          converter : function(value){
            if ( value ){
              return "../html/fancyupload/uploads/64/" + value; //FIXME 
            }
            return  "../html/fancyupload/assets/person.jpg";
          }
        },
        delegate : {
          configureItem : function(item) {
            item.setRich(true);
          }
        }
      });
      this.add( list, {flex:1} );
      list.setModel( new qx.data.Array() );
      
      this.__sandbox.subscribe("logbuch/message",function(e){
        var comment = e.getData();
        if( comment.category == this.getCategory() && comment.itemId == this.getItemId() )
        {
          
        }
      },this);
      
      /*
       * controls
       */
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      this.add( hbox );
      
      /*
       * textarea for typing messages
       */
      var commentField = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        height      : 50,
        liveUpdate  : true
      });
      hbox.add( commentField, {flex:1} );
      
      /*
       * send button
       */
      var button = new qx.ui.form.Button().set({
        label     : "Senden", //FIXME
        height    : 25
      }); 
      hbox.add( button );
      
      commentField.addListener("changeValue",function(e){
        button.setEnabled( new Boolean( e.getData() ) );
      },this);
      
      button.addListener("execute",function(){
        this.__sandbox.publish( "logbuch/comment", {
          category  : this.getCategory(),
          itemId    : this.getItemId(), 
          sender    : this.__sandbox.getActiveUserData().fullname, // FIXME
          icon      : this.__sandbox.getActiveUserData().icon, // FIXME
          message   : commentField.getValue()
        });
        commentField.setValue(null);
      },this);
      
    },
    dummy : null
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    this._disposeObjects("__list");
  }
});