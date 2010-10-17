/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Autoren:
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
    this.__messages = {};
    
    this.__dateFormatter = new qx.util.format.DateFormat( this.__dateFormat);
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
    __dateFormat    : "ccc dd.MM.", // FIXME configurable
    __dateFormatter : null,
    __messages      : null,
    __data          : null,
    
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
      this.__sandbox.subscribe("reload-calendar", this._onReloadCalendar, this);
      this.__sandbox.subscribe("message", this._onMessage, this);
    },
    
    /**
     * Stops the module and removeds message subscribers
     */    
    stop : function()
    {
      this.__sandbox.unsubscribe("change-date", this._onSandboxChangeDate, this);
      this.__sandbox.unsubscribe("change-date-today", this._onSandboxChangeDateToday, this);
      this.__sandbox.unsubscribe("activate-category", this._onSandboxActivateCategory, this);
      this.__sandbox.unsubscribe("reload-calendar", this._onReloadCalendar, this);
      this.__sandbox.unsubscribe("message", this._onMessage, this);
    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    _applyDate : function( date, old )
    {
      if ( old && date.getTime() == old.getTime() ) return;
      this.load( date, old );
    },
    
    _onReloadCalendar : function()
    {
      this.load();
    },
    
        
    
    // FIXME load visible Area first and other areas later
    load : function( date, old)
    {
      date = date || this.getDate();
      var df = new  qx.util.format.DateFormat();
      var msday = 24*60*60*1000;
      
      /*
       * rewind to midnight
       */
      date = new Date( date.toDateString() );
      
      //console.log( "Setting date: " + df.format(date) );
      //console.log( "First date visible " + df.format( this.getFirstDateVisible() ) );
      //console.log( "Last date visible " + df.format( this.getLastDateVisible() ) );
      
      /*
       * load data
       */
      if ( ! old || 
        date.getTime() < this.getFirstDateLoaded().getTime() - msday || 
        date.getTime() > this.getLastDateLoaded().getTime() + msday )
      {
        var msAheadBefore = Math.floor( this.getDaysLoaded() / 2 ) * msday;
        var firstLoaded = new Date( ( new Date( date.getTime() - msAheadBefore ) ).toDateString());
        this.setFirstDateLoaded( firstLoaded );
        //console.log( "first loaded: " + (firstLoaded) );
        
        var lastLoaded = new Date( ( new Date( date.getTime() + msAheadBefore )).toDateString() );        
        this.setLastDateLoaded( lastLoaded );
        //console.log( "last loaded: " + (lastLoaded) );
        
        /*
         * if not authenticated, defer until we have an authenticated
         * user
         */
        if ( ! this.__sandbox.isAuthenticatedUser() )
        {
          this.__sandbox.callOnceWhenAuthenticated( function(){
            this._applyDate( date, old );
          },this);
          return;
        }
        
        /*
         * request messages in the given period
         */
        this.__data = []; // delete cache
        this.__sandbox.showNotification( this.tr("Loading LogBuch data ...") );
        qx.util.TimerManager.getInstance().start(function(){
	         this.__sandbox.rpcRequest(
	          "logbuch.message","collect", 
	          [ this.getFirstDateLoaded().toDateString(), this.getLastDateLoaded().toDateString() ],
            function()
            {
              this.__sandbox.hideNotification();
            }, this
	        );        
        },null,this,null,100); //FIXME
        
        
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
      if ( ! old || 
            date.getTime() < this.getFirstDateVisible().getTime() - msday || 
            date.getTime() > this.getLastDateVisible().getTime() + msday)
      {
        var delta = date.getDay() - qx.locale.Date.getWeekStart();
        if ( delta < 0 )
        {
          delta = 6;
        }
        //console.log([date.getDay(),qx.locale.Date.getWeekStart()])
        //console.log( "Delta: " + delta );
        
        var firstVisible = new Date( date.getTime() - ( delta * msday ) );
        this.setFirstDateVisible( firstVisible );
        
        //console.log( "change first visible: " + df.format(firstVisible) );
        
        var lastVisible = new Date( firstVisible.getTime() + ( 6 * msday ) );
        this.setLastDateVisible( lastVisible );
        //console.log( "change last visible: " + df.format(lastVisible) );
        
        //var dayOfYear = Math.ceil((date - new Date(this.getFullYear(),0,1)) / 86400000);
      } 
      
      /*
       * save column of current date
       */
      var column = this.getColumnFromDate( date );
      this.setSelectedDateColumn( column );      
      
      /*
       * scroll column into view and schedule an update   
       */
      var pane = this.__scroller.getPane();
      var column = this.getColumnFromDate( this.getFirstDateVisible() );
      qx.util.TimerManager.getInstance().start(function(){
        pane.setScrollX( this.getScrollXFromColumn( column ) );
        pane.fullUpdate();
      },null,this,null,100);
      
      this.__sandbox.publish("change-date", date );
    },
    
    /**
     * Given a date, return the corresponding column 
     * @param date {Date}
     * @return {Integer}
     */
    getColumnFromDate : function( date )
    {
      var msday = 24*60*60*1000;
      if ( ! this.getFirstDateLoaded() || 
        date.getTime() < this.getFirstDateLoaded() - msday || 
        date.getTime() > this.getLastDateLoaded() + msday )
      {
        this.error( "Date is not within loaded period" );
      }
      var d1 = new Date( date.toDateString() ).getTime();
      var d2 = new Date( this.getFirstDateLoaded().toDateString() ).getTime();
      var column = Math.floor( (d1-d2)/ msday );
      return column;
    },
    
    /**
     * From http://brauchbar.de/wd/artikel/19.html
     */
    getJulianDate : function( date )
    {
			var f = (m < 3) ? -1: 0,
          y = date.getYear(), 
          m = date.getMonth(),
          d = date.getDate();
          
		  return Math.floor((1461*(f+4800+y))/4)
		       + Math.floor(((m-2-(f*12))*367)/12)
		       - Math.floor(3*Math.floor((y+4900+f)/100)/4)
		       + d
		       - 32075;
    },
    
    /**
     * From http://www.webdeveloper.com/forum/showthread.php?t=125428
     * @param {} date
     * @return {}
     */
    getDayOfYear : function(d)
    {   
			var yn = d.getFullYear();
			var mn = d.getMonth();
			var dn = d.getDate();
			var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
			var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
			var ddiff = Math.round((d2-d1)/864e5);
			return ddiff+1; 
    },    
    
    /**
     * Given the column, return the corresponding date
     * @param  column {Integer}
     * @return {Date}
     */
    getDateFromColumn : function( column )
    {
      var d1 = this.getFirstDateLoaded();
      var d2 = new Date( d1.getTime() +  ( 86400000 * column ) );
      var delta = Math.abs( d1.getTimezoneOffset() ) - Math.abs( d2.getTimezoneOffset() );
      if ( delta )
      {
        d2 = new Date( d2.getTime() + delta * 60000 );
      }
      return d2;
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
    
    /**
     * Given a category, return the corresponding row
     * @param category {String}
     * @return {Integer}
     */
    getRowFromCategory : function( category )
    {
      var lc = this.__sandbox.getLayoutConfig();
      return lc.getCalendar().getCategories().indexOf(category)+1;
    },
    
    /**
     * Given a row, return the corresponding category
     * @param row {Integer}
     * @return {String}
     */
    getCategoryFromRow : function( row )
    {
      var lc = this.__sandbox.getLayoutConfig();
      if ( row < 1 || row > lc.getCalendar().getCategories().length )
      {
        this.error("Invalid row:" + row );
      }
      return lc.getCalendar().getCategories().getItem(row-1);      
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
      // do not accept a double click on the date row 
      if ( e.getRow() == 0 ) return;   
      
      this.__sandbox.publish("activate-category",null);
      
      e.preventDefault();
      
      // do not accept a click when a category is active
      //if ( this.getActiveCategory() ) return;
      
      var col  = e.getColumn();
      var row  = e.getRow();
      var date = this.getDateFromColumn( col );
      var category = this.getCategoryFromRow( row );
      
      this.setDate( date );
      //this.displayMessages( date, category );
    },    
    
    /**
     * Called when the user double-clicks on a cell.
     * @param e {qx.event.type.Data}
     */
    _onCellDblclick : function(e)
    {
      // do not accept a double click on the date row 
      if ( e.getRow() == 0 ) return;      
      
      var category = this.getCategoryFromRow( e.getRow() );  
      var date = this.getDateFromColumn( e.getColumn() ); // FIXME period
      this._handleCellAction( date, category );
    },

    
    /**
     * Called when the user scrolls the pane horizontally
     * @param e {qx.event.type.Data}
     */
    _onScrollX : function(e)
    {
      //////console.log(e.getData());
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
    
    /**
     * Listens for messages that contain item data to display in the calendar.
     * @param e {qx.event.message.Message}
     */
    _onMessage : function( e )
    {
      var data = e.getData(); 
      var row  = this.getRowFromCategory( data.category ); 
      var col  = this.getColumnFromDate( data.itemDateStart );
      var label = data.label || "";
      var text = "<b>" + label + "</b> (" + data.initials + ")";
      if ( data.isPrivate )
      {
        text = "<span style='color:#853506'>" + text + "</span>";
      }
      this.addCellText( row, col, text, data );  
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
      var dateCellRenderer = new qx.ui.virtual.cell.Date( this.__dateFormatter );
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
                //dateCellRenderer.setFont("logbuch-label-box");
                dateCellRenderer.setTextColor("logbuch-label-box");
                dateCellRenderer.resetBackgroundColor();
              }
              else 
	            {
                //dateCellRenderer.setFont("small");
                dateCellRenderer.setFont("logbuch-label-box");
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
                //dateCellRenderer.resetBackgroundColor(); //IXME
                dateCellRenderer.setBackgroundColor("logbuch-background-calendar");
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
      
      var vLines = new qx.ui.virtual.layer.GridLines("vertical","#999999", hGridLineWidth);      
      vLines.setZIndex( 20 );
      
      pane.addLayer( vLines );
      pane.addLayer( hLines );  
              
    
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
    _getCellHtml : function( row, column ) 
    {
      var html = "";
      if ( this.__data[row] && this.__data[row][column] )
      {
        var cell = this.__data[row][column];
        for( var i=0, id; i < cell.order.length; i++)
        {
          id = cell.order[i];
          html += this._styleEntryHtml( cell.entries[id] );
        }
      }
      return html;
    },
    
    // FIXME width
    _styleEntryHtml : function( text )
    {
      return '<span style="width:100px;height:12px;overflow:hidden;font-size:10px; white-space: nowrap;">' + text + '<span><br/>';
    },
    
    /**
     * Adss text to a calendar cell, identified by an id
     * @param row {Integer}
     * @param col {Integer}
     * @param id {String}
     * @param text {String}
     * @param data {Object}
     * @param sortFunction {Function|undefined}
     */
    addCellText : function( row, col, text, data, sortFunction )
    {
      
      /*
       * create entry
       */
      if ( ! this.__data[row] ) 
      {
        this.__data[row] = [];
      }
      if ( ! this.__data[row][col] ) 
      {
        this.__data[row][col] = {
          entries : [],
          order   : [],
          data    : []
        };
      } 
      var cell = this.__data[row][col];
      cell.order.push(cell.entries.length);
      cell.entries.push(text);
      cell.data.push(data);
      
      
      /*
       * sort the array
       */
      cell.order.sort( function(a,b){
        a = cell.entries[a];
        b = cell.entries[b];
        if ( sortFunction ) 
        {
          return sortFunction( a, b )
        }
        else
        {
          return ( a > b ? 1 : ( a < b ? -1 : 0) ); 
        }
      });
      
      this.__scroller.getPane().fullUpdate();      
    },
    
    /**
     * Removes text from a calendar cell, identified by an id. 
     * @param row {Integer}
     * @param col {Integer}
     * @param id {String}
     * @param sortFunction {Function|undefined}
     */
    removeCellText : function( row, col, id, sortFunction )
    {    
      var cell = this.__data[row][col];
      delete cell.entries[id];
      qx.lang.Array.remove( cell.order, id );
      
      /*
       * sort the array
       */
      cell.order.sort( function(a,b){
        if ( sortFunction ) 
        {
          return sortFunction( cell.entries[a], cell.entries[b] )
        }
        else
        {
          return ( a > b ? 1 : ( a < b ? -1 : 0) ); 
        }
      });
      
      this.__scroller.getPane().fullUpdate();      
    },
    
    /**
     * Displays the messages in a category in a day
     * @param {} date
     * @param {} category
     */
    _handleCellAction : function( date, category )
    {
      /*
       * create message list if necessary
       */
      if ( ! this.__messageList )
      {
        var msglist = new logbuch.component.MessageList(this.__sandbox).set({
          width   : 300,
          height  : 400
        });
        this.getApplicationRoot().add( msglist);
        this.__messageList = msglist;
        msglist.addListener("disappear", function(){
          this.__sandbox.publish("activate-category",null);
        },this);
        this.__sandbox.subscribe("activate-category",function(e){
          if ( e.getData() === null )
          {
            msglist.hide();
          }
        },this);
      }
      else
      {
        var msglist = this.__messageList;
        msglist.reset();
      }
      
      /*
       * caption
       */
      var lc = this.__sandbox.getLayoutConfig();
      //msglist.setCaption( );
     
      /*
       * change ui
       */
      this.__sandbox.publish( "activate-category", category );      

      /*
       * get data
       */
      var col   = this.getColumnFromDate( date );
      var row   = this.getRowFromCategory( category );
      var found = false;
   
      if ( this.__data[row] && this.__data[row][col] )
      {
        var cell = this.__data[row][col];
        for( var i=0; i< cell.order.length; i++ )
        {
          var data = cell.data[cell.order[i]];
          found = true;
          msglist.addMessage( new logbuch.component.Message( 
            data.date,
            data.sender  + " (" + data.initials + ")",
            data.subject,
            data.body,
            data.category,
            data.itemId
          ) );
        }
        
        /*
         * if data was found, show message list
         */
        if ( found )
        {
		      /*
		       * position message list
		       */
		      var mycol = this.getColumnFromDate( date );
		      var leftcol = this.getColumnFromDate( this.getFirstDateVisible() );          
		      msglist.setLayoutProperties({
		        top   : 140,
		        left  : 135 + ( (mycol-leftcol) * 120 ) // FIXME
		      });          
          
          /*
           * add button label and callback
           */
          msglist.setAddButtonLabel( this.tr("New entry ...") );
          var _this = this;
          msglist.setAddButtonCallback( function(){
            msglist.hide();
            qx.util.TimerManager.getInstance().start(function(){
	            _this.__sandbox.publish( "new-category-item", {
	              category  : category,
	              date      : date
	            });            
            },null,null,null,100);
          });
          
          msglist.show();
        }
      }
      
      /*
       * enter new item if none was found
       */
      if ( ! found )
      {
        this.__sandbox.publish( "new-category-item", {
          category  : category,
          date      : date
        });
      }      
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