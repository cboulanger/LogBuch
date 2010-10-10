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
		
qcl_import( "logbuch_model_Model" );

/**
 * Enter description here ...
 */
class logbuch_model_DiaryEntry
extends logbuch_model_Model
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  /**
   * The name of the table of this model
   */
  protected $tableName = "data_DiaryEntry";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "DiaryEntryId";  

  /**
   * The model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'heureka' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'encounters' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'stumblingBlock' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'incentive' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'miscellaneous' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'heureka_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'encounters_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'stumblingBlock_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'incentive_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'miscellaneous_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    )
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
    //$this->addRelations( $this->relations, __CLASS__ );

  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  function createMessage()
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$fields = array( "heureka", "encounters", "stumblingBlock", "incentive", "miscellaneous" );
  	$data = $this->data();
  	
  	foreach( $fields as $field )
  	{
  		if( ! trim( $data[$field] ) ) continue;
  			
	  	$message = array(
	  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
	  		'sender'				=> $activeUser->getName(),
	  		'subject'				=> $field . ": " . $data[$field],
	  		'body'					=> $data[ $field . '_extended' ],
	  		'category'			=> "diary",
	  		'itemId'				=> "diary/" . $this->id(),
	  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
	  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
	  	);
	  	return $message;
  	}
  }  
}
?>