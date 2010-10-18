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
                      "&sessionId=$sessionId";      
    ?>
    <script>        
        function createUploader(){            
            var uploader = new qq.FileUploader({
                element: document.getElementById('file-uploader-demo1'),
                action: '<?php echo $serverUrl; ?>',
                debug: true,
                template: '<div class="qq-uploader">' + 
                  '<div class="qq-upload-drop-area"><span>Dateien hier ablegen</span></div>' +
                  '<div class="qq-upload-button">Hier klicken, um Datei hochzuladen oder per Drag & Drop Datei hier ablegen. Um eine Datei zu löschen, klicken Sie auf das [&nbsp;X&nbsp;]</div>' +
                  '<ul class="qq-upload-list"></ul>' + 
               '</div>',
               onComplete : function(){ document.location.reload(); } 
            });
        }
        window.onload = createUploader;     
    </script>
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
                        "&delete=$basename";
          $deleteJs  =  "var loc=window.location,v=confirm(". 
                          "'Wollen Sie wirklich die Datei \'$filename\' löschen?');".
                           "if(v)loc.href='$deleteUrl';" .
                         "return false;";
          echo 
          	"<li>" .
          		"<a target='_blank' href='$file'><b>$filename</b></a>&nbsp;" .
              "[<a href='#' onclick=\"$deleteJs\">&nbsp;X&nbsp;</a>]" . 
          	"</li>";
        }
      ?>  
    </ul>
</body>
</html>