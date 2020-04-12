<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$title = $_POST['title'];
	$city = $_POST['city'];
	$address = $_POST['address'];
	$amount = $_POST['amount'];

	$query = "INSERT INTO Cinemas (Title, City, Address, HallsNumber) VALUES ('$title', '$city', '$address', '$amount')";

	$connection_to_db->query($query);

	$cinemas_query = "SELECT * FROM Cinemas";
	$result = $connection_to_db->query($cinemas_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/cinemas.json","w");
	fwrite($json_file, $json);
	fclose($json_file);

	header("Location: ../admin.php");
 ?>