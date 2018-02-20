<?php
include 'connections.php';
$json=file_get_contents('php://input');
$obj=json_decode($json,true);
$id=$obj['id'];
if(mysqli_query($link,"DELETE FROM users WHERE id='$id'")){
  echo json_encode('Delete successfully');
}else{
  echo json_encode('Delete failed');
}
mysqli_close($link);
