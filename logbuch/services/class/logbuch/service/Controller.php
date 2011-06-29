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
   * overridden: the datasource is determined by the "ds"
   * parameter in the URL or by a default setting in the 
   * application.ini file
   * @return logbuch_model_ProjectDatasource
   */
  public function getDatasourceModel()
  {
    static $ds_model = null;
    if( $ds_model === null )
    {
      $ds_name = $this->getDatasourceName();
      $this->checkDatasourceAccess( $ds_name );
      $ds_model = parent::getDatasourceModel($ds_name);
    }
    return $ds_model;
  }
  
  /**
   * Returns the name of the current datasource, as given in the
   * request URL or by the ini file
   * @return string
   */
  public function getDatasourceName()
  {
    return  either( 
      $_REQUEST['ds'], 
      $this->getIniValue("database.default_datasource_name")
    );
  }
  
  /**
   * Convenience function returning the user model
   * @return qcl_access_model_User
   */
  function getUserModel()
  {
  	return $this->getApplication()
								->getAccessController()
								->getUserModel();
  }
  
  /**
   * Convenience function returning the role model
   * @return qcl_access_model_Role
   */
  function getRoleModel()
  {
  	return $this->getApplication()
								->getAccessController()
								->getRoleModel();
  }  

  /**
   * Convenience function returning the group model
   * @return qcl_access_model_Group
   */
  function getGroupModel()
  {
  	return $this->getApplication()
								->getAccessController()
								->getGroupModel();
  }
 

	/**
   * Convenience function returning the entry model
   * @return logbuch_model_Person
   */
  function getPersonModel()
  {
  	return $this->getDatasourceModel()->getPersonModel();
  }  
  
  /**
   * Returns a singleton instance of a person model associated with the active 
   * user. 
   * @return logbuch_model_Person    
   * @throws qcl_data_model_RecordNotFoundException
   */
  public function getActiveUserPerson()
  {
    static $activeUserPerson = null;
    if( $activeUserPerson === null )
    {
      /*
       * create model
       */
      $activeUserPerson = $this->getDatasourceModel()->createPersonModel();
      
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

	/**
   * Convenience function returning the entry model
   * @return logbuch_model_Entry
   */
  function getEntryModel()
  {
  	return $this->getDatasourceModel()->getEntryModel();
  }  
	/**
   * Convenience function returning the organization model
   * @return logbuch_model_Organization
   */
  function getOrganizationModel()
  {
  	return $this->getDatasourceModel()-> getOrganizationModel();
  }   
  
	/**
   * Convenience function returning the category model
   * @return logbuch_model_Category
   */
  function getCategoryModel()
  {
  	return $this->getDatasourceModel()->getCategoryModel();
  } 

  
	/**
   * Convenience function returning the category model
   * @return logbuch_model_Attachment
   */
  function getAttachmentModel()
  {
  	return $this->getDatasourceModel()->getAttachmentModel();
  }    
  
}