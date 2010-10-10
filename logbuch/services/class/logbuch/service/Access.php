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

qcl_import("qcl_access_Service");


/**
 * The class used for authentication of users. 
 */
class logbuch_service_Access
  extends qcl_access_Service
{

  /**
   * Actively authenticate the user with session id or with username and password.
   * Returns data for the authentication store. Overridden to do extended 
   * authentication for the logBuch
   *
   * @param string|null $first 
   * 		If two arguments, this is the username. If one argument,
   * 		this is the session id.
   * @param string $password 
   * 		Plaintext password
   * @return qcl_access_AuthenticationResult
   * @throws qcl_access_AuthenticationException
   */
  public function method_authenticate( $first=null, $password=null )
  {
  	if( $first and $password )
  	{
  		/*
  		 * first, try the full name
  		 */
  		$userModel = $this->getAccessController()->getUserModel();
  		try 
  		{ 
  			$userModel->loadWhere(array(
  				'name' => $first
  			)); 
  			$first = $userModel->namedId();
  		} 
  		catch (qcl_data_model_RecordNotFoundException $e) 
  		{
  			/*
  			 * now, try the intials
  			 */	
  			$personModel 	= $this->getDatasourceModel("demo")->getModelOfType("person");
  		 	try 
	  		{
	  			$query = $personModel->loadWhere(array(
	  				'initials' => $first
	  			));
	  			$userModel->load( $personModel->get("userId") );
	  			$first = $userModel->namedId();
	  		} 
	  		catch (qcl_data_model_RecordNotFoundException $e) {}
  		}
  	}
  	
  	/*
  	 * Call the parent method to do the actual authentication
  	 */
  	
  	return parent::method_authenticate( $first, $password );
  }
}
?>