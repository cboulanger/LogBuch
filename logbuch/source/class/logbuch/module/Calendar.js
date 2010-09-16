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
 * The header
 */
qx.Class.define("logbuch.module.Calendar",
{
  extend : qx.ui.container.Composite,
  
  implement : [ qcl.application.IModule, qcl.application.IWidgetModule ],
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
    /**
     * The date that is highlighted in the calendar
     * @type Date
     */
    date :
    {
      check    : "Date",
      nullable : true,
      apply    : "_applyDate",
      event    : "changeDate"
    },    
    
    /**
     * The column of the selected date
     * @type 
     */
    selectedDateColumn :
    {
      check    : "Integer",
      nullable : true
    },    
    
    /**
     * The column of the current date
     * @type 
     */
    currentDateColumn :
    {
      check    : "Integer",
      nullable : true
    },
    
    /**
     * The leftmost date visible
     * @type Date
     */
    firstDateVisible :
    {
      check    : "Date",
      nullable : true
    },
    
    /**
     * The rightmost date visible
     * @type Date
     */
    lastDateVisible :
    {
      check    : "Date",
      nullable : true
    },
    
    /**
     * The earliest date that we have data on
     * @type Date
     */
    firstDateLoaded :
    {
      check    : "Date",
      nullable : true
    },
    
    /**
     * The last date that we have data on
     * @type Date
     */
    lastDateLoaded :
    {
      check    : "Date",
      nullable : true
    },
    
    /**
     * Period of days that are displayed
     * Needs to be set before the calender is rendered
     * @type Integer
     */
    daysLoaded :
    {
      check : "Integer",
      init  : 90
    },

    /**
     * An array of the column numbers which are not a work day
     * @type 
     */
    notAWorkDayCols :
    {
      check : "Array",
      nullable : true
    },
    
    /**
     * The name of the active category, or null if none is active
     * @type String|null
     */
    activeCategory :
    {
      check : "String",
      nullable : true
    }
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function()
  {
    this.base(arguments);
    this.__data = [];
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
    __scroller      : null,
    __cellRenderer  : null,
    __data          : null,
    __dateFormat    : "ccc dd.MM.yyyy",
    
    /**
     * 
     * @type qcl.application.Sandbox
     */
    __sandbox : null, 
    
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
      var lc = this.__sandbox.getLayoutConfig();
      
      /*
       * basic layout
       */      
	    this.set({
	      layout         : new qx.ui.layout.Grow(),
	      marginRight    : lc.getWorkspace().getMarginRight(),
        marginTop      : lc.getWorkspace().getMarginTop(),
        marginBottom   : lc.getWorkspace().getMarginBottom()
	    });
      
      /*
       * create scroll pane 
       */
      this.__scroller = this.createScroller();
	    var pane = this.__scroller.getPane();
      pane.addListener("cellDblclick", this._onCellDblclick, this );
      pane.addListener("cellClick", this._onCellClick, this );
      pane.addListener("scrollX", this._onScrollX, this );
      this.add( this.__scroller );
      
      /*
       * Scroll to today
       */
      var date = new Date();
      this.setDate( date );
      
      /*
       * mark date column
       */
      this.setCurrentDateColumn( this.getColumnFromDate( date ) );
      
    },
    
    /**
     * Starts the module and attaches message subscribers to the sandbox
     */
    start : function()
    {
      this.__sandbox.subscribe("change-date", this._onSandboxChangeDate, this);
      this.__sandbox.subscribe("change-date-today", this._onSandboxChangeDateToday, this);
      this.__sandbox.subscribe("activate-category", this._onSandboxActivateCategory, this);
    },
    
    /**
     * Stops the module and removeds message subscribers
     */    
    stop : function()
    {
      this.__sandbox.unsubscribe("change-date", this._onSandboxChangeDate, this);
      this.__sandbox.unsubscribe("change-date-today", this._onSandboxChangeDateToday, this);
      this.__sandbox.unsubscribe("activate-category", this._onSandboxActivateCategory, this);
    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    _applyDate : function( date, old )
    {
      var df = new  qx.util.format.DateFormat();
      //console.log( "Setting date: " + df.format(date) );
      
      this.__sandbox.publish("change-date", date );
      
      /*
       * load data
       */
      if ( ! old || date < this.getFirstDateLoaded() || date > this.getLastDateLoaded() )
      {
        var msAheadBefore = Math.floor( this.getDaysLoaded() / 2 ) * 86400000;
        var firstLoaded = new Date( date.getTime() - msAheadBefore );
        this.setFirstDateLoaded( firstLoaded );
        //console.log( "first loaded: " + df.format(firstLoaded) );
        
        var lastLoaded = new Date( date.getTime() + msAheadBefore );        
        this.setLastDateLoaded( lastLoaded );
        //console.log( "last loaded: " + df.format(lastLoaded) );
        
        /*
         * determine non-work days
         */
        var days = [];
        var d = new Date( this.getFirstDateLoaded().getTime() );
        for( var i=0; i < this.getDaysLoaded(); i++ )
        {
          if ( qx.locale.Date.isWeekend( d.getDay() ) )
          {
            days.push( i );
          }
          d.setDate(d.getDate()+1);
        }
        this.setNotAWorkDayCols( days );    
      }      
      
      /*
       * display date
       */
      if ( ! old || date < this.getFirstDateVisible() || date > this.getLastDateVisible() )
      {
        var delta = date.getDay() - qx.locale.Date.getWeekStart();
        var firstVisible = new Date( date.getTime() - delta * 86400000 );
        this.setFirstDateVisible( firstVisible );
        //console.log( "change first visible: " + df.format(firstVisible) );
        
        var lastVisible = new Date( firstVisible.getTime() + ( 6 * 86400000 ) );
        this.setLastDateVisible( lastVisible );
        //console.log( "change last visible: " + df.format(lastVisible) );
        
        //var dayOfYear = Math.ceil((date - new Date(this.getFullYear(),0,1)) / 86400000);
      } 
      
      /*
       * save column of current date
       */
      this.setSelectedDateColumn( this.getColumnFromDate( date ) );      
      
      /*
       * scroll column into view and schedule an update   
       */
      var pane = this.__scroller.getPane();
      var column = this.getColumnFromDate( this.getFirstDateVisible() );
      qx.util.TimerManager.getInstance().start(function(){
        pane.setScrollX( this.getScrollXFromColumn( column ) );
        pane.fullUpdate();
      },null,this,null,100);
    },
    
    /**
     * Given a date, return the corresponding column 
     * @param date {Date}
     * @return {Integer}
     */
    getColumnFromDate : function( date )
    {
      if ( ! this.getFirstDateLoaded() || date < this.getFirstDateLoaded() || date > this.getLastDateLoaded() )
      {
        this.error( "Date is not within loaded period" );
      }
      return Math.floor( ( date.getTime() - this.getFirstDateLoaded().getTime() ) / 86400000 );
    },
    
    /**
     * Given the column, return the corresponding date
     * @param  column {Integer}
     * @return {Date}
     */
    getDateFromColumn : function( column )
    {
      return new Date( this.getFirstDateLoaded().getTime() + 86400000 * column );
    },    
    
    /**
     * Given a column, return the number of pixels of the x-axis of the column
     * in the grid
     * @param column {Integer}
     * @return {Integer}
     */
    getScrollXFromColumn : function( column )
    {
      return column * this.__sandbox.getLayoutConfig().getCalendar().getBoxWidth();
    },
    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
    ---------------------------------------------------------------------------
    */
    
    _onSandboxChangeDate : function(e)
    {
      this.setDate( e.getData() );
    },
    
    _onSandboxChangeDateToday : function(e)
    {
      var date = new Date();
      this.setDate( date );
      this.__scroller.getPane().scrollColumnIntoView( this.getColumnFromDate( date ) );
    },    
    
    /**
     * Called when the user clicks on a cell.
     * @param e {qx.event.type.Data}
     */
    _onCellClick : function(e)
    {
      var col = e.getColumn();
      this.setDate( this.getDateFromColumn( col ) );
      //this.__scroller.getPane().fullUpdate();
    },    
    
    /**
     * Called when the user double-clicks on a cell.
     * @param e {qx.event.type.Data}
     */
    _onCellDblclick : function(e)
    {
      this.__sandbox.publish( "activate-calender-cell", {
        date : this.getDateFromColumn( e.getColumn() ),
        row  : e.getRow()
      });
    },
    
    //FIXME
    setCellData : function( row, col, text )
    {
      if ( ! this.__data[row] ) 
      {
        this.__data[row] = [];
      }
      this.__data[row][col] = text;
      this.__scroller.getPane().fullUpdate();      
    },
    
    /**
     * Called when the user scrolls the pane horizontally
     * @param e {qx.event.type.Data}
     */
    _onScrollX : function(e)
    {
      //console.log(e.getData());
    },
    
    /**
     * Called when the "activate-category" message is received
     * @param e {qx.event.type.Data}
     */
    _onSandboxActivateCategory : function(e)
    {
      this.setActiveCategory( e.getData() );
      this.__scroller.getPane().fullUpdate();
    },
    

    /*
    ---------------------------------------------------------------------------
       SCROLLER
    ---------------------------------------------------------------------------
    */
    
    createScroller : function()
    {     
      
      var lc              = this.__sandbox.getLayoutConfig(),
          calendar        = lc.getCalendar(),
          numRows         = 6, // FIXME depends on categories
          numCols         = this.getDaysLoaded(),
          boxHeight       = calendar.getBoxHeight(),
          boxWidth        = calendar.getBoxWidth(),
          hGridLineWidth  = calendar.getHGridLineWidth();
      
      /*
       *  scroller
       */          
      var scroller = new qx.ui.virtual.core.Scroller( numRows, numCols, boxHeight, boxWidth ); 
      var pane = scroller.getPane();
            
      /*
       * row layer
       */
      var rowLayer = new qx.ui.virtual.layer.Row("#EEE", "#EEE");
      rowLayer.setColor(0,"transparent");      
      pane.addLayer( rowLayer );
      
      /*
       * column layer
       */
//      var columnLayer = new qx.ui.virtual.layer.Column("#EEE", "#EEE");
//      pane.addLayer( columnLayer );       
          
      
      /*
       * first line has different height
       */
      pane.getRowConfig().setItemSize(0, lc.getCalendar().getDateRowHeight() );
      
      /*
       * date cell renderer
       */
      var dateCellRenderer = new qx.ui.virtual.cell.Date(new qx.util.format.DateFormat( this.__dateFormat));
      dateCellRenderer.set({
        appearance : "logbuch-datecell"
      });     
      
      /*
       * cell renderer
       */
      var cellRenderer = new qx.ui.virtual.cell.Cell().set({
        backgroundColor: "logbuch-background-calendar"
      });
      
      /*
       * current date renderer
       */
      var currentDateCellRenderer = new qx.ui.virtual.cell.Cell().set({
        backgroundColor: "logbuch-background-calendar-current-date"
      });
      
      /*
       * weekend cell renderer
       */
      var weekendCellRenderer = new qx.ui.virtual.cell.Cell().set({
        backgroundColor: "logbuch-background-calendar-weekend"
      });      
     
      /*
       *  selected cell renderer
       */
      var selectedCellRenderer = new qx.ui.virtual.cell.Cell().set({
        backgroundColor: "logbuch-background-calendar-selected"
      });
      
      /*
       * selection manager
       */
      var manager = new qx.ui.virtual.selection.CellRectangle(scroller.getPane(), {
        styleSelectable : function(item, type, wasAdded) {
          cellLayer.updateLayerData();
        }
      });
      manager.attachMouseEvents(scroller.getPane());
      manager.attachKeyEvents(scroller);
      manager.set({
        mode : "multi",
        drag : true
      });
      scroller.setUserData("manager", manager);      
      
      /*
       * cell layer
       */
      var _this = this;
      var cellLayer = new qx.ui.virtual.layer.HtmlCell({
        getCellProperties : function(row, column)
        {
          
          var activeCategory = _this.getActiveCategory();
          var states = {};
          
          if (manager.isItemSelected({row: row, column: column})) 
          {
            states.selected = true;
          }
          
          /*
           * date cell
           */
          if ( row == 0 )
          {
            
            if ( activeCategory )
            {
	            if ( column == _this.getSelectedDateColumn() )
	            {
                dateCellRenderer.setFont("logbuch-label-box");
	              dateCellRenderer.setTextColor("logbuch-label-box");
                dateCellRenderer.setBackgroundColor( "logbuch-category-" + activeCategory );
	            }
	            else if ( column == _this.getCurrentDateColumn() )
              {
                dateCellRenderer.setFont("logbuch-label-box");
                dateCellRenderer.setTextColor("logbuch-label-box");
                dateCellRenderer.resetBackgroundColor();
              }
              else 
	            {
                dateCellRenderer.setFont("small");
	              dateCellRenderer.setTextColor("logbuch-label-box-disabled");
                dateCellRenderer.resetBackgroundColor();
	            }
            }
            else
            {
              if ( column == _this.getSelectedDateColumn() )
              {
                dateCellRenderer.setFont("logbuch-label-box");
                dateCellRenderer.setTextColor("logbuch-label-box");
                dateCellRenderer.setBackgroundColor("logbuch-background-calendar-selected");
              }
              else if ( column == _this.getCurrentDateColumn() )
              {
                dateCellRenderer.setFont("logbuch-label-box");
                dateCellRenderer.setTextColor("background-application");
                dateCellRenderer.setBackgroundColor("logbuch-background-calendar-current-date");
              }
              else 
              {
                dateCellRenderer.setFont("small");
                dateCellRenderer.setTextColor("logbuch-label-box");
                dateCellRenderer.resetBackgroundColor();
              }
              
              
            }
            
            
            
            return dateCellRenderer.getCellProperties( _this._getCellDate( column ), states );
            
          }
          
          /*
           * selected calender cell
           */
          else if (states.selected) 
          {
            return selectedCellRenderer.getCellProperties( _this._getCellHtml( row, column ), states);
          } 
          
          /*
           * the currently selected date
           */
          else if ( column == _this.getCurrentDateColumn() )
          {
            return currentDateCellRenderer.getCellProperties( _this._getCellHtml( row, column ), states);
          }
          
          /*
           * normal cell
           */
          else 
          {
            if ( qx.lang.Array.contains( _this.getNotAWorkDayCols(), column ) )
            {
              return weekendCellRenderer.getCellProperties( _this._getCellHtml( row, column ), states);
            }
            else
            {
              return cellRenderer.getCellProperties( _this._getCellHtml( row, column ), states);
            }
          }
        }
      });
      pane.addLayer(cellLayer);
      
      /*
       * grid lines
       */
      var hLines = new qx.ui.virtual.layer.GridLines("horizontal","#999999", hGridLineWidth );
      hLines.setZIndex( 20 );
      var vLines = new qx.ui.virtual.layer.GridLines("vertical");
      vLines.setZIndex( 20 );
      pane.addLayer( hLines );  
      pane.addLayer( vLines );        
    
      return scroller;
    },    
       
    /**
     * Returns a date object for the given cell
     * @param column {Integer}
     * @return {Date}
     */
    _getCellDate : function( column )
    {
      return this.getDateFromColumn( column );
    },
    
    /**
     * Returns the HTML of the given table cell
     * @param row {Integer} 
     * @param column {Integer} 
     * @return {String}
     */
    _getCellHtml : function( row, column) 
    {
      
      var html = "";
      if ( this.__data[row] && this.__data[row][column] )
      {
        html = this.__data[row][column];
      }

      return html;
    } 
    
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    this._disposeObjects("__cellRenderer");
  }
});