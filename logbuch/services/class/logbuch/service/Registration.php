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

qcl_import("qcl_data_controller_Controller");

/**
 *
 */
class logbuch_service_Registration
  extends qcl_data_controller_Controller
{
	
  public function method_resetPassword( $personId )
  {
  	$personModel = $this->getDatasourceModel("demo")->getModelOfType("person");
  	$personModel->load( $personId );
  	$userModel = $this->getAccessController()->getUserModel();
  	$userModel->load( $personModel->get( "userId" ) );
  	$this->sendRegistrationEmail($userModel, $personModel);
  }	
	
	
	protected function sendRegistrationEmail( $userModel, $personModel )
	{
 		$app = $this->getApplication();
 		
 		$username = $userModel->namedId();
 		$email    = $personModel->getEmail();
 		$name 		= $personModel->get("givenName") . " " . $personModel->get("familyName");
 		
 		/*
 		 * set temporary passord
 		 */
 		$password = substr( md5( uniqid(mt_rand(), true) ), 0, 8 );
 		$userModel->setPassword( $password ); 
		$userModel->save();
		
    /*
     * mail subject
     */
    $subject = $this->tr("Your logBuch registration", $applicationTitle );

    /*
     * mail body
     */
    $confirmationLink = qcl_server_Server::getUrl() .
      "?service="   . "logbuch.registration" .
      "&method="    . "confirmEmail" .
      "&params="    . "$username:$email";

    $body  = $this->tr("Dear %s,", $name);
    $body .= "\n\n" . $this->tr("You have been registered as a user in the LogBuch." );
    $body .= "\n\n" . $this->tr("Your start password is '%s'", $password );
    
    $body .= "\n\n" . $this->tr("Please visit the following link and enter this password there:" );
    $body .= "\n\n" . $confirmationLink;
    $body .= "\n\n" . $this->tr("Thank you." );

    /*
     * send mail
     */
    qcl_import("qcl_util_system_Mail");
    $adminEmail  = $app->getIniValue("email.admin");
    $mail = new qcl_util_system_Mail( array(
      'senderEmail'     => $adminEmail,
      'recipient'       => $name,
      'recipientEmail'  => $email,
      'subject'         => $subject,
      'body'            => $body
    ) );
    $mail->send();
    
    qcl_import("qcl_ui_dialog_Alert");
    new qcl_ui_dialog_Alert( $this->tr( "A registration email has been sent to %s." , $email ) );
	}	
  
  /**
   * Confirm the email address
   * @param string $email
   */
  public function method_confirmEmail( $param )
  {
  	list( $username, $email ) = explode( ":", $param );
    $app = $this->getApplication();
    $userModel = $app->getAccessController()->getUserModel();
    header("Content-Type: text/html; charset=utf-8");
    try
    {
      $userModel->findWhere( array(
        'email' 	=> $email,
      	'namedId'	=> $username
      ));
      while( $userModel->loadNext() )
      {
        $userModel->set("confirmed", true);
        $userModel->save();
      }
			
     	header( "location: " . $app->getClientUrl() . "/#view~register" );
      exit;
    }
    catch( qcl_data_model_RecordNotFoundException $e )
    {
      // should never be the case
      echo $this->tr("Invalid email or username." );
      exit;
    }
    
    echo $this->tr("Unknown error.");
    exit;    
  }	
 
  
	/**
	 * Checks the initial password and return the corresponding 
	 * username
	 * @param string $password
	 * @return string
	 */
	public function method_checkStartPassword( $password )
	{
		$userModel = $this->getAccessController()->getUserModel();
		try {
			$userModel->findWhere(array(
				'password' => $password
			));
			$userModel->loadNext();
			return array(
				'username' => $userModel->namedId(),
				'userId'	 => $userModel->id()
			);
		} 
		catch (qcl_data_model_RecordNotFoundException $e) 
		{
			return false;
		}
	}
	
	public function method_savePassword( $datasource, $userId, $oldPw, $newPw )
	{
		$accessController = $this->getAccessController();
		$userModel = $accessController->getUserModel();
		$savedPw = $userModel->getPassword();
		if( $savedPw == $oldPw )
		{
			/*
			 * find associated person
			 */
			$personModel = $this->getDatasourceModel("demo")->getModelOfType("person");
			try 
			{
				$personModel->loadWhere(array(
					'userId' => $userId
				));	
			} 
			catch (qcl_data_model_RecordNotFoundException $e) 
			{
				throw new InvalidJsonRpcException("User id #$userId has no associated person.");
			}
			
			/*
			 * save new password
			 */
			$userModel->load( $userId );
			$userModel->setPassword( $accessController->generateHash( $newPw ) );
			$userModel->save();
			
			/*
			 * return person id
			 */
			return $personModel->id();
		}
		else 
		{
			throw new JsonRpcException( $this->tr("Invalid password.") );
		}
		
	}  
}