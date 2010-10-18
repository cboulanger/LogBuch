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
        this.addListener("focusRow",function(row,label){ // FIXME appearance!
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
          }; 
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
      form.add( field1, null, null, "subject" );
      grid.add( field1, { row: 0, column : 1, colSpan : 2 });

      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance  : "logbuch-field",
        height      : rowHeight        
      });
      
      // on first appear, focus on first input field
//      this.addListener("appear",function(){
//        field1.focus();
//      },this);

      // FIXME
			function parseDate(input) 
      {
				return new Date( input );
			}
      
      /*
       * date start label
       */
      if ( this.getName() == "event" )
      {
        vbox.add( new qx.ui.basic.Label(this.tr("from") ) ); 
      }
      else
      {
        vbox.add( new qx.ui.basic.Label(this.tr("Datum Zielerreichung") ) );
      }
      
      var dateFormatter = new qx.util.format.DateFormat( "yyyy/MM/dd" );
      
      /*
       * date start 
       */
      var field2 = new qx.ui.form.DateField().set({
        visibility : "excluded"
      });
      this.bind( "dateStart", field2, "value");
      field2.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      this.addListener("focusRow",function(e){
        if( e.getData() == 1 ) { field2.focus(); }
      },this);      
      form.add( field2, null, null, "dateStart" );
      vbox.add( field2 );
      this._controller.addBindingOptions( "dateStart", {
        // model -> form
        converter : function(value){
          return parseDate(value);
        }
      },{
        // form -> model
        converter : function(date){
          return date ? dateFormatter.format(date) : null;
        }
      });      
      
      /*
       * time start 
       */
      var field3 = new logbuch.component.TimeChooser().set({
        visibility : "excluded"
      });
      field3.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      form.add( field3, null, null, "timeStart" );
      vbox.add( field3 );
      
      /*
       * add date/time picker dependent on category type
       */
      if ( this.getName() == "event" )
      {
        field3.setVisibility( "visible" );
      }
      else
      {
        field2.setVisibility( "visible" );
      }
      
      grid.add( vbox, { row: 1, column : 1 });
      
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance  : "logbuch-field",
        height      : rowHeight        
      });     
      
      /*
       * date start label
       */
      if ( this.getName() == "event" )
      {
        vbox.add( new qx.ui.basic.Label(this.tr("to") ) ); 
      }
      else
      {
        vbox.add( new qx.ui.basic.Label(this.tr("Datum Zielformulierung") ) );
      }      
      
      /*
       * date end
       */
      var field4 = new qx.ui.form.DateField().set({
        visibility : "excluded"
      });
      vbox.add( field4 );
      this.bind( "dateStart", field4, "value");
      field4.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);         
      form.add( field4, null, null, "dateEnd" );
      this._controller.addBindingOptions( "dateEnd", {
        // model -> form
        converter : function(value){
          return parseDate( value );
        }
      },{
        // form -> model
        converter : function(date){
          return date ? dateFormatter.format(date) : null;
        }
      });            
      
      /*
       * time start 
       */
      var field5 = new logbuch.component.TimeChooser().set({
        visibility : "excluded"
      });
      field5.addListener("focus",function(){
        this.fireDataEvent("focusRow",1);
      },this);      
      form.add( field5, null, null, "timeEnd" );
      vbox.add( field5 );
      
      /*
       * add date/time picker dependent on category type
       */
      if ( this.getName() == "event" )
      {
        
        field5.setVisibility( "visible" );
      }
      else
      {
        field4.setVisibility( "visible" );
      }      
      
      grid.add( vbox, { row: 1, column : 2 });
             
      
      /*
       * location
       */
      var field6 = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
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
      var field7 = new logbuch.component.TokenField().set({
        height        : rowHeight,
        modelPath     : "value",
        style         : "facebook",
        hintText      : "Bitte geben Sie Teile des Namens ein, oder 'alle' ...", //FIXME
        searchingText : "Suche ...",
        noResultsText : "Keine passenden Einträge vorhanden ..."
      });
      
      // visual effects
      field7.addListener("focus",function(){
        this.fireDataEvent("focusRow",3);
      },this);
      this.addListener("focusRow",function(e){
        if( e.getData() == 3 ) { field7.focus() }
      },this);
      
      // load list data on user input
      field7.addListener("loadData", function(e){
        var str = e.getData();
        this.__sandbox.rpcRequest(
          "logbuch.record", "personList", [null, str ],
          function ( data ){
            field7.populateList( str, data );    
          }, this
        );
      },this);
      
	    // when value changes, recreate tokens
	    field7.addListener("loadTokenData", function(){
        field7.setEnabled(false);
        this.__sandbox.rpcRequest( 
          "logbuch.record", "personList", 
          [null, field7.getTokenIds().toArray() ],
          function ( data ){
            field7.setEnabled(true);
            data.forEach( function( itemModelData ) {
              field7.addToken( itemModelData );
            });    
          }
        );
	    },this);
      
      // add to form
      grid.add( field7, { row: 3, column : 1, colSpan : 2 });
      
      // sync with model
      this._controller.bind("model.participants", field7, "tokenIds" );
      field7.bind("tokenIds", this._controller, "model.participants" );
      
      /*
       * notes
       */
      var field8 = new qx.ui.form.TextArea().set({
        appearance  : "logbuch-field",
        height      : rowHeight
      });
      field8.addListener("focus",function(){
        this.fireDataEvent("focusRow",4);
      },this);   
      this.addListener("focusRow",function(e){
        if( e.getData() == 4 ) { field8.focus(); }
      },this);       
      form.add( field8, null, null, "notes" );
      grid.add( field8, { row: 4, column : 1, colSpan : 2 })
      
      /* 
       * author label
       */
      var authorLabel = this._createAuthorLabel();
      grid.add( authorLabel, { row: 5, column : 1, colSpan : 2 });       

      /*
       * right column
       */
      this._createRightColumn( grid, 6 ); 
      

    },
    
    /*
    ---------------------------------------------------------------------------
       INTERNAL METHODS
    ---------------------------------------------------------------------------
    */ 

    
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
    
    _getExplanation : function( row )
    {
      switch(row)
      {
        case 0:
          return "Geben Sie hier den Anlass des Ereignisses an. Sie können ein Stichwort angeben, das in der Kalenderübersicht angezeigt wird. Trennen Sie dieses Stichwort vom restlichen Text mit einem Doppelpunkt. <br/><br/>Beispiel:<br/><br/> Präsentation: Vorstellung der Produktevaluation";
        
        case 1:
          return "Datum und Uhrzeit des Ereignisses.";
        
        case 2:
          return "Ort, Straße, Gebäude, Etage, Raum etc.";
          
        case 3:
          return "Geben Sie hier die Personen an, die an dem Ereignis beteiligt waren. Sie können hierbei nur Personen angeben, die im Logbuch registriert sind. Tippen Sie einige Buchstaben ein, um Vorschläge zu erhalten, oder 'alle', um eine Liste aller registrierten Personen zu bekommen. Personen, die nicht im LogBuch registriert sind, wie z.B. Gäste, bitte im Feld 'Notizen' eintragen.";
          
        case 4: 
          return "In diesem Feld können z.B. Gesprächsnotizen gespeichert werden.  Hier auch Externe/Gäste eintragen, die nicht im 'Wer?'-Feld eingetragen werden können.";
          
          
      }
    },
    
    dummy : null
  }
});