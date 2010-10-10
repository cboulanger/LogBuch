/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * An index card - like widget to present forms and information 
 */
qx.Class.define("logbuch.component.InputField",
{
  extend : qx.ui.container.Composite,


 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   */
  construct : function( label, value, type )
  {
    this.base(arguments);
        
    this._setLayout(new qx.ui.layout.VBox(3));
    
    this.__type = type;
    this._labelControl = this.getChildControl("label"); 
    this._inputControl = this.getChildControl("input"); 
    
    if ( type != "selectbox" )
    {
      this._formElement.bind("value", this, "value");
    }
    
    this.setLabel( label || null );
    this.setValue( value || null );
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : 
  {
    // overrridden
    appearance :
    {
      refine : true,
      init   : "logbuch-inputfield"
    },
    
    /**
     * The label displayed in the tab
     * @type String
     */
    label :
    {
      check     : "String",
      nullable  : true,
      apply     : "_applyLabel"
    },
    
    /**
     * The value of the input field
     * @type String
     */
    value :
    {
      check     : "String",
      nullable  : true,
      apply     : "_applyValue",
      event     : "changeValue"
    },
    
    
    /**
     * Whether the widget is editalbe
     * @type Boolean
     */
    editable :
    {
      check     : "Boolean",
      nullable  : false,
      init      : true,
      event     : "changeEditable"
    }
    
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
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "label":
          control = new qx.ui.basic.Label( this.getLabel() );
          this._add(control);
          break;

        case "input":
          switch( this.__type )
          {
            case "password":
              control = new qx.ui.form.PasswordField();
              this.bind( "editable", control, "readOnly", {
                converter : function( value ) { return ! value; }
              } );
              break;
              
            case "textarea":
              control = new qx.ui.form.TextArea();
              this.bind( "editable", control, "readOnly", {
                converter : function( value ) { return ! value; }
              } );
              break;
              
            case "selectbox":
              control = new qx.ui.form.SelectBox();
              this.addListener("changeEditable",function(e){
                //control.setEnabled(e.getData());
              },this);
              break;              
              
            default:
              control = new qx.ui.form.TextField();
              this.bind( "editable", control, "readOnly", {
                converter : function( value ) { return ! value; }
              } );
              break;
          }
          this._formElement = control;
          this._add( control, {flex : 1} );
          break;
      }
      return control || this.base(arguments, id);
    },

    /**
     * Focus the input control in this widget
     */
    focus : function()
    {
      this.getInputControl().focus();
    },
    
    /*
    ---------------------------------------------------------------------------
      APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    
    _applyLabel : function( value, old )
    {
      this.getLabelControl().setValue( value );
    },
    
    _applyValue : function( value, old )
    {
      if ( this.__type !== "selectbox" )
      {
        this.getFormElement().setValue( value );  
      }
    },
    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    /**
     * Returns the element that can be used in a form widget 
     * Usually the same as the input control. 
     * @return {qx.ui.form.AbstractField}
     */    
    getFormElement : function()
    {
      return this._inputControl;
    },
    
    /**
     * Returns the input control
     * @return {qx.ui.form.AbstractField}
     */
    getInputControl : function()
    {
      return this._inputControl;
    },
    
    /**
     * Returns the label widget
     * @return {qx.ui.basic.Label}
     */
    getLabelControl : function()
    {
      return this._labelControl;
    },
    
    addToForm : function( form, name, validator, context )
    {
      form.add( this.getFormElement(), null, validator || null, name, context )
    },
    

    
    
    setRequired : function( value )
    {
      this.getFormElement().setRequired( value );
    },
    
    setReadOnly : function( value )
    {
      this.getFormElement().setReadOnly( value );
    },
    
    setLiveUpdate : function( value )
    {
      this.getFormElement().setLiveUpdate( value );
    },
    
    setValid : function( value )
    {
      this.getFormElement().setValid( value );
    },
    
    setInvalidMessage : function( value )
    {
      this.getFormElement().setInvalidMessage( value );
    }
    
  }
});
