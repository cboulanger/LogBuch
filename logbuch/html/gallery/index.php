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
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <script type="text/javascript" src="scripts/jquery-1.3.2.min.js"></script>
  
  <!--for the gallery-->
  <link rel="stylesheet" type="text/css" href="css/jquery.ad-gallery.css">
  <script type="text/javascript" src="scripts/jquery.ad-gallery.js?rand=995"></script>
  
  <!--for the uploadify-->
  <link href="css/default.css" rel="stylesheet" type="text/css" />
  <link href="css/uploadify.css" rel="stylesheet" type="text/css" />
  <script type="text/javascript" src="scripts/swfobject.js"></script>
	<script type="text/javascript" src="scripts/jquery.uploadify.v2.1.0.min.js"></script>
  
  <?php 
    
    /*
     * GET params
     */
    $category   = getParam('category');
    $itemId     = getParam('itemId');
    $deleteFile = str_replace( "..", "", getParam('delete') );
    
    $prefix  = $category . "_" . $itemId;
    
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
    
    $listUrl   = "scripts/ajax.php?" . 
    								"prefix=$prefix" .
                    "&sessionId=$sessionId";          
  ?>  
  
  <script type="text/javascript">
  $(function() {
	var galleries,effect = null;
	start();
	function start(){
		var url = '<?php echo $listUrl; ?>'
		
		$(".ad-thumb-list").load(url,{},function (responseText, textStatus, XMLHttpRequest) {
					//ad-gallery: 
					/*
					$('img.image1').data('ad-desc', 'Whoa! This description is set through elm.data("ad-desc") instead of using the longdesc attribute.<br>And it contains <strong>H</strong>ow <strong>T</strong>o <strong>M</strong>eet <strong>L</strong>adies... <em>What?</em> That aint what HTML stands for? Man...');
					$('img.image1').data('ad-title', 'Title through $.data');
					$('img.image4').data('ad-desc', 'This image is wider than the wrapper, so it has been scaled down');
					$('img.image5').data('ad-desc', 'This image is higher than the wrapper, so it has been scaled down');
					*/
					galleries = $('.ad-gallery').adGallery();
					(effect!=null)?galleries[0].settings.effect = effect:"";
					
					$('#switch-effect').change(
					  function() {
						effect = $(this).val();
						galleries[0].settings.effect = $(this).val();
						return false;
					  }
					);
					$('#toggle-slideshow').click(
					  function() {
						galleries[0].slideshow.toggle();
						return false;
					  }
					);
					$('#last-uploaded').click(
					  function() {
						galleries[0].lastImage();
						return false;
					  }
					);
		}
		);
	}
	<?php 
	
    $uploadUrl = "scripts/uploadify.php?" . 
                    "prefix=$prefix" .
                    "&sessionId=$sessionId";	
	
	?>
		
	//uploadify:
	$("#uploadify").uploadify({
		'uploader'       : 'scripts/uploadify.swf',
		'script'         : '<?php echo $uploadUrl;?>',
		'cancelImg'      : 'cancel.png',
		'folder'         : 'images',
		'queueID'        : 'fileQueue',
		'auto'           : true,
		'multi'          : true,
		'queueSizeLimit' : 99,
		'fileDesc'		 	 : 'jpg, gif',
		'fileExt'		 		 : '*.jpg;*.gif;*.png',
		'sizeLimit'      : '1512000',//max size bytes - 500kb
		'checkScript'    : 'scripts/check.php', //if we take this out, it will never replace files, otherwise asks if we want to replace
		'onComplete'     : function (evt, queueid, obj, response, data){
											  //console.log(response);
											  //response = jQuery.parseJSON(response);
											  //console.log(reponse);
											},
		'onAllComplete'  : function(evt, queueid, obj, response, data) {
											  //console.log(response);
											  //response = jQuery.parseJSON(response);
											  //console.log(reponse);												
												$('#switch-effect').unbind('change');
												$('#toggle-slideshow').unbind('click');
												galleries[0].slideshow.stop();
												start();
											}
	});
  
  });    
  </script>

  <style type="text/css">
  * {
    font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Verdana, Arial, sans-serif;
    color: #333;
    line-height: 140%;
  }
  select, input, textarea {
    font-size: 1em;
  }
  body {
    font-size: 70%;
    width: 1100px;
  }
  h2 {
    margin-top: 1.2em;
    margin-bottom: 0;
    padding: 0;
    border-bottom: 1px dotted #dedede;
  }
  h3 {
    margin-top: 1.2em;
    margin-bottom: 0;
    padding: 0;
  }
  .example {
    border: 1px solid #CCC;
    background: #f2f2f2;
    padding: 10px;
  }
  ul {
    list-style-image:url(list-style.gif);
  }
  pre {
    font-family: "Lucida Console", "Courier New", Verdana;
    border: 1px solid #CCC;
    background: #f2f2f2;
    padding: 10px;
  }
  code {
    font-family: "Lucida Console", "Courier New", Verdana;
    margin: 0;
    padding: 0;
  }

  #gallery {
    padding: 30px;
    background: #e1eef5;
  }
  /*
  .ad-gallery {
	  width: 790px;
	}
  .ad-gallery .ad-image-wrapper {
	  height: 390px;
  }
  */
  </style>
  <title>LogBuch Bilder</title>
</head>
<body>
  <div id="container" style="float:left;">
    
    <div id="gallery" class="ad-gallery">
      <div class="ad-image-wrapper">
      </div>
      <div class="ad-controls">
      </div>
      <div class="ad-nav">
        <div class="ad-thumbs">
          <ul class="ad-thumb-list">
            
          </ul>
        </div>
      </div>

    </div>
    Effect: <select id="switch-effect">
      <option value="slide-hori">Slide horizontal</option>
      <option value="slide-vert">Slide vertical</option>
      <option value="resize">Shrink/grow</option>
      <option value="fade">Fade</option>
      <option value="">None</option>
    </select> |
    <a href="#" id="toggle-slideshow" style="outline:none;">Toggle slideshow</a> | 
	<a href="#"id="last-uploaded" style="outline:none;">Neueste Bilder</a>
    </p>
  </div>
  
  <!--uploadify-->
  <div style="float:left;">
	  <div id="fileQueue"></div>
	  <div style="max-width:350px; padding:10px;">
	     <div style="vertical-align:middle">
        <input type="file" name="uploadify" id="uploadify" />&nbsp;&nbsp;    
        <a href="javascript:jQuery('#uploadify').uploadifyClearQueue()">Abbrechen</a>
      </div>
	    <h4>LogBuch Bildergalerie</h4> 
	    <p>
	     In diesem Fenster werden die Bilder angezeigt, die mit dem gerade im LogBuch geöffneten 
	     Datensatz verknüpft sind. Für jeden Datensatz werden die Bilder separat gespeichert.</p>
  	  <p>
  	   Sie können Bilder von Ihrem Computer hochladen, indem Sie auf "BROWSE" klicken und dann die Bilder auswählen. 
  	   Der Hochladevorgang kann mit "Abbrechen" beendet werden. Zur Zeit können Bilder nicht gelöscht
  	   werden. 
  	  </p>
  	  <p>
  	    <b>Die maximale Bildgröße beträgt zur Zeit 1,5MB</b>.
  	  </p>
  	  <p>Um zum LogBuch zurückzukehren, schließen Sie bitte dieses Fenster.</p>
	  </div>
  </div>
</body>
</html>