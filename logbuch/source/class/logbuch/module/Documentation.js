/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************
#require(logbuch.module.AccessControl)
#require(logbuch.module.ExtendedField)
************************************************************************ */

/**
 * A category module for the editing of the documentation
 */
qx.Class.define("logbuch.module.Documentation",
{
  extend : logbuch.module.AbstractCategoryModule,
  
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function( name )
  {
    this.base(arguments, name || "documentation" );
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
    __extendedFields : null,
    
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
      this.base( arguments, sandbox );
      this.__sandbox = sandbox;
    },    

    /**
     * Builds the UI
     */
	  build : function()
	  {
      this.base(arguments);
      
      var form = this.__form = new qx.ui.form.Form(); 
      this.__controller = new qx.data.controller.Form( null, form );
      this.__extendedFields = {};
      
      var lc = this.__sandbox.getLayoutConfig();
      var rowHeight         = lc.getDocumentation().getRowHeight();
      var leftColumnWidth   = lc.getEvent().getLeftColumnWidth();
      var rightColumnWidth  = lc.getEvent().getRightColumnWidth();
      
      var grid = new qx.ui.container.Composite( 
        new qx.ui.layout.Grid(20,5)
          .setColumnWidth(0, leftColumnWidth )
          .setColumnFlex(1,1)
          .setColumnFlex(2,1)
          .setColumnFlex(3,1)
          .setColumnWidth(4, rightColumnWidth )
      );
      
      this.add(grid);
      
      /*
       * labels in first column
       */
      if ( this.getName() == "documentation" )
      {
	      var fields = [
	        { label : this.tr("Consultancy process"), name : "process" },
	        { label : this.tr("Result"), name : "result" },
	        { label : this.tr("Heureka!"), name : "heureka" },
	        { label : this.tr("Stumbling block"), name : "stumblingBlock" },
	        { label : this.tr("Incentive"), name : "incentive" },
	        { label : this.tr("Miscellaneous"), name : "miscellaneous" }
	      ];
      }
      else
      {
        var fields = [
          { label : this.tr("Heureka!"), name : "heureka" },
          { label : this.tr("Encounters"), name : "encounters" },
          { label : this.tr("Stumbling block"), name : "stumblingBlock" },
          { label : this.tr("Incentive"), name : "incentive" },
          { label : this.tr("Miscellaneous"), name : "miscellaneous" }
        ];        
      }
      
      for( var i=0; i< fields.length; i++) 
      {
        /*
         * label
         */
        var label = new qx.ui.basic.Label(fields[i].label).set({
          height     : rowHeight,
          width      : leftColumnWidth,
          paddingTop : Math.floor( rowHeight-20 ),
          textAlign  : "right",
          appearance : "logbuch-field" 
        });
        
        // add listener for row change
        this.addListener("focusRow",function(row,label){ 
          return function(e){
            if( e.getData() == row )
            {
              label.setBackgroundColor( this.getColor() );  
            }
            else
            {
              label.resetBackgroundColor();
            }
          }
        }(i,label)); // to get the variables into the closure, see http://www.mennovanslooten.nl/blog/post/62       
        
        grid.add( label, { row : i, column : 0 } );
        
        /*
         * textfield
         */
        var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) );
	      var field = new qx.ui.form.TextArea().set({
	        appearance  : "logbuch-field",
	        height      : rowHeight
	      });
        hbox.add(field,{flex:1});
        var _this = this;
        
        // listens for focus on field
	      field.addListener("focus",function(row){
          return function(){
            _this.fireDataEvent("focusRow",row);
          }         
	      }(i),this);   
        
        // listens for click on label
        label.addListener("click",function(field){
          return function(){
            field.focus();
          }   
        }(field), this);
        
	      form.add( field, null, null, fields[i].name );
        
        /*
         * "fullscreen"-button
         */
        var img = new qx.ui.basic.Image( "resource/logbuch/icon/16/full-screen.png" );
        img.setOpacity(0.5)
        hbox.add(img);
        
        // on click, extend the editor field
        img.addListener("click",function(field,name){
          return function(){
            field.focus();
			      _this._extendField(field, name);
          }
        }(field,fields[i].name),this);
        
	      grid.add( hbox, { row: i, column : 1, colSpan : 2 }); 
      }
      
      /*
       * save and invite buttons
       */
      var hbox = new qx.ui.container.Composite( new qx.ui.layout.HBox(5) ).set({
//        marginTop : 30,
        height    : 30
      });
      var button = new qx.ui.form.Button(this.tr("Save"));
      button.addListener("execute",this.save,this);
      hbox.add(button,{flex:1});

      grid.add( hbox, { row : 6, column : 0 } );
           

      /*
       * photos
       */
      var vbox = new qx.ui.container.Composite( new qx.ui.layout.VBox(5) ).set({
        width      : rightColumnWidth,
        appearance : "logbuch-field" 
      });
      field =  new logbuch.component.ImageField( this.tr("Photo 1" ) ).set({
        value     : "empty.png",
        height    : 100
      });
      form.add( field.getFormElement(), null, null, "photo1" );
      vbox.add( field );
      grid.add( vbox, { row : 0, column : 3, rowSpan : 6 } );
        
    },
 
    
    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */    

    

    
    /*
    ---------------------------------------------------------------------------
       APIT
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns the category module's (translated) label
     * @return {String}
     */
    getLabel : function()
    {
      return this.tr("Documentation");
    },

    /**
     * Returns the category module's translated item type
     * @return {String}
     */
    getItemType : function()
    {
      return this.tr("Documentation entry");
    },       
    
    dummy : null
  }
});