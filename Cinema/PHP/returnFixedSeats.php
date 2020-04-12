<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$session =  $_GET['session'];

	$query = "SELECT * FROM Seats WHERE Seats.idSession = '$session'";
	$result = $connection_to_db->query($query);

	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	echo $json;
 ?>