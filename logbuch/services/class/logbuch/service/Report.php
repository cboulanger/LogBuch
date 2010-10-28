<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     Jürgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_data_controller_Controller");
qcl_import("logbuch_model_AccessControlList");

/**
 *
 */
class logbuch_service_Report
  extends qcl_data_controller_Controller
{
	/**
	 */
	public function method_create( $data )
	{
		$_SESSION['reportData'] = $data;
		$reportLink = qcl_server_Server::getUrl() .
      "?service=report"   .
      "&method=display" .
			"&params=" .
			"&sessionId="	. $this->getSessionId();
		return $reportLink;
	}
	
	public function method_display()
	{
		/*
		 * data 
		 */
		$data = (array) $_SESSION['reportData'];
		
		/*
		 * models
		 */
		$dsModel 		 				= $this->getDatasourceModel("demo");
		$personModel 				= $dsModel->getInstanceOfType("person");
		$authorModel 				= $dsModel->createInstanceOfType("person");
		$activePersonModel 	= $dsModel->createInstanceOfType("person");
		$aclModel 	 				= new logbuch_model_AccessControlList;
		
		/*
		 * active user's person model
		 */
		$activePersonModel->loadByUserId( $this->getActiveUser()->id() );

		/*
		 * header
		 */
		header("Content-Type: text/html; charset=utf-8");
				
		/*
		 * the report data
		 */		
		$report = array();
		$report_includes = array();
		$categoryMap = $this->getApplication()->getCategoryLabels();
		
		/*
		 * query to retrieve all category items in the given period
		 */
		$dateStart = date ("Y-m-d", strtotime( $data['period_start'] ) );
		$dateEnd   = date ("Y-m-d", strtotime( $data['period_end'] ) );
		
		/*
		 * iterate through the categories
		 */ 
		$counter = 0;
		foreach( array("event","goal","documentation","diary","inspiration") as $category )
		{
			//$this->debug( "********************************", __CLASS__, __LINE__ );
			//$this->debug( "Category $category", __CLASS__, __LINE__ );
			//$this->debug( "********************************", __CLASS__, __LINE__ );
			
			/*
			 * if category is not chosen, skip
			 */
			if ( $data['category_' . $category ] == false ) {
				//$this->debug( "Skipping $category", __CLASS__, __LINE__ );
				continue;
			}
			
			/*
			 * category model
			 */
			$model = $dsModel->getInstanceOfType($category);
				
			/*
			 * load model records
			 */
			$query = new qcl_data_db_Query(array(
				'where' => array(
						"dateStart" => array( ">=", $dateStart ),
					 	"dateStart"	=> array( "<=", $dateEnd )
				),
				'orderBy' => "dateStart"
			));			
			$model->find( $query );
			
			/*
			 * inspect results
			 */
			while ( $model->loadNext( $query ) )
			{
				/*
				 * load author model and set ACL
				 */
				$authorModel->load( $model->get("personId") );
				$aclModel->setAcl( $model->aclData() ); 	
				
				/*
				 * check if it should be included in the report
				 */
				$include = false;
				
				/*
				 * all user's entries
				 */
				if ( $data['author_allMembers'] )
				{
					$include = true;
				}				
				
				/*
				 * current user's entries
				 */
				elseif ( $data['author_user'] and
						 $model->get("personId") == $activePersonModel->id() )
				{
					$include = true;
				}
				
				/*
				 * all authors of the same organization
				 */
				elseif ( $data['author_ownCompany'] and 
				     $authorModel->get("organizationId") == $activePersonModel->get("organizationId") )
				{
					$include = true;
				}
				
				/*
				 * the consultant of the same organization
				 */
				elseif ( $data['author_ownConsultant'] and 
				     $authorModel->get("organizationId") == $activePersonModel->get("organizationId") and 
				     $authorModel->get("position") == "consultant" )
				{
					$include = true;
				}
				
				/*
				 * all consultants 
				 */
				elseif ( $data['author_allConsultants'] and  
				     $authorModel->get("position") == "consultant" )
				{
					$include = true;
				}			

				/*
				 * the scientific analyst ;-)
				 */
				elseif ( $data['author_analyst'] and  
				     $authorModel->get("position") == "analyst" )
				{
					$include = true;
				}

				/*
				 * selected users
				 */
        elseif( $data['author_entriesBy'] and  
                array_search( 
                  $authorModel->id(), 
                  explode(",", $data['author_entriesBy'] )
                ) !== false )
        {
          $include = true;
        }
        
        /*
         * skip entry if author has not been selected
         */
        if( ! $include )
        {
          continue;
        }
        
				/*
				 * date
				 */
				$date = date("Y/m/d", strtotime($model->get("dateStart") ) );	

				//$this->debug( "------------------------------------", __CLASS__, __LINE__ );
				//$this->debug( $counter++ . ": $category/$date", __CLASS__, __LINE__ );
				//$this->debug( "------------------------------------", __CLASS__, __LINE__ );
				
				/*
				 * if author and reader are not the same and the category item
				 * is not accessible, skip
				 */
				$access = $aclModel->checkAccess( $authorModel, $activePersonModel);
				if( $authorModel->id() != $activePersonModel->id() and ! $access )
				{
					//$this->debug( "No access", __CLASS__, __LINE__ );
					continue;
				}
				
				/*
				 * see if we're supposed to include the subcategories
				 */
				foreach( $data as $key => $value )
				{
					if ( $value == false ) continue;
					
					if ( substr( $key, 0, strlen( $category ) ) == $category )
					{
						$subcategory = substr( $key, strlen( $category ) +1 );
					//$this->debug( "$subcategory", __CLASS__, __LINE__ );
						/*
						 * field content
						 */
						$subcategory_content  = $model->get( $subcategory );
						
						/*
						 * extended field
						 */
						$subcategory_extended = $subcategory . "_extended";						 
						if( $model->hasProperty( $subcategory_extended ) )
						{
							$subcategory_extended_content = $model->get( $subcategory_extended );
						}
						else 
						{
							$subcategory_extended_content = null;
						}
						
						if( $subcategory_content )
						{
							$entry = array( 
								'initials'	=> $authorModel->get("initials"),
								'content'  	=> is_string( $subcategory_content ) ?
																 nl2br($subcategory_content) : $subcategory_content,
								'extended'	=> $subcategory_extended_content ? 
																nl2br($subcategory_extended_content) : null,
								'dateStart'	=> $model->get( "dateStart" ),
								'dateEnd'		=> $model->get( "dateEnd" ),
							  'private'		=> $model->isPrivate(),
								'itemId'    => $model->id()
							);	
							//$this->debug( $entry, __CLASS__, __LINE__ );
							
							/*
							 * attachments
							 */
  						$prefix  = $category . "_" . $model->id();
              foreach( glob( "../html/valums/server/uploads/$prefix*") as $file )
              {
                $filename  = implode("_", array_slice( explode("_", basename( $file ) ), 3 ) );
                $entry['attachments'][$filename] = basename( $file );             
              }
              
							/*
							 * save entry
							 */
							$report[ $date ][ $category ][ $subcategory ][] = $entry;
						}
					}
				}
			}
		}			

		/*
		 * css
		 */
		echo '<style type="text/css">
			body {
				font-family: Arial;
			}
			table td {
				vertical-align: top;			
			}
			table {
				border-width: 1px;
				border-spacing: 2px;
				border-style: none;
				border-color: black;
				border-collapse: collapse;
				background-color: white;
			}
			table th {
				border-width: 1px;
				padding: 5px;
				border-style: solid;
				border-color: black;
				background-color: white;
				-moz-border-radius: 0px 0px 0px 0px;
			}
			table td {
				border-width: 1px;
				padding: 5px;
				border-style: solid;
				border-color: black;
				background-color: white;
				-moz-border-radius: 0px 0px 0px 0px;
			}
			</style>';		
		
		/*
		 * title
		 */
		echo 
			"<h3 id='title'>Auswertung für logBuch " .
			"'Nachhaltiger Business Travel in Berlin'</h3>";
		 
		/*
		 * Metadata
		 */
		echo 
			"<table id='meta'>" .
				"<tr>" . 
					"<td>" . 
						"<b>Erstellt durch:</b><br/>" . 
						$activePersonModel->getFullName() .
					"</td>" . 		
					"<td>" . 
						"<b>Auswertungszeitraum:</b><br />" . 
						date("d.m.Y", strtotime( $data['period_start'] ) ) . " - " .
						date("d.m.Y", strtotime( $data['period_end'] ) ) . 
					"</td>" . 
				"</tr>" .
				"<tr>" . 
					"<td>" . 
						"<b>Auswertungsdatum:</b><br />" . 
						date("d.m.Y H:i") . 
					"</td>" .
					"<td></td>" . 
				"</tr>" .
				"<tr>" . 
					"<td>" .
						"<b>Eintragungen von:</b><br /><ul>" .
							( $data['author_user'] 						? "<li>" . $activePersonModel->getFullName() . "</li>" : "" ) .
							( $data['author_ownCompany'] 			? "<li>Eigene Organisation</li>" : "" ) .
							( $data['author_ownConsultant'] 	? "<li>Eigener Berater</li>" : "" ) .
							( $data['author_allConsultants'] 	? "<li>Alle Berater</li>" : "" ) .
							( $data['author_allMembers'] 			? "<li>Alle Logbuch-Teilnehmer/innen</li>" : "" ) .
							( $data['author_analyst'] 				? "<li>Wissenschaftliche Begleitung</li>" : "" );
							
							if ( $data['author_entriesBy'] )
							{
								foreach( explode(",", $data['author_entriesBy']) as $personId )
								{
									$personModel->load( (int) $personId );
									echo "<li>" . $personModel->getFullName(). "</li>";
								}
							}
				echo  "</ul>";
							
				echo 
					"</td>" .
					"<td>" .
						"<b>Inhalte:</b><br />" . 
							"<div style='column-count: 3;column-gap: 20px;-moz-column-count: 3;-moz-column-gap: 20px;'>" .
							"<ul>" .
							( ! $data['category_event'] ? "" :  
								( "<li><b>Ereignisse</b></li><ul>" .
									( $data['event_subject'] 		  ? "<li>Titel</li>" :  "" ) .
								  ( $data['event_location'] 		? "<li>Ort</li>" :  "" ) .
									( $data['event_participants'] ? "<li>Teilnehmende</li>" :  "" ) .
									( $data['event_notes'] 				? "<li>Notizen</li>" :  "" ) .
									( $data['event_photos'] 			? "<li>Photos</li>" :  "" ) .
									( $data['event_discussions']  ? "<li>Diskussionen</li>" : "" ).
									( $data['event_documents']  	? "<li>Dokumente</li>" : "" ) .
									"</ul>" ) ) .

							( ! $data['category_goal'] ? "" :  
								( "<li><b>Ziele</b></li><ul>" .
								  ( $data['goal_subject'] 		  ? "<li>Titel</li>" :  "" ) .
									( $data['goal_participants'] 	? "<li>Beteiligte</li>" :  "" ) .
									( $data['goal_location'] 			? "<li>Ort</li>" :  "" ) .
									( $data['goal_notes'] 				? "<li>Notizen</li>" :  "" ) .
									( $data['goal_photos'] 				? "<li>Photos</li>" :  "" ) .
									( $data['goal_discussions']  	? "<li>Diskussionen</li>" : "" ).
									( $data['goal_documents']  		? "<li>Dokumente</li>" : "" ) .
									"</ul>" ) ) .
									
							( ! $data['category_documentation'] ? "" :  
								( "<li><b>Dokumentation</b></li><ul>" .
									( $data['documentation_process'] 				? "<li>Beratungsprozess</li>" :  "" ) .
									( $data['documentation_result']  				? "<li>Ergebnis</li>" : "" ).
									( $data['documentation_heureka']  			? "<li>Aha-Erlebnis</li>" : "" ) .
									( $data['documentation_stumblingBlock'] ? "<li>Stolperstein</li>" :  "" ) .
									( $data['documentation_incentive']  		? "<li>Denkanstoß</li>" : "" ).
									( $data['documentation_miscellaneous']  ? "<li>Sonstiges</li>" : "" ) .																		
									( $data['documentation_photos'] 				? "<li>Photos</li>" :  "" ) .
									( $data['documentation_discussions']  	? "<li>Diskussionen</li>" : "" ).
									( $data['documentation_documents']  		? "<li>Dokumente</li>" : "" ) .
									"</ul>" ) ) .									

							( ! $data['category_diary'] ? "" :  
								( "<li><b>Tagebuch</b></li><ul>" .
									( $data['diary_heureka']  			? "<li>Aha-Erlebnis</li>" : "" ) .
									( $data['diary_encounters'] 		? "<li>Begegnungen</li>" :  "" ) .
									( $data['diary_stumblingBlock'] ? "<li>Stolperstein</li>" :  "" ) .
									( $data['diary_incentive']  		? "<li>Denkanstoß</li>" : "" ).
									( $data['diary_miscellaneous']  ? "<li>Sonstiges</li>" : "" ) .																		
									( $data['diary_photos'] 				? "<li>Photos</li>" :  "" ) .
									( $data['diary_discussions']  	? "<li>Diskussionen</li>" : "" ).
									( $data['diary_documents']  		? "<li>Dokumente</li>" : "" ) .
									"</ul>" ) ) .		
									
							( ! $data['category_inspiration'] ? "" :  
								( "<li><b>Inspiration</b></li><ul>" .
									( $data['inspiration_idea'] 				? "<li>Idee</li>" :  "" ) .
									( $data['inspiration_source'] 			? "<li>Inspirationsquelle</li>" :  "" ) .
									( $data['inspiration_links']  			? "<li>Linktipps</li>" : "" ).																
									( $data['inspiration_photos'] 			? "<li>Photos</li>" :  "" ) .
									( $data['inspiration_discussions']  ? "<li>Diskussionen</li>" : "" ).
									( $data['inspiration_documents']  	? "<li>Dokumente</li>" : "" ) .
									"</ul>" ) ) .		

							"</ul>" .
						"</div>" .
					"</td>" .	
				"</tr>" . 
		"</table>".
		"<br/>";
									
		/*
		 * No records found
		 */
		if ( ! count( $report ) )
		{
			echo "<p><b>Ihre Auswahlkriterien ergaben keine Ergebnisse.</b></p>";
			exit;
		}		

		/*
		 * sort by date
		 */
		ksort( $report );									
		
		/*
		 * report table
		 */
		echo "<table id='report'>";		
		foreach( $report as $date => $category )
		{
			echo 
				"<tr style='border-top:2px solid #000;border-bottom:2px solid #000;'>" .
					"<td width='20%'><b>" . date("d.m.Y", strtotime( $date ) ) . "</b></td>" .
					"<td width='10%'/><td/>" . 
				"</tr>";
			
			foreach( $category as $category_name => $subcategory )
			{
				switch ( $category_name )
				{
					case "event":
						$count = count( $subcategory['subject'] );
						for( $i=0; $i < $count; $i++)
						{
              $url = "../build/#" . ( sprintf( 
                "sessionId~%s^time~%s^view~main^itemId~%s",
                $this->getSessionId(),
                strtotime( $subcategory['subject'][$i]['dateStart'] ) . "000",
                urlencode($category_name . "/" . $subcategory['subject'][$i]['itemId'])
              ) );						  
							echo 
								"<tr>" .
									"<td>" .
										"<b><a href='$url' target='logbuch'>Ereignis</a></b>" . 
										"<br />" . 
											date("H:m", strtotime( $subcategory['subject'][$i]['dateStart'] ) ) . " - " .
											date("H:m", strtotime( $subcategory['subject'][$i]['dateEnd'] ) ) .
									"</td>" .
									"<td align='center'>" . 
										$subcategory['subject'][$i]['initials'] . "<br/>" .
										( $subcategory['subject'][$i]['private'] ? "(privat)" : "" ) .
									"</td>" .  
									"<td>" . 
										"<b>" . $subcategory['subject'][$i]['content'] . "</b><br/>" ;
										
										if( $data['event_location'] && $subcategory['location'][$i]['content'] )
										{
											echo "Ort: " . $subcategory['location'][$i]['content'] . "<br/>";
										}
										
										if( $data['event_participants'] && count( $subcategory['participants'][$i]['content'] ) )
										{
											echo "Teilnehmende: ";
											$participants = array();
											foreach ( $subcategory['participants'][$i]['content'] as $participantId )
											{
												$participants[] = $personModel->load( $participantId )->getFullName();
											}
											echo implode(", ", $participants ) . "<br/>";
										}		

										if ( $data['event_notes'] && $subcategory['participants'][$i]['content'] )
										{
											echo $subcategory['notes'][$i]['content']; 
										}
										
								echo
									"</td>" .
								"</tr>";
								
								/*
								 * attachments
								 */
								$attachments = $subcategory['subject'][$i]['attachments'];
								if ( is_array( $attachments ) )
								{
								  echo "<tr><td/><td/><td>Anhänge: ";
								  $att= array();
								  foreach( $attachments as $filename => $basename )
								  {
								    $url = sprintf(
								      "server.php?service=logbuch.report&method=download&params=%s,%s&sessionId=%s",
								       $filename, $basename, $this->getSessionId()
								    );
								    $att[] = "<a href='$url' target='_blank'>$filename</a>";
								  }
								  echo implode( ", ", $att ) . "</td></tr>";
								}
        								
						}
						break;
						
					case "goal":
						$count = count( $subcategory['subject'] );
						for( $i=0; $i < $count; $i++)
						{
              $url = "../build/#" . ( sprintf( 
                "sessionId~%s^time~%s^view~main^itemId~%s",
                $this->getSessionId(),
                strtotime( $subcategory['subject'][$i]['dateStart'] ) . "000",
                urlencode($category_name . "/" . $subcategory['subject'][$i]['itemId'])
              ) );  						  
							echo 
								"<tr>" .
									"<td>" .
										"<b><a href='$url' target='logbuch'>Ziel</a></b>" . 
										"<br />" .
//										"Zieldefinition am " .
//											date("d.m.Y", strtotime( $subcategory['subject'][$i]['dateStart'] ) ) .
									"</td>" .
									"<td align='center'>" . 
										$subcategory['subject'][$i]['initials'] . "<br/>" .
										( $subcategory['subject'][$i]['private'] ? "(privat)" : "" ) .
									"</td>" .  
									"<td>" . 
										"<b>" . $subcategory['subject'][$i]['content'] ."</b><br/>";
										
								if( $data['goal_location'] && $subcategory['location'][$i]['content'] )
								{
									echo "Ort: " . $subcategory['location'][$i]['content'] . "<br/>";
								}
								
								if( $data['goal_participants'] && count( $subcategory['participants'][$i]['content'] ) )
								{
									echo "Beteiligte: ";
									$participants = array();
									foreach ( $subcategory['participants'][$i]['content'] as $participantId )
									{
										$participants[] = $personModel->load( $participantId )->getFullName();
									}
									echo implode(", ", $participants ) . "<br/>";
								}		

								if ( $data['goal_notes'] && $subcategory['participants'][$i]['content'] )
								{
									echo $subcategory['notes'][$i]['content']; 
								}			

							echo
								"</td>" .
							"</tr>";	

		            /*
                 * attachments
                 */
                $attachments = $subcategory['subject'][$i]['attachments'];
                if ( is_array( $attachments ) )
                {
                  echo "<tr><td/><td/><td>Anhänge: ";
                  $att= array();
                  foreach( $attachments as $filename => $basename )
                  {
                    $url = sprintf(
                      "server.php?service=logbuch.report&method=download&params=%s,%s&sessionId=%s",
                       $filename, $basename, $this->getSessionId()
                    );
                    $att[] = "<a href='$url' target='_blank'>$filename</a>";
                  }
                  echo implode( ", ", $att ) . "</td></tr>";
                }

						}
						break;				
	
					default: 
						foreach ( $subcategory as $subcategory_name => $entries )
						{
							foreach( $entries as $entry )
							{						
                $url = "../build/#" . ( sprintf( 
                  "sessionId~%s^time~%s^view~main^itemId~%s",
                  $this->getSessionId(),
                  strtotime( $entry['dateStart'] ) . "000",
                  urlencode( $category_name . "/" . $entry['itemId'] )
                ) );							  		
								echo 
								"<tr>".
									"<td>" .
										"<b><a href='$url' target='logbuch'>"    . $categoryMap[$category_name]['label'] . "</a></b>" . 
										"<br />" . $categoryMap[$category_name]['fields'][$subcategory_name] .
									"</td>" .
								  "<td align='center'>" . 
										$entry['initials'] . "<br/>" .
										( $entry['private'] ? "(privat)" : "" ) .
								  "</td>" .
									"<td>" . 
										"<b>" . $entry['content'] ."</b>" . 
    								( $entry['extended'] ? "<br />" . $entry['extended'] : "") .  
  								"</td>" .
  						  "</tr>";
    								
							  /*
                 * attachments
                 */
                $attachments = $entry['attachments'];
                if ( is_array( $attachments ) )
                {
                  echo "<tr><td/><td/><td>Anhänge: ";
                  $att= array();
                  foreach( $attachments as $filename => $basename )
                  {
                    $url = sprintf(
                      "server.php?service=logbuch.report&method=download&params=%s,%s&sessionId=%s",
                       $filename, $basename, $this->getSessionId()
                    );
                    $att[] = "<a href='$url' target='_blank'>$filename</a>";
                  }
                  echo implode( ", ", $att ) . "</td></tr>";
                }    								
  						}
  					}
  					break;
				} // end switch
				

				/*
				 * @todo attachments and comments
				 */
			} // end for-each

		} // end for-each
		echo "</table>";
		//echo "<pre>" . print_r( $report ,true ) . "</pre>"; 
		exit;
	}
	
  /**
   * Returns the content type according to the file extension
   */
  protected function getContentType( $file )
  {
    $file_extension = strtolower(substr(strrchr($file,"."),1));
    switch( $file_extension )
    {
      case "pdf": $ctype="application/pdf"; break;
      case "txt": $ctype="text/plain"; break;
      case "exe": die("Not allowed");
      case "zip": $ctype="application/zip"; break;
      case "doc": $ctype="application/msword"; break;
      case "xls": $ctype="application/vnd.ms-excel"; break;
      case "ppt": $ctype="application/vnd.ms-powerpoint"; break;
      case "gif": $ctype="image/gif"; break;
      case "png": $ctype="image/png"; break;
      case "jpg": $ctype="image/jpg"; break;
      default: $ctype="application/octet-stream";
    }
    return $ctype;
  }
	
	public function method_download( $filename, $basename )
	{
    qcl_import("qcl_io_filesystem_local_File");
    $path   = realpath("../html/valums/server/uploads/$basename");
    $file   = new qcl_io_filesystem_local_File( "file://" . $path);
    $size   = $file->size();
    $ctype  = $this->getContentType( $filename );
    
    /*
     * headers
     */
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Content-Type: $ctype" );
    
    if ( substr( $ctype, 0, 6 ) != "image/" )
    {
      header("Content-Disposition: attachment; filename=\"$filename\"");  
    }
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: $size" );


    /*
     * stream file content to client
     */
    $file->open("r");
    while ( $data = $file->read(8*1024) )
    {
      echo $data;
    }
    $file->close();
    exit;
	}
}
?>