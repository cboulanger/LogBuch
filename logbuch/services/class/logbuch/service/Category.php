<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
              Programmierung: Christian Boulanger 

   Lizenz: GPL v.2

   Authoren:
     * Christian Boulanger (cboulanger)

************************************************************************ */

qcl_import("qcl_data_controller_Controller");

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
	 * @param $scope
	 */
	function method_create( $category, $data, $scope )
	{
//		$name = ucfirst( $category );
//		//$this->createModelClass( "logbuch_model_" . $name, $name, $data );
//		$this->createModelClass( "logbuch_model_Access", "access", $scope );
//		return "OK";

		try 
		{
			$datasourceModel = $this->getDatasourceModel( "demo" );
		}
		catch( InvalidArgumentException $e )
		{
			try 
			{
				$this->getDatasourceManager()->registerSchema("project",array(
					'class'	=> "logbuch_model_ProjectDatasource"
				));
			}
			catch( qcl_data_model_RecordExistsException $e ){}
			
			$this->getDatasourceManager()->createDatasource("demo", "project", array(
				'database' => "logbuch_devel_user"
			) );
			$datasourceModel = $this->getDatasourceModel( "demo" );
		}
		
		$model = $datasourceModel->getModelOfType( $category );
		
		$id = $model->create();
		$data->dateStart = date ("Y-m-d H:i:s", strtotime( $data->dateStart ) );
		$data->dateEnd = date ("Y-m-d H:i:s", strtotime( $data->dateEnd ) );
		$model->set( $data );
		$model->set( $scope );
		$model->save();
		$this->broadcastClientMessage("logbuch/message",$model->createMessage());
		
		return $id;
	}	
	
	/**
	 * Reads a category entry
	 * Enter description here ...
	 * @param $category
	 * @param $id
	 */
	function method_read( $category, $id )
	{
		$i = explode("/",$id);//FIXME
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		$model->load( (int) $i[1] );
		$data = $model->data();
		unset( $data['modified'] );
		unset( $data['created'] );
		return $data;
	}
	
	/**
	 * Updates a category entry
	 * @param $category
	 * @param $id
	 * @param $data
	 * @param $scope
	 */
	function method_update( $category, $id, $data, $scope )
	{
		$data->dateStart = date ("Y-m-d H:i:s", strtotime( $data->dateStart ) );
		$data->dateEnd = date ("Y-m-d H:i:s", strtotime( $data->dateEnd ) );		
		$model = $this->getDatasourceModel( "demo" )->getModelOfType( $category );
		$model->load( $id );
		$model->set( $data );
		$model->set( $scope );
		$model->save();
		return "OK";
	}	
}
?>