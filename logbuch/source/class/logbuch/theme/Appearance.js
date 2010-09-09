/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

qx.Theme.define("logbuch.theme.Appearance",
{
  extend : qx.theme.modern.Appearance,

  appearances :
  {
    "logbuch-cell-date" :
    {
      style : function(states)
      {
        return {
          textColor   : "white",
          decorator   : "logbuch-category"
        };
      }
    },
    
    "title-application" :
    {
      style : function(states)
      {
        return {
	        font      : "title-application",
	        textColor : "#336699"
        };
      }
    },      
    
    "title-project" :
    {
      style : function(states)
      {
        return {
	        font      : "title-project",
	        textColor : "#666666"
        };
      }
    },
    
    "logbuch-label-box" :
    {
      style : function(states)
      {
        return {
          font      : "logbuch-label-box",
          textColor : "white",
          decorator : "logbuch-label-box",
          padding   : 2
        };
      }
    }    
  }
});