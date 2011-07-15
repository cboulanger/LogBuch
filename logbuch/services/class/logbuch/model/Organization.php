<?php
/* ************************************************************************

   logBuch: Die Online-Plattform f�r Unternehmenszusammenarbeit

   Copyright:
     2010 J�rgen Breiter (Konzeption) Christian Boulanger (Programmierung)

   License:
     GPL: http://www.gnu.org/licenses/gpl.html

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_model_db_ActiveRecord" );

/**
 *
 */
class logbuch_model_Organization
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
  protected $tableName = "data_Organization";

  /**
   * The foreign key of this model
   */
  protected $foreignKey = "OrganizationId";

  /**
   * model properties
   */
  private $properties = array(

    /**
     * Enter description here ...
     */
    'groupId' => array (
      'check' => 'integer',
      'sqltype' => 'int(11)'
    ),

    /**
     * Enter description here ...
     */
  	'name' => array(
  		'check'			=> "string",
  		'sqltype'		=> "varchar(100)"
  	),

    /**
     * Enter description here ...
     */
  	'url' => array(
  		'check'			=> "string",
  		'sqltype'		=> "varchar(255)"
  	),

    /**
     * Enter description here ...
     */
  	'notes' => array(
  		'check'			=> "string",
  		'sqltype'		=> "text"
  	),

		/**
     * Enter description here ...
     */
    'image' => array (
      'check' => 'string',
      'sqltype' => 'varchar(200)'
    ),
 );

  /**
   * Relations
   */
 	private $relations = array(
    'Attachment_Organization' => array(
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
   * Returns the text for a 'label' that is used in a visual widget
   * to represent the model record.
   * @return string
   */
  public function label()
  {
 		$name = $this->getName();
  	if ( $name )
  	{
  		return $name;
  	}
  	else
  	{
  		return "---";
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

  /**
   * overridden
   * @see qcl_data_model_AbstractActiveRecord::delete()
   */
  public function delete()
  {
    /*
     * remove all persons from this organization
     */
    $personModel = $this->datasourceModel()->getPersonModel();
    $personModel->findWhere( array("organizationId" => $this->id() ) );
    while( $personModel->loadNext() )
    {
      $personModel->set("organizationId",null)->save();
    }

     // @todo remove the group that this organization is connected with

    return parent::delete();
  }
}
?>