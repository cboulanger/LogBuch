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
qcl_import("logbuch_model_AccessControlList");

/**
 *
 */
class logbuch_service_File
  extends qcl_data_controller_Controller
{
  
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
    
    if ( substr( $ctype, 0, 6 ) == "image/" )
    {
      // header("Content-Disposition: attachment; filename=\"$filename\"");
      // TODO is it possible to change the name of an inline download?
    }
    else 
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