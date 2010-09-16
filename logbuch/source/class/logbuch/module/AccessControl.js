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
  extend : dialog.Dialog,
  
  type : "singleton",
 
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {
//    blockerColor : 
//    {
//      refine : true,
//      init   : "white"
//    }
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function()
  {
    this.base(arguments );
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
       OVERRIDDEN METHODS
    ---------------------------------------------------------------------------
    */    

    /**
     * Builds the UI
     */
	  _createWidgetContent : function()
	  {
     
      var container = this.getDialogContainer();

      container.add( new qx.ui.basic.Label( this.tr("Entry visible for") ).set({
        textAlign    : "center",
        font         : "bold",
        marginBottom : 5
      }));

      var form = this.__form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      
      var field1 = new qx.ui.form.CheckBox( this.tr("Author") ).set({
        value : true
      });
      field1.addListener("changeValue",function(e){
        if( e.getData() == false )
        {
          field1.setValue(true);
        }
      },this);
      
      container.add( field1 );
      form.add( field1, null, null, "author" );
      
      
      var field2 = new qx.ui.form.CheckBox( this.tr("Own company") );
      container.add( field2 );
      form.add( field2, null, null, "ownCompany" );
      
      var field3 = new qx.ui.form.CheckBox( this.tr("Own Consultant") );
      container.add( field3 );
      form.add( field3, null, null, "ownConsultant" );
      
      var field4 = new qx.ui.form.CheckBox( this.tr("All Consultants") );
      container.add( field4 );
      form.add( field4, null, null, "allConsultants" );
      
      var field5 = new qx.ui.form.CheckBox( this.tr("All portal members") );
      container.add( field5 );
      form.add( field5, null, null, "allMembers" );
      
      var field6 = new qx.ui.form.CheckBox( this.tr("Individual access for") );
      container.add( field6 );
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
      container.add( field7, {flex:1} );
      form.add( field7, null, null, "moreMembers" );
      
      // update "Individual access for" dependent on selection
      field7.addListener("changeSelection",function(e){
        field6.setValue( e.getData().length > 0);
      },this);      
      
      /*
       * buttons pane
       */
      var buttonPane = new qx.ui.container.Composite;
      var bpLayout = new qx.ui.layout.HBox(5);
      bpLayout.setAlignX("center");
      buttonPane.setLayout( bpLayout );
      container.add(buttonPane);
      
      /* 
       * Ok Button 
       */
      var okButton = this._createOkButton();
      buttonPane.add( okButton );   
      
      /* 
       * Cancel Button 
       */
      var cancelButton = this._createCancelButton();
      buttonPane.add( cancelButton );
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
    // FIXME add destruct
  }
});