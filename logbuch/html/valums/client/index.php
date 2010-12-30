<?php 

  function getParam( $name )
  {
    return isset( $_GET[$name] ) ? $_GET[$name] : null;
  }

  /*
   * check session id
   */
  session_start();
  $sessionId = getParam('sessionId');
  if ( $sessionId != session_id() )
  {
    die("No access");
  }
  
	/*
	 * header
	 */
	header("Content-Type: text/html; charset=utf-8");

?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link href="fileuploader.css?nocache=12345" rel="stylesheet" type="text/css">	
    <style>    	
		body {
			font-size:13px; 
			font-family:arial, sans-serif;
		}
    </style>	
</head>
<body>
	  <!-- The uploader drop / click target -->
	  <div id="uploader-target">
	   <noscript>Please enable javascript</noscript>
	  </div>		   
    <script src="fileuploader.js" type="text/javascript"></script>
    <?php 
      
      /*
       * GET params
       */
      $category   = getParam('category');
      $itemId     = getParam('itemId');
      $editable   = getParam('editable');
      $deleteFile = str_replace( "..", "", getParam('delete') );
      
      /*
       * delete a file?
       */
      if ( $deleteFile )
      {
        $file = "../server/uploads/$deleteFile";
        if( file_exists( $file ) )
        {
          unlink( $file );  
        }
      }
      
      $serverUrl = "../server/upload.php?" . 
      								"category=$category" .
      								"&itemId=$itemId" .
                      "&editable=$editable" .
                      "&sessionId=$sessionId";      
    ?>
    <?php if ( $editable ):?>
      <script>     
        var __isUploading = false;
        function createUploader(){    
            var fileList = [];        
            var uploader = new qq.FileUploader({
                element: document.getElementById('uploader-target'),
                action: '<?php echo $serverUrl; ?>',
                debug: false,
                template: 
                  '<div class="qq-uploader">' + 
                  '<div class="qq-upload-drop-area"><span>Dateien hier ablegen</span></div>' +
                  '<div class="qq-upload-button"><b>Hier</b> klicken, um Datei hochzuladen oder per Drag & Drop Datei hier ablegen.' +
                  'Um eine Datei zu löschen, klicken Sie auf das [&nbsp;X&nbsp;]' + 
                      '</div>' +
                  '<ul class="qq-upload-list"></ul>' + 
               '</div>',
               onProgress : function(id, fileName, loaded, total){
                 //top.console.warn("Progress: " + [ id, fileName, loaded, total]);
                 //  
                 __isUploading = true;
               },
               onComplete: function(id, fileName, responseJSON){
                 //top.console.warn("complete: " +[id, fileName, responseJSON]);
                 fileList.push( fileName );
                 __isUploading = false;
                 setTimeout(function(){
                   if ( ! __isUploading && fileList.length )
                   {
                     var url = document.__parentWidget.getIframe().getSource();
                     url = url.substr(0, url.lastIndexOf("&") ) + "&nocache=" + (new Date).getTime();
                     document.__parentWidget.getIframe().setSource(url); // FIXME -> into .onUploadCompleted
                     document.__parentWidget.onUploadCompleted(fileList);
                     fileList = [];
                   }
                 },2000);
               }
            });
        }
        window.onload = function(){
         createUploader();
        };
    </script>             
    <?php else: ?>
    <script>
       //window.onload = function(){};
    </script>
      <h3>Anhänge</h3>
    <?php endif; ?>
    <ul>
      <?php 
        $prefix  = $category . "_" . $itemId;
        $count = 0;
        foreach( glob( "../server/uploads/$prefix*") as $file )
        {
          $count++;
          $filename  = implode("_", array_slice( explode("_", basename( $file ) ), 3 ) );
          $basename  = basename( $file );
          $deleteUrl = "../html/valums/client/index.php" . 
            "?category=$category" .
					 	"&itemId=$itemId" .
          	"&sessionId=$sessionId" .
            "&editable=$editable" .
            "&delete=$basename";
          $deleteJs  =  
            "if(confirm('Wollen Sie wirklich die Datei \'$filename\' löschen?')){".
               "document.__parentWidget.getIframe().setSource('$deleteUrl');};" .
             "return false;";
          $url = sprintf(
            "../../../services/server.php?service=logbuch.file&method=download&params=%s,%s&sessionId=%s",
             $filename, $basename,$sessionId
          );       
          echo 
          	"<li>" .
          		"<a target='_blank' href='$url'><b>$filename</b></a>&nbsp;" .
              ( $editable ? "[<a href='#' onclick=\"$deleteJs\">&nbsp;X&nbsp;</a>]" : "" ) . 
          	"</li>";
        }
      ?>  
    </ul>
    <!--<p>[ <a href="#" onclick='var url = document.__parentWidget.getIframe().getSource();url = url.substr(0, url.lastIndexOf("&") ) + "&nocache=" + (new Date).getTime();document.__parentWidget.getIframe().setSource(url);return false;' >Neu laden</a> ]</p>-->
    <script>
      window.setTimeout(function(){
        document.__parentWidget.setLength(<?php echo $count; ?>);
      },500);
    </script>
</body>
</html>