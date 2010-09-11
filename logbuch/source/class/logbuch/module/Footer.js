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
 * The footer module
 */
qx.Class.define("logbuch.module.Footer",
{
  extend : qx.ui.container.Composite,
  
  implement : [ qcl.application.IModule, qcl.application.IWidgetModule ],

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   */
  construct : function()
  {
    this.base(arguments);
    this.hide();
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
    
    /** 
     * @type qcl.application.Sandbox
     */
    __sandbox : null,
    
    /*
    ---------------------------------------------------------------------------
       INTERFACE METHODS
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Initializes the module
     * @param sandbox {qcl.application.Sandbox}
     */
    init : function( sandbox )
    {
      this.__sandbox = sandbox;
    },
    
    /**
     * Builds the UI
     */    
    build : function()
    {
      var lc = this.__sandbox.getLayoutConfig();
      
	    this.set({ 
	      layout     : new qx.ui.layout.HBox(5),
        height     : 50
	    });
      
      /*
       * "Calendar" labe.
       */
      this.add( new qx.ui.basic.Label( this.tr("Calendar") ).set({
        appearance  : "logbuch-label-box",
        textAlign   : "right",
        maxHeight   : lc.getFooter().getControlsHeight(),
        width       : lc.getSidebar().getWidth(),
        marginLeft  : lc.getSidebar().getMarginLeft(),
        marginTop   : lc.getFooter().getMarginTop()
      }));
      
      /*
       * one week back button 
       */
      var backButton = new qx.ui.form.Button(null,"logbuch/icon/16/button-arrow-left.png");
      backButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      backButton.addListener("execute",function(){
        var date = dateField.getValue();
        date.setDate(date.getDate() - 7 );
        dateField.setValue( date );
      },this);
      this.add( backButton );
      
      /*
       * Date field 
       */
      var dateField = new qx.ui.form.DateField().set({
        value       : new Date(),
        maxHeight   : lc.getFooter().getControlsHeight(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      
      dateField.addListener("changeValue", function(e) {
       this.__sandbox.publish("change-date", e.getData() );
      }, this );
      
      this.__sandbox.subscribe("change-date",function(e){
        var date = e.getData();
        if( date instanceof Date )
        {
          dateField.setValue( date );
        }
      },this);
      
      this.add( dateField );
      
      /**
       * go to today 
       */
      var todayButton = new qx.ui.form.Button(this.tr('Today'));
      todayButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      todayButton.addListener("execute",function(){
        this.__sandbox.publish("change-date-today");
      },this);
      this.add( todayButton );      
      
      /**
       * one week forward
       */
      var forwardButton = new qx.ui.form.Button(null,"logbuch/icon/16/button-arrow-right.png");
      forwardButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      forwardButton.addListener("execute",function(){
        var date = dateField.getValue();
        date.setDate(date.getDate() + 7 );
        dateField.setValue( date );
      },this);
      this.add( forwardButton );
      
      this.add( new qx.ui.core.Spacer(), {flex: 1} );

      /**
       * ?
       */
      var button1 = new qx.ui.form.Button("abc");
      button1.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        width       : lc.getFooter().getButtonWidth(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      this.add( button1 );
      
      /**
       * Print button 
       */
      var printButton = new qx.ui.form.Button(this.tr("Print"));
      printButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        width       : lc.getFooter().getButtonWidth(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      this.add( printButton );
      
      /**
       * Admin button
       */
      var adminButton = new qx.ui.form.Button(this.tr("Admin"));
      adminButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        width       : lc.getFooter().getButtonWidth(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      this.add( adminButton );
      
      this.add( new qx.ui.core.Spacer(), {flex: 1} );
      
      this.add( new qx.ui.basic.Image("logbuch/image/tuev_logo.png"), {flex: 1} );
      
    },
      
    start : function(){},
    stop : function(){}
    
  }
});
