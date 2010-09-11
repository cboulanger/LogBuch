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
qx.Class.define("logbuch.component.IndexCard",
{
  extend : qx.ui.container.Composite,

  include :
  [
    qx.ui.core.MRemoteChildrenHandling,
    qx.ui.core.MRemoteLayoutHandling,
    qx.ui.core.MContentPadding
  ],
  
  
    /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor
   */
  construct : function( label, icon )
  {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.VBox());
    
    this.getChildControl("tab"); 
    this.getChildControl("container"); 
    
    this.setLabel( label || null );
    this.setIcon( icon || null );
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : 
  {
    // overrridden
    appearance :
    {
      refine : true,
      init   : "logbuch-indexcard"
    },
    
    /**
     * The icon displayed in the tab
     * @type String
     */
    icon :
    {
      check     : "String",
      nullable  : true,
      apply     : "_applyIcon"
    },    
    
    /**
     * The label displayed in the tab
     * @type String
     */
    label :
    {
      check     : "String",
      nullable  : true,
      apply     : "_applyLabel"
    }
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
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "tab":
          control = new qx.ui.basic.Atom( this.getLabel(), this.getIcon() );
          this._add(control);
          break;

        case "container":
          control = new qx.ui.container.Composite();
          this._add(control, {flex : 1});
          break;
      }

      return control || this.base(arguments, id);
    },


    /**
     * The children container needed by the {@link qx.ui.core.MRemoteChildrenHandling}
     * mixin
     *
     * @return {qx.ui.container.Composite} The container sub widget
     */
    getChildrenContainer : function()
    {
      return this.getChildControl("container");
    },

    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The container sub widget
     */
    _getContentPaddingTarget : function()
    {
      return this.getChildControl("container");
    },    
    
    /*
    ---------------------------------------------------------------------------
      APPLY METHODS
    ---------------------------------------------------------------------------
    */    
    
    _applyLabel : function( value, old )
    {
      this.getChildControl("tab").setLabel( value );
    },
    
    _applyIcon : function( value, old )
    {
      this.getChildControl("tab").setIcon( value );
    }    
  }
});
