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
    "logbuch-text-grey"                         : "#555555",
 
    // label box
    "logbuch-label-box"                         : "white",
    "logbuch-label-box-disabled"                : "gray", // FIXME
    
    // backgrounds @todo rename
    "logbuch-background-calendar"               : "#D0D2D3",
    "logbuch-background-calendar-current-date"  : "#FFFFFF",
    "logbuch-background-calendar-selected"      : "#D0EAA4",
    "logbuch-background-calendar-weekend"       : "#B8BABC",
    "logbuch-background-category-page"          : "#CCCCCC",
    
    // categories
    "logbuch-category-event"                    : "#47a1b4",
    "logbuch-category-goal"                     : [194,128,24], //"#d38923",
    "logbuch-category-documentation"            : "#68b400",
    "logbuch-category-diary"                    : "#9b66e6",
    "logbuch-category-inspiration"              : "#cdc000"
    
  }
});