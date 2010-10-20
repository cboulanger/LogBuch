/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************
#asset(logbuch/image/logbuch-header.png)
************************************************************************ */

qx.Theme.define("logbuch.theme.Decoration",
{
  extend : qx.theme.modern.Decoration,

  decorations :
  {
    "logbuch-header" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        backgroundImage  : "resource/logbuch/image/logbuch-header.png",
        bottom: [3, "solid", "white"]
      }
    },
    
    "logbuch-label-box" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        width : 1,
        color :  "logbuch-label-box"
      }
    },
    
    "logbuch-label-box-disabled" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        width : 1,
        color : "logbuch-label-box-disabled"
      }
    },    
    
    "logbuch-category-page" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        width : 1,
        color : "white"
      }
    },
    
    /*
     * index-card widget
     */
    
    "logbuch-indexcard-container" :
    {
      decorator : qx.ui.decoration.Single,
      style :
      {
        left: [1, "solid", "white"],
        right: [1, "solid", "white"],
        bottom: [1, "solid", "white"]
      }
    },
    
    "logbuch-indexcard-tab" :
    {
      decorator : qx.ui.decoration.Single,
      style :
      {
        top: [1, "solid", "white"],
        left: [1, "solid", "white"],
        right: [1, "solid", "white"]
      }
    },
    
    /*
     * field widget
     */
    
    "logbuch-field-border" :
    {
      decorator : qx.ui.decoration.Single,
      style :
      {
        width : 1,
        color : "logbuch-field-border"
      }
    },
    
    "comments-selected" :
    {
      decorator : qx.ui.decoration.Single,

      style :
      {
        width: 2,
        color : "#33508D"
      }
    }    
    
  }
});