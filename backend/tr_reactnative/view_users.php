<?php
include 'connections.php';

$result=mysqli_query($link,"SELECT * FROM users");
if(mysqli_num_rows($result)){
  while($row[]=mysqli_fetch_assoc($result)){
    $json=json_encode($row);
  }
}else{
	$data_array=array(
		array(
		"id"=>"0",
		"name"=>"no users",
		"email"=>"",
		"phone_number"=>""
		)
	);
	$json=json_encode($data_array);
 	//echo "result not find";
}

echo $json;
mysqli_close($link);
