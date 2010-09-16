/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Fabian Jakobs (fjakobs)

************************************************************************ */

/*
*****************************************************************************
   GALLERY CELL
*****************************************************************************
*/
qx.Class.define("logbuch.component.GalleryCell",
{
  extend : qx.ui.virtual.cell.AbstractWidget,

  members :
  {
    _createWidget : function()
    {
      var widget = new qx.ui.basic.Atom().set({
        iconPosition: "top"
      });
      widget.getChildControl("label").set({
        padding : [0, 4]
      });
      widget.getChildControl("icon").set({
        padding : 4
      });
      return widget;
    },


    updateData : function(widget, data)
    {
      widget.set({
        icon: data.icon,
        label: data.label
      });
    },


    updateStates : function(widget, states)
    {
      var label = widget.getChildControl("label");
      var icon = widget.getChildControl("icon");

      if (states.selected)
      {
        label.setDecorator("selected");
        label.setTextColor("text-selected");
        icon.setDecorator("group");
      }
      else
      {
        label.resetDecorator();
        label.resetTextColor();
        icon.resetDecorator();
      }
    }
  }
});