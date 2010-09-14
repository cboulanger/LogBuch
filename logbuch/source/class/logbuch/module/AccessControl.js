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
    /**
     * The date the event starts 
     * @type Date
     */
    dateStart :
    {
      check    : "Date",
      nullable : true,
      event    : "changeDate"
    },
    
    /**
     * The date the event starts 
     * @type Date
     */
    dateEnd :
    {
      check    : "Date",
      nullable : true,
      event    : "changeDate"
    }       
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function()
  {
    this.base(arguments, "event" );
  },    
  
  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */    

  events : 
  {
    "focusRow" : "qx.event.type.Data"
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
      this.base( arguments, sandbox );
      this.__sandbox = sandbox;
    },    

    /**
     * Builds the UI
     */
	  build : function()
	  {
      this.base(arguments);
      
      var form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      
      var lc = this.__sandbox.getLayoutConfig();
      var rowHeight         = lc.getEvent().getRowHeight();
      var leftColumnWidth   = lc.getEvent().getLeftColumnWidth();
      var rightColumnWidth  = lc.getEvent().getRightColumnWidth();
      
      var grid = new qx.ui.container.Composite( 
        new qx.ui.layout.Grid(20,5)
          .setColumnWidth(0, leftColumnWidth )
          .setColumnFlex(1,1)
          .setColumnFlex(2,1)
          .setColumnFlex(3,1)
          .setColumnWidth(4, rightColumnWidth )
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
	            label.setBackgroundColor( "logbuch-category-event" );  
	          }
	          else
	          {
	            label.resetBackgroundColor();
	          }
	        }
        }(i,label)); // to get the variables into the closure, see http://www.mennovanslooten.nl/blog/post/62
        grid.add( label, { row : i, column : 0 } );
      }
      
      /*
       * save and invite buttons
       */
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        marginTop : 30,
        height    : 30
      });
      var button = new qx.ui.form.Button(this.tr("Save"));
      button.addListener("execute",this.save,this);
      hbox.add(button,{flex:1});
      var button = new qx.ui.form.Button(this.tr("Invite"));
      button.addListener("execute",this.invite,this);
      hbox.add(button,{flex:1});
      grid.add( hbox, { row : 5, column : 0 } );
      
      /*
       * center column with text entry
       * 
       * event title
       */
      var field = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        placeholder : this.tr("Topic, Occation, Goal"),
        height      : rowHeight        
      });
      field.addListener("focus",function(){
        this.fireDataEvent("focusRow",0);
      },this);
      form.add( field, null, null, "title" );
      grid.add( field, { row: 0, column : 1, colSpan : 2 });
      
      /*
       * date start 
       */
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance  : "logbuch-field",
        height      : rowHeight        
      });
      var field = new qx.ui.form.DateField().set({
        value       : new Date()
      });
      field.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      form.add( field, null, null, "dateStart" );
      vbox.add( field );
      grid.add( vbox, { row: 1, column : 1 });
      
      /*
       * date end
       */
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance  : "logbuch-field",
        height      : rowHeight        
      });      
      var field = new qx.ui.form.DateField().set({
        value       : new Date()
      });
      field.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);         
      form.add( field, null, null, "dateEnd" );
      vbox.add( field );
      grid.add( vbox, { row: 1, column : 2 });
             
      
      /*
       * location
       */
      var field = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        placeholder : this.tr("Location, building, floor, room ..."),
        height      : rowHeight        
      });
      field.addListener("focus",function(){
        this.fireDataEvent("focusRow",2);
      },this);   
      form.add( field, null, null, "location" );
      grid.add( field, { row: 2, column : 1, colSpan : 2 });      
      
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
      var field = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        height      : rowHeight * 2
      });
      field.addListener("focus",function(){
        this.fireDataEvent("focusRow",4);
      },this);   
      form.add( field, null, null, "notes" );
      grid.add( field, { row: 4, column : 1, colSpan : 2, rowSpan : 2 });       

      /*
       * photos
       */
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
			  width      : rightColumnWidth,
			  appearance : "logbuch-field" 
			});
      field =  new logbuch.component.ImageField( this.tr("Photo 1" ) ).set({
        value     : "empty.png",
        height    : 100
      });
      form.add( field.getFormElement(), null, null, "photo1" );
      vbox.add( field );
			grid.add( vbox, { row : 0, column : 3, rowSpan : 6 } );
      
      
    },
    

 
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    

    
    /*
    ---------------------------------------------------------------------------
       EVENT HANDLERS
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
     * Returns the category module's (translated) label
     * @return {String}
     */
    getLabel : function()
    {
      return this.tr("Events");
    },
    
    save : function()
    {
      
    },
    
    invite : function()
    {
      
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