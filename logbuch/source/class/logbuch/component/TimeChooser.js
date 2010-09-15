/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * A simple time chooser widget based on the combobox
 */
qx.Class.define("logbuch.component.TimeChooser",
{
  extend : qx.ui.form.ComboBox,

 /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  
  /**
   * Constructor. Creates time dropdown
   */
  construct : function( date, format )
  {
    this.base(arguments);
    this.setDate( date || new Date() );
    this.setTimeFormat( 
      format || 
      new qx.util.format.DateFormat(qx.locale.Date.getTimeFormat("short") )
    );

    /*
     * create list items with 15 minute increments
     */
    var f    = this.getTimeFormat(),
        m15  = 1000*60*15,
        hour = 1000*60*60,
        day  = hour*24,
        t    = this.getDate().getTime(),
        d    = new Date( day * Math.floor( t / day) + ( this.isExcludeNight() ? 4 * hour:0) );
    
    while ( d.getDay() == this.getDate().getDay() )
    {
      this.add( new qx.ui.form.ListItem( f.format(d) ) );
      d.setTime( d.getTime() + m15 );
    }
    
    /*
     * set the time, rounded by 15 minutes
     */
    t = new Date(  m15 * Math.floor( t / m15 ) );
    this.setValue(  f.format( t ) ); 
   
  },
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : 
  {
    date :
    {
      check    : "Date",
      nullable : false
    },
    
    timeFormat :
    {
      check    : "qx.util.format.DateFormat",
      nullable : false
    },
    
    excludeNight :
    {
      check : "Boolean",
      init  : true
    }
  }

});