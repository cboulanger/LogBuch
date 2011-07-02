<?php
/* ************************************************************************

   qcl - the qooxdoo component library

   http://qooxdoo.org/contrib/project/qcl/

   Copyright:
     2007-2009 Christian Boulanger

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   *  Christian Boulanger (cboulanger)

************************************************************************ */

//-------------------------------------------------------------
// Error level
//-------------------------------------------------------------
date_default_timezone_set('Europe/Berlin');

//-------------------------------------------------------------
// Error level
//-------------------------------------------------------------

error_reporting( E_ALL ^ E_NOTICE  );
ini_set("display_errors",1);

//-------------------------------------------------------------
// Configure paths to the various libraries used by the backend
//-------------------------------------------------------------

/**
 * The server document root
 * @var string
 */
define( "DOCUMENT_ROOT", "/Users/panyasan/Sites/" );
//define( "DOCUMENT_ROOT", $_SERVER["DOCUMENT_ROOT"] );

/**
 * The top-level folder containing the eclipse workspace
 * @var string
 */
define( "WORKSPACE_PATH", DOCUMENT_ROOT . "/helios" );

/**
 * Path to the folder where projects from qooxdoo-contrib are
 * downloaded.
 * @var string
 */
//define("CONTRIB_PATH", "../contrib/" );
define("CONTRIB_PATH", WORKSPACE_PATH . "/qooxdoo-contrib" );

/**
 * Path to the RpcPhp package in qooxdoo-contrib
 * @var string
 */
define("RPCPHP_SERVER_PATH", CONTRIB_PATH . "/RpcPhp/trunk/");


/**
 * Path to the qcl php library
 * @var string
 */
//define("QCL_CLASS_PATH", CONTRIB_PATH . "/qcl-php/trunk/services/class/");
define("QCL_CLASS_PATH", WORKSPACE_PATH . "/qcl-php/services/class/");

/**
 * Path to the application backend classes. Defaults to "./class". You
 * shouldn't change this
 * @var string
 */
define("APPLICATION_CLASS_PATH", "./class");

/*
 * where should the application log to. If not defined,
 * the log file is "qcl.log" in the system temp folder.
 */
define( "QCL_LOG_FILE", "log/logbuch.log" );

/*
 * place to store attachemnts
 */
define( "QCL_UPLOAD_PATH", "attachments" );

/*
 * whether debug messages should be shown - this is independent of the
 * log level and can turn off all debugging independent of the filters
 * used
 */
define( "QCL_DEBUG", true );

/*
 * the mail server. if not configured, localhost is used
 */
//define( "QCL_MAIL_SMTP_HOST", "localhost" );

//-------------------------------------------------------------
// Global settings for the JSON-RPC server
//-------------------------------------------------------------

/**
 *  accessibility needed for server.php - change to "domain" before production use
 */
define( "defaultAccessibility", "public" );

/**
 * whether the server should log the request
 * You need this only for debugging
 */
define( "JsonRpcDebug", false );
define( "JsonRpcDebugFile", "log/logbuch.log" );


//-------------------------------------------------------------
// DONT TOUCH
//-------------------------------------------------------------

ini_set('include_path', implode(
  PATH_SEPARATOR,
  array(
    RPCPHP_SERVER_PATH,
    QCL_CLASS_PATH,
    APPLICATION_CLASS_PATH,
    ini_get("include_path")
  )
) );
?>