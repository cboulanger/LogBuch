<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     J�rgen Breiter
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
      $mailer = qcl_util_system_Mail::getInstance();  
      $mailer->reset();
      try 
      {
        $mailer->set( array(
          'subject'         => $subject,  
          'body'            => $body,
          'sender'          => "LogBuch",
          'senderEmail'     => "nicht_antworten@logbuch-business-travel.de", // FIXME
          'recipient'       => $recipient->getFullName(),
          'recipientEmail'  => $recipient->get("email")
        ) );
        $this->debug( $mailer->data(), __CLASS__, __LINE__ );        
        $mailer->send();
        return true;
      }
      catch( LogicException $e)
      {
        $this->warn( "Could not send email: " . $e->getMessage() );
      }
    }
    $this->debug( $recipient->getFullName() .  ": No...", __CLASS__, __LINE__ );
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
  public function notifyAll( $project, $subject, $body, $acl )
  {
    $recipientModel = $this->getDatasourceModel( $project )->getPersonModel();
    $recipientModel->findAll();
    $activeUserPerson = $this->getActiveUserPerson("demo");
    while( $recipientModel->loadNext() )
    {
      if( $recipientModel->id() != $activeUserPerson->id() )
      {
        $this->notify($subject, $body, $recipientModel, $acl);
      }
    }    
  }
  
  
  public function method_attachment( $category, $itemId, $fileList )
  {
    $model = $this->getDatasourceModel("demo")->getInstanceOfType( $category ); // FIXME
    $model->load( (int) $itemId );
    $aclData = $model->aclData();
    $user = $this->getActiveUserPerson("demo")->getFullName();
     
    if ( $model->get("notify")  )
    {
      $subject = "Neuer Logbuch-Anhang";
      $body = "Sehr geehrte/r LogBuch-Teilnehmer/in,\n\n";
      $body .= ( count( $fileList) > 1 ? 
        "$user hat neue Dokumente hochgeladen" :
        "$user hat ein neues Dokument hochgeladen" ) . ":\n\n";
      $body .=  implode( "\n", $fileList ) . "\n\n";         
      $body .= "\nSie können den Eintrag unter dem folgenden Link abrufen: \n\n";
      $body .= dirname( dirname( qcl_server_Server::getUrl() ) ) . 
            "/build/#" . urlencode( 
            "showItem~" . $data['category'] . "/" . $data['itemId'] 
            ); 
            
      $body .= "\n\n---\n\nBitte antworten Sie nicht auf diese E-Mail.";
      $this->notifyAll("demo", $subject, $body, $aclData); // FIXME
    }    
  }
}
?>