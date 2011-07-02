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
 *
 */
class logbuch_model_Person
  extends qcl_data_model_db_ActiveRecord
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

	/**
	 * The name of the table of this model
	 * @var string
	 */
  protected $tableName = "data_Person";

  /**
   * The foreign key of this model
   */
  protected $foreignKey = "PersonId";

  /**
   * model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'userId' => array (
      'check' => 'integer',
      'sqltype' => 'int(11)'
    ),

    /**
     * Enter description here ...
     */
    'givenName' => array (
      'check' => 'string',
      'sqltype' => 'varchar(100)'
    ),

    /**
     * Enter description here ...
     */
    'familyName' => array (
      'check' => 'string',
      'sqltype' => 'varchar(100)'
    ),

		/**
     * Enter description here ...
     */
    'image' => array (
      'check' => 'string',
      'sqltype' => 'varchar(200)'
    ),

    /**
     * Enter description here ...
     */
    'academicTitle' => array (
      'check' => 'string',
      'sqltype' => 'varchar(50)'
    ),

    /**
     * Enter description here ...
     */
    'initials' => array (
      'check' => 'string',
      'sqltype' => 'varchar(10)'
    ),

    /**
     * Enter description here ...
     */
    'organizationId' => array (
      'check' 			=> 'integer',
      'sqltype' 	  => 'int(11)'
    ),

		/**
     * Enter description here ...
     */
    'position' => array (
      'check' => 'string',
      'sqltype' => 'varchar(50)'
    ),

		/**
     * Enter description here ...
     */
    'email' => array (
      'check' 	=> 'string',
      'sqltype' => 'varchar(255)'
    ),

		/**
     * Enter description here ...
     */
    'telephone' => array (
      'check' 	=> 'string',
      'sqltype' => 'varchar(50)'
    ),

		/**
     * Enter description here ...
     */
    'mobile' => array (
      'check' 	=> 'string',
      'sqltype' => 'varchar(50)'
    ),

		/**
     * Enter description here ...
     */
    'initialPassword' => array (
      'check' 		=> 'boolean',
      'sqltype' 	=> 'int(1)',
    	'nullable'	=> false,
    	'init'			=> false
    ),

    /**
     * Enter description here ...
     */
    'worktime' => array (
      'check'     => 'integer',
      'sqltype'   => 'int(11)',
      'init'      => 0
    ),

    /**
     * Enter description here ...
     */
    'countLogins' => array (
      'check'     => 'integer',
      'sqltype'   => 'int(11)',
      'init'      => 0
    ),
 );

  /**
   * Relations
   */
 	private $relations = array(

 	  /*
 	   * the attachments belonging to this person
 	   */
    'Attachment_Person' => array(
      'type'        => QCL_RELATIONS_HAS_MANY,
      'target'      => array(
      	'class'    		=> "logbuch_model_Attachment",
 				'dependent'		=> true
 			)
    )
  );

  /*
  *****************************************************************************
     INITIALIZATION
  *****************************************************************************
  */

  function __construct( $datasourceModel )
  {
    parent::__construct( $datasourceModel );
    $this->addProperties( $this->properties );
    $this->addRelations( $this->relations, __CLASS__ );

  }

  /*
  *****************************************************************************
     API
  *****************************************************************************
  */

  /**
   * Returns the user id of this person
   */
  public function getUserId()
  {
    return $this->_get("userId");
  }

  /**
   * Returns the text for a 'label' that is used in a visual widget
   * to represent the model record.
   * @return string
   */
  public function label()
  {
  	$familyName = $this->get("familyName");
  	$givenName  = $this->get("givenName");
  	$orgName 		= $this->getOrganizationName();
  	$roleMap 		= $this->getRoleMap();
  	$role 			= $roleMap[ $this->get("position") ];

  	if ( $familyName )
  	{
  		return "<b>$familyName, $givenName</b><br />$orgName<br />$role";
  	}
  	else
  	{
  		return "";
  	}
  }

  /**
   * Returns the icon path that is used in a visual widget
   * to represent the model record. Defaults to returning
   * a NULL value
   * @param int|null $iconSize
   * 		The pixel size of the icon, if any. Defaults to null (= no icon)
   * @return string
   */
  public function icon( $iconSize=null )
  {
  	if ( $iconSize )
  	{
  		return $iconSize . "/" . $this->get("imageUrl");
  	}
  	elseif ( $iconSize == "" )
  	{
  		return $this->get("image");
  	}
  	else
  	{
  		return null;
  	}
  }

  public function getFullName()
  {
  	$familyName = $this->get("familyName");
  	$givenName  = $this->get("givenName");
  	return "$givenName $familyName";
  }

  public function getOrganizationName()
  {
  	$orgId = $this->get("organizationId");
  	if ( $orgId )
  	{
	  	return $this->datasourceModel()
	  		->getInstanceOfType("organization")
	  		->load( $orgId )->get("name");
  	}
  	else
  	{
  		return "";
  	}
  }

  /**
   * Loads a person model with a given user id.
   * Enter description here ...
   * @param unknown_type $userId
   * @throws qcl_data_model_RecordNotFoundException
   * @return logbuch_model_Person
   */
  public function loadByUserId( $userId )
  {
  	try
  	{
	  	$this->loadWhere(array(
				'userId'	=> $userId
			));
  	}
  	catch ( qcl_data_model_RecordNotFoundException $e )
  	{
  		throw new qcl_data_model_RecordNotFoundException("User #$userId has no associated person.");
  	}
  	return $this;
  }

  /**
   * Returns the user model associated with the current person model record
   * @return qcl_access_model_User
   */
  public function userModel()
  {
    $userModel = $this->getApplication()->getAccessController()->getUserModel();
    if ( ! $userModel->isLoaded() or $userModel->id() !== $this->getUserId() )
    {
      $userModel->load( $this->getUserId() );
    }
    return $userModel;
  }

	public function getRoleMap()
	{
		return array(
			"employee" 		=> "Mitarbeiter/in", // 'label' => $this->tr("Employee") ), //
			"external" 		=> "Dienstleister/in", // 'label' => $this->tr("External employee") ), //
			"consultant" 	=> "Berater/in", // 'label' => $this->tr("Consultant") ),
			"scientist" 	=> "Wissenschaftliche Begleitung"  // 'label' => $this->tr("Scientific expert") )
		);
	}
}
?>