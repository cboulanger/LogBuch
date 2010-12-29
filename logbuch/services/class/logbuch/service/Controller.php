<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_data_controller_Controller");

/**
 *
 */
class logbuch_service_Controller
  extends qcl_data_controller_Controller
{
  
  /**
   * overridden.
   * @return logbuch_model_ProjectDatasource
   */
  public function getDatasourceModel( $datasource=null )
  {
    return parent::getDatasourceModel("demo");//FIXME 
  }
  

  /**
   * Returns a singleton instance of a person model associated with the active 
   * user. 
   * @param string $datasource
   * @return logbuch_model_Person    
   * @throws qcl_data_model_RecordNotFoundException
   */
  public function getActiveUserPerson($datasource=null)
  {
    static $activeUserPerson = null;
    if( $activeUserPerson === null )
    {
      /*
       * create model
       */
      $activeUserPerson = $this->getDatasourceModel($datasource)->createPersonModel();
      
      /*
       * load active user's person model
       */
      try 
      {
        $activeUserPerson->loadByUserId( $this->getActiveUser()->id() );
      } 
      catch( qcl_data_model_RecordNotFoundException $e )
      {
        throw new qcl_data_model_RecordNotFoundException( "The active user has no person model");
        return false;
      }           
    }
    return $activeUserPerson;
  }
  
}