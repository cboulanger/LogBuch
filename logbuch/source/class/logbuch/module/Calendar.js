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
 * The calender
 * FIXME needs to be rewritten using UTC time instead of local time to get
 * around DST/time zone offset bugs!
 * @todo use prefetching!
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
     * Period of days that are displayed. Must be a number divisible by 7
     * Needs to be set before the calender is rendered
     * @type Integer
     * FIXME needs to be rewritten using weeks instead of days
     */
    daysLoaded :
    {
      check : "Integer",
      init  : 7*12
    },

    /**
     * An array of the column numbers which are not a work day
     * @type 
     */
    notAWorkDayCols :
    {
      check : "Array",
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
      pane.addListener("cellClick", this._onCellClick, this );
      pane.addListener("scrollX", this._onScrollX, this );
      this.add( this.__scroller );
      
      /*
       * Scroll to today if no date has been given
       */
      var date, time = parseInt( this.__sandbox.getApplicationState("time") );
      if ( ! time || isNaN( time ) )
      {
        date = new Date();  
      }
      else
      {
        date = new Date( time );
      }
      this.setDate( date );
      
      /*
       * clear calendar on logout
       */
      this.__sandbox.subscribe("logout",function(){
        this.reset();
      },this);
      
      /*
       * mark date column
       */
      try
      {
        //this.setCurrentDateColumn( this.getColumnFromDate( date ) ); //FIXME
      }
      catch(e){}
      
    },
    
    /**
     * Starts the module and attaches message subscribers to the sandbox
     */
    start : function()
    {
      this.__sandbox.subscribe("change-date", this._onSandboxChangeDate, this);
      this.__sandbox.subscribe("change-date-today", this._onSandboxChangeDateToday, this);
      this.__sandbox.subscribe("reload-calendar", this._onReloadCalendar, this);
      this.__sandbox.subscribe("authenticated", this._onAuthenticated, this);
    },
    
    /**
     * Stops the module and removeds message subscribers
     */    
    stop : function()
    {
      this.__sandbox.unsubscribe("change-date", this._onSandboxChangeDate, this);
      this.__sandbox.unsubscribe("change-date-today", this._onSandboxChangeDateToday, this);
      this.__sandbox.unsubscribe("reload-calendar", this._onReloadCalendar, this);
      this.__sandbox.unsubscribe("authenticated", this._onAuthenticated, this);
      // FIXME unsubscribe channel
    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    _applyDate : function( date, old )
    {
      if ( old && date.getTime() == old.getTime() ) return;
      date = date || this.getDate();
      
      var df = new  qx.util.format.DateFormat();
      var msday = 24*60*60*1000;
      
      /*
       * rewind to midnight
       */
      //console.log( "Requested date: " + date );
      date = new Date( date.toDateString() );
      
      //console.log( "Setting date: " + date );
      //console.log( "First date visible " + df.format( this.getFirstDateVisible() ) );
      //console.log( "Last date visible " + df.format( this.getLastDateVisible() ) );
      
      /*
       * load data
       */
      if ( ! old || 
        date.getTime() < this.getFirstDateLoaded().getTime() || 
        date.getTime() > this.getLastDateLoaded().getTime() )
      {
        var msAheadBefore = Math.floor( this.getDaysLoaded() / 2 ) * msday;
        var firstLoaded = new Date( ( new Date( date.getTime() - msAheadBefore ) ).toDateString());
        // back to week start
        var delta = firstLoaded.getDay() - qx.locale.Date.getWeekStart();
        if ( delta < 0 )
        {
          delta = 6;
        }        
        firstLoaded = new Date( firstLoaded.getTime() - ( delta * msday ) );
        firstLoaded = new Date( firstLoaded.toDateString() );
        this.setFirstDateLoaded( firstLoaded );
        //console.warn( "first loaded: " + firstLoaded );
        
        // FIXME edge case with DST change in date period!
        var lastLoaded = new Date( ( new Date( firstLoaded.getTime() + ( this.getDaysLoaded() -1 ) * msday )).toDateString() );
        this.setLastDateLoaded( lastLoaded );
        //console.warn( "last loaded: " + lastLoaded );
        
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
        
        /*
         * if the data has been loaded once, reload
         */
        if ( this.__loaded )
        {
          this.load();
        }
      }      
      
      /*
       * display date
       */
      if ( ! old || 
            date.getTime() < this.getFirstDateVisible().getTime() || 
            date.getTime() > this.getLastDateVisible().getTime() )
      {
        var delta = date.getDay() - qx.locale.Date.getWeekStart();
        if ( delta < 0 )
        {
          delta = 6;
        }
        //console.log([date,date.getDay(),qx.locale.Date.getWeekStart()])
        //console.log( "Delta: " + delta );
        
        var firstVisible = new Date( date.getTime() - ( delta * msday ) );
        this.setFirstDateVisible( firstVisible );
        
        //console.log( "change first visible: " + firstVisible );
        
        var lastVisible = new Date( firstVisible.getTime() + ( 6 * msday ) );
        
        // damn timezone offset!
        var delta = Math.abs( firstVisible.getTimezoneOffset() ) - Math.abs( lastVisible.getTimezoneOffset() );
        if ( delta )
        {
          lastVisible = new Date( lastVisible.getTime() + delta * 60000 );
        }        
        this.setLastDateVisible( lastVisible );
        //console.log( "change last visible: " + lastVisible );
      } 
      
      /*
       * save column of selected date
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
    
    _onReloadCalendar : function()
    {
      this.load();
    },
    
    /**
     * Called when user has been authenticated
     * @param e {qx.event.type.Data}
     */
    _onAuthenticated : function(e)
    {
      if ( e.getData() )
      {
        this.__sandbox.subscribeToChannel(
          ["entry.created"], this._onEntryMessage, this,
          this.load, this          
        );
      }
    },
    
    /**
     * Load items
     */
    load : function()
    {
      /*
       * mark that the data has been loaded
       */
      this.__loaded = true;
      
      /*
       * clear data
       */
      this.reset();
      
      /*
       * request messages in the given period
       */
      if( this.__sandbox.isAuthenticatedUser() )
      {
        this.__sandbox.showNotification( this.tr("Loading LogBuch data ...") );
        this.__sandbox.rpcRequest(
          "logbuch.message","collect", 
          [{ 
              from :      this.getFirstDateLoaded().toDateString(), 
              to:         this.getLastDateLoaded().toDateString(),
              category :  { event: true }
           }],
          function()
          {
            this.__sandbox.hideNotification();
          }, this
        );        
      }
      else
      {
        this.error("Cannot load calendar data without authenticated user");
      }
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
        throw new Error( "Date is not within loaded period" );
      }
      var d1 = new Date( date.toDateString() ),
          d2 = new Date( this.getFirstDateLoaded().toDateString() ),
          d3 = null;
      var delta = Math.abs( d1.getTimezoneOffset() ) - Math.abs( d2.getTimezoneOffset() );
      if ( delta )
      {
        var d3 = new Date( d2.getTime() - delta * 60000 );
      }
      var column = Math.floor( (d1.getTime() - (d3||d2).getTime() ) / msday );
      //console.warn([date,d1,d2,delta,d3,column,this.getDateFromCoordinate(column)]);          
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
     * @param column {Integer}
     * @param row {Integer}
     * @return {Date}
     */
    getDateFromCoordinate : function( column, row )
    {
      var d1 = this.getFirstDateLoaded(),
          d2 = new Date( d1.getTime() +  ( 86400000 * column ) ), // FIXME row
          d3 = null;
      var delta = Math.abs( d1.getTimezoneOffset() ) - Math.abs( d2.getTimezoneOffset() );
      if ( delta )
      {
        var d3 = new Date( d2.getTime() + delta * 60000 );
      }
      //console.log([column,d1,d2,delta,d3]);
      return d3 || d2;
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
      // do not accept a click on the date row 
      if ( e.getRow() == 0 ) return;   
      
      //e.preventDefault();

      var col  = e.getColumn();
      var row  = e.getRow();
      var date = this.getDateFromCoordinate( col, row );  
      //this.setDate( date );
      
      //this.__sandbox.publish("calendar/row",row);
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
     * Listens for messages that contain item data to display in the calendar.
     * @param e {qx.event.message.Message}
     * 
     */
    _onEntryMessage : function( e )
    {
       var data    = e.getData(); 
       var channel = e.getName();
      
       
      /*
       * unmarshal dates
       */
      var dateStart, dateEnd;
      if( data.timestampStart )
      {
        dateStart = new Date(data.timestampStart);
        dateEnd   = new Date(data.timestampEnd);
      }
      else
      {
        dateStart = new Date(data.timestamp);
      }
     
      /*
       * get column from start date
       */
      try
      {
        var col  = this.getColumnFromDate( dateStart );
      }
      catch( e )
      {
        // FIXME! Server sends unneccesary data!
        this.warn( e + " " + dateStart );
        return;
      }
      
      /*
       * get row from category
       */
      var row  = this.getRowFromTime( dateStart );
      
      /*
       * if it is an entry with duration (i.e., an event),
       * set cell spans
       */
      if( dateEnd )
      {
        this.__cellLayer.setCellSpan(
          row, col,
          this.getRowFromTime( dateEnd ) - row, 1
        );      
      }
      
      /*
       * display in calendar
       */
      var text = "<b>" +
        data.timeStart + "-" + data.timeEnd +
        '<br/>' + data.subject + 
        "</b>";
      if ( data.isPrivate )
      {
        text = "<span style='color:#853506'>" + text + "</span>";
      }
      
      /*
       * link
       */
      var l = window.document.location; 
      var url = l.protocol + "//" + l.host + l.pathname + "../html/teamblog/?showEntry=" + data.id;
      text = '<span onclick="window.open(\"' + url + '\"">' + text + '</span>';
      
      /*
       * add to cell row
       */
      this.addCellText( row, col, text, data );  
    },
    
    getRowFromTime : function( date )
    {
      var row, hour = date.getHours();
      if( hour < 8 )
      {
        row = 1;
      }
      else if( hour > 18 )
      {
        row = 13;
      }
      else
      {
        row = hour-6;
      }
      return row;
      
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
          numRows         = calendar.getRowLabels().getLength()+1, // plus header row
          numCols         = this.getDaysLoaded(),
          boxHeight       = calendar.getBoxHeight(),
          boxWidth        = calendar.getBoxWidth(),
          hGridLineWidth  = calendar.getHGridLineWidth(),
          vGridLineWidth  = calendar.getVGridLineWidth();
      
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
      this.__dateCellRenderer = new qx.ui.virtual.cell.Date( this.__dateFormatter );
      this.__dateCellRenderer.set({
        appearance : "logbuch-datecell",
        paddingTop : 6 // FIXME
      });     
      
      /*
       * cell renderer
       */
      this.__cellRenderer = new qx.ui.virtual.cell.Cell().set({
        backgroundColor: "logbuch-background-calendar"
      });
      
      /*
       * current date renderer
       */
      this.__currentDateCellRenderer = new qx.ui.virtual.cell.Cell().set({
        backgroundColor: "logbuch-background-calendar-current-date"
      });    
     

      
      
      /*
       * grid lines
       */
      var hLines = new qx.ui.virtual.layer.GridLines("horizontal","#999999", hGridLineWidth );
      hLines.setZIndex( 20 );
      
      var vLines = new qx.ui.virtual.layer.GridLines("vertical","#999999", hGridLineWidth);      
      vLines.setZIndex( 20 );
      
      pane.addLayer( vLines );
      pane.addLayer( hLines );  
      
            /*
       * main cell layer
       */
      this.__cellLayer = new qx.ui.virtual.layer.HtmlCellSpan(
        this,
        pane.getRowConfig(),
        pane.getColumnConfig()
      );      
      pane.addLayer(this.__cellLayer);
              
    
      return scroller;
    },    
    
    /**
     * Returns the html for the given cell
     * @param {} row
     * @param {} column
     * @return {}
     */
    getCellProperties : function(row, column)
    {
      
      var states = {};
          
      /*
       * date cell
       */
      if ( row == 0 )
      {
        
        if ( false )
        {

        }
        else
        {
          if ( column == this.getSelectedDateColumn() )
          {
            this.__dateCellRenderer.setFont("logbuch-label-box");
            this.__dateCellRenderer.setTextColor("logbuch-label-box");
            this.__dateCellRenderer.setBackgroundColor("logbuch-background-calendar-selected");
          }
          else if ( column == this.getCurrentDateColumn() )
          {
            this.__dateCellRenderer.setFont("logbuch-label-box");
            this.__dateCellRenderer.setTextColor("background-application");
            this.__dateCellRenderer.setBackgroundColor("logbuch-background-calendar-current-date");
          }
          else 
          {
            this.__dateCellRenderer.setFont("small");
            this.__dateCellRenderer.setTextColor("logbuch-label-box");
            //this.__dateCellRenderer.resetBackgroundColor(); //IXME
            this.__dateCellRenderer.setBackgroundColor("logbuch-background-calendar");
          }
        }
        return this.__dateCellRenderer.getCellProperties( this._getCellDate( column ), states );
        
      }
           
      /*
       * the currently selected date
       */
      else if ( column == this.getCurrentDateColumn() )
      {
        return this.__currentDateCellRenderer.getCellProperties( this._getCellHtml( row, column ), states);
      }
      
      /*
       * normal cell
       */
      else 
      {
        var html = this._getCellHtml( row, column );
        var cr   = this.__cellRenderer;
        
        if( html )
        {
           cr.setBackgroundColor("logbuch-background-calendar-selected");
        }
        else if ( qx.lang.Array.contains( this.getNotAWorkDayCols(), column ) )
        {
          cr.setBackgroundColor("logbuch-background-calendar-weekend");
        }
        else
        {
          cr.resetBackgroundColor();          
        }
        return cr.getCellProperties( html, states);
      }
    },
   
       
    /**
     * Returns a date object for the given cell
     * @param column {Integer}
     * @return {Date}
     */
    _getCellDate : function( column )
    {
      return this.getDateFromCoordinate( column );
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
      return '<span style="font-size:10px;">' + text + '<span><br/>';
    },
    
    /**
     * Adds text to a calendar cell
     * @param row {Integer}
     * @param col {Integer}
     * @param id {String}
     * @param text {String}
     * @param data {Object}
     * @param sortFunction {Function|undefined}
     * @return {Integer} An id by which to identify this particular piece of text
     * inside the cell. 
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
      var id = cell.entries.length;
      cell.order.push(id);
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
      
      return id;
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
      this.error("not implemented");
      var cell = this.__data[row][col];
      delete cell.entries[id];
      qx.lang.Array.remove( cell.order, id );
      
      /*
       * sort the array
       */
      cell.order.sort( function(a,b){
        if ( sortFunction ) 
        {
          return sortFunction( cell.entries[a], cell.entries[b] );
        }
        else
        {
          return ( a > b ? 1 : ( a < b ? -1 : 0) ); 
        }
      });
      
      this.__scroller.getPane().fullUpdate();      
    },
    
    /**
     * Updates the text in a calendar cell, identified by an id. 
     * @param row {Integer}
     * @param col {Integer}
     * @param id {String}
     * @param sortFunction {Function|undefined}
     */
    updateCellText : function( row, col, id, text, data, sortFunction )
    {    
      this.error("not implemented");
      var cell = this.__data[row][col];
      cell.entries[id];
      qx.lang.Array.remove( cell.order, id );
      
      /*
       * sort the array
       */
      cell.order.sort( function(a,b){
        if ( sortFunction ) 
        {
          return sortFunction( cell.entries[a], cell.entries[b] );
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
      
      
    },
    
    reset : function()
    {
      this.__data = []; // delete cache
      this.__scroller.getPane().fullUpdate();
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