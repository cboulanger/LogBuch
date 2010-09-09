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
        color : "white"
      }
    }
  }
});