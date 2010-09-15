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
qx.Class.define("logbuch.component.Uploader",
{
  extend : qx.ui.container.Composite,
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    
  construct : function()
  {
    this.base(arguments);
    
    this.hide();
    this.setLayout(new qx.ui.layout.VBox(5));
    this.setAppearance("logbuch-category-page");
    
    var iframe = this.__iframe = new qx.ui.embed.Iframe(this.__iframeSrc);
    iframe.addListenerOnce( "load",function(e){
      var body = iframe.getBody();
      this.__iframeBody = body;
      body.__uploader = this;
    }, this);          
    this.add( iframe, {flex:1});
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

    __iframe : null,
    __iframeBody : null,
    __iframeSrc : "../html/fancyupload/multiple.html",
    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */
    
    dummy : null
  }
});