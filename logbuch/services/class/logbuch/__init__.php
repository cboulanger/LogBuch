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

/*
 * constants
 */
define( "LOGBUCH_ROLE_USER",    "user" );
define( "LOGBUCH_ROLE_MANAGER", "manager" );
define( "LOGBUCH_ROLE_ADMIN",   "admin" );



/*
 * log filters
 */
define( "LOGBUCH_LOG_APPLICATION", "logbuch" );
qcl_log_Logger::getInstance()->registerFilter( LOGBUCH_LOG_APPLICATION, "", false );

?>