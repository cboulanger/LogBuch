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
      
      hbox.add( new qx.ui.basic.Label("from").set({ alignY: "bottom" }) );
      var dateStart = new qx.ui.form.DateField().set({
        value : new Date()
      });
      this._form.add( dateStart, null, null, "dateStart" );
      hbox.add( dateStart );
      
      hbox.add( new qx.ui.basic.Label("to").set({ alignY: "bottom" }) );
      var dateEnd = new qx.ui.form.DateField().set({
        value : new Date()
      });
      this._form.add( dateEnd, null, null, "dateEnd" );
      hbox.add( dateEnd );
      
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      
      /*
       * left box
       */
      var vbox1 = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance : "logbuch-field"
      });
      hbox.add( vbox1, {flex:1} );
     
      vbox1.add( new qx.ui.basic.Label( this.tr("Entry visible for") ).set({
        font         : "bold",
        marginBottom : 5
      }));
      
      var field1 = new qx.ui.form.CheckBox( this.tr("Author") ).set({
        value : true
      });
      field1.addListener("changeValue",function(e){
        if( e.getData() == false )
        {
          field1.setValue(true);
        }
      },this);
      
      vbox1.add( field1 );
      form.add( field1, null, null, "author" );
      
      
      var field2 = new qx.ui.form.CheckBox( this.tr("Own company") );
      vbox1.add( field2 );
      form.add( field2, null, null, "ownCompany" );
      
      var field3 = new qx.ui.form.CheckBox( this.tr("Own Consultant") );
      vbox1.add( field3 );
      form.add( field3, null, null, "ownConsultant" );
      
      var field4 = new qx.ui.form.CheckBox( this.tr("All Consultants") );
      vbox1.add( field4 );
      form.add( field4, null, null, "allConsultants" );
      
      var field5 = new qx.ui.form.CheckBox( this.tr("All portal members") );
      vbox1.add( field5 );
      form.add( field5, null, null, "allMembers" );
      
      var field6 = new qx.ui.form.CheckBox( this.tr("Individual access for") );
      vbox1.add( field6 );
      field6.addListener("changeValue",function(e){
        var selection = field7.getSelection();
        if( e.getData() != ( selection.length > 0) )
        {
          field6.setValue( selection.length > 0 );  
        }
      },this);
      
      /*
       * more viewers
       */
      var field7 = this.__allowed = new tokenfield.Token().set({
        backgroundColor   : "logbuch-field-background",
        decorator         : "logbuch-field-border",
        height            : 100,
        selectionMode     : "multi",
        style             : "",
        hintText          : this.tr("Enter the first letters of the person, or * for all of them, or an email address to add a person")
      });
      field7.addListener("loadData", function(e){
        var str = e.getData();
        var data = [];
        for( var i=0; i<(Math.floor(Math.random()*10)+3);i++ )
        {
          data.push( { label: str + " " + i } );
        }
        qx.util.TimerManager.getInstance().start(function(){
          field7.populateList( str, data );
        },null,this,null,500);
      },this); 
      vbox1.add( field7, {flex:1} );
      form.add( field7, null, null, "moreMembers" );
      
      // update "Individual access for" dependent on selection
      field7.addListener("changeSelection",function(e){
        field6.setValue( e.getData().length > 0);
      },this);           
      
      
      /*
       * middle box 
       */
      
      var vbox2 = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance : "logbuch-field"
      });
      hbox.add( vbox2, {flex:1} );
      
      vbox2.add( new qx.ui.basic.Label( this.tr("Filter by category") ).set({
        font         : "bold",
        marginBottom : 5
      }));      
      
      var hbox3 = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      vbox2.add( hbox3, {flex:1});
      
      var groupbox1 = new qx.ui.groupbox.GroupBox().set({
        layout : new qx.ui.layout.VBox(5)
      });
      hbox3.add( groupbox1, {flex:1});
      
      var groupbox2 = new qx.ui.groupbox.GroupBox().set({
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
        
        cb1.addListener("click",function(vbox){
          return function(e){            
            stack.setSelection( [vbox] );
          };
        }(vbox),this);
      }
      stack.setSelection([]);
      
      
      /*
       * right box
       */
      
      var vbox3 = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        appearance : "logbuch-field"
      });
      hbox.add( vbox3, {flex:1} );
      this.add( hbox, {flex:1} );

      vbox3.add( new qx.ui.basic.Label( this.tr("Other preferences") ).set({
        font         : "bold",
        marginBottom : 5
      }));
      
      var field1 = new qx.ui.form.CheckBox( this.tr("Photos") );
      vbox3.add( field1 );
      form.add( field1, null, null, "photos" );
      
      var field2 = new qx.ui.form.CheckBox( this.tr("Discussions") );
      vbox3.add( field2 );
      form.add( field2, null, null, "discussions" );
      
      var field3 = new qx.ui.form.CheckBox( this.tr("Time") );
      vbox3.add( field3 );
      form.add( field3, null, null, "time" );
      
      /*
       * buttons
       */
      var hbox2 = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
      hbox2.add( new qx.ui.core.Spacer(), {flex:1});
      this.add( hbox2 );
      
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