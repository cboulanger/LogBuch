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
qx.Class.define("logbuch.module.Report",
{
  extend : logbuch.component.IndexCard,

  implement : [ 
    qcl.application.IModule, 
    qcl.application.IWidgetModule,
    qcl.application.IFormModule
  ],
 
  
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
    this.base(arguments, name || "report" );
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
      this.__sandbox = sandbox;
    },    

    /**
     * Builds the UI
     */
	  build : function()
	  {
      this.getChildrenContainer().setLayout( new qx.ui.layout.VBox(5) );
      
      var form = this._form = new qx.ui.form.Form(); 
      this._controller = new qx.data.controller.Form( null, this._form );
      
      this.setLabel( this.tr("logBuch") +  " " + this.tr("Report") );
      
      var tab = this.getChildControl("tab").set({
        maxWidth : 600, // FIXME
        minWidth : 600
      });
      tab.add( new qx.ui.core.Spacer(), {flex:1});
      
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
        font      : "bold",
        maxHeight : 30,
        alignY    : "bottom"
      });
      tab.add(hbox);
      
      hbox.add( new qx.ui.basic.Label( this.tr("from") ).set({ alignY: "bottom" }) );
      var dateStart = new qx.ui.form.DateField().set({
        value : new Date()
      });
      //this._form.add( dateStart, null, null, "dateStart" );
      hbox.add( dateStart );
      
      hbox.add( new qx.ui.basic.Label( this.tr("to") ).set({ alignY: "bottom" }) );
      var dateEnd = new qx.ui.form.DateField().set({
        value : new Date()
      });
      //this._form.add( dateEnd, null, null, "dateEnd" );
      hbox.add( dateEnd );
      
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      
      /*
       * left box
       */
      var vbox1 = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
    //    appearance : "logbuch-field"
      });
      hbox.add( vbox1, {flex:1} );
      this.add( hbox, {flex:1} );
     
      var groupbox = new qx.ui.groupbox.GroupBox( this.tr("Entry visible for") );
      groupbox.setLayout( new qx.ui.layout.VBox(5) );
      vbox1.add( groupbox, {flex: 1} );
      
      var field1 = new qx.ui.form.CheckBox( this.tr("Author") ).set({
        value : true
      });
      field1.addListener("changeValue",function(e){
        if( e.getData() == false )
        {
          field1.setValue(true);
        }
      },this);
      
      groupbox.add( field1 );
      
      var field2 = new qx.ui.form.CheckBox( this.tr("Own company") );
      groupbox.add( field2 );
      form.add( field2, null, null, "ownCompany" );
      
      var field3 = new qx.ui.form.CheckBox( this.tr("Own Consultant") );
      groupbox.add( field3 );
      form.add( field3, null, null, "ownConsultant" );
      
      var field4 = new qx.ui.form.CheckBox( this.tr("All Consultants") );
      groupbox.add( field4 );
      form.add( field4, null, null, "allConsultants" );
      
      var field3b = new qx.ui.form.CheckBox( this.tr("Scientific analyst") );
      groupbox.add( field3b );
      form.add( field3b, null, null, "analyst" );

      
      var field5 = new qx.ui.form.CheckBox( this.tr("All portal members") );
      groupbox.add( field5 );
      form.add( field5, null, null, "allMembers" );  
      
      var groupbox0 = new qx.ui.groupbox.GroupBox( this.tr("Entries by") );
      groupbox0.setLayout( new qx.ui.layout.Grow );
      vbox1.add( groupbox0, {flex:1} );
      
      /*
       * entries by
       */
      var field7 = new logbuch.component.TokenField().set({
        height        : 100,
        modelPath     : "value",
        style         : "facebook",
        hintText      : "Bitte geben Sie Teile des Namens ein, oder 'alle' ...", //FIXME
        searchingText : "Suche ...",
        noResultsText : "Keine passenden Einträge vorhanden ..."
      });
      groupbox0.add( field7 );
            
      // load list data on user input
      field7.addListener("loadData", function(e){
        var str = e.getData();
        this.__sandbox.rpcRequest(
          "logbuch.record", "personList", [ null, str ],
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
      
      this.__entriesBy = field7;     
      
      /*
       * middle box 
       */
      
      var vbox2 = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) );
      hbox.add( vbox2, {flex:1} );
      
      var hbox3 = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      vbox2.add( hbox3, {flex:2});
      
      var groupbox1 = new qx.ui.groupbox.GroupBox( this.tr("Filter by category") ).set({
        layout : new qx.ui.layout.VBox(5)
      });
      hbox3.add( groupbox1, {flex:1});
      
      var groupbox2 = new qx.ui.groupbox.GroupBox( this.tr("Subcategory")).set({
        layout : new qx.ui.layout.Grow()
      });
      hbox3.add( groupbox2, {flex:1});
      
      var stack = new qx.ui.container.Stack();
      groupbox2.add(stack);
      
      var struct = this.__sandbox.getLayoutConfig(true).categories.structure;
      for( var category in struct )
      {
        var cb1 = new qx.ui.form.CheckBox( struct[category].label ).set({
          textColor : "logbuch-category-" + category
        });
        groupbox1.add( cb1 ); 
        form.add( cb1, null, null, category );
        
        var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
          visibility : "hidden"
        });
        stack.add( vbox );
        
        var boxes = [];
        for ( var field in struct[category].fields )
        {
          var cb2 = new qx.ui.form.CheckBox( struct[category].fields[field] );  
          vbox.add( cb2 );
          boxes.push(cb2);
          form.add( cb2, null, null, field );
        }
        
        cb1.addListener("changeValue",function(vbox,boxes){
          return function(e){
            boxes.forEach( function(cb){
              cb.setValue(e.getData());
            } );
          };
        }(vbox,boxes),this);
        
        cb1.addListener("mouseover",function(vbox){
          return function(e){            
            stack.setSelection( [vbox] );
          };
        }(vbox),this);
      }
      stack.setSelection([]);
      
      var groupbox3 = new qx.ui.groupbox.GroupBox( this.tr("Other preferences") );
      groupbox3.setLayout( new qx.ui.layout.VBox(5) );
      hbox3.add( groupbox3, {flex:1});
      
      var field1 = new qx.ui.form.CheckBox( this.tr("Photos") );
      groupbox3.add( field1 );
      form.add( field1, null, null, "photos" );
      
      var field2 = new qx.ui.form.CheckBox( this.tr("Discussions") );
      groupbox3.add( field2 );
      form.add( field2, null, null, "discussions" );
      
