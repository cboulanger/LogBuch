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
 * 
 */
qx.Class.define("logbuch.module.AccessControl",
{
  extend : logbuch.module.AbstractCategoryModule,
  
  type : "singleton",
 
  
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

  construct : function()
  {
    this.base(arguments, "accessControl" );
    
    
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

    __form : null,
    __controller : null,    
    __allowed : null,
    
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
      
      this.hide();
      this.setLayout(new qx.ui.layout.VBox(5));
      this.setAppearance("logbuch-access-control");

      this.add( new qx.ui.basic.Label( this.tr("Entry visible for") ).set({
        textAlign    : "center",
        font         : "bold",
        marginBottom : 5
      }));
      
      var form = this.__form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      
      var field = new qx.ui.form.CheckBox( this.tr("Author") ).set({
        value : true,
        enabled : false
      });
      this.add( field );
      form.add( field, null, null, "author" );
      
      var field = new qx.ui.form.CheckBox( this.tr("Own company") );
      this.add( field );
      form.add( field, null, null, "ownCompany" );
      
      var field = new qx.ui.form.CheckBox( this.tr("Own Consultant") );
      this.add( field );
      form.add( field, null, null, "ownConsultant" );
      
      var field = new qx.ui.form.CheckBox( this.tr("All Consultants") );
      this.add( field );
      form.add( field, null, null, "allConsultants" );
      
      var field = new qx.ui.form.CheckBox( this.tr("All portal members") );
      this.add( field );
      form.add( field, null, null, "allMembers" );
      
      this.add( new qx.ui.basic.Label( this.tr("Individual access for") ).set({
        textAlign   : "center",
        font        : "bold",
        marginTop   : 10
      }));      
      
      /*
       * more viewers
       */
      var t = this.__allowed = new tokenfield.Token().set({
        backgroundColor   : "logbuch-field-background",
        decorator         : "logbuch-field-border",
        height            : 200,
        selectionMode     : "multi",
        style             : "",
        hintText          : this.tr("Enter the first letters of the person, or * for all of them, or an email address to add a person")
      });
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
      this.add( t, {flex:1} );
      form.add( field, null, null, "moreMembers" );
      
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
      var button = new qx.ui.form.Button(this.tr("Cancel"));
      button.addListener("execute",this.cancel,this);
      hbox.add(button,{flex:1});
      this.add(hbox);
      
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
    

    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    
    // overridden
    show : function()
    {
      this.__form.reset();
      this.base(arguments);
    },
    
    save : function()
    {
      this.fireEvent("completed");
      this.hide();
    },
    
    cancel : function()
    {
      this.hide();
    },
    
    /**
     * Add to the list of the users authorized to see the module 
     * @param itemArr {qx.ui.form.ListItem[]} An array of list items 
     */
    _addAllowedItems : function( itemArr )
    {
      if( ! itemArr instanceof Array ) 
      {
        this.error("Invalid parameter, array expected");
      }
      itemArr.forEach( function( item ){
        this.__allowed._selectItem( item );
      },this);
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