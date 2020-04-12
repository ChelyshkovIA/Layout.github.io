<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);
	
	if($_COOKIE['user'] == ''){
		die('err4');//autorisation error
	}

	$idUser = $_COOKIE['user'];
	$query = "SELECT Users.Hash AS Hash FROM Users WHERE Users.idUser = '$idUser'";

	$result = $connection_to_db->query($query);
	$hash = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$hash = $hash['Hash'];
	if($hash != $_COOKIE['hash'])
		die('err4');


	$id =  $_COOKIE['user'];

	$query = "SELECT * FROM Routes WHERE idUser = '$id'";


	$result = $connection_to_db->query($query);

	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$query = "SELECT Users.Name AS Name FROM Users WHERE Users.idUser = '$id'";
	$result = $connection_to_db->query($query);
	$name = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$name = $name['Name'];

	echo ('[{"json":' . $json . '},{"name":"' . $name . '"}]');

	
 ?>