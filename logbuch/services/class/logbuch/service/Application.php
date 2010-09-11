<?php
/* ************************************************************************

   logBuch: Die Online-Plattform fŸr Unternehmenszusammenarbeit

   Copyright:
     2010 JŸrgen Breiter (Konzeption) Christian Boulanger (Programmierung) 

   License:
     GPL: http://www.gnu.org/licenses/gpl.html
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import( "qcl_data_controller_Controller" );

/**
 *
 */
class logbuch_service_Application
  extends qcl_data_controller_Controller
{

  /*
  ---------------------------------------------------------------------------
     API METHODS
  ---------------------------------------------------------------------------
  */

  public function method_reportBugDialog()
  {
    $message = implode("",array(
      "<p style='font-weight:bold'>",
      _("Thank you for taking time to make Bibliograph better."),
      "</p><p>",
      _("After selecting the type of report (1), please provide a detailed description of the error or the requested feature (2). "), " ",
      _("If the application has reported an error, please copy & paste or write down the error message (3). "), " ",
      _("Finally, If you want to be notified about the progress of your request, please provide your email address (4)."),
      "</p>"
    ));

    qcl_import("qcl_ui_dialog_Form");
    return new qcl_ui_dialog_Form(
      $message,
      array(
        'reportType' => array(
          'type'        => "selectbox",
          'label'       => "1. " . _("Type of report"),
          'options'     => array(
            array( 'value' => 'bug',     'label' => _('Problem/Bug report') ),
            array( 'value' => 'feature', 'label' => _('Feature request') )
          )
        ),
        'problem'  => array(
          'label'       => "2. " . _("Problem"),
          'type'        => "textarea",
          'lines'       => 3,
          'required'    => true
        ),
        'error'  => array(
          'label'       => "3. " . _("Error Message"),
          'type'        => "textarea",
          'lines'       => 3
        ),
        'email'  => array(
          'label'       => "4. " . _("Email"),
          'type'        => "textfield"
        )
      ),
      /* allow cancel */ true,
      $this->serviceName(),
      "sendBugReport"
    );
  }

  public function method_sendBugReport( $data )
  {
    /*
     * user pressed "cancel" button
     */
    if ( $data === null )
    {
      return "ABORTED";
    }

    /*
     * send mails
     */
    $problemReport =
      _("Problem") . ":\n\n".
      $data->problem . "\n\n".
      _("Error Message") . ":\n\n".
      $data->error ."\n\n";

    $subjectReport = $data->reportType == "bug"
      ? _("Logbuch Bug report")
      : _("Logbuch feature request");

    $developerEmail = $this->getApplication()->getIniValue("email.developer");
    if ( ! $developerEmail )
    {
      throw new JsonRpcException( "No developer email specified in the ini file." );
    }

    qcl_import("qcl_util_system_Mail");

    /*
     * send bug report
     */
    try
    {
      $sender = isset( $data->email ) ? $data->email: $this->developerEmail;
      $mail = new qcl_util_system_Mail(array(
        'senderEmail'     => $sender,
        'recipientEmail'  => $developerEmail,
        'subject'         => $subjectReport,
        'body'            => $problemReport
      ));
      $mail->send();
    }
    catch( qcl_util_system_MailException $e )
    {
      throw new JsonRpcException( $e->getMessage() );
    }

    /*
     * reply to user
     */
    if( isset( $data->email ) )
    {
      $subjectReply = $data->reportType == "bug"
        ? _("Your problem report")
        : _("Your feature request");
      $thanksMessage =
        _("Thank you for your report.") .
        "\n\n".
        $problemReport .
        _("We will try to get back to you as soon as we can.") .
        "\n\n" .
        _("The Bibliograph team");
      try
      {
        $mail = new qcl_util_system_Mail(array(
          'sender'          => "Logbuch",
          'senderEmail'     => $developerEmail,
          'recipient'       => "Logbuch User",
          'recipientEmail'  => $data->email,
          'subject'         => $subjectReply,
          'body'            => $thanksMessage
        ));
        $mail->send();
      }
      catch( qcl_util_system_MailException $e )
      {
        throw new JsonRpcException( $e->getMessage() );
      }
    }

    /*
     * return the alert
     */
    qcl_import("qcl_ui_dialog_Alert");
    return new qcl_ui_dialog_Alert(
      _("Thank you for your report.") .
      ( isset( $data->email )
        ? ( " " . _("You will be notified as soon as it can be considered.") )
        : "" )
    );
  }
}
?>