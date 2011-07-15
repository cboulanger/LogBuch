<?php
/**
 * Swiff.Uploader Example Backend
 *
 * This file represents a simple logging, validation and output.
 *
 * @license		MIT License
 *
 * @author		Harald Kirschner <mail [at] digitarald [dot] de>
 * @copyright	Authors
 *
 */

error_reporting( E_ALL );
ini_set("display_errors",false);
ini_set("html_errors", false);
ini_set("log_errors", true);
ini_set("error_log", "./script.log" );

define( 'QCL_UPLOAD_PATH', "../../../services/attachments" );



// Validation
$error = false;

if (!isset($_FILES['Filedata']) || !is_uploaded_file($_FILES['Filedata']['tmp_name'])) {
	$error = 'Invalid Upload';
}

if ( ! is_writable( QCL_UPLOAD_PATH ) )
{
  $error = "Upload directory is not writable.";
}

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

  // move file to final destination
	$imgPath = QCL_UPLOAD_PATH . "/$newName";
	move_uploaded_file($tmpName, $imgPath);
	chmod( $imgPath, 0666 );
}

/*
 * output
 */
header('Content-type: application/json');
echo json_encode($return);
exit;
?>