<?php
/**
 * Swiff.Uploader Example Backend
 *
 * This file represents a simple logging, validation and output.
 *  *
 * WARNING: If you really copy these lines in your backend without
 * any modification, there is something seriously wrong! Drop me a line
 * and I can give you a good rate for fancy and customised installation.
 *
 * No showcase represents 100% an actual real world file handling,
 * you need to move and process the file in your own code!
 * Just like you would do it with other uploaded files, nothing
 * special.
 *
 * @license		MIT License
 *
 * @author		Harald Kirschner <mail [at] digitarald [dot] de>
 * @copyright	Authors
 *
 */

error_reporting( E_ALL );
ini_set("display_errors",false);
ini_set("log_errors", true);
ini_set("html_errors", false);
ini_set("error_log", realpath("./script.log") );

/**
 * Only needed if you have a logged in user, see option appendCookieData,
 * which adds session id and other available cookies to the sent data.
 *
 * session_id($_POST['SID']); // whatever your session name is, adapt that!
 * session_start();
 */

// Request log

/**
 * You don't need to log, this is just for the showcase. Better remove
 * those lines for production since the log contains detailed file
 * information.
 */

//$result = array();
//
//$result['time'] = date('r');
//$result['addr'] = substr_replace(gethostbyaddr($_SERVER['REMOTE_ADDR']), '******', 0, 6);
//$result['agent'] = $_SERVER['HTTP_USER_AGENT'];
//
//if (count($_GET)) {
//	$result['get'] = $_GET;
//}
//if (count($_POST)) {
//	$result['post'] = $_POST;
//}
//if (count($_FILES)) {
//	$result['files'] = $_FILES;
//}
//
//// we kill an old file to keep the size small
//if (file_exists('script.log') && filesize('script.log') > 102400) {
//	unlink('script.log');
//}
//
//$log = @fopen('script.log', 'a');
//if ($log) {
//	fputs($log, print_r($result, true) . "\n---\n");
//	fclose($log);
//}


// Validation

$error = false;

if (!isset($_FILES['Filedata']) || !is_uploaded_file($_FILES['Filedata']['tmp_name'])) {
	$error = 'Invalid Upload';
}

/**
 * You would add more validation, checking image type or user rights.
 */

if (!$error && $_FILES['Filedata']['size'] > 2 * 1024 * 1024)
{
	$error = 'Please upload only files smaller than 2Mb!';
}

$size = getimagesize($_FILES['Filedata']['tmp_name']);

if (!$error && ! $size  )
{
	$error = 'Please upload only images, no other files are supported.';
}

if (!$error && !in_array($size[2], array(1, 2, 3, 7, 8) ) )
{
	$error = 'Please upload only images of type JPEG, GIF or PNG.';
}

if (!$error && ($size[0] < 25) || ($size[1] < 25))
{
	$error = 'Please upload an image bigger than 25px.';
}

if ($error) {

	$return = array(
		'status' => '0',
		'error' => $error
	);

} else {
	
	$origName  = $_FILES['Filedata']['name'];
	$tmpName 	 = $_FILES['Filedata']['tmp_name'];
	$extension = substr( $origName, strrpos($origName, ".") ); 
	
	// we assign a completely random name for more security
	$newName = md5( uniqid(mt_rand(), true) ) . $extension;
	
	$return = array(
		'status' => '1',
		'name' 	 =>  $newName 
	);

	// ... and if available, we get image data
	$info = getimagesize( $tmpName );
	$return['width'] 	= $info[0];
	$return['height'] = $info[1];
	$return['mime'] 	= $info['mime'];
		
	/*
	 * processing
	 */
	$imgPath = "../uploads/$newName";
	move_uploaded_file($tmpName, $imgPath);
	
//	/*
//	 * create thumbnails in the needed sizes
//	 */
//	$path16 = "../uploads/16/$newName";
//	createthumb( $imgPath, $path16, 16, 16);	
//	
//	$path64 = "../uploads/64/$newName";
//	createthumb( $imgPath, $path64, 64, 64);
//	
	$path80 = "../uploads/80/$newName";
	createthumb( $imgPath, $path80, 80, 80);
	
}

/*
 * output
 */
header('Content-type: application/json');
echo json_encode($return);
exit;

/*
	Function createthumb($name,$filename,$new_w,$new_h)
	creates a resized image
	variables:
	$name		Original filename
	$filename	Filename of the resized image
	$new_w		width of resized image
	$new_h		height of resized image
*/	
function createthumb($name,$filename,$new_w,$new_h)
{
	
	$extension = substr( $name, strrpos($name, ".")+1 ); 
	switch( $extension )
	{
		case "jpg":
		case "jpeg":
			$src_img = imagecreatefromjpeg( $name );
			break;
		
		case "png":
			$src_img = imagecreatefrompng( $name );
			break;
			
		default:
			trigger_error("Invalid format: $extension" );
			exit;
	}
	
	if ( ! $src_img )
	{
		return;
	}
	
	$old_x=imageSX($src_img);
	$old_y=imageSY($src_img);
	if ($old_x > $old_y) 
	{
		$thumb_w=$new_w;
		$thumb_h=$old_y*($new_h/$old_x);
	}
	if ($old_x < $old_y) 
	{
		$thumb_w=$old_x*($new_w/$old_y);
		$thumb_h=$new_h;
	}
	if ($old_x == $old_y) 
	{
		$thumb_w=$new_w;
		$thumb_h=$new_h;
	}
	$dst_img=ImageCreateTrueColor($thumb_w,$thumb_h);
	imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
	
	if ( $extension == "png" )
	{
		imagepng($dst_img,$filename); 
	} 
	else 
	{
		imagejpeg($dst_img,$filename); 
	}
	
	imagedestroy($dst_img); 
	imagedestroy($src_img); 
}

?>