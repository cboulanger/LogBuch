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
    
    /*
     * input and other fields
     */
    
    "logbuch-field" : 
    {
      style : function(states)
      {
        return {
          padding         : 3,
          backgroundColor : "logbuch-field-background",
          decorator       : "logbuch-field-border"
        };
      }
    },    
    
    /*
     * @todo rename
     */
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
    
    /*
     * index-card widget
     */
    
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
    },
    
    "logbuch-indexcard" :
    {
      style : function(states)
      {
        return {
        };
      }
    },
    
    "logbuch-indexcard/tab" :
    {
      style   : function(states)
      {
        return {
          backgroundColor : "#CCCCCC",
          decorator     : "logbuch-indexcard-tab",
          font          : "logbuch-indexcard-tab",
          width         : 50,
          minWidth      : 50,
          maxWidth      : 250,
          maxHeight     : 30,
          minHeight     : 30,
          paddingLeft   : 10,
          paddingTop    : 3,
          paddingRight  : 30,
          paddingBottom : 3
        };
      }
    },

    "logbuch-indexcard/container" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "#CCCCCC",
          decorator   : "logbuch-indexcard-container",
          padding     : 10
        };
      }
    },
    
    /*
     * input field
     */
    
    "logbuch-inputfield" :
    {
      style : function(states)
      {
        return {
          padding : 3
        };
      }
    },    
    
    "logbuch-inputfield/label" :
    {
      style : function(states)
      {
        return {
          font : "small",
          marginLeft : 5
        };
      }
    },    
        
    "logbuch-inputfield/input" : 
    {
      style : function(states) // FIXME INHERIT
      {
        return {
          font            : "logbuch-inputfield-input",
          minHeight       : 30,
          paddingLeft     : 8,
          paddingRight    : 8,
          paddingTop      : 3,
          paddingBottom   : 3,
          backgroundColor : states.disabled ? "logbuch-widget-background" : "logbuch-field-background",
          decorator       : "logbuch-field-border"
        };
      }
    },
    
    /*
     * message item
     */
    "logbuch-messageitem" :
    {
      style : function(states)
      {
        return {
          decorator     : "separator-vertical",
          paddingTop    : 10,
          paddingBottom : 10
        };
      }
    },    
    "logbuch-messageitem/date" :
    {
      style : function(states)
      {
        return {
          font : "small"
        };
      }
    },
    "logbuch-messageitem/creator" :
    {
      style : function(states)
      {
        return {
          font : "small"
        };
      }
    },
    "logbuch-messageitem/title" :
    {
      style : function(states)
      {
        return {
          font : "bold"
        };
      }
    },
    
    "logbuch-field" :
    {
      style : function(states) 
      {
        return {
          font            : "logbuch-inputfield-input",
          minHeight       : 30,
          paddingLeft     : 8,
          paddingRight    : 8,
          paddingTop      : 3,
          paddingBottom   : 3,
          backgroundColor : states.disabled ? "logbuch-widget-background" : "logbuch-field-background",
          decorator       : "logbuch-field-border"
        };
      }
    },
    
    'token' : 'combobox',

    'tokenitem' :
    {
      include : 'listitem',

      style : function(states)
      {
        return {
          decorator : 'group',
          textColor : states.hovered ? '#314a6e' : states.head? '#FF0000' : '#000000',
          height    : 18,
          padding   : [ 1, 6, 1, 6 ],
          margin    : 0,
          icon      : states.close ? "decoration/window/close-active.png" : "decoration/window/close-inactive.png"
        };
      }
    },
    
    //"datefield/textfield" : "logbuch-field",
    
    "logbuch-access-control" : "logbuch-field"
  }
});