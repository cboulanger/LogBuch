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
 * @todo Cleanup Scripts:
 *

		DELETE FROM businesstravel2010_data_EntryUserProperties
    WHERE id in
    (SELECT id FROM
      (SELECT id, entryId, personId, displayed, COUNT(*)
      FROM `businesstravel2010_data_EntryUserProperties`
      GROUP BY entryId, personId
      HAVING COUNT(*) > 1) as A
    )
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
<h1>Statistiken LogBuch</h1>


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
    <th>Verfasste Nachrichten</th>
    <th>Ungelesene Nachrichten</th>
   </tr>
</thead>
<tbody>
EOF;

    /*
     * iterate through all users
     */
	  $propModel    = $this->getEntryUserPropertyModel();
	  $entryModel   = $this->getEntryModel();
    $personModel  = $this->getPersonModel();
    $personModel->findAllOrderBy("familyName");
    while( $personModel->loadNext() )
    {
      echo sprintf(
        "<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>",
        $personModel->get("familyName") . ", " . $personModel->get("givenName"),
        (int) $personModel->get("countLogins"),
        $entryModel->countWhere(array( 'personId' => $personModel->id() ) ),
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