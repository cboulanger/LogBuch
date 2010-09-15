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
qx.Class.define("logbuch.component.ImageField",
{
  extend : logbuch.component.InputField,
  

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
  
    __iframeSrc : "../html/fancyupload/single.html",
    __iframeBody : null,    
    
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
          /*
           * create an iframe with the upload widget in it
           */
          control = new qx.ui.embed.Iframe(this.__iframeSrc).set({
            scrollbar : "no"
          });
					var font = qx.theme.manager.Font.getInstance().resolve("small");
					control.addListenerOnce( "load",function(e){
				    var body = control.getBody();
				    qx.bom.element.Style.setStyles(body, font.getStyles());
				    this.__iframeBody = body;
            body.__imageField = this;
            body.getElementById("photo").src = "uploads/empty.png";
				  }, this);          
          this.__formElement = new qx.ui.form.TextField();
          this._add(control, {flex : 1});
          break;
      }

      return control || this.base(arguments, id);
    },

    /**
     * Focus the input control in this widget
     */
    focus : function()
    {
      // do nothing
    },
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    
    _applyValue : function( value, old )
    {
      this.__formElement.setValue( value );
      if ( ! this.__iframeBody )
      {
        this.getInputControl().addListenerOnce("appear", function(){
          this._applyValue( value, old );
        },this);
      }
      else
      {
        this.__iframeBody.getElementById("photo").src = "uploads/" + value;  
      }
    },
    
    // FIXME!
    _applyEnabled : function( value, old )
    {
      this.base( arguments, value, old );
      this.getInputControl().setVisibility(value ? "visible":"hidden");
    },
        

    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    /**
     * Returns the element that can be used in a form widget 
     * Here we use a dummy text field as a placeholder for the image
     * @return {qx.ui.form.AbstractField}
     */    
    getFormElement : function()
    {
      return this.__formElement;
    }
  }
});
