<?php  
  chdir( dirname(__FILE__) . "/../../services" );
  require "config.php";  
  require "qcl/bootstrap.php";
  qcl_import("logbuch_Application");
  qcl_application_Application::setInstance( new logbuch_Application() );
  qcl_import("logbuch_service_Category");
  $categoryController = new logbuch_service_Category;
  $categoryModel = $categoryController->getCategoryModel();
  $categoryData = array();
  $categoryModel->findWhere(array(
    'custom'  => true
  ));
  while( $categoryModel->loadNext() )
  {
    $categoryData[] = $categoryModel->data();
  }
?>