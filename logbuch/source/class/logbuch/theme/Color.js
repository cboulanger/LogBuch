/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qx.Theme.define("logbuch.theme.Color",
{
  extend : qx.theme.modern.Color,

  colors :
  {
    // general
    "background-application"                    : "#999999",
    "logbuch-widget-background"                 : "#CCCCCC",
    "logbuch-field-border"                      : "#999999",
    "logbuch-field-background"                  : "white",
 
    // label box
    "logbuch-label-box"                         : "white",
    "logbuch-label-box-disabled"                : "gray", // FIXME
    
    // backgrounds @todo rename
    "logbuch-background-calendar"               : "#CCCCCC",
    "logbuch-background-calendar-current-date"  : "#EEEEEE",
    "logbuch-background-calendar-selected"      : "#AAAAAA",
    "logbuch-background-calendar-weekend"       : "#FFCCCC",
    "logbuch-background-category-page"          : "#CCCCCC",
    
    // categories
    "logbuch-category-event"                    : "#CC6633",
    "logbuch-category-goal"                     : "#CC9933",
    "logbuch-category-documentation"            : "#99CCFF",
    "logbuch-category-diary"                    : "#99CC33",
    "logbuch-category-inspiration"              : "#CCCC33"
    
  }
});