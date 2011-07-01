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
class logbuch_service_Survey
  extends logbuch_service_Controller
{
  
  var $defaultSubject = "Hier Betreff eingeben";
  
  var $defaultBody = "Hier den Hauptext eingeben";
  
  public function method_startDialog()
  {
    
    $templateModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
   
    $templateData = array();
    $templateModel->findAll();
    if( $templateModel->foundNothing() )
    {
      $templateData[] = array(
        'label'	=> "Noch keine Vorlage vorhanden",
        'value'	=> null
      );
    }
    while( $templateModel->loadNext() )
    {
      $templateData[] = array(
        'label'	=> $templateModel->getSubject(),
        'value'	=> $templateModel->id()
      );
    }
    
    $formData = array(
      'action'  => array(
        'label'   => "Aktion wöhlen",
        'type'    => "selectbox",
        'options' => array(
           array( 'label' => "Vorlage bearbeiten", 	 	'value' => "edit" ),
           array( 'label' => "Neue Vorlage anlegen", 	'value' => "new" ),
           array( 'label' => "Vorlage versenden",   	'value' => "send" ),
           array( 'label' => "Vorlage löschen", 			'value' => "delete" ),
         ),
        'width'   => 200,
      ),
      'templateId'  => array(
        'label'   => "Vorlage wöhlen",
        'type'    => "selectbox",
        'options' => $templateData,
        'width'   => 200,
      )
    );
    return new qcl_ui_dialog_Form(
      "Verwaltung der E-Mail-Fragebogen",
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
    $templateModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    
    /*
     * template id
     */
    $id = $result->templateId;
    if( ! $id ) {
      $result->action = "new";
    }
    else 
    {
      $templateModel->load($id);
    }
    
    /*
     * actions
     */
    switch( $result->action )
    {
      case "send":
        if ( ! $templateModel->get("frequency") )
        {    
          return new qcl_ui_dialog_Alert(
            "Der Fragebogen ist deaktiviert und kann nicht versendet werden"
          );
        }
        return new qcl_ui_dialog_Confirm(
          sprintf( "Wollen Sie wirklich den Fragebogen '%s' jetzt versenden ?", $templateModel->get("subject") ),
          null, $this->serviceName(), "sendTemplate", array( $id )
        );
      
      case "delete":
        return new qcl_ui_dialog_Confirm(
          sprintf( "Wollen Sie wirklich die Vorlage '%s' löschen?", $templateModel->get("subject") ),
          null, $this->serviceName(), "deleteTemplate", array( $id )
        );        
        
      case "new":
        $id = $templateModel->create(array(
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
               array( 'label' => "Wöchentlich",  					'value' => "week" ),
               array( 'label' => "Monatlich", 	       		'value' => "month" ),
               array( 'label' => "Jährlich", 							'value' => "year" ),
               array( 'label' => "Deaktivieren", 					'value' => null ),
             ),
             'value'	=> $templateModel->get("frequency")
          ),
          'daylabel'  => array(
            'label'   => "Der wievielte Tag innerhalb des Intervalls? (nur bei periodischer Versendung)",
            'type'    => "label",
          ),
          'day'  => array(
            'label'   => "Tag",
            'type'    => "textfield",
            'value'	=> $templateModel->get("day")
          ),
          'subject'  => array(
            'label'   => "Betreffzeile",
            'type'    => "textfield",
             'value'	=> $templateModel->get("subject")
          ),
          'body'  => array(
            'label'   => "Nachrichtentext",
            'type'    => "textarea",
            'lines'		=> 20,
            'width' 	=> 800,
            'value'	=> $templateModel->get("body")
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
    $templateModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $templateModel->load($id);
    $templateModel->delete();
    return $this->method_startDialog(); 
  }
  
  public function method_saveTemplate($result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $templateModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $templateModel->load($id);
    unset($result->frequencylabel);
    unset($result->daylabel);
    $templateModel->set( $result );
    $templateModel->save();
    return $this->alert("Der Fragebogen wurde gespeichert.", true);  
  }
  
  public function method_sendTemplate($result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }    
    $templateModel = $this->getDatasourceModel()->getInstanceOfType("emailTemplate");
    $templateModel->load($id);    
    $count = $this->send( $templateModel );
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
  
  public function send( logbuch_model_EmailTemplate $templateModel )
  {
    qcl_import("logbuch_service_Entry");
    qcl_import("logbuch_service_Notification");
    
    $surveyModel = $this->getDatasourceModel()->getInstanceOfType("emailSurvey");
    $entryModel  = $this->getEntryModel();
    $personModel = $this->getPersonModel();
    $entryController = new logbuch_service_Entry;
    
    $subject = $templateModel->get("subject");
    $body    = $templateModel->get("body");
        
    /*
     * create new entry based on the template
     */
    $entryId = $entryModel->create(array(
      'personId'		=> $this->getActiveUserPerson()->id(),
      'allMembers'	=> true,
      'subject'     => $subject,
      'text'		    => "Antworten auf diesen Fragebogen können bald unter diesem Eintrag abgerufen werden." 
    ));
    
    $data = $entryController->_getEntryData($entryModel);
		$data['editable'] = false;
		$data['deletable'] = false;
    $this->broadcastClientMessage("entry.created", $data, false );
    
    /*
     * create new survey
     */
    $surveyModel->create(array(
      'entryId'	  => $entryModel->getId()
    ));
    $surveyModel->linkModel($templateModel);
    
    $body .= "\n\nAntworten auf diesen Fragebogen können unter dem Link ";
    $body .= "\n\n\t" . dirname( dirname( $this->getServerInstance()->getUrl() ) ) . "/html/teamblog/?showEntry=" . $entryModel->id() ;
    $body .= "\n\n abgerufen werden.";
    
    $notification = new logbuch_service_Notification;
    $recipientModel = $this->getPersonModel();
    $recipientModel->findAll();
    $activeUserPerson = $this->getActiveUserPerson();
    $count = 0;
    while( $recipientModel->loadNext() )
    {
      $idTag = sprintf(" [#%s/%s]", $surveyModel->id(), $recipientModel->id() );
      $success = $notification->notify($subject . $idTag, $body, $recipientModel, array(
        'allMembers' => true
      ));
      if( $success ) $count++;
    }
    return $count;
  }
}
?>