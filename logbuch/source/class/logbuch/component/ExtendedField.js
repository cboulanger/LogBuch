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
qx.Class.define("logbuch.component.ExtendedField",
{
  extend : qx.ui.container.Composite,
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    
  construct : function( field, name, form )
  {
    this.base(arguments);
    
    this.hide();
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setAppearance("logbuch-category-page");
    
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
    
    // add to form 
    longfield.addToForm( form, name + "_long" );
    
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