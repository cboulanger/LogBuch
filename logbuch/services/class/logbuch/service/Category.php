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
        'label'	=> $categoryModel->get("name"),
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
    
    $count = $categoryModel->countRecords()+1;
    
    /*
     * actions
     */
    switch( $result->action )
    {
      case "delete":
        return new qcl_ui_dialog_Confirm(
          sprintf( "Wollen Sie wirklich die Kategorie '%s' löschen?", $categoryModel->get("name") ),
          null, $this->serviceName(), "deleteCategory", array( $id )
        );

      case "new":
        $id = $categoryModel->create("Kategorie " . $count, array(
          'custom'	=> true
        ));

      case "edit":
        $formData = array(
          'name'  => array(
            'label'   => "Name",
            'type'    => "textfield",
             'value'	=> $categoryModel->get("name") 
          ),      
          'description'  => array(
            'label'   => "Beschreibung",
            'type'    => "textarea",
            'lines'		=> 3,
             'value'	=> $categoryModel->get("description") 
          )          
        );
        return new qcl_ui_dialog_Form(
          "<h3>Kategorie bearbeiten</h3><p>Geben sie den Namen der Kategorie und eine kurze Beschreibung/Erklärung der Kategorie ein</p>",
          $formData,
          true,
          $this->serviceName(), "saveCategory", array($id)
    );

    }
  }

  // FIXME permissions!
  public function method_deleteCategory( $result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $categoryModel = $this->getCategoryModel();
    $categoryModel->load($id);
    $categoryModel->delete();
    return $this->method_startDialog();
  }

  public function method_saveCategory($result, $id )
  {
    if( $result === null )
    {
      return "ABORTED";
    }
    $categoryModel = $this->getCategoryModel();
    $categoryModel->load($id);
    $categoryModel->set( $result );
    $categoryModel->set(
    	"namedId", 
      strtolower(str_replace(" ","-", qcl_asciize($result->name)))
    );
    $categoryModel->save();
    return $this->alert("Die Kategorie wurde gespeichert.", true);
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
}
?>