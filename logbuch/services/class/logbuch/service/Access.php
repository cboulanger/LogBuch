<?php
/* ************************************************************************

   logBuch: Die Online-Plattform fŸr Unternehmenszusammenarbeit

   Copyright:
     2010 JŸrgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_access_Service");


/**
 * The class used for authentication of users. 
 */
class logbuch_service_Access
  extends qcl_access_Service
{


  /**
   * Registers a new user.
   * @param string $username
   * @param string $password
   * @param array $data Optional user data
   * @return unknown_type
   */
  public function method_register( $username, $password, $data=array() )
  {
    //$this->requirePermission("access.manage");
    $accessController = $this->getAccessController();
    $userModel  = $accessController->register( $username, $password, $data );
    $groupModel = $accessController->getGroupModel();
    $groupModel->createIfNotExists("new_users",array('name'=> 'New Users'));
    $groupModel->linkModel($userModel);
    return "OK";
  }

  public function exportAccessModels($models=null)
  {
    $this->requirePermission("access.manage");
    qcl_import("qcl_data_model_export_Xml");
    $accessDatasource = $this->getDatasourceModel("access");
    foreach( $accessDatasource->modelTypes() as $type )
    {
      if ( is_array( $models ) and ! in_array( $type, $models) )
      {
        continue;
      }
      $model = $accessDatasource->getModelOfType($type);
      $xml   = $model->export( new qcl_data_model_export_Xml() );
      $dir   = qcl_realpath( "logbuch/data");
      if ( ! is_writable($dir) )
      {
        throw new JsonRpcException("'$dir' needs to be writable.'");
      }
      $file  = $dir . "/" . ucfirst( $type ) . ".exported.xml";
      file_put_contents( $file, $xml );
      chmod( $file, 0666 );
    }
    return $dir;
  }

  public function method_reloadAccessModelDialog( $modelType )
  {
    $this->requirePermission("access.manage");
    qcl_import("qcl_ui_dialog_Confirm");
    qcl_assert_valid_string( $modelType );
    return new qcl_ui_dialog_Confirm(
      sprintf( _( "Do you really want to reset/upgrade the '%s' data?") , $modelType ),
      null,
      $this->serviceName(), "reloadAccessModel", array( $modelType )
    );
  }

  public function method_reloadAccessModel( $answer, $modelType )
  {
    if ( $answer == false )
    {
      return "ABORTED";
    }
    $this->requirePermission("access.manage");
    qcl_assert_valid_string( $modelType );
    qcl_import("qcl_ui_dialog_Alert");

    $app = $this->getApplication();
    $map = $app->getInitialDataMap();
    if ( ! isset( $map[$modelType] ) )
    {
      throw new InvalidJsonRpcArgumentException("No data exists for '$modelType'");
    }
    $app->importInitialData(array(
      $modelType => $map[$modelType]
    ) );
    $this->dispatchClientMessage("accessControlTool.reloadLeftList");
    return new qcl_ui_dialog_Alert( sprintf( _("'%s' data reset."), $modelType ) );
  }

  public function method_exportAccessModelDialog( $modelType )
  {
    $this->requirePermission("access.manage");
    qcl_import("qcl_ui_dialog_Confirm");

    return new qcl_ui_dialog_Confirm(
      sprintf( _( "Do you really want to export the '%s' data to the filesystem?") , $modelType ),
      null,
      $this->serviceName(), "exportAccessModel", array( $modelType )
    );
  }

  public function method_exportAccessModel( $answer, $modelType )
  {
    if ( $answer == false )
    {
      return "ABORTED";
    }
    $this->requirePermission("access.manage");
    qcl_assert_valid_string( $modelType );
    qcl_import("qcl_ui_dialog_Alert");

    $dir = $this->exportAccessModels( array( $modelType ) );
    return new qcl_ui_dialog_Alert( sprintf( _("'%s' data exported to '%s'."), $modelType, $dir ) );
  }

}
?>