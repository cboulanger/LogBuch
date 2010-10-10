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
qx.Class.define("logbuch.component.AccessControl",
{
  extend : qcl.ui.component.AccessControlTool,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function( sandbox )
  {
    this.__sandbox = sandbox;
    this.base( arguments );
    
    
  },    
    
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Loads the model for the select box displaying the element types.
     * Each item of the model has the structure 
     * { label : "String", value : "String", icon : "String" }.
     * When the data is available, it must be saved in the "model" property of 
     * the passed controller.
     * @param controller {qx.data.controller.List}
     */
    loadElementTypeModel : function( controller )
    {
      this.__sandbox.rpcRequest(
        "logbuch.acltool","getAccessElementTypeModel", [],
        function( data ){
          controller.setModel( qx.data.marshal.Json.createModel(data) );
        },this
      );
    }, 
    
    /**
     * Loads the elements of the given qx.ui.list.List. When available, 
     * saves the data into the "model" property of the list. 
     * The the structure of the qx.data.Array items is 
     * { label : "String", value : "String", icon : "String" }
     * @param list {qx.ui.list.List} The list to populate
     * @param type {String} The type of the elements
     * @param filter {String|undefined} An optional filter string
     */
    loadElements : function( list, type, filter )
    {
      this.__sandbox.rpcRequest(
        "logbuch.acltool","getAccessElementModel", 
        [ type, filter || null ],
        function( data ){
          list.setModel( qx.data.marshal.Json.createModel(data) );
        },this
      );
    },
    
    /**
     * Loads the nodes of a qx.ui.tree.Tree and populates it by using the 
     * given qx.data.controller.Tree. When available, saves the data into 
     * the "model" property of the controller. The nodes of the tree must have the 
     * structure { label : "String", type : "String", value : "String", icon : "String" }
     * @param  treeController {qx.data.controller.Tree}
     */
    loadTree : function( treeController )
    {
      this.__sandbox.rpcRequest(
        "logbuch.acltool","getTreeModel", 
        [ this.getLeftElementType(), this.getLeftElementId() ],
        function( data ){
          treeController.setModel( qx.data.marshal.Json.createModel(data) );
        },this
      );
    },
    
    /**
     * Loads the model of the the given qx.ui.list.List. When available, 
     * saves the data into the "model" property of the list. The difference
     * to {@link #loadLinkableElements} is that the list should only contain
     * the elements that can be linked to the currently selected item, i.e.
     * exclude all those that are already linked. Currently this filtering
     * is not implemented on the server side. 
     * 
     * The the structure of the qx.data.Array items is 
     * { label : "String", value : "String", icon : "String" }
     * @param list {qx.ui.list.List} The list to populate
     */
    loadLinkableElements : function( list )
    {
      var targetType  = this.getLeftElementType(),
          targetId    = this.getLeftElementId(),
          linkType    = this.getTreeElementType(),
          linkId      = this.getTreeElementId();
     
      this.__sandbox.rpcRequest(
        "logbuch.acltool","getLinkableElementModel", 
        [ targetType, targetId, linkType, linkId ],
        function( data ){
          list.setModel( qx.data.marshal.Json.createModel(data) );
        },this
      );
    },    
    
    /**
     * Adds an element of the given type to the given qx.ui.list.List. 
     * @param list {qx.ui.list.List}
     * @param type {String}
     */
    addElement : function( list, type )
    {
      dialog.Dialog.prompt( this.tr("Please enter the ID of the new %1", this.tr( type ) ), function( id ){
        if( ! id ) return;
	      this.__sandbox.rpcRequest(
	        "logbuch.acltool","addElement", 
	        [ type, id ]
	      );
      },this );
    },

    /**
     * Removes an element from the given qx.ui.list.List.  
     * @param list {qx.ui.list.List}
     * @param type {String}
     */    
    removeElement : function( list, type )
    {
      dialog.Dialog.confirm( this.tr("Are you sure you would like to delete the selected item(s)?" ), function( proceed ){
        if ( proceed )
        {
		      var ids = [];
		      list.getSelection().forEach( function( item ){
		        ids.push( item.getValue() );
		      },this );
		      this.__sandbox.rpcRequest(
		        "logbuch.acltool","deleteElement", 
		        [ type, ids ]
		      );          
        }
      }, this );
    },
    
    /**
     * Edits an element in the given qx.ui.list.List. 
     * @param list {qx.ui.list.List}
     * @param type {String}
     */    
    editElement : function( list, type )
    {
      var ids = [];
      list.getSelection().forEach( function( item ){
        ids.push( item.getValue() );
      },this );      
      this.__sandbox.rpcRequest(
        "logbuch.acltool","editElement", 
        [ type, ids[0] ]
      ); 
    },    

    /**
     * Links the element from the left list with the element from the 
     * right list.
     * @param treeController {qx.data.controller.Tree} 
     */
    linkElements : function( treeController )
    {
      this.__sandbox.rpcRequest(
        "logbuch.acltool","linkElements", 
        [ this.getTreeElementId(), this.getRightElementType(), this.getRightElementIds() ],
        function( data ){
          this.loadTree( treeController );
        },this
      ); 
    },    
    
    /**
     * Unlinks the element selected in the tree from the element selected
     * in the left list.
     * @param treeController {qx.data.controller.Tree} 
     */
    unlinkElements : function( treeController )
    {
      this.__sandbox.rpcRequest(
        "logbuch.acltool","unlinkElements", 
        [ this.getTreeElementId(), this.getLeftElementType(), this.getLeftElementId() ],
        function( data ){
          this.loadTree( treeController );
        },this
      ); 
    },    
    
    /**
     * Resets the ACL data by reloading it from a file on the server.
     */
    reloadFromFile : function()
    {
      this._handleUnimplemented( arguments.callee.name );
    },
    
    /**
     * Exports the current ACL data to a file on the server
     */
    exportToFile : function()
    {
      this._handleUnimplemented( arguments.callee.name );
    }
  }
});