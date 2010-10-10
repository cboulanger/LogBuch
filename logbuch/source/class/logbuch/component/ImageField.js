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
  
  properties :
  {
    imageSize :
    {
      check : "Integer",
      nullable : true
    }
  },
  

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
  
    __iframeSrc : "../html/fancyupload/single.html?323452345",
    __iframeBody : null,
    __image : null,
    
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
            var img = body.getElementById("photo");
            img.src = "assets/upload.png";
            img.onerror = function(){
              img.src = "assets/upload.png";
            }
				  }, this);          
          this._formElement = new qx.ui.form.TextField();
          this._add(control, {flex : 1});
          
          this.__image = new qx.ui.basic.Image().set({
            scale : true
          });
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
      this._formElement.setValue( value );
      if ( ! this.__iframeBody )
      {
        this.getInputControl().addListenerOnce("load", function(){
          this._applyValue( value, old );
        },this);
      }
      else
      {
        if ( ! value )
        {
          var src = "assets/upload.png";
        }
        else
        {
          if ( this.getImageSize() )
          {
            var src = "uploads/" + this.getImageSize() + "/" + value;
          }
          else
          {
            var src = "uploads/" + value;  
          }
        }
        qx.util.TimerManager.getInstance().start( function(){
	        var photo = this.__iframeBody.getElementById("photo");
	        photo.src = src;        
        }, null, this, null, 50);
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
      return this._formElement;
    }
  }
});
