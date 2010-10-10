<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */
qcl_import( "logbuch_model_Model" );

/**
 * Enter description here ...
 */
class logbuch_model_Goal
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
  protected $tableName = "data_Goal";
  
  /**
   * The foreign key of this model
   */
  protected $foreignKey = "GoalId";  

  /**
   * The model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'subject' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
   
    
    /**
     * Enter description here ...
     */
    'timeStart' => array (
      'check' => 'string',
      'sqltype' => 'varchar(6)',
      'nullable' => true
    ),
    
    /**
     * Enter description here ...
     */
    'timeEnd' => array (
      'check' => 'string',
      'sqltype' => 'varchar(6)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'location' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'participants' => array (
      'check' => 'string',
      'sqltype' => 'varchar(255)',
      'nullable' => true,
    ),
    
    /**
     * Enter description here ...
     */
    'notes' => array (
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

  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */
  
  function createMessage()
  {
  	$activeUser = $this->getApplication()->getAccessController()->getActiveUser();
  	$data = $this->data();
  	$message = array(
  		'date'					=> date("D M d Y H:i:s \G\M\TO (T)"),
  		'sender'				=> $activeUser->getName(),
  		'subject'				=> $data['timeStart'] . ": " . $data['subject'],
  		'body'					=> $data['notes'],
  		'category'			=> "goal",
  		'itemId'				=> "goal/" . $this->id(),
  		'itemDateStart'	=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateStart']) ), 
  		'itemDateEnd'		=> date("D M d Y H:i:s \G\M\TO (T)", strtotime( $data['dateEnd']) )
  	);
  	return $message;
  }

}
?>