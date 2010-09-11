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

qcl_import( "qcl_data_model_db_PersistentObject" );

class logbuch_ApplicationCache
  extends qcl_data_model_db_PersistentObject
{
  public $setup = false;
  public $initial_data_imported = false;
  public $schemas_registered = false;
  public $file_storage_datasource_registered = false;

  /**
   * Returns singleton instance
   * @return bibliograph_ApplicationCache
   */
  static public function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }
}
?>