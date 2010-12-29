<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("logbuch_service_Controller");
qcl_import("logbuch_model_AccessControlList");
qcl_import("qcl_util_system_Mail");

/**
 * 
 */
class logbuch_service_Notification
  extends logbuch_service_Controller
{
  
  /**
   * Sends an email to a user based on the acl list. If the user doesn't belong
   * to the list of legitimate recipients, do not send the message and return false.
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
      $mailer = qcl_util_system_Mail::getInstance();  
      $mailer->set( array(
        'subject'         => $subject,  
        'body'            => $body,
        'sender'          => "LogBuch",
        'senderEmail'     => "annegret.zimmermann@de.tuv.com", // FIXME
        'recipient'       => $recipient->getFullName(),
        'recipientEmail'  => $recipient->get("email")
      ) );
      //$this->debug( $mailer->data(), __CLASS__, __LINE__ );
      $mailer->send();
      return true;
    }
    //$this->debug( "No...", __CLASS__, __LINE__ );
    return false;
  }
  
  /**
   * Sends a notification to all project members
   * @param string $project
   *    The name of the project
   * @param string $subject
   *    The notification subject
   * @param string $body
   *    The notification body
   * @param array|object $acl
   *    The acl data
   */
  public function notifyAll( $project, $subject, $body, $acl )
  {
    $recipientModel = $this->getDatasourceModel( $project )->getPersonModel();
    $recipientModel->findAll();
    while( $recipientModel->loadNext() )
    {
      $this->notify($subject, $body, $recipientModel, $acl);
    }    
  }
}
?>