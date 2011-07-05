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
qcl_import("qcl_ui_dialog_Alert");
qcl_import("qcl_ui_dialog_Form");
qcl_import("qcl_ui_dialog_Confirm");


/**
 *
 */
class logbuch_service_Category
  extends logbuch_service_Controller
{


  public function method_startDialog()
  {

    $categoryModel = $this->getCategoryModel();

    $categoryData = array();
    $categoryModel->findWhere(array(
    	'custom'	=> true
    ));
    if( $categoryModel->foundNothing() )
    {
      $categoryData[] = array(
        'label'	=> "Keine Benutzerkategorien vorhanden",
        'value'	=> null
      );
    }
    while( $categoryModel->loadNext() )
    {
      $categoryData[] = array(
        'label'	=> $categoryModel->getNamedId(),
        'value'	=> $categoryModel->id()
      );
    }

    $formData = array(
      'action'  => array(
        'label'   => "Aktion wöhlen",
        'type'    => "selectbox",
        'options' => array(
           array( 'label' => "Kategorie bearbeiten", 	 	'value' => "edit" ),
           array( 'label' => "Neue Kategorie anlegen", 	'value' => "new" ),
           array( 'label' => "Kategorie löschen", 			'value' => "delete" ),
         ),
        'width'   => 200,
      ),
      'categoryId'  => array(
        'label'   => "Kategorie wöhlen",
        'type'    => "selectbox",
        'options' => $categoryData,
        'width'   => 200,
      )
    );
    return new qcl_ui_dialog_Form(
      "Verwaltung der Kategorien",
      $formData,
      true,
      $this->serviceName(), "handleAction", array()
    );
  }

  public function method_handleAction( $result )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $categoryModel = $this->getCategoryModel();

    /*
     * category id
     */
    $id = $result->categoryId;
    if( ! $id ) {
      $result->action = "new";
    }
    else
    {
      $categoryModel->load($id);
    }

    /*
     * actions
     */
    switch( $result->action )
    {
      case "send":
        if ( ! $categoryModel->get("frequency") )
        {
          return new qcl_ui_dialog_Alert(
            "Der Fragebogen ist deaktiviert und kann nicht versendet werden"
          );
        }
        return new qcl_ui_dialog_Confirm(
          sprintf( "Wollen Sie wirklich den Fragebogen '%s' jetzt versenden ?", $categoryModel->get("subject") ),
          null, $this->serviceName(), "sendTemplate", array( $id )
        );

      case "delete":
        return new qcl_ui_dialog_Confirm(
          sprintf( "Wollen Sie wirklich die Vorlage '%s' löschen?", $categoryModel->get("subject") ),
          null, $this->serviceName(), "deleteTemplate", array( $id )
        );

      case "new":
        $id = $categoryModel->create(array(
          'subject' => $this->defaultSubject,
          'body'		=> $this->defaultBody,
          'frequency'	=> null
        ));

      case "edit":
        $formData = array(
          'frequencylabel'  => array(
            'label'   => "Wie oft soll der Fragebogen ausgesendet werden?",
            'type'    => "label",
          ),
          'frequency'  => array(
            'label'   => "Wie oft?",
            'type'    => "selectbox",
            'options' => array(
               array( 'label' => "Nur einmal", 	 					'value' => "once" ),
               array( 'label' => "Monatlich", 	       		'value' => "month" ),
               array( 'label' => "Deaktivieren", 					'value' => null ),
             ),
             'value'	=> $categoryModel->get("frequency")
          ),
          'subject'  => array(
            'label'   => "Betreffzeile",
            'type'    => "textfield",
             'value'	=> $categoryModel->get("subject")
          ),
          'body'  => array(
            'label'   => "Nachrichtentext",
            'type'    => "textarea",
            'lines'		=> 20,
            'width' 	=> 800,
            'value'	=> $categoryModel->get("body")
          )
        );
        return new qcl_ui_dialog_Form(
          "<h3>Fragebogen bearbeiten</h3>",
          $formData,
          true,
          $this->serviceName(), "saveTemplate", array($id)
    );

    }
  }

  // FIXME permissions!
  public function method_deleteTemplate( $result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $categoryModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $categoryModel->load($id);
    $categoryModel->delete();
    return $this->method_startDialog();
  }

  public function method_saveTemplate($result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $categoryModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $categoryModel->load($id);
    unset($result->frequencylabel);
    $categoryModel->set( $result );
    $categoryModel->set("personId", $this->getActiveUserPerson()->id() );
    $categoryModel->save();
    return $this->alert("Der Fragebogen wurde gespeichert.", true);
  }

  public function method_sendTemplate($result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $categoryModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $categoryModel->load($id);
    $count = $this->send( $categoryModel );
    return $this->alert(sprintf("Der Fragebogen wurde an %s Teilnehmer/innen versendet.", $count ));
  }

  public function alert( $msg, $startOver=false )
  {
    if ( $startOver )
    {
      return new qcl_ui_dialog_Alert(
        $msg, $this->serviceName(), "startDialog"
      );
    }
    return new qcl_ui_dialog_Alert($msg);
  }

  public function send( logbuch_model_EmailTemplate $categoryModel )
  {
    qcl_import("logbuch_service_Entry");
    qcl_import("logbuch_service_Notification");

    $surveyModel = $this->getDatasourceModel()->getInstanceOfType("emailSurvey");
    $entryModel  = $this->getEntryModel();
    $personModel = $this->getPersonModel();
    $entryController = new logbuch_service_Entry;

    $subject = $categoryModel->get("subject");
    $body    = $categoryModel->get("body");

 		/*
     * extract the "real" questions
     */
    preg_match("/\[\<\](.+)\[\>\]/s", $body, $matches);
    if( $matches[1] )
    {
      $text = $matches[1];
    }
    else
    {
      $text = $body;
    }

    /*
     * create new entry based on the category
     */
    $entryId = $entryModel->create(array(
      'personId'		=> $this->getActiveUserPerson()->id(),
      'allMembers'	=> true,
      'subject'     => $subject,
      'text'		    => nl2br($text)
    ));

    $data = $entryController->_getEntryData($entryModel);
		$data['editable'] = false;
		$data['deletable'] = false;
    $this->broadcastClientMessage("entry.created", $data, false );

    /*
     * add a random survey id to the subject for identification of the
     * email
     */
    $hash = substr( uuid(), 0, 5 );
    $subject .= " [LogBuch#$hash]";

    /*
     * create new survey
     */
    $surveyModel->create(array(
      'entryId'	  => $entryModel->getId(),
      'hash'			=> $hash
    ));
    $surveyModel->linkModel($categoryModel);

    /*
     * send email
     */
    $body .= "\n\nAntworten auf diesen Fragebogen können unter dem Link ";
    $body .= "\n\n\t" . dirname( dirname( $this->getServerInstance()->getUrl() ) ) . "/html/teamblog/?showEntry=" . $entryModel->id() ;
    $body .= "\n\n abgerufen werden.";

    $notification = new logbuch_service_Notification;
    $notification->sender = "LogBuch";
    $notification->senderEmail = $this->getApplication()->getIniValue("email.logbuch");

    $recipientModel = $this->getPersonModel();
    $recipientModel->findAll();
    $activeUserPerson = $this->getActiveUserPerson();
    $count = 0;
    while( $recipientModel->loadNext() )
    {
      $success = $notification->notify( $subject, $body, $recipientModel, array(
        'allMembers' => true
      ));
      if( $success ) $count++;
    }

    /*
     * save the date!
     */
    $categoryModel->set("dateLastSent", new qcl_data_db_Timestamp() )->save();

    return $count;
  }

  /**
   * Handle a mail message received from the local mailhost, handling authentication
   *
   * @param string $mail
   */
  public function handleReceivedEmail( $mail )
  {
    require_once 'ezc/Base/ezc_bootstrap.php'; // use eZ Components
    qcl_import("logbuch_service_Entry");

    $entryModel    = $this->getEntryModel();
    $personModel   = $this->getPersonModel();
    $categoryModel = $this->getCategoryModel();
    $categoryModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $surveyModel   = $this->getDatasourceModel()->getInstanceOfType("emailSurvey");
    $entryController = new logbuch_service_Entry;

    /*
     * parse received text stream
     */
    $set = new ezcMailVariableSet( $mail );
    $parser = new ezcMailParser();
    $mail = $parser->parseMail( $set );

    /*
     * handle each mail in the stream
     */
    for ( $i = 0; $i < count( $mail ); $i++ )
    {
      $email   = $mail[$i]->from->email;
      $subject = $mail[$i]->subject;

      $this->log( "From: $email\nSubject: $subject" );

      try
      {
        $personModel->loadWhere(array(
          'email'	=> $email
        ));
      }
      catch( qcl_data_model_RecordNotFoundException $e )
      {
        $this->warn("Ignoring email from unknown sender '$email'.");
        continue;
      }

      $this->log( "Received email from valid person:" . $personModel->getFullName() );

      /*
       * check if this is the response to a survey
       */
      preg_match("/\[LogBuch\#([a-zA-Z0-9]+)\]/",$subject,$matches );
      $hash = $matches[1];
      if( ! $hash )
      {
        $this->warn("Ignoring email from valid sender ($email), but without valid survery id.");
        continue;
      }

      /*
       * find the corresponding survey
       */
      try
      {
        $surveyModel->loadWhere(array(
          'hash' => $hash
        ));
      }
      catch ( qcl_data_model_RecordNotFoundException $e)
      {
        $this->warn("Ignoring email from valid sender ($email), but with invalid survery id.");
        continue;
      }

      $this->log( "Found valid survey id #$hash" );

      /*
       * create temporary access for user from email sender, using
       * a non-registered session;
       */
      $accessController = $this->getApplication()->getAccessController();
      $accessController->createSessionId();
      $accessController->setActiveUser( $personModel->userModel() );


      /*
       * check if parent entry exists
       */
      $parentEntryId  = $surveyModel->get("entryId");
      try
      {
        $entryModel->load($parentEntryId);
      }
      catch( qcl_data_model_RecordNotFoundException $e )
      {
        $this->warn("Cannot process E-mail. Entry connected to survey (#$parentEntryId) does not exist.");
        continue;
      }

      /*
       * get values from paretn entry
       */
      $acl = $entryModel->aclData();

     	/*
       * analyze parts of the message for the text-only response
       * (we don't want html text)
       */
      $text = "";
      $parts = $mail[$i]->fetchParts();
      foreach ( $parts as $part )
      {
        if ( $part instanceof ezcMailText )
        {
          if ( ! $text and $part->subType == "html" )
          {
            $text = qcl_html_to_text( $part->text );
          }
          elseif ( $part->subType == "html" )
          {
            $text = $part->text;
          }
        }
        elseif ( $part instanceof ezcMailFile )
        {
          $path   = $part->fileName;
          $target = QCL_UPLOAD_PATH . "/" . basename( $part->contentDisposition->displayFileName );
          $this->log( "Saving $path to $target" );
        }
      }

      if( ! $text )
      {
        throw new ErrorException("Ihre E-Mail hatte keinen auswertbaren Inhalt.");
      }

      /*
       * extract the "real" response
       */
      preg_match("/\[\<\](.+)\[\>\]/s", $text, $matches);
      if( $matches[1] )
      {
        $this->log("Found marked content.");
        $text = $matches[1];
      }
      else
      {
        $this->log("No marked content found, using whole message text.");
      }

      /*
       * convert into html
       */
      $html = nl2br( $text );

      /*
       * create a response entry with same acl as entry
       * that has been responded to.
       */

      $reponseEntryId = $entryModel->create(array(
        'personId' 			=> $personModel->id(),
        'parentEntryId' => $parentEntryId,
        'subject'       => substr( $subject, 0, strlen($subject)-16 ),
        'text'		      => $html
      ));

      /*
       * add categories
       */
      foreach( $entryController->locale as $category => $translation )
      {
        $token = "#$translation";
        if ( strstr( $html, $token) )
        {
          $categoryModel->load( $category );
          if ( ! $entryModel->islinkedModel( $categoryModel ) )
          {
            $entryModel->linkModel( $categoryModel );
          }
        }
      }

      /*
       * mit ACL speichern
       */
      $entryModel->set($acl)->save();

      $this->log( "Created new entry #$reponseEntryId in response to #$parentEntryId" );

      $data = $entryController->_getEntryData($entryModel);
  		$data['editable'] = false; // @todo should be editable for owner
  		$data['deletable'] = false;
      $this->broadcastClientMessage("entry.created", $data, false );
    }
  }

  public function checkAutosend()
  {
    $categoryModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $surveyModel   = $this->getDatasourceModel()->getInstanceOfType("emailSurvey");
    $personModel   = $this->getPersonModel();

    $categoryModel->findAll();
    while( $categoryModel->loadNext() )
    {
      $now      = new DateTime();
      $lastSent = $categoryModel->get("dateLastSent");
      $diff     = $lastSent ? $now->diff( $lastSent ) : null;
      $send = false;
      switch( $categoryModel->get("frequency") )
      {
        case "month":
          if( $diff && $diff->m >= 1 )
          {
            $send = true;
          }
          break;
      }

      if( $send )
      {
        /*
         * create temporary access for user from email sender, using
         * a non-registered session;
         */
        $personModel->load( $categoryModel->get("personId") );
        $accessController = $this->getApplication()->getAccessController();
        $sessionId = $this->getSessionId();
        if( ! $sessionId ) $accessController->createSessionId();
        $accessController->setActiveUser( $personModel->userModel() );
        $this->send( $categoryModel );
      }
    }
  }
}
?>