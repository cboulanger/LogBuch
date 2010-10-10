<?php 
/* ************************************************************************

   logBuch: Die Online-Plattform fŸr Unternehmenszusammenarbeit

   Copyright:
     2010 JŸrgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */


		
qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 * Enter description here ...
 */
class logbuch_model_Model
extends qcl_data_model_db_ActiveRecord
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  /**
   * The model properties
   */
  private $properties = array(
  
    /**
     * Enter description here ...
     */
    'messageId' => array (
      'check' => 'sting',
      'sqltype' => 'varchar(100)',
      'nullable' => true,
    ),  

    /**
     * Enter description here ...
     */
    'author' => array (
      'check' => 'boolean',
      'sqltype' => 'tinyint(1)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'ownCompany' => array (
      'check' => 'boolean',
      'sqltype' => 'tinyint(1)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'ownConsultant' => array (
      'check' => 'boolean',
      'sqltype' => 'tinyint(1)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'allConsultants' => array (
      'check' => 'boolean',
      'sqltype' => 'tinyint(1)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'allMembers' => array (
      'check' => 'boolean',
      'sqltype' => 'tinyint(1)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'moreMembers' => array (
      'check' => 'string',
      'sqltype' => 'varchar(100)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'dateStart' => array (
      'check' => 'string',
      'sqltype' => 'date',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'dateEnd' => array (
      'check' => 'string',
      'sqltype' => 'date',
      'nullable' => true,
    ),        
  );

  /*
  *****************************************************************************
     INITIALIZATION
  *****************************************************************************
  */

  function __construct( $datasourceModel=null )
  {
    parent::__construct( $datasourceModel );
    $this->addProperties( $this->properties );

  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  
}


?>