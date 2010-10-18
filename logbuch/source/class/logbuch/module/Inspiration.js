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
 * A category module for the editing of inspirations
 */
qx.Class.define("logbuch.module.Inspiration",
{
  extend : logbuch.module.Documentation,
  
  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */    

  construct : function()
  {
    this.base(arguments, "inspiration" );
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
        { label : this.tr("idea!"), name : "idea" },
        { label : this.tr("Inspiration source"), name : "source" },
        { label : this.tr("Internet links"), name : "links" }
      ];          
    },    
    
    /**
     * Returns the category module's (translated) label
     * @return {String}
     */
    getLabel : function()
    {
      return this.tr("Inspiration");
    },
    
    /**
     * Returns the category module's translated item type
     * @return {String}
     */
    getItemType : function()
    {
      return this.tr("Inspiration");
    },        
    
    _getExplanation : function( row )
    {
      switch(row)
      {
        case 0:
          return "Anregungen, Ideen, Verbesserungsvorschläge, etc.";
        
        case 1:
          return "Buchtipps Zeitungsartikel, Veranstaltungshinweise etc.";
        
        case 2:
          return "Stolpersteine, Hindernisse, etc., welche sich möglicherweise als Hemmnis auswirken.";
          
        case 3:
          return "Linktipps im Internet";
          
      }
    },        

    
    dummy : null
  }
});