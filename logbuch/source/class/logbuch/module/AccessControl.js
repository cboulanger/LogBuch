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
      
      var field2 = new qx.ui.form.CheckBox( this.tr("Own company") );
      container.add( field2 );
      form.add( field2, null, null, "ownCompany" );
      
      var field3 = new qx.ui.form.CheckBox( this.tr("Own consultant") );
      container.add( field3 );
      form.add( field3, null, null, "ownConsultant" );
      
      var field4 = new qx.ui.form.CheckBox( this.tr("All consultants") );
      container.add( field4 );
      form.add( field4, null, null, "allConsultants" );
            
      var field4b = new qx.ui.form.CheckBox( this.tr("Scientific analyst") );
      container.add( field4b );
      form.add( field4b, null, null, "analyst" );      
      
      var field5 = new qx.ui.form.CheckBox( this.tr("All portal members") );
      container.add( field5 );
      form.add( field5, null, null, "allMembers" );
      
      var field6 = new qx.ui.form.CheckBox( this.tr("Individual access for") );
      container.add( field6 );
      field6.addListener("changeValue",function(e){
        var selection = field7.getTokenIds();
        if( e.getData() != ( selection.length > 0) )
        {
          field6.setValue( selection.length > 0 );  
        }
      },this);
      
      /*
       * more members
       */
      var field7 = new logbuch.component.TokenField().set({
        height        : 100,
        modelPath     : "value",
        style         : "facebook",
        hintText      : "Bitte geben Sie Teile des Namens ein, oder 'alle' ...", //FIXME
        searchingText : "Suche ...",
        noResultsText : "Keine passenden Einträge vorhanden ..."
      });
            
      // load list data on user input
      field7.addListener("loadData", function(e){
        var str = e.getData();
        this.sandbox.rpcRequest(
          "logbuch.record", "personList", [ null, str ],
          function ( data ){
            field7.populateList( str, data );    
          }, this
        );
      },this);
      
      // when value changes, recreate tokens
      field7.addListener("loadTokenData", function(){
        field7.setEnabled(false);
        okButton.setEnabled(false);
        this.sandbox.rpcRequest( 
          "logbuch.record", "personList", 
          [null, field7.getTokenIds().toArray() ],
          function ( data ){
            field7.setEnabled(true);
            okButton.setEnabled(true);
            data.forEach( function( itemModelData ) {
              field7.addToken( itemModelData );
            });    
          }
        );
      },this);
      
      // sync with model
      this.__controller.bind("model.moreMembers", field7, "tokenIds" );
      field7.bind("tokenIds", this.__controller, "model.moreMembers" );     
      
      // add to ui
      container.add( field7, {flex:1} );
      
      // update "Individual access for" dependent on selection
      field7.addListener("changeTokenIds",function(e){
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
        
    reset : function()
    {
      this.__form.reset();
    },
    
    getModel : function()
    {
      return this.__controller.getModel() || this.__controller.createModel();
    },    
    
    getData : function()
    {
      var data = qx.util.Serializer.toNativeObject( this.getModel() );
      return data;
    },
    
    setModel : function( model )
    {
      this.__controller.setModel( model );
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