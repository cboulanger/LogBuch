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
          textColor : states.disabled ? "logbuch-label-box-disabled" : "logbuch-label-box",
          decorator : states.disabled ? "logbuch-label-box-disabled" : "logbuch-label-box" ,
          padding   : 2
        };
      }
    },
    
    "logbuch-category-page" :
    {
      style : function(states)
      {
        return {
          decorator       : "logbuch-category-page",
          padding         : 5,
          backgroundColor : "logbuch-background-category-page",
          shadow          : "shadow-window"
        };
      }
    },
    
    
    "logbuch-datecell" :
     {
      style : function(states)
      {
        return {
          font      : "small",
	        textColor : "white",
	        textAlign : "center",
          padding   : 2
        };
      }
    }
  }
});