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
    this.getChildControl("label"); 
    this.getChildControl("input"); 
    
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
              break;
              
            case "textarea":
              control = new qx.ui.form.TextArea();
              break;
              
            default:
              control = new qx.ui.form.TextField();
              break;
          }
          control.bind( "value", this, "value" );
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
      this.getFormElement().setValue( value );
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
      return this.getInputControl();
    },
    
    /**
     * Returns the input control
     * @return {qx.ui.form.AbstractField}
     */
    getInputControl : function()
    {
      return this.getChildControl("input");
    },
    
    /**
     * Returns the label widget
     * @return {qx.ui.basic.Label}
     */
    getLabelControl : function()
    {
      return this.getChildControl("label");
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
