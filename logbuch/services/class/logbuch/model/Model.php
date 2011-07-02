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
qcl_import("logbuch_model_AccessControlList");

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
     * Flag that can be used to indicate that
     * the record has been newly created
     */
    'new' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1)',
      'nullable'  => false,
      'init'      => false
    ),

    /**
     * Enter description here ...
     */
    'personId' => array (
      'check' => 'integer',
      'sqltype' => 'int(11) NOT NULL'
    ),


    /**
     * Enter description here ...
     */
    'ownCompany' => array (
      'check' 		=> 'boolean',
      'sqltype' 	=> 'tinyint(1)',
      'nullable' 	=> false,
    	'init'			=> false
    ),

    /**
     * Enter description here ...
     */
    'ownConsultant' => array (
      'check' 		=> 'boolean',
      'sqltype' 	=> 'tinyint(1)',
      'nullable' 	=> false,
    	'init'			=> false
    ),

    /**
     * Enter description here ...
     */
    'allConsultants' => array (
      'check' 		=> 'boolean',
      'sqltype' 	=> 'tinyint(1)',
      'nullable' 	=> false,
    	'init'			=> false
    ),

    /**
     * Enter description here ...
     */
    'analyst' => array (
      'check' 		=> 'boolean',
      'sqltype' 	=> 'tinyint(1)',
      'nullable' 	=> false,
    	'init'			=> false
    ),

    /**
     * Enter description here ...
     */
    'allMembers' => array (
      'check' 		=> 'boolean',
      'sqltype' 	=> 'tinyint(1)',
      'nullable' 	=> false,
    	'init'			=> false
    ),

    /**
     * Enter description here ...
     */
    'moreMembers' => array (
      'check'     => 'array',
      'sqltype'   => 'varchar(255)',
    	'serialize'	=> true,
      'nullable'  => false,
    	'init'			=> array()
    ),

    /**
     * Enter description here ...
     */
    'notify' => array (
      'check'     => 'boolean',
      'sqltype'   => 'tinyint(1) NOT NULL DEFAULT 1',
      'nullable'  => false,
      'init'      => true
    ),

    /**
     * Enter description here ...
     */
    'dateStart' => array (
      'check' => 'string',
      'sqltype' => 'datetime',
      'nullable' => true,
    ),

    /**
     * Enter description here ...
     */
    'dateEnd' => array (
      'check' => 'string',
      'sqltype' => 'datetime',
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

  /**
   * Returns the names of the properties defined in this class only.
   * @return array
   */
  public function ownProperties()
  {
  	return array_keys( $this->properties );
  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */

  /**
   * Returns the acl data contained in the model record
   * @return array
   */
  public function aclData()
  {
  	static $aclNames = null;
  	if( $aclNames === null )
  	{
	  	$aclModel = new logbuch_model_AccessControlList();
	  	$aclNames = $aclModel->getAclNames();
  	}
  	return $this->data(array(
  		'include'	=> $aclNames
  	));
  }

  /**
   * Returns true if the record is only accessible by the creator
   * of the record
   * @return boolean
   */
  public function isPrivate()
  {
  	static $aclNames = null;
  	if( $aclNames === null )
  	{
	  	$aclModel = new logbuch_model_AccessControlList();
	  	$aclNames = $aclModel->getAclNames();
  	}
  	foreach( $aclNames as $key )
  	{
  		$value = $this->get( $key );
  		if (  ( is_bool($value) and $value === true ) or
  					( is_array($value) and count( $value ) > 0 ) )
  		{
  			return false;
  		}
  	}
  	return true;
  }

  /**
   * @return logbuch_model_Person
   */
  protected function personModel()
  {
  	static $personModel = null;
  	if ( $personModel === null )
  	{
	  	$personModel = $this->datasourceModel()->getInstanceOfType("person");
  	}
  	$personId = $this->get("personId");
  	$personModel->load( $personId );
  	return $personModel;
  }

  public function authorInitials()
  {
  	return $this->personModel()->get("initials");
  }

	public function authorName()
  {
  	$p = $this->personModel();
  	return $p->get("givenName") . " " . $p->get("familyName");
  }

  public function authorId()
  {
  	return $this->get("personId");
  }
}


?>