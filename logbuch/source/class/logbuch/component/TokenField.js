/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * 
 */
qx.Class.define("logbuch.component.TokenField",
{
  extend    : tokenfield.Token,

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
    this.base(arguments);
    
		this.set({
		  backgroundColor   : "logbuch-field-background",
		  decorator         : "logbuch-field-border",
		  selectionMode     : "multi",
		  style             : ""
		});
		
    /*
     * bind token id values. We need to put
     * the event handler into a timeout because the selection should 
     * be checked after the item has been inserted/removed
     * todo: make the model path configurable
     */
    var changeFunc = function(){
      qx.util.TimerManager.getInstance().start(function(){
	      var ids = new qx.data.Array();
	      this.getChildren().forEach( function(item){
	        if ( item instanceof qx.ui.form.ListItem )
	        {
            var id = item.getModel().get( this.getModelPath() );
            ids.push( id );
	        }
	      },this );
	      this.__fromSelection = true;
	      this.setTokenIds( ids );
	      this.__fromSelection = false;
      },null,this,null,0);
    };
		this.addListener("addItem", changeFunc, this);
    this.addListener("removeItem", changeFunc, this);
    
    this.setTokenIds( new qx.data.Array() );
    
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : 
  {
    /**
     * An qx.data.Array of ids that identify the tokens.
     */
    tokenIds :
    {
      check     : "qx.data.Array",
      event     : "changeTokenIds",
      apply     : "_applyTokenIds"
    },
    
    /**
     * The path in the list item model data that contains the id
     * for the tokenIds array.
     */
    modelPath :
    {
      check     : "String",
      nullable  : true,
      init      : "value"
    }
  },
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events : 
  {
    /**
     * Called when data for {@link #addToken} needs to be loaded from the
     * server.
     */
    "loadTokenData" : "qx.event.type.Event"
  },
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members : 
  {
    /**
     * Applies the token ids. If token ids have been assigned, 
     * fire an event to load the token data from the server.
     * @param value {Array}
     * @param old {Array}
     */
    _applyTokenIds : function( value, old )
    {
      if( ! this.__fromSelection )
      {
        this.reset();
        if ( value.length )
        {
          this.fireDataEvent( "loadTokenData" );
        }
      }
    },
    
    /**
     * Creates a token from ListItem model data and adds it to the
     * widget
     * @param itemModelData {Object}
     */
    addToken : function( itemModelData )
    {
      var item = new qx.ui.form.ListItem( itemModelData.label )
      item.setModel( qx.data.marshal.Json.createModel( itemModelData ) );
      this._selectItem( item );
    }
  }  
});
