<?php
/* ************************************************************************

   logBuch: Software zur online-Dokumentation von Beratungsprozessen
   
   Copyright: Konzeption:     JŸrgen Breiter
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
class logbuch_service_File
  extends logbuch_service_Controller
{
  

  
  public function method_download( $id )
  {
    $attModel   = $this->getDatasourceModel("demo")->getInstanceOfType("attachment");
    $entryModel = $this->getDatasourceModel("demo")->getInstanceOfType("entry");
    
    // FIXME ACL!
    
    $attModel->load($id);
    $filetype  = $attModel->get("mime");
    $filename  = $attModel->get("filename");
    $filepath  = $attModel->filepath();
    $filesize  = $attModel->get("size");
    
    /*
     * headers
     */
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Content-Type: $filetype" );
    
    if ( substr( $filetype, 0, 6 ) == "image/" )
    {
      // header("Content-Disposition: attachment; filename=\"$filename\"");
      // TODO is it possible to change the name of an inline download?
    }
    else 
    {
      header("Content-Disposition: attachment; filename=\"$filename\"");
    }
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: $filesize" );


    /*
     * stream file content to client
     */
    qcl_import("qcl_io_filesystem_local_File");
    $file = new qcl_io_filesystem_local_File("file://$filepath");
    $file->open("r");
    while ( $data = $file->read(8*1024) )
    {
      echo $data;
    }
    $file->close();
    exit;
  }
  
  function method_upload($entryId, $paths, $names)
  {
    $entryModel = $this->getDatasourceModel("demo")->getInstanceOfType("entry");
    $attModel   = $this->getDatasourceModel("demo")->getInstanceOfType("attachment");
    
    qcl_assert_integer($entryId);
    
    if( $entryId )
    {
      $entryModel->load($entryId);
    }
    
    $result = array( 
      "message" => count($names) . " Datei(en) hochgeladen.",
      "files"		=> array()
    );
    
    for ($i = 0; $i < count($names); $i++)
    {
       $file = $names[$i];
       $path = $paths[$i];
       
       /*
        * get icon for file
        */
       $file_extension = strtolower(substr(strrchr($file,"."),1));
       $iconpath = "img/fileicons/$file_extension.png";
       if( ! file_exists("../html/teamblog/" . $iconpath ) )
       {
         $iconpath = "img/page_error.png";
       } 
       
       /*
        * create new attachment
        */
       $hash = substr(strrchr($path,"/"),1);
       $attId = $attModel->create(array(
         'filename' => $file,
         'hash'     => $hash
       ));
       
       /*
        * link if entry id is already known
        */
       if( $entryId )
       {
         $entryModel->linkModel($attModel);
       }
       
       /*
        * create info data
        */
       $result['ids'][] = $attId;
       $result['files'][] = array(
         "name"	=> $file,
         "icon"	=> $iconpath,
         "id"   => $attId,
         "mime"	=> $attModel->get("mime")
       );
    }
    return $result;
      
  }
}