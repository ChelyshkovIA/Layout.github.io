<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$idUser = $_COOKIE['user'];
	$hashUser = $_COOKIE['hash'];

	$query = "SELECT Users.Cash AS Cash, Users.Name as Name, Users.Surname AS Surname FROM Users WHERE idUsers = '$idUser' AND Hash = '$hashUser'";

	$result = $connection_to_db->query($query);

	$cash = mysqli_fetch_array($result, MYSQLI_ASSOC);

	$json = json_encode($cash, JSON_UNESCAPED_UNICODE);

	echo $json;
 ?>