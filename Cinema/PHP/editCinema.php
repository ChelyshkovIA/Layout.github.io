<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$id          = $_POST['idCinema'];	
	$title       = $_POST['title'];
	$city        = $_POST['city'];
	$address     = $_POST['address'];
	$hallsNumber = $_POST['hallsNumber'];

	$query;
	if($_POST['editRadio'] == 'update') {
		$query = "UPDATE Cinemas SET Title = '$title', City = '$city', Address = '$address', HallsNumber = '$hallsNumber' WHERE idCinema = '$id'";
	}else if($_POST['editRadio'] == 'delete') {
		$query = "DELETE FROM Cinemas WHERE idCinema = '$id'";
	}

	$connection_to_db->query($query);

	$cinema_query = "SELECT * FROM Cinemas";
	$result = $connection_to_db->query($cinema_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/cinemas.json","w");
	fwrite($json_file, $json);
	fclose($json_file);

	header("Location: ../admin.php");
 ?>