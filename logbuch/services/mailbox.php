<?php

  /*
   * configure environment
   */
  chdir( dirname(__FILE__) );
  require "config.php";
  ini_set('display_errors', 0);
  ini_set('display_startup_errors', 0);
  ini_set('html_errors', 0);
  ini_set('log_errors', 1);

  /*
   * get mail content
   */
  log_debug("Received Email");
  $mail = file_get_contents("php://stdin");
  log_debug( str_repeat("-", 30 ) . " " . date("d.m.Y H:i:s", time() ) . " " . str_repeat("-", 30 ) );

  /*
   * pass mail text to logbuch controller
   */
  log_debug("Setting up qcl");
  require "qcl/bootstrap.php";
  qcl_import("logbuch_Application");
  qcl_import("logbuch_service_Survey");

  log_debug("setting application instance");
  qcl_application_Application::setInstance( new logbuch_Application() );

  log_debug("handling email");
  $surveyController = new logbuch_service_Survey();
  $surveyController->handleReceivedEmail($mail);

  log_debug("done!");
  exit; // successful exit;

  /*
   * debug function
   */
  function log_debug($msg)
  {
    return;
    $dir = dirname(__FILE__);
    error_log( "\n" . $msg, 3, "$dir/log/email.log" );
  }
?>