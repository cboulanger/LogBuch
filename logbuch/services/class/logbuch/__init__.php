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
$logger = qcl_log_Logger::getInstance();
define( "LOGBUCH_LOG_APPLICATION", "logbuch_log_application" );
$logger->registerFilter( LOGBUCH_LOG_APPLICATION, "", false );

define( "LOGBUCH_LOG_SURVEY", "logbuch_log_survey");
$logger->registerFilter( LOGBUCH_LOG_SURVEY, "", false);

define( "LOGBUCH_LOG_MESSAGE", "logbuch_log_message");
$logger->registerFilter( LOGBUCH_LOG_MESSAGE, "", false);

//$logger->setFilterEnabled( QCL_LOG_SETUP, true );
//$logger->setFilterEnabled( QCL_LOG_ACCESS, true );

?>