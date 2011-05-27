<?php 
$response =  array();

for ( $c=1, $i=1; $i<20; $i++)
{
  $response[] = array(  
    'author' => "Nutzer $i",
    'selected'	=> false,
    'company'		=> "Firma $c",
    'online'		=> rand(0,1)
  );
  if( $i % 5 == 0 ) $c++;
}

echo json_encode( array( 'items' => $response ) );
?>





