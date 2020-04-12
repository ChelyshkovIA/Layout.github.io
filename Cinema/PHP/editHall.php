<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$id          = $_POST['idHall'];
	$cinema      = $_POST['cinema'];
	$city        = $_POST['city'];
	$hallsNumber = $_POST['hallsNumber'];
	$rowsNumber  = $_POST['rowsNumber'];
	$seatsInRow  = $_POST['seatsInRow'];

	
	$query;
	if($_POST['editRadio']  == 'update') {
		$query =  "UPDATE Halls SET SeatsInRow = '$seatsInRow', RowsNumber = '$rowsNumber', HallsNumber = '$hallsNumber'";
	}else if($_POST['editRadio'] == 'delete') {
		$query = "DELETE FROM CinemasHalls WHERE idHall = '$id' AND idCinema = (
			SELECT idCinema FROM Cinemas WHERE Cinemas.Title = '$cinema'
		)";
	}

	$connection_to_db->query($query);

	$halls_query = "SELECT Halls.*, Cinemas.City as City, Cinemas.Title as Cinema FROM Halls
					INNER JOIN cinemashalls
					ON Halls.idHall = cinemashalls.idHall
					INNER JOIN Cinemas
					ON cinemashalls.idCinema = Cinemas.idCinema";


	$result = $connection_to_db->query($halls_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/halls.json","w");
	fwrite($json_file, $json);
	fclose($json_file);


	header("Location: ../admin.php");
 ?>