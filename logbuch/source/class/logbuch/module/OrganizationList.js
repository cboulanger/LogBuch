/* ************************************************************************

   LogBUCH - Plattform für kreatives Projektmanagement
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

/* ************************************************************************

************************************************************************ */

/**
 * the setup Widget 
 */
qx.Class.define("logbuch.module.OrganizationList",
{
  extend : logbuch.module.UserList,
  
  //
  statics :
  {
    QCL_UPLOAD_PATH       : "../services/attachments",
    LOGBUCH_USERICON_PATH : "../services/attachments/thumbs"
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
       INTERFACE METHODS
    ---------------------------------------------------------------------------
    */   
    
  
    /**
     * Builds the UI
     */
    build : function()
    {
      this._build("organization");

    },
   
    
    /*
    ---------------------------------------------------------------------------
      API
    ---------------------------------------------------------------------------
    */
    
    dummy : null

  
  }
});

