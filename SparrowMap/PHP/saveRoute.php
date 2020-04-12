<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	if($_COOKIE['user'] == ''){
		die('err4');//autorisation error
	}

	
	$idUser = $_COOKIE['user'];
	$query = "SELECT Users.Hash AS Hash FROM Users WHERE Users.idUser = '$idUser'";;

	$result = $connection_to_db->query($query);
	$hash = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$hash = $hash['Hash'];
	if($hash != $_COOKIE['hash'])
		die('err4');

	$id = $_COOKIE['user'];
	$track = $_POST['Track'];
	$title = $_POST['Title'];
	$description = $_POST['Description'];

	$query = "INSERT INTO Routes (idUser, Track, Title, Description, Type) VALUES ('$id', '$track', '$title', '$description', 'auto')";

	if($connection_to_db->query($query)) {
		die('ok');
	}else {
		die('insert err');
	}

 ?>