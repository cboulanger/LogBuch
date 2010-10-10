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
class logbuch_model_Inspiration
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
  protected $tableName = "data_Inspiration";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "InspirationId";  

  /**
   * The model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'idea' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'source' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'links' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'idea_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'source_extended' => array (
      'check' => 'string',
      'sqltype' => 'text',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'links_extended' => array (
      'check' => 'string',
      'sqltype' => 'varchar(100)',
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

  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  
  function createMessage()
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$fields = array( "idea", "source", "links" );
  	$data = $this->data();
  	foreach( $fields as $field )
  	{
  		if( ! trim( $data[$field] ) ) continue;
  			
	  	$message = array(
	  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
	  		'sender'				=> $activeUser->getName(),
	  		'subject'				=> $field . ": " . $data[$field], // FIXME
	  		'body'					=> $data[ $field . '_extended' ],
	  		'category'			=> "inspiration",
	  		'itemId'				=> "inspiration/" . $this->id(),
	  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
	  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
	  	);
	  	return $message;
  	}
  }  
}
?>