//      var field3 = new qx.ui.form.CheckBox( this.tr("Time") );
//      groupbox3.add( field3 );
//      form.add( field3, null, null, "time" );
      
      var groupbox4 = new qx.ui.groupbox.GroupBox( this.tr("Report") );
      vbox2.add( groupbox4, {flex:1});
      groupbox4.setLayout( new qx.ui.layout.VBox(5) );

      
      var model = this._controller.createModel();
      
      /*
       * buttons
       */
      var hbox2 = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      hbox2.add( new qx.ui.core.Spacer(), {flex:1});
      this.add( hbox2 );
      
      var button = new qx.ui.form.Button( this.tr("Create Report") );
      button.addListener("execute",function(){
        var data = qx.util.Serializer.toNativeObject( this._controller.createModel() );
        this.__sandbox.rpcRequest(
          "logbuch.category", "createReport", [ data ],
          function(url)
          {
            window.open(url);
          }
        );
      },this);
      hbox2.add(button);      
      
      var button = new qx.ui.form.Button(this.tr("Cancel"));
      button.addListener("execute",function(){
        this.__sandbox.setApplicationState("view","main");
      },this);
      hbox2.add(button);
      
    },
    
    
    start : function(){},
    
    stop : function(){},    
    
    getFormModel : function()
    {
      return this._controller.getModel();
    },  
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */ 

    
    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */    

    
    dummy : null
  }
});