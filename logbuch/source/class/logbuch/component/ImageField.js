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
  
  statics :
  {
    QCL_UPLOAD_PATH       : "../../services/attachments",
    LOGBUCH_USERICON_PATH : "../../services/attachments/thumbs"
  },
  
  properties :
  {
    /**
     * The size of the maximal size in width or length
     * @type 
     */
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
  
    __iframeSrc : "../html/fancyupload/single.html?" + (new Date).getTime(),
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
            body.imageField = this;
            var img = body.getElementsByTagName("img")[0];
            img.src = "assets/upload.png";
            img.onerror = function(){
              img.src = "assets/upload.png";
            };            
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
        return;
      }
      else
      {
        var photo = this.__iframeBody.getElementsByTagName("img")[0];
        var src, fallback;
        if ( ! value )
        {
          var src = "assets/upload.png";
        }
        else if ( this.getImageSize() )
        {
          src = this.self(arguments).LOGBUCH_USERICON_PATH + "/" + this.getImageSize() + "/" + value;
          fallback = this.self(arguments).QCL_UPLOAD_PATH + "/" + value;
        }  
        else
        {
          src = this.self(arguments).QCL_UPLOAD_PATH + "/" + value;
          fallback = "assets/upload.png";
        }
        
        /*
         * fallback for invalid photos
         */
        photo.onerror = function(){
          //console.log("Invalid image source, falling back to " + fallback ); 
          photo.onerror = function(){
            //console.log("Invalid fallback, resetting "); 
            photo.onerror = null;
            photo.src = "assets/upload.png";
          }
          photo.src = fallback;
        }
        
        /*
         * fix height wehn loaded
         */
        var imgSize = this.getImageSize();
        photo.onload = function(){
          photo.onload = null;
          if ( imgSize )
          {
            //console.log("Setting size to " +  imgSize);
            photo.style.maxHeigth = imgSize + "px";
            photo.style.maxWidth  = imgSize + "px";
          }
        }
        //console.log("Setting image source to: " + src);
        photo.src = src;
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
