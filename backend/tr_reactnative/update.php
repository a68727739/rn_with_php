<?php
  include 'connections.php';
  $json=file_get_contents('php://input');
  $obj=json_decode($json,true);
  $id=$obj['id'];
  $name=$obj['name'];
  $email=$obj['email'];
  $phone_number=$obj['phone_number'];
  $sql_update="UPDATE users SET name='$name',email='$email',phone_number='$phone_number' WHERE id='$id'";
if(mysqli_query($link,$sql_update)){
    echo json_encode('Update successfully');
  }else{
    echo json_encode('Update failed!!');
  }
  mysqli_close($link);
