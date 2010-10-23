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
	<div id="file-uploader-demo1">		
		<noscript>			
			<p>Please enable JavaScript to use file uploader.</p>
			<!-- or put a simple form for upload here -->
		</noscript>         
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
            var uploader = new qq.FileUploader({
                element: document.getElementById('file-uploader-demo1'),
                action: '<?php echo $serverUrl; ?>',
                debug: false,
                template: 
                  '<div class="qq-uploader">' + 
                  '<div class="qq-upload-drop-area"><span>Dateien hier ablegen</span></div>' +
                  '<div class="qq-upload-button">Hier klicken, um Datei hochzuladen oder per Drag & Drop Datei hier ablegen.' +
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
                 __isUploading = false;
                 setTimeout(function(){
                   if ( ! __isUploading )
                   {
                     this.document.location.reload();
                   }
                 },2000);
               }
            });
        }
        window.onload = createUploader;     
    </script>
    <?php else: ?>
      <h3>Anhänge</h3>
    <?php endif; ?>
    <ul>
      <?php 
        $prefix  = $category . "_" . $itemId;
        foreach( glob( "../server/uploads/$prefix*") as $file )
        {
          $filename  = implode("_", array_slice( explode("_", basename( $file ) ), 3 ) );
          $basename  = basename( $file );
          $deleteUrl = "?category=$category" .
          						 	"&itemId=$itemId" .
                      	"&sessionId=$sessionId" .
                        "&editable=$editable" .
                        "&delete=$basename";
          $deleteJs  =  "var loc=window.location,v=confirm(". 
                          "'Wollen Sie wirklich die Datei \'$filename\' löschen?');".
                           "if(v)loc.href='$deleteUrl';" .
                         "return false;";
          echo 
          	"<li>" .
          		"<a target='_blank' href='$file'><b>$filename</b></a>&nbsp;" .
              ( $editable ? "[<a href='#' onclick=\"$deleteJs\">&nbsp;X&nbsp;</a>]" : "" ) . 
          	"</li>";
        }
        
      ?>  
    </ul>
</body>
</html>