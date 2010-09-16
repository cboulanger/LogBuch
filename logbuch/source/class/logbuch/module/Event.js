/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#require(logbuch.module.AccessControl)
************************************************************************ */

/**
 * A category module for the editing of events
 */
qx.Class.define("logbuch.module.Event",
{
  extend : logbuch.module.AbstractCategoryModule,
 
  
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
    this.base(arguments, name || "event" );
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
       "PRIVATES"
    ---------------------------------------------------------------------------
    */       
    

    
    /**
     * The sandbox instance
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
      this.base( arguments, sandbox );
      this.__sandbox = sandbox;
    },    

    /**
     * Builds the UI
     */
	  build : function()
	  {
      this.base(arguments);
      
      var lc = this.__sandbox.getLayoutConfig();
      var rowHeight         = lc.getEvent().getRowHeight();
      var leftColumnWidth   = lc.getEvent().getLeftColumnWidth();
      var rightColumnWidth  = lc.getEvent().getRightColumnWidth();
      
      var grid = new qx.ui.container.Composite( 
        new qx.ui.layout.Grid(20,5)
          .setColumnWidth(0, leftColumnWidth )
          .setColumnFlex(1,1)
          .setColumnFlex(2,1)
          .setColumnWidth(3, rightColumnWidth )
      );
      
      this.add(grid);
      
      /*
       * labels in first column
       */
      var labels = [
        this.tr("what?"),
        this.tr("when?"),
        this.tr("where?"),
        this.tr("who?"),
        this.tr("Notes")
      ];
      
      var _this = this;
      var form  = this._form;
      
      for( var i=0; i< labels.length; i++) 
      {
        var label = new qx.ui.basic.Label(labels[i]).set({
          height     : rowHeight,
          width      : leftColumnWidth,
          paddingTop : Math.floor( rowHeight-20 ),
          textAlign  : "right",
          appearance : "logbuch-field" 
        });
        this.addListener("focusRow",function(row,label){ 
          return function(e){
	          if( e.getData() == row )
	          {
	            label.setBackgroundColor( this.getColor() );  
	          }
	          else
	          {
	            label.resetBackgroundColor();
	          }
	        }
        }(i,label)); // to get the variables into the closure, see http://www.mennovanslooten.nl/blog/post/62
        
        // listens for click on label
        label.addListener("click",function(row){
          return function(){
            _this.fireDataEvent("focusRow", row );
          }   
        }(i), this);        
        
        
        grid.add( label, { row : i, column : 0 } );
      }
      
      /*
       * Item actions
       */   
      grid.add( this._createItemActionButtonPanel().set({marginTop:10}), { row : 5, column : 0 } );
      
      /*
       * center column with text entry
       * 
       * event title
       */
      var field1 = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        placeholder : this.tr("Topic, Occation, Goal"),
        height      : rowHeight        
      });
      field1.addListener("focus",function(){
        this.fireDataEvent("focusRow",0);
      },this);
      this.addListener("focusRow",function(e){
        if( e.getData() == 0 ) 
        { 
          field1.focus(); 
        }
      },this);
      form.add( field1, null, null, "title" );
      grid.add( field1, { row: 0, column : 1, colSpan : 2 });

      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance  : "logbuch-field",
        height      : rowHeight        
      });
      
      // on first appear, focus on first input field
      this.addListener("appear",function(){
        field1.focus();
      },this);
      
      
      /*
       * date start 
       */
      var field2 = new qx.ui.form.DateField().set({
        value       : new Date() // FIXME
      });
      field2.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      this.addListener("focusRow",function(e){
        if( e.getData() == 1 ) { field2.focus(); }
      },this);      
      form.add( field2, null, null, "dateStart" );
      vbox.add( field2 );
      
      /*
       * time start 
       */
      var field3 = new logbuch.component.TimeChooser();
      field3.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      form.add( field3, null, null, "timeStart" );
      vbox.add( field3 );      
      
      grid.add( vbox, { row: 1, column : 1 });
      
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance  : "logbuch-field",
        height      : rowHeight        
      });     
      
      /*
       * date end
       */
      var field4 = new qx.ui.form.DateField().set({
        value       : new Date() // FIXME
      });
      field4.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);         
      form.add( field4, null, null, "dateEnd" );
      vbox.add( field4 );
      
      /*
       * time start 
       */
      var field5 = new logbuch.component.TimeChooser();
      field5.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      form.add( field5, null, null, "timeEnd" );
      vbox.add( field5 );      
      
      grid.add( vbox, { row: 1, column : 2 });
             
      
      /*
       * location
       */
      var field6 = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        placeholder : this.tr("Location, building, floor, room ..."),
        height      : rowHeight        
      });
      field6.addListener("focus",function(){
        this.fireDataEvent("focusRow",2);
      },this);   
      this.addListener("focusRow",function(e){
        if( e.getData() == 2 ) { field6.focus(); }
      },this);      
      form.add( field6, null, null, "location" );
      grid.add( field6, { row: 2, column : 1, colSpan : 2 });      
      
      /*
       * participants
       */
      var t = new tokenfield.Token().set({
        backgroundColor   : "logbuch-field-background",
        decorator         : "logbuch-field-border",
        height            : rowHeight,
        selectionMode     : "multi"
      });
      t.addListener("focus",function(){
        this.fireDataEvent("focusRow",3);
      },this);
      this.addListener("focusRow",function(e){
        if( e.getData() == 3 ) { t.focus() }
      },this);       
      t.addListener("loadData", function(e){
        var str = e.getData();
        var data = [];
        for( var i=0; i<(Math.floor(Math.random()*10)+3);i++ )
        {
          data.push( { label: str + " " + i } );
        }
        qx.util.TimerManager.getInstance().start(function(){
          t.populateList( str, data );
        },null,this,null,500);
      },this);      
      
      form.add( t, null, null, "participants" );
      grid.add( t, { row: 3, column : 1, colSpan : 2 });       
      
      /*
       * notes
       */
      var field7 = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        height      : rowHeight
      });
      field7.addListener("focus",function(){
        this.fireDataEvent("focusRow",4);
      },this);   
      this.addListener("focusRow",function(e){
        if( e.getData() == 4 ) { field7.focus(); }
      },this);       
      form.add( field7, null, null, "notes" );
      grid.add( field7, { row: 4, column : 1, colSpan : 2 })
      
      /* 
       * author label
       */
      var authorLabel = this._createAuthorLabel();
      grid.add( authorLabel, { row: 5, column : 1, colSpan : 2 })
      
      ;       

      /*
       * right column
       */
      this._createRightColumn( grid, 6 ); 

    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    _applyDate : function( date, old )
    {
      
    },    

    
    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns the category module's translated label
     * @return {String}
     */
    getLabel : function()
    {
      return this.tr("Events");
    },
    
    /**
     * Returns the category module's translated item type
     * @return {String}
     */
    getItemType : function()
    {
      return this.tr("Event");
    },    
    
    invite : function()
    {
      
    },
    
    /**
     * Creates a message from the event data
     */
    createMessage : function()
    {
      var data = qx.util.Serializer.toJson( this.getModel() );
      console.log( data );
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

  }
});