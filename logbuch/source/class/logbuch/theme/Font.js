/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("logbuch.theme.Font",
{
  extend : qx.theme.modern.Font,

  fonts :
  {
    "title-application" :
    {
      size : 25,
      family : qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ],
      bold : true
    },
    
    "title-project" :
    {
      size : 16,
      family : qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ],
      bold : true
    },
    
    "logbuch-category" :
    {
      size : 12,
      family : qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ],
      bold : true
    },
    
    "logbuch-label-box" :
    {
      size : 12,
      family : qx.bom.client.Platform.MAC ? [ "Lucida Grande" ] :
        (qx.bom.client.System.WINVISTA || qx.bom.client.System.WIN7) ?
        [ "Segoe UI", "Candara" ] :
        [ "Tahoma", "Liberation Sans", "Arial", "sans-serif" ],
      bold : true
    }
  }
});