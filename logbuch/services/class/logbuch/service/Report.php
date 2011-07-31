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

/**
 *
 */
class logbuch_service_Report
  extends logbuch_service_Controller
{

	
	function method_createTimesheet()
	{
	  if ( ! $this->hasRole("manager") )
	  {
	    die ("Access denied.");
	  }
	  header("Content-Type: text/html; charset=utf-8");
	  echo <<<EOF
<html>
<head>
<title>Statistiken LogBuch</title>
</head>
<body>
<h1>Zeiterfassung</h1>	  
<p>
Diese Auswertung erfasst nur die Zeiträume, in denen die Benutzer/innen seit Beginn 
der Zeiterfassung im 
LogBuch angemeldet waren. Sie sagt nichts darüber hinaus, ob in dieser Zeit auch 
Aktivität erfolgte. Die Zahl der Logins ist z.Z. fehlerhaft.</p>	  

<style type="text/css">
table.sample {
  border-width: 0px;
  border-spacing: ;
  border-style: outset;
  border-color: gray;
  border-collapse: collapse;
  background-color: white;
}
table.sample th {
  border-width: 1px;
  padding: 3px;
  border-style: solid;
  border-color: black;
  background-color: white;
  -moz-border-radius: ;
}
table.sample td {
  border-width: 1px;
  padding: 3px;
  border-style: solid;
  border-color: black;
  background-color: white;
}
</style>	  
<table class="sample">
 <thead>
  <tr>
    <th>Name</th>
    <th>Anmeldungen</th>
    <th>Zeit gesamt</th>
    <th>Zeit pro Anmeldung</th>
  </tr>
</thead>
<tbody>
EOF;

    /*
     * iterate through all users
     */
    $personModel =$this->getPersonModel();
    $personModel->findAllOrderBy("familyName");
    while( $personModel->loadNext() )
    {
      echo sprintf(
        "<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>",
        $personModel->get("familyName") . ", " . $personModel->get("givenName"),
        (int) $personModel->get("countLogins"),
        $this->getHms( $personModel->get("worktime") ),
        $this->getHms( floor( $personModel->get("worktime") / max( array( 1, $personModel->get("countLogins") ) ) ) )
      );
    }
    
    echo "</tbody></table>"; 
?>
<h1>Ungelesene Nachrichten</h1>

Die folgende Tabelle zeigt an, wie viele ungelesene Nachrichten pro Nutzer/in
vorliegen.

<table class="sample">
 <thead>
  <tr>
    <th>Name</th>
    <th>Anzahl ungelesener Nachrichten</th>
  </tr>
</thead>
<tbody>
    
<?php
    $propModel= $this->getEntryUserPropertyModel();
    $personModel->findAllOrderBy("familyName");
    while( $personModel->loadNext() )
    {
      echo sprintf(
        "<tr><td>%s</td><td>%s</td></tr>",
        $personModel->get("familyName") . ", " . $personModel->get("givenName"),
        $propModel->countWhere(array(
        	'personId' 	=> $personModel->id(),
        	'displayed' => false
        ))
      );
    }
    echo "</tbody></table>";     
    echo "</body></html>";
	  exit;
	}
	
	protected function getHms( $sec )
	{
    $hms = "";
    $hours = intval(intval($sec) / 3600); 
    $hms .= str_pad($hours, 2, "0", STR_PAD_LEFT). ":";
    $minutes = intval(($sec / 60) % 60); 
    $hms .= str_pad($minutes, 2, "0", STR_PAD_LEFT). ":";
    $seconds = intval($sec % 60); 
    $hms .= str_pad($seconds, 2, "0", STR_PAD_LEFT);
    return $hms;	  
	}
}
?>