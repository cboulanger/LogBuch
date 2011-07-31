<?php
/* ************************************************************************

   logBuch: Die Online-Plattform für Unternehmenszusammenarbeit

   Copyright:
     2010 Jürgen Breiter (Konzeption) Christian Boulanger (Programmierung)

   License:
     GPL: http://www.gnu.org/licenses/gpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Chritian Boulanger (cboulanger)

************************************************************************ */

qcl_import("logbuch_service_Controller");
require "qcl/lib/phpmailer/class.phpmailer.php";

/**
 *
 */
class logbuch_service_Registration
  extends logbuch_service_Controller
{

  public function method_resetPassword( $personId )
  {
  	$personModel = $this->getPersonModel();
  	$personModel->load( $personId );
  	$userModel = $this->getAccessController()->getUserModel();
  	$userModel->load( $personModel->get( "userId" ) );
  	$this->sendRegistrationEmail($userModel, $personModel);
  }

  public function method_resetPasswordByEmail( $email )
  {
  	$userModel = $this->getAccessController()->getUserModel();
  	try
  	{
  		$userModel->loadWhere(array(
  			'email'	=> $email
  		));
  	}
  	catch ( qcl_data_model_RecordNotFoundException $e )
  	{
  		qcl_import("qcl_ui_dialog_Alert");
  		return new qcl_ui_dialog_Alert( $this->tr("The email address '%s' is invalid.", $email) );
  	}
  	$personModel = $this->getPersonModel();
    try
  	{
  		$personModel->loadWhere(array(
  			'userId'	=> $userModel->id()
  		));
  	}
  	catch ( qcl_data_model_RecordNotFoundException $e )
  	{
  		qcl_import("qcl_ui_dialog_Alert"); // FIXME
  		return new qcl_ui_dialog_Alert( $this->tr("The email address '%s' is invalid.", $email) );
  	}
  	$this->sendRegistrationEmail($userModel, $personModel);
  }

	public function sendRegistrationEmail( $userModel, $personModel )
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

    $confirmationLink =
      qcl_server_Server::getUrl() .
      "?ds="				. $this->getDatasourceName() .
      "&service="   . "logbuch.registration" .
      "&method="    . "confirmEmail" .
      "&params="    . "$username:$email";

    // FIXME
    $adminName   = "Annegret Zimmermann";
    $adminEmail  = "annegret.zimmermann@de.tuv.com"; // $app->getIniValue("email.admin");

    $body = ( sprintf( "
Sehr geehrte/r %s,

Sie wurden beim LogBuch 'Sustainable Business Travel' registriert oder
Ihr Passwort wurde zurückgesetzt

Ihr (neues) Startpasswort ist: %s

Bitte besuchen Sie den folgenden Link und geben Sie dort das
Startpasswort ein:

%s

Mit diesem Startpasswort können Sie Ihr persönliches Passwort neu setzen.

Um das LogBuch aufzurufen, benötigen Sie einen modernen Internetbrowser:

- FireFox ab Version 3.6 (empfohlen)
- Internet Explorer ab Version 8.0

Andere Browser werden zur Zeit nicht unterstützt.

Bei Fragen zum LogBuch wenden Sie sich bitte an %s

Wir wünschen Ihnen produktives Arbeiten mit dem LogBuch.

",  $name , $password, $confirmationLink, $adminEmail ) );

    /*
     * send mail
     */
    $mailer = new PHPMailer(true);
    try
    {
      $mailer->Mailer    = "smtp"; // FIXME into ini file
      $mailer->Subject   = $subject;
      $mailer->FromName  = $adminName;
      $mailer->From      = $adminEmail;
      $mailer->CharSet	 = "utf-8";
      $mailer->Body      = $body;
      $mailer->AddAddress( $email, $name );
      $mailer->AddCustomHeader(sprintf("Return-Path: %s <%s> ", $mailer->From, $mailer->FromName));
      $mailer->Send();
    }
    catch( phpmailerException $e)
    {
      throw new JsonRpcException( "Could not send email: " . $e->getMessage() );
    }

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

      /*
       * redirect to registration page
       */
     	header(
     		"location: " . $app->getClientUrl() .
     		"?ds="				. $this->getDatasourceName() .
     		"#view~register"
     	);
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
			$personModel = $this->getPersonModel();
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