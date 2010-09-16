/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(qx/icon/${qx.icontheme}/16/places/*)
#asset(qx/icon/${qx.icontheme}/22/places/*)
#asset(qx/icon/${qx.icontheme}/32/places/*)
#asset(qx/icon/${qx.icontheme}/48/places/*)
#asset(qx/icon/${qx.icontheme}/64/places/*)
#asset(qx/icon/${qx.icontheme}/128/places/*)

************************************************************************ */

/**
 * 
 */
qx.Class.define("logbuch.module.Attachments",
{
  extend : logbuch.module.AbstractModule,

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
    
  },
  
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
     EVENTS
  *****************************************************************************
  */    

  events : 
  {
    
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

      this.__cell = new logbuch.component.GalleryCell();
      
      this.itemHeight = 60;
      this.itemWidth = 60;
      this.itemCount = 431;
      this.itemPerLine = 1;
      this.items = this._generateItems(this.itemCount);      

      var scroller = this._createScroller();
	    scroller.set({
	      scrollbarX: "off",
	      scrollbarY: "auto"
	    });
      
	    scroller.getPane().addListener("resize", this._onPaneResize, this);
	    this.add(scroller,{flex:1});
	
	    this.manager = new qx.ui.virtual.selection.CellRectangle(scroller.getPane(), this).set({
	      mode: "multi",
	      drag: true
	    });
	    this.manager.attachMouseEvents();
	    this.manager.attachKeyEvents(scroller);
              
    },
    
 
    
    /*
    ---------------------------------------------------------------------------
       VIRTUAL GRID METHODS
    ---------------------------------------------------------------------------
    */    

    _createScroller : function()
    {
      var scroller = new qx.ui.virtual.core.Scroller(
        1, this.itemPerLine,
        this.itemHeight, this.itemWidth
      );
      this.layer = new qx.ui.virtual.layer.WidgetCell(this);
      scroller.getPane().addLayer(this.layer);

      // Creates the prefetch behavior
      new qx.ui.virtual.behavior.Prefetch(
        scroller,
        {
          minLeft : 0,
          maxLeft : 0,
          minRight : 0,
          maxRight : 0,
          minAbove : 200,
          maxAbove : 300,
          minBelow : 600,
          maxBelow : 800
        }
      ).set({
        interval: 500
      });

      return scroller;
    },    
    
    getItemData : function(row, column) {
      return this.items[row * this.itemPerLine + column];
    },    
    
    isItemSelectable : function(item) {
      return !!this.getItemData(item.row, item.column)
    },
    
    _onPaneResize : function(e)
    {
      var pane = e.getTarget();
      var width = e.getData().width;

      var colCount = Math.floor(width/this.itemWidth);
      if (colCount == this.itemsPerLine) {
        return;
      }
      this.itemPerLine = colCount;
      var rowCount = Math.ceil(this.itemCount/colCount);

      pane.getColumnConfig().setItemCount(colCount);
      pane.getRowConfig().setItemCount(rowCount);
    },
    
    _generateItems : function(count)
    {
      var items = [];
      var iconImages = [
        "folder.png",
        "user-trash.png",
        "network-server.png",
        "network-workgroup.png",
        "user-desktop.png"
      ];

      var aliasManager = qx.util.AliasManager.getInstance();
      var resourceManager = qx.util.ResourceManager.getInstance();

      for (var i=0; i<count; i++)
      {
        var icon = "icon/32/places/" + iconImages[Math.floor(Math.random() * iconImages.length)];
        var resolved = aliasManager.resolve(icon);
        var url = resourceManager.toUri(resolved);

        items[i] = {
          label: "Icon #" + (i+1),
          icon: icon,
          resolvedIcon: url
        };
      }

      return items;
    },
    
    styleSelectable : function(item, type, wasAdded)
    {
      if (type !== "selected") {
        return;
      }

      var widgets = this.layer.getChildren();
      for (var i=0; i<widgets.length; i++)
      {
        var widget = widgets[i];
        var cell = widget.getUserData("cell");

        if (item.row !== cell.row || item.column !== cell.column) {
          continue;
        }

        if (wasAdded) {
          this.__cell.updateStates(widget, {selected: 1});
        } else {
          this.__cell.updateStates(widget, {});
        }
      }
    },


    getCellWidget : function(row, column)
    {
      var itemData = this.getItemData(row, column);

      if (!itemData) {
        return null;
      }

      var cell = {row: row, column: column};
      var states = {};
      if (this.manager.isItemSelected(cell)) {
        states.selected = true;
      }

      var widget = this.__cell.getCellWidget(itemData, states);
      widget.setUserData("cell", cell);

      return widget;
    },

    poolCellWidget : function(widget) {
      this.__cell.pool(widget);
    },    
    
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */
    

    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    


    
    dummy : null
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    this.items = null;
    this._disposeObjects("manager");
    this._disposeObjects("__cell", "layer");
  }
});