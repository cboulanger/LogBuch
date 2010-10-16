<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     J�rgen Breiter
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
class logbuch_service_Category
  extends qcl_data_controller_Controller
{

	/**
	 * Creates a category entry
	 * @param $category
	 * @param $data
	 * @param $acl
	 */
	function method_create( $category, $date )
	{
		
		$datasourceModel = $this->getDatasourceModel("demo"); // FIXME 
		$model = $datasourceModel->getModelOfType( $category ); 
		$itemData = array();

		/*
		 * set date
		 */
		$itemData['dateStart'] = date ("Y-m-d H:i:s", strtotime( $date ) + 3600 * 8 );
		$itemData['dateEnd'] 	 = date ("Y-m-d H:i:s", strtotime( $date ) + 3600 * 8 );
		
		/*
		 * set author
		 */
		$activeUser 	= $this->getActiveUser();
		$personModel 	= $datasourceModel->getModelOfType("person");
		try 
		{
			$personModel->loadByUserId( $activeUser->id() );
		}
		catch ( qcl_data_model_RecordNotFoundException $e )
		{
			qcl_import("qcl_ui_dialog_Dialog");
			throw new InvalidJsonRpcArgumentException( 
				$this->tr("Only registered users can enter data into the LogBuch.")
			);
		}
		$itemData["personId"] = $personModel->id();
		
		/*
		 * acl
		 */
		$aclModel = new logbuch_model_AccessControlList();
		$aclData  = $aclModel->data(); // initial state will only dispatch to the author and admin users
		
		/*
		 * merge item and acl data to create record
		 */
		$data = array_merge( $itemData, $aclData );
		$id = $model->create( $data );
		
		/*
		 * return the data of the newly created record
		 */
		return $this->method_read($category, $id);
	}	
	
	/**
	 * Reads a category entry
	 * @param string $category The category type
	 * @param string|int $id Numeric id or id in the form of "<string type>/<numeric id>" FIXME 
	 */
	function method_read( $category, $id )
	{
		if( is_string( $id ) and  strstr( $id,"/") )
		{
			$i = explode("/",$id);
			$id = (int) $i[1];
		}
		elseif ( ! is_numeric( $id ) )
		{
			throw new InvalidJsonRpcArgumentException("Invalid id");
		}
		
		$data = array();

		/*
		 * load record
		 */
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		try 
		{
			$model->load( $id );
		}
		catch( qcl_data_model_RecordNotFoundException $e )
		{
			qcl_import("qcl_ui_dialog_Alert");
			return new qcl_ui_dialog_Alert( $this->tr("This record has been deleted.") );
		}		
		
		/*
		 * item data
		 */
		$data['item'] = $model->data(array(
			'include'	=> $model->ownProperties() 
		));
		
		/*
		 * add id
		 */
		$data['item']['id'] = $model->id();
		
		/*
		 * marshal date data
		 */
		$data['item']['dateStart'] 	= date("Y/m/d", strtotime( $model->get('dateStart') ) ); 
	  $data['item']['dateEnd'] 		= date("Y/m/d", strtotime( $model->get('dateEnd') ) );		
		$data['item']['timeStart'] 	= date("H:i", 	strtotime( $model->get('dateStart') ) ); 
	  $data['item']['timeEnd'] 		= date("H:i", 	strtotime( $model->get('dateEnd') ) );
	  
		/*
		 * author label
		 */
		$personModel = $this->getDatasourceModel( "demo" )->getModelOfType( "person" ); // FIXME
		$personModel->load( $model->get("personId") );		
		$data['authorLabel'] = 
			$personModel->get("givenName") . " " . $personModel->get("familyName") .
			" (" . $model->getCreated()->format("d.m.Y H:i") . ")";
		
		/*
		 * acl
		 */
		$aclModel = new logbuch_model_AccessControlList();
		$data['acl'] = $model->data( array(
			'include' 	=> $aclModel->getAclNames()
		));
	  
	  /*
	   * whether to allow to delete the item
	   */
	  //$personModel->loadByUserId( $this->getActiveUser()->id() )
	  $data['allowDelete'] = true; // FIXME 
	  
		return $data;
	}
	
	/**
	 * Updates a category entry
	 * @param $category
	 * @param $id
	 * @param $data
	 * @param $acl
	 */
	function method_update( $category, $id, $data, $acl )
	{
		/*
		 * load record
		 */
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		$model->load( $id );
		
		/*
		 * unmarshal date data
		 */
		$dateStart = strtotime( $data->dateStart );
		$timeStart = explode( ":", $data->timeStart );
		$timeStart = 3600 * $timeStart[0] + 60 * $timeStart[1];
		
		$dateEnd   = strtotime( $data->dateEnd );
		$timeEnd   = explode( ":", $data->timeEnd );
		$timeEnd 	 = 3600 * $timeEnd[0] + 60 * $timeEnd[1];
		
		$data->dateStart = date ("Y-m-d H:i:s", $dateStart + $timeStart );
		$data->dateEnd 	 = date ("Y-m-d H:i:s", $dateEnd + $timeEnd );		
		
		/*
		 * set data
		 */
		$model->set( $data );
		
		/*
		 * if acl and data has changed, send messages to the added 
		 * acl group
		 */
		$aclModel = new logbuch_model_AccessControlList();
		$oldAcl = $model->data( array(
			'include' => $aclModel->getAclNames()
		));
		$newAcl = array();
		
		foreach( $oldAcl as $key => $value )
		{
			if ( is_bool($value) )
			{
				$newAcl[$key] = ( $value === false && $acl->$key === true );	
			}
			elseif ( is_array( $value) )
			{
				$newAcl[$key] = array_diff( $acl->$key, $value );
			}
		}	
		$bus = qcl_event_message_Bus::getInstance();
		foreach( $model->createMessages() as $message )
		{
			$message->setAcl( $newAcl );
			$message->setBroadcast( true );
			$message->setExcludeOwnSession( false );
			$data = $message->getData();
			$data['isPrivate'] = $model->isPrivate();
			$message->setData( $data );			
			$bus->dispatch($message);
		}
		
		/*
		 * set new acl 
		 */
		$model->set( $acl );
				
		/*
		 * save  
		 */
		$model->save();
		return "OK";
	}
	
	/**
	 * Deletes a category entry
	 * @param $category
	 * @param $id
	 */
	function method_delete( $category, $id)
	{
		
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		$model->load( $id );
		
		if( $this->getActiveUser()->hasRole( QCL_ROLE_ADMIN ) ) // FIXME permission
		{
			$model->delete();
		}
		else
		{
			$personModel = $this->getDatasourceModel( "demo" )->getModelOfType( "person" );
			$personModel->loadWhere( array( "userId" => $this->getActiveUser()->id() ) );
			if( $model->get("personId") == $personModel->id() )
			{
				$model->delete();	
			}
			else
			{
				qcl_import("qcl_ui_dialog_Alert");
				new qcl_ui_dialog_Alert( $this->tr( "You cannot delete this entry because you do not own it.") );	
			}
		}
		return "OK";
	}		
	
	
	/**
	 * Returns the time period where this project has entries
	 */
	public function method_getDatePeriod()
	{
		$dateStart = null;
		$dateEnd   = null;
		
		$dsModel = $this->getDatasourceModel("demo");
		foreach( array("event","goal","documentation","diary","inspiration") as $type )
		{
			$model = $dsModel->getInstanceOfType($type);
			$date = $model->getQueryBehavior()->fetchValues("dateStart", new qcl_data_db_Query(array(
				'orderBy' 			=> "dateStart",
				'numberOfRows'	=> 1
			)));
			if ( ! $dateStart or strtotime( $date[0] ) < strtotime( $dateStart ) )
			{
				$dateStart = $date[0];
			}
			$date = $model->getQueryBehavior()->fetchValues("dateStart", new qcl_data_db_Query(array(
				'orderBy' 			=> "dateEnd DESC",
				'numberOfRows'	=> 1
			)));
			if ( ! $dateEnd or strtotime( $date[0] ) > strtotime( $dateEnd ) )
			{
				$dateEnd = $date[0];
			}			
		}
		$data = array();
		$data['dateStart'] 	= date("Y/m/d", strtotime( $dateStart ) ); 
	  $data['dateEnd'] 		= date("Y/m/d", strtotime( $dateEnd ) );		
		return $data;
	}
	
	public function method_createReport( $data )
	{
		$_SESSION['reportData'] = $data;
		$reportLink = qcl_server_Server::getUrl() .
      "?service="   . $this->serviceName() .
      "&method="    . "displayReport" .
			"&params=" .
			"&sessionId="	. $this->getSessionId();
		return $reportLink;
	}
	
	public function method_displayReport()
	{
		/*
		 * data 
		 */
		$data = (array) $_SESSION['reportData'];
		
		/*
		 * models
		 */
		$dsModel 		 = $this->getDatasourceModel("demo");
		$personModel = $dsModel->getInstanceOfType("person");
		$authorModel = $dsModel->createInstanceOfType("person");
		$aclModel 	 = new logbuch_model_AccessControlList;
		
		$personModel->loadByUserId( $this->getActiveUser()->id() );
		
		header("Content-Type: text/html; charset=utf-8");
		
		echo 
			"<h1 id='title'>Auswertung für logBuch 'Sustainable Business Travel in Berlin</h1>" . 
			"<table id='meta'>" .
				"<tr><td>Auswertungszeitraum:</td><td>" . 
						date("d.m.Y", strtotime( $data['period_start'] ) ) . " - " .
						date("d.m.Y", strtotime( $data['period_end'] ) ) . 
						"</td></tr>" .
				"<tr><td>Auswertungsdatum:</td><td>" . date("d.m.Y H:i") . "</td></tr>" .
				"<tr><td>Erstellt durch:</td><td>" . $personModel->getFullName() .
				"</td></tr>".
			"</table>";
				
		/*
		 * the report data
		 */		
		$report = array();
		
		/*
		 * query to retrieve all category items in the given period
		 */
		$dateStart = date ("Y-m-d", strtotime( $data['period_start'] ) );
		$dateEnd   = date ("Y-m-d", strtotime( $data['period_end'] ) );
		
		/*
		 * iterate through the categories
		 */ 
		foreach( array("event","goal","documentation","diary","inspiration") as $category )
		{
			$this->debug( "Category $category", __CLASS__, __LINE__ );
			
			/*
			 * if category is not chosen, skip
			 */
			if ( $data['category_' . $category ] == false ) {
				$this->debug( "Skipping $category", __CLASS__, __LINE__ );
				contiune;
			}
			
			/*
			 * category model
			 */
			$model = $dsModel->getInstanceOfType($category);
				
			/*
			 * load model records and iterate through them
			 */
			$query = new qcl_data_db_Query(array(
				'where' => array(
						"dateStart" => array( ">=", $dateStart ),
					 	"dateEnd"		=> array( "<=", $dateEnd )
				)
			));			
			$model->find( $query );
			while ( $model->loadNext( $query ) )
			{
				/*
				 * load author model and set ACL
				 */
				$authorModel->load( $model->get("personId") );
				$aclModel->setAcl( $model->aclData() ); 	

				/*
				 * date
				 */
				$date = date("Y/m/d", strtotime($model->get("dateStart") ) );				
				$this->debug( "$category/$date", __CLASS__, __LINE__ );
				
				/*
				 * if author and reader are not the same and the category item
				 * is not accessible, skip
				 */
				if( $authorModel->id() != $personModel->id() and $aclModel->checkAccess( $authorModel, $personModel) )
				{
					$this->debug( "No access", __CLASS__, __LINE__ );
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
							$cell =& $report[ $date ][ $category ][ $subcategory ];
							$cell[] = array( 
								'initials'	=> $authorModel->get("initials"),
								'content'  	=> $subcategory_content,
								'extended'	=> $subcategory_extended_content
							);	
						}
					}
				}
			}
		}				
				
		ksort( $report );
		echo '<style type="text/css">
			table.sample {
				border-width: 1px;
				border-spacing: 2px;
				border-style: none;
				border-color: black;
				border-collapse: collapse;
				background-color: white;
			}
			table.sample th {
				border-width: 1px;
				padding: 5px;
				border-style: solid;
				border-color: black;
				background-color: white;
				-moz-border-radius: 0px 0px 0px 0px;
			}
			table.sample td {
				border-width: 1px;
				padding: 5px;
				border-style: solid;
				border-color: black;
				background-color: white;
				-moz-border-radius: 0px 0px 0px 0px;
			}
			</style>';
		echo "<table id='report' class='sample'>";		
		foreach( $report as $date => $category )
		{
			echo "<tr><td width='20%'><b>" . date("d.m.Y", strtotime( $date ) ) . "<b></td>";
			echo "<td width='10%'/><td/></tr>";
			
			foreach( $category as $category_name => $subcategory )
			{
				foreach ( $subcategory as $subcategory_name => $entries )
				{
					foreach( $entries as $entry )
					{
						echo "<tr><td>$category_name<br />$subcategory_name</td>";
						echo "<td align='center'>" . $entry['initials'] .  "</td>";
						echo "<td>" . $entry['content'];
						if( $entry['extended'] )
						{
							echo "<br />" . $entry['extended']; 
						}
						
						echo  "</td></tr>";
					}
				}
			}
			
		}
		echo "</table>";
		//echo "<pre>" . print_r( $report ,true ) . "</pre>"; 
		exit;
	}
}
?>