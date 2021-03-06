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
      this.__sandbox.subscribe("activate-category",function(e){
        this.setEnabled( e.getData() === null );
      },this);
      
      var lc = this.__sandbox.getLayoutConfig();
      
	    this.set({ 
	      layout     : new qx.ui.layout.HBox(5),
        height     : 50
	    });
      
      /*
       * one week back button 
       */
      var backButton = new qx.ui.form.Button(null,"logbuch/icon/16/button-arrow-left.png");
      backButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        marginTop   : lc.getFooter().getMarginTop(),
        marginLeft  : lc.getSidebar().getMarginLeft() + lc.getSidebar().getWidth()
      });
      backButton.addListener("execute",function(){
        var date = dateField.getValue();
        date.setDate(date.getDate() - 7 ); // FIXME
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
      
      /*
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
      
      /*
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
        date.setDate(date.getDate() + 7 );// FIXME this doesn't always work
        dateField.setValue( date );
      },this);
      this.add( forwardButton );
      
      this.add( new qx.ui.core.Spacer(), {flex: 1} );
      
      /*
       * teamblog
       */
      var button = new qx.ui.form.Button( this.tr("TeamBlog") ).set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        minWidth       : lc.getFooter().getButtonWidth(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      button.addListener("execute",function(){
        var url="../html/teamblog/?ds=" + ( window.location.params.ds || "" ) + 
          "#S_" + this.__sandbox.getSessionId();
        window.open(url, "teamblog");
      },this);
      this.add( button );          

      /*
       * users
       */
      var button = new qx.ui.form.Button( this.tr("Users") ).set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        minWidth       : lc.getFooter().getButtonWidth(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      button.addListener("execute",function(){
        this.__sandbox.setApplicationState("view","users");
      },this);
      this.add( button );         
    
      
      /*
       * Admin button
       */
      var adminButton = new qx.ui.form.MenuButton(this.tr("Admin"));
      adminButton.set({
        //decorator : "main",
        maxHeight   : lc.getFooter().getControlsHeight(),
        width       : lc.getFooter().getButtonWidth(),
        marginTop   : lc.getFooter().getMarginTop()
      });
      this.add( adminButton );
      
      var menu = new qx.ui.menu.Menu();
      adminButton.setMenu( menu );
      this.__sandbox.bindPermissionState("logbuch.admin", adminButton, "visibility", {
        converter : function( v ){ return v ? "visible" : "excluded"; }
      });
      
      
      /*
       * organization management
       */
      var button = new qx.ui.menu.Button( this.tr("Organization management") );
      this.__sandbox.bindPermissionState("logbuch.members.manage", button, "visibility", {
        converter : function( v ){ return v ? "visible" : "excluded"; }
      });      
      button.addListener("execute",function(){
        this.__sandbox.setApplicationState("view","organizations");
      },this);
      menu.add( button ); 
      
      /*
       * Time sheet
       */
      var button = new qx.ui.menu.Button( "Zeiterfassung" );// FIXME
      this.__sandbox.bindPermissionState("logbuch.members.manage", button, "visibility", {
        converter : function( v ){ return v ? "visible" : "excluded"; }
      });      
      button.addListener("execute",function(){
        window.open(
          "../services/server.php?ds=" + ( window.location.ds || "" ) +  
          "&service=logbuch.report&method=createTimesheet&params=[]" + 
          "&QCLSESSID=" + this.__sandbox.getSessionId()
        );
      },this);
      menu.add( button );        
           
      /*
       * project setup
       */
//      var button = new qx.ui.menu.Button( this.tr("Setup Project") ).set({
//        enabled : true
//      });
//      this.__sandbox.bindPermissionState("logbuch.setup", button, "visibility", {
//        converter : function( v ){ return v ? "visible" : "excluded"; }
//      });          
//      button.addListener("execute",function(){
//        this.__sandbox.setApplicationState("view","setup");
//      },this);
//      menu.add( button );
      
      /*
       * advanced user management
       */
      var button = new qx.ui.menu.Button( this.tr("Advanced user management") );
      this.__sandbox.bindPermissionState("access.manage", button, "visibility", {
        converter : function( v ){ return v ? "visible" : "excluded"; }
      });      
      button.addListener("execute",function(){
        var acl = new logbuch.component.AccessControl( this.__sandbox );
        acl.open();
      },this);
      menu.add( button );      
      
      
      /*
       * survey management
       */
      var button = new qx.ui.menu.Button( "Verwaltung der E-Mail-Fragebogen" );
      this.__sandbox.bindPermissionState("logbuch.members.manage", button, "visibility", { // FIXME permission
        converter : function( v ){ return v ? "visible" : "excluded"; }
      }); 
      button.addListener("execute",function(){
        this.__sandbox.rpcRequest("logbuch.survey","startDialog");
      },this);
      menu.add( button ); 
      
      /*
       * category management
       */
      var button = new qx.ui.menu.Button( "Verwaltung der Kategorien" );
      this.__sandbox.bindPermissionState("logbuch.members.manage", button, "visibility", { // FIXME permission
        converter : function( v ){ return v ? "visible" : "excluded"; }
      }); 
      button.addListener("execute",function(){
        this.__sandbox.rpcRequest("logbuch.category","startDialog");
      },this);
      menu.add( button );       
      
    },
      
    start : function(){},
    stop : function(){}
    
  }
});
