/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Chritian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * A category module for the editing of the diary
 */
qx.Class.define("logbuch.module.Diary",
{
  extend : logbuch.module.Documentation,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function()
  {
    this.base(arguments, "diary" );
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
       API
    ---------------------------------------------------------------------------
    */    
    
    
   /**
     * Returns the data from which to construct the different fields
     * in the module
     * @return {Array}
     */
    getFieldData : function()
    {
      return [
        { label : this.tr("Heureka!"), name : "heureka" },
        { label : this.tr("Encounters"), name : "encounters" },
        { label : this.tr("Stumbling block"), name : "stumblingBlock" },
        { label : this.tr("Incentive"), name : "incentive" },
        { label : this.tr("Miscellaneous"), name : "miscellaneous" }
      ];          
    },       
    
    /**
     * Returns the category module's (translated) label
     * @return {String}
     */
    getLabel : function()
    {
      return this.tr("Diary");
    },

    /**
     * Returns the category module's translated item type
     * @return {String}
     */
    getItemType : function()
    {
      return this.tr("Diary entry");
    },       
    
    
    _getExplanation : function( row )
    {
      switch(row)
      {
        case 0:
          return "Aha-Erlebnisse, Überraschungen, etc. Was hat mich besonders überrascht oder bewegt? ";
        
        case 1:
          return "Inspirierende Gespräche, bewegende Momente, spontane Begegnungen, etc. aus denen ein Gedankenbaustein hervorgegangen ist.";
        
        case 2:
          return "Stolpersteine, Hindernisse, etc., welche sich möglicherweise als Hemmnis auswirken.";
          
        case 3:
          return "Was könnte verändert werden? Denkanstöße, Anregungen, Kritik, etc.";
          
        case 4:
          return "Platz für Notizen..";
          
      }
    },        
    dummy : null
  }
});