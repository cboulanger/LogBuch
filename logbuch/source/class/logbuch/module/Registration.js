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
 * the setup Widget 
 */
qx.Class.define("logbuch.module.Registration",
{
  extend : logbuch.component.IndexCard,

  implement : [ 
    qcl.application.IModule, 
    qcl.application.IWidgetModule,
    qcl.application.IFormModule
  ],

 
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
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
      this.getChildrenContainer().setLayout( new qx.ui.layout.VBox(5) );
      
      this.addListener("appear",function(){
        this.setEnabled(true);
        field1.set({
          value : "",
          enabled : true
        });
        field2.set({
          value : "",
          enabled : false
        });
        field3.set({
          value : "",
          enabled : false
        });
      },this);

      /*
       * greeting
       */
      this.add( new qx.ui.basic.Label( this.tr("registration_greeting" ) ).set({
        rich      : true, 
        height    : 200
      }) );
      
      
      var grid = new qx.ui.container.Composite( new qx.ui.layout.Grid(5,5).setColumnFlex( 0, 1) );
      this.add(grid);
      
      /*
       * start password 
       */ 
      var field1 =  new logbuch.component.InputField( this.tr("Enter start passwort" ), null, "password" );
      field1.setLiveUpdate(true);
      field1.addListener("changeValue",function(e){
        button.setEnabled(e.getData() != "");
      },this );
      grid.add( field1, { row:0, column:0 } );      
      
      /*
       * personal password
       */
      var field2 =  new logbuch.component.InputField( this.tr("Enter personal passwort" ), null, "password" );
      grid.add( field2, { row:1, column:0 } );    
      
      var field3 =  new logbuch.component.InputField( this.tr("Repeat personal passwort" ), null, "password" );
      grid.add( field3, { row:2, column:0 } );
      
      /*
       * continue... button
       */
      var button = new qx.ui.form.Button( this.tr("Continue ...") ).set({
        maxHeight : 28,
        marginTop : 20,
        enabled   : false
      });
      grid.add( button, { row:0, column:1 } );
      button.addListener("execute",function(){
        if ( ! this.__startPasswordEntered )
        {
          var startpassword = field1.getValue();
          this.__sandbox.rpcRequest( 
            "logbuch.registration", "checkStartPassword", [ startpassword ],
            function( data ){
              if ( data )
              {
                /*
                 * implicit login
                 */
                this.__sandbox.authenticate( data.username, startpassword, function(){
                  this.__userId = data.userId;
                  this.__startPasswordEntered = true
                  field1.setEnabled(false);
                  field2.setEnabled(true);
                  field2.focus();
                  field3.setEnabled(true);
                  grid.add( button, { row:2, column:2} );    
                },this );
              }
              else
              {
                dialog.Dialog.alert( this.tr("Wrong password!"));
                grid.add( button, { row:0, column:1 } );
              }
            }, this
          );
        }
        else
        {
          if ( field2.getValue() == field3.getValue() )
          {
            this.__sandbox.rpcRequest(
              "logbuch.registration", "savePassword", 
              [ null, this.__userId, field1.getValue(), field2.getValue() ],
              function( personId ){
                field2.setEnabled(false);
                field3.setEnabled(false);
	              this.setEnabled(false);
                this.fireDataEvent("action",{
                  action : 'load',
                  id     : personId
                });
              },this
            );
            
            button.hide();
          }
          else
          {
            dialog.Dialog.alert( 
              this.tr("Passwords do not match. Please re-enter your personal password"), function(){
              field2.setValue(null);
              field3.setValue(null);
              field2.focus();
            },this );
            
          }
        }
      },this);
      
      
    },
    
    getFormModel : function()
    {
      return this.__controller.getModel();
    },
    
    start : function(){},
    stop : function(){},
    
    /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
    dummy : null

  
  }
});