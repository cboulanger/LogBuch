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
       
      this.__extendedFields = {};
      var lc = this.__sandbox.getLayoutConfig();
      var rowHeight         = lc.getDocumentation().getRowHeight();
      var leftColumnWidth   = lc.getEvent().getLeftColumnWidth();
      var rightColumnWidth  = lc.getEvent().getRightColumnWidth();
      var layout = new qx.ui.layout.Grid(20,5)
          .setColumnWidth(0, leftColumnWidth )
          .setColumnFlex(1,1)
          .setColumnFlex(2,1)
          .setColumnWidth(3, rightColumnWidth );
      var grid = new qx.ui.container.Composite( layout);
      
      this.add(grid);
      
      var form = this._form;
      
      /*
       * labels in first column
       */
      var fields = this.getFieldData();
      for( var i=0; i< 6; i++) // FIXME
      {
        layout.setRowHeight( i, rowHeight );
        if ( ! fields[i] ) continue;
        
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
        }(i,label)); 
        
        // @todo focus on first field
        
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
        
        // listens for double-click on field to extend it
        field.addListener("dblclick",function(field,name,label){
          return function(){
            _this._extendField(field, name, label);
          };
        }(field,fields[i].name,fields[i].label),this);
        
        // listens for click on label
        label.addListener("click",function(field){
          return function(){
            field.focus();
          };
        }(field), this);
        
	      form.add( field, null, null, fields[i].name );
        
        /*
         * "fullscreen"-button
         */
        var img = new qx.ui.basic.Image( "resource/logbuch/icon/16/full-screen.png" );
        img.setOpacity(0.5);
        hbox.add(img);
        
        // on click, extend the editor field
        img.addListener("click",function(field,name,label){
          return function(){
            field.focus();
			      _this._extendField(field, name,label);
          };
        }(field,fields[i].name,fields[i].label),this);
        
	      grid.add( hbox, { row: i, column : 1, colSpan : 2 }); 
      }
      
      /*
       * Item actions
       */   
      grid.add( this._createItemActionButtonPanel(), { row : 6, column : 0 } );
           
      /*
       * author label
       */
      grid.add( this._createAuthorLabel(), { row : 6, column : 1 } );
      
      /*
       * right column
       */
      this._createRightColumn( grid, 7 );  
        
    },
 
        
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns the data from which to construct the different fields
     * in the module
     * @return {Array}
     */
    getFieldData : function()
    {
      return [
        { label : this.tr("Consultancy process"), name : "process" },
        { label : this.tr("Result"), name : "result" },
        { label : this.tr("Heureka!"), name : "heureka" },
        { label : this.tr("Stumbling block"), name : "stumblingBlock" },
        { label : this.tr("Incentive"), name : "incentive" },
        { label : this.tr("Miscellaneous"), name : "miscellaneous" }
      ];    
    },
    
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
    
    /**
     * Creates a message from the event data
     */
    createMessage : function()
    {
      var data = qx.util.Serializer.toJson( this.getModel() );
      console.log( data );
    },     
    
    dummy : null
  }
});