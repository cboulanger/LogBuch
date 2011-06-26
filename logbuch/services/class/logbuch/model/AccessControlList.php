<?php
class logbuch_model_AccessControlList
extends qcl_core_Object
{

	public $ownCompany 			= false;
	public $ownConsultant		= false;
	public $analyst  				= false; // wissenschaftliche Begleitung
	public $allConsultants	= false;
	public $allMembers			= false;
	public $moreMembers			= array();
	
	/**
	 * Constructor
	 * @param array|object $acl
	 */
	public function __construct( $acl=null )
	{
		if( $acl )
		{
			$this->setAcl($acl);
		}
	}
	
  /**
   * Returns a singleton instance of this class
   * @return logbuch_model_AccessControlList
   */
  public static function getInstance()
  {
    return qcl_getInstance( __CLASS__ );
  }  	
	
	/**
	 * Returns an array of names of the acl properties
	 * @return array
	 */
	public function getAclNames()
	{
		return array( "ownCompany", "ownConsultant", "analyst", "allConsultants", "allMembers", "moreMembers" );
	}
	
	/**
	 * Setter for acl data, checks that all acl properties are defined
	 * @param array|object $acl
	 */
	public function setAcl( $acl )
	{
		$acl = (array) $acl;
		qcl_assert_array_keys( $acl, $this->properties() );
		$this->set( $acl );		
	}
	
	/**
	 * Returns true if the item is not accessible for anyone except the 
	 * item author
	 */
	public function isPrivate()
	{
	  return ! (
	    $this->allConsultants or 
	    $this->allMembers or
	    $this->analyst or 
	    count($this->moreMembers)>0 or 
	    $this->ownCompany or
	    $this->ownConsultant  
	  );
	}
	
	/**
	 * Checks access to a resource.
	 * @param logbuch_model_Person $sender
	 * @param logbuch_model_Person $recipient
	 */
	public function checkAccess 
		( logbuch_model_Person $sender, 
			logbuch_model_Person $recipient )
	{
		$sender->checkLoaded();
		$recipient->checkLoaded();
		$access = false;
		
		/*
		 * everybody
		 * FIXME if .. elseif .. might be faster!
		 */
		if ( $this->allMembers )
		{
			$access = true;
		}		
		
		/*
		 * own company
		 */
		if ( $this->ownCompany )
		{
			if ( $sender->get("organizationId") == $recipient->get("organizationId") )
			{
				$access = true;
			}
		}
		
		/*
		 * own consultant
		 */
		if ( $this->ownConsultant )
		{
			if ( $sender->get("organizationId") == $recipient->get("organizationId") )
			{
				if ( $recipient->get("position") == "consultant" )
				{
					$access = true;
				}
			}
		}
		
		/*
		 * all consultants
		 */
		if ( $this->allConsultants )
		{
			if ( $recipient->get("position") == "consultant"  ) 
			{
				$access = true;
			}
		}
		
		/*
		 * analyst
		 */
		if ( $this->analyst )
		{
			if ( $recipient->get("position") == "analyst" )
			{
				$access = true;
			}
		}		
		
		/*
		 * specific members
		 */
		if ( $this->moreMembers )
		{
			if ( array_search( $recipient->id(), $this->moreMembers ) !== false )
			{
				$access = true;
			}
		}				
		return $access;
	}
}
?>