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
	 * Returns an array of names of the acl properties
	 * @return array
	 */
	public function getAclNames()
	{
		return array( "ownCompany", "ownConsultant", "analyst", "allConsultants", "allMembers", "moreMembers" );
	}
	
	/**
	 * Setter for acl data
	 * @param array|object $acl
	 */
	public function setAcl( $acl )
	{
		$acl = (array) $acl;
		qcl_assert_array_keys( $acl, $this->properties() );
		$this->set( $acl );		
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
		 * everybody
		 */
		if ( $this->allMembers )
		{
			$access = true;
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