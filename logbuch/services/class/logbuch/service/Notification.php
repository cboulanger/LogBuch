<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen

   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("logbuch_service_Controller");
qcl_import("logbuch_model_AccessControlList");
require "qcl/lib/phpmailer/class.phpmailer.php";

/**
 *
 */
class logbuch_service_Notification
  extends logbuch_service_Controller
{

  var $sender = null;
  var $senderEmail = null;

  /**
   * Sends an email to a user based on the acl list. If the user doesn't belong
   * to the list of legitimate recipients, do not send the message and return false.
   * Emits a warning on the source of the error.
   *
   * @param string $subject
   *    The subject of the message
   * @param string $body
   *    The body of the message
   * @param logbuch_model_Person $recipient
   *    The loaded model of the person that is to receive the message
   * @param array|object $acl
   *    The acl data
   * @return boolean True if message was sent, false if not.
   */
  public function notify( $subject, $body, logbuch_model_Person $recipient, $acl )
  {
    $activeUserPerson = $this->getActiveUserPerson(); // FIXME use datasource of recipient
    $aclModel = new logbuch_model_AccessControlList( $acl );
    if( $aclModel->checkAccess( $activeUserPerson, $recipient ) )
    {
      $mailer = new PHPMailer(true);
      try
      {
        $mailer->Mailer    = "smtp"; // FIXME into ini file
        $mailer->Subject   = $subject;
        $mailer->FromName  = $this->sender;
        $mailer->From      = $this->senderEmail;
        $mailer->CharSet	 = "utf-8";
        $mailer->MsgHTML(nl2br($body));
        $mailer->AddAddress( $recipient->get("email"), $recipient->getFullName() );
        $mailer->AddCustomHeader(sprintf("Return-Path: %s <%s> ", $mailer->From, $mailer->FromName));
        $mailer->Send();
        //$this->debug( "Gesendet an ". $recipient->get("email"), __CLASS__, __LINE__ );
        return true;
      }
      catch( phpmailerException $e)
      {
        throw new JsonRpcException( "Could not send email: " . $e->getMessage() );
      }
    }
    else
    {
       //$this->debug( "NICHT gesendet an ". $recipient->get("email"), __CLASS__, __LINE__ );
    }
    return false;
  }

  /**
   * Sends a notification to all project members except the currently
   * logged in user (who is sending the message).
   * @param string $project
   *    The name of the project
   * @param string $subject
   *    The notification subject
   * @param string $body
   *    The notification body
   * @param array|object $acl
   *    The acl data
   */
  public function notifyAll( $subject, $body, $acl, $selfAlso=false )
  {
    $recipientModel = $this->getPersonModel();
    $recipientModel->findAll();
    $activeUserPerson = $this->getActiveUserPerson();
    //$this->debug( "Email $subject", __CLASS__, __LINE__ );
    while( $recipientModel->loadNext() )
    {
      if( $recipientModel->id() != $activeUserPerson->id() )
      {
        $this->notify($subject, $body, $recipientModel, $acl);
      }
      else
      {
        //$this->debug( "- nicht an den Absender selbst.", __CLASS__, __LINE__ );
      }
    }
  }
}
?>