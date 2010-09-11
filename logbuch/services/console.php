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


/**
 * The url to the RpcConsole installation, relative to this file.
 * You'll need to adapt this.
 */
$consoleUrl =  "../../../qooxdoo-contrib/RpcConsole/trunk/demo/default/build/";

/**
 * The url to the backend server
 */
$serverUrl  = "http://" . $_SERVER["HTTP_HOST"] .  dirname( $_SERVER["REQUEST_URI"] ) . "/server.php";

/**
 * Redirect request
 */
header("Location: $consoleUrl?serverUrl=$serverUrl");
?>