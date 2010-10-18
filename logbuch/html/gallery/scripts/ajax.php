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
	
$prefix = $_GET['prefix'];
$filesoriginal = array();
$filesthumbs = array();

foreach( glob( "../images/thumbs/$prefix*.{jpg,gif,png}", GLOB_BRACE) as $file )
{
  $fname = basename( $file );
  ?>
  <li>
    <a href='images/<?php echo $fname; ?>'>
      <img title='' longdesc='' src='images/thumbs/<?php echo $fname; ?>' class='image'>
  	</a>
  </li>
  <?php
}
?>