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
 * A category module for the editing of goals
 */
qx.Class.define("logbuch.module.Goal",
{
  extend : logbuch.module.Event,
  
  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */  
  properties :
  {

  },
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function()
  {
    this.base(arguments, "goal" );
  },    
  
  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
       INTERNAL METHODS
    ---------------------------------------------------------------------------
    */  
    _getTitleHint : function()
    {
      return  "Bitte geben sie ein Stichwort, einen Doppelpunkt, <br/> " +
              "und dann eine Zusammenfassung der Zielplanung ein. Beispiel: <br/>" +
              "Abgabe: Abgabe der Produktevaluation";
    },
    
    /*
    ---------------------------------------------------------------------------
       API
    ---------------------------------------------------------------------------
    */    
    
    /**
     * Returns the category module's (translated) label
     * @return {String}
     */
    getLabel : function()
    {
      return this.tr("Goals");
    },

    
    /**
     * Returns the category module's translated item type
     * @return {String}
     */
    getItemType : function()
    {
      return this.tr("Goal");
    },       
       
    
    _getExplanation : function( row )
    {
      switch(row)
      {
        case 0:
          return "Geben Sie hier die Zieldefinition an. Sie können ein Stichwort angeben, das in der Kalenderübersicht angezeigt wird. Trennen Sie dieses Stichwort vom restlichen Text mit einem Doppelpunkt. <br/><br/>Beispiel:<br/><br> Präsentation: Vorstellung der Produktevaluation";
        
        case 1:
          return "Datum und Uhrzeit des Ereignisses.";
        
        case 2:
          return "Ort, Straße, Gebäude, Etage, Raum etc.";
          
        case 3:
          return "Geben Sie hier die Personen an, die an der Zielerreichung beteiligt sind/waren. Sie können hierbei nur Personen angeben, die im Logbuch registriert sind. Tippen Sie einige Buchstaben ein, um Vorschläge zu erhalten, oder 'alle', um eine Liste aller registrierten Personen zu bekommen. Nicht im LogBuch registrierte Personen müssen im Feld 'Notizen' eingegeben werden.";
          
        case 4: 
          return "In diesem Feld können Notizen gespeichert werden. Hier auch Externe/Gäste eintragen, die nicht im 'Wer?'-Feld eingetragen werden können.";
              
      }
    },    
    
    dummy : null
  }
});