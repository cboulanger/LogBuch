/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
asset(logbuch/icon/24/mail.png)
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
      check    : "Integer",
      nullable : true,
      event     : "changeItemId",
      apply     : "_applyItemId"
    },
    
    /*
     * number of comments
     */
    length :
    {
      check     : "Integer",
      init      : 0,
      event     : "changeLength"
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
       APPLY METHODS
    ---------------------------------------------------------------------------
    */       
    
    _applyItemId : function ( value, old )
    {
      if( old )
      {
        this.__sandbox.unsubscribeFromChannel( this.getChannelName( old ), this.__receiveCommentFunc, this);
      }
      
      if( value )
      {
        this.__sandbox.subscribeToChannel( this.getChannelName( value ), this.__receiveCommentFunc, this);
      }
      
      this.__list.setModel( new qx.data.Array() );
    },

    
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
      this.setAppearance("logbuch-field");
      this.setVisibility("visible");
      
      /*
       * comment list
       */
      var list = this.__list = new qx.ui.list.List().set({
        selectionMode   : "single",
        backgroundColor : "logbuch-field-background",
        decorator       : "logbuch-field-border",
        itemHeight      : 70,
        labelPath       : "label",
        iconPath        : "icon",
        iconOptions     : {
                            converter : function(value){
                              if ( value ){
                                return "../html/fancyupload/uploads/64/" + value; //FIXME 
                              }
                              return  "../html/fancyupload/assets/person.jpg";
                            }
                          },
        delegate        : {
                            configureItem : function(item) {
                              item.setAppearance("comments-listitem");
                              item.setRich(true);
                              item.setFont("small");
                              item.getChildControl("icon").setAlignY("top");
                            }
                          }
      });
      this.add( list, {flex:1} );
      
      /*
       * empty list
       */
      list.setModel( new qx.data.Array() );
      
      /*
       * bind comment count
       */
      list.bind("model.length",this,"length",{
        converter : function(e){return list.getModel().getLength();}
      });
      
      /*
       * enlarge the currently selected list item
       */
      this.__selIndex = null;
      var rowConfig = list.getPane().getRowConfig();
      var pane = list.getPane();
      list.getSelection().addListener("change",function(){
        if ( this.__selIndex !== null )
        {
          rowConfig.setItemSize( this.__selIndex, 70 );
        }
        if ( list.getSelection().getLength() > 0 )
        {
          var selection   = list.getSelection();
          var item        = selection.getItem(0);
          this.__selIndex = list.getModel().indexOf( item );
          var height      = 16 * ( Math.floor( item.getLabel().length / 28 ) + 2 );
          rowConfig.setItemSize( this.__selIndex, Math.max( 70, height ) );
          
          //listItem.getChildControl("icon").setHeight(300); 
          //listItem.getChildControl("label").setHeight(300); 
          
          // scroll
          var scrollY = this.__selIndex * 70;
          if ( pane.getScrollY() > scrollY )
          {
            pane.setScrollY( scrollY );  
          }
        }
        else
        {
           selIndex = null;
        }
      },this);
      
      /*
       * Add a comment list item
       */
      this.__receiveCommentFunc = function(e){
        var data = e.getData();
        if ( "label" in data && "icon" in data )
        {
          list.getModel().push( qx.data.marshal.Json.createModel( data ) );
          list.getPane().scrollRowIntoView( list.getModel().getLength() -1 );
        }
      };
      
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
        font        : "small",
        liveUpdate  : true
      });
      hbox.add( commentField, {flex:1} );
      
      /*
       * send button
       */
      var button = new qx.ui.form.Button().set({
        icon        : "logbuch/icon/24/mail.png",
        maxHeight   : 25,
        alignY      : "middle"
      }); 
      hbox.add( button );
      
      commentField.addListener("changeValue",function(e){
        button.setEnabled( new Boolean( e.getData() ) );
      },this);
      
      button.addListener("execute",function(){
        this.__sandbox.publishToChannel( this.getChannelName(), {
          date      : (new Date()).toString(),
          message   : commentField.getValue(),
          category  : this.getCategory(),
          itemId    : this.getItemId()
        }, true );
        commentField.setValue(null);
      },this);
      
    },
    
    getChannelName : function( itemId )
    {
      return "logbuch/comment/" + this.getCategory() + "/" + ( itemId || this.getItemId() );
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