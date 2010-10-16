/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Autoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#asset(logbuch/icon/16/cancel.png)
************************************************************************ */

/**
 * 
 */
qx.Class.define("logbuch.component.ExtendedField",
{
  extend : qx.ui.container.Composite,
  
  statics :
  {
    getExtendedFieldName : function( name )
    {
      return name + "_extended";
    }
  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    
  
  /**
   * Creates an extended field from an existing form field
   * @param field {qx.ui.form.AbstractField}
   * @param name {String} Name in the form
   * @param form {qx.ui.form.Form} 
   * @param label{String} The label of the field
   */
  construct : function( field, name, form, label, controller )
  {
    this.base(arguments);
    
    this.hide();
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setAppearance("logbuch-category-page");
    
    var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
    
    hbox.add( new qx.ui.basic.Label(label).set({
      font : "bold"
    }));
    
    hbox.add( new qx.ui.core.Spacer(), {flex:1} );
    var img = new qx.ui.basic.Image( "logbuch/icon/16/cancel.png" );
    img.setOpacity(0.5);
    hbox.add(img);
    this.add( hbox );
    
    /*
     * short field
     */
    var shortfield = new logbuch.component.InputField( this.tr("Summary" ),null,"textarea" ).set({
      minHeight : 55 // FIXME
    });
    
    this.add( shortfield );     
    
    shortfield.getInputControl().addListener("focus",function(){
      this.__isFocused = true;
    },this);
    
    shortfield.getInputControl().addListener("blur",function(){
      this.__isFocused = false;
      qx.util.TimerManager.getInstance().start(function(){
        if ( ! this.__isFocused ) this.hide();
      },null,this,null,50);
    },this);
    
    // bi-directionally bind field
    field.bind("value", shortfield, "value" );
    shortfield.bind("value", field ,"value" );
    
    this.addListener("appear",shortfield.focus,shortfield);
    
    /*
     * long field
     */
    var longfield = new logbuch.component.InputField( this.tr("Extended Description" ),null,"textarea" );
    
    this.add( longfield, { flex : 1 } );     
    
    longfield.getInputControl().addListener("focus",function(){
      this.__isFocused = true;
    },this);  
    
    longfield.getInputControl().addListener("blur",function(){
      this.__isFocused = false;
      qx.util.TimerManager.getInstance().start(function(){
        if ( ! this.__isFocused ) this.hide();
      },null,this,null,50);
    },this);
    
    
    
    // add to form model 
    //longfield.addToForm( form, long_field_name );
    var long_field_name = logbuch.component.ExtendedField.getExtendedFieldName( name );
    controller.bind( "model." + long_field_name, longfield.getInputControl(), "value" ); 
    longfield.getInputControl().bind("value", controller, "model." + long_field_name );
    
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
    __isFocused : false,
    


    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    dummy : null
  }
});