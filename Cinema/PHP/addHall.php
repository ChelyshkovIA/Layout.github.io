<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$title = $_POST['title']; 
	$city = $_POST['city'];  
	$hallsNumber = $_POST['hallsNumber'];
	$rowsNumber = $_POST['rowsNumber'];
	$seatsNumber = $_POST['seatsNumber'];

	$get_cinemaID_query = "SELECT idCinema FROM Cinemas WHERE Title = '$title' AND City = '$city'";

	$result = $connection_to_db->query($get_cinemaID_query);

	$idCinema = mysqli_fetch_array($result, MYSQLI_ASSOC);
	
	if(count($idCinema) > 1){
		die('Больше одного кинотеатра по вашему запросу!');
	}else if(count($idCinema) == 0) {
		die('<h2>Ни одного кинотеатра не найдено :c </h2>');
	}

	$idCinema = $idCinema['idCinema']; 

	

	$get_hallID_query = "SELECT idHall FROM Halls WHERE HallsNumber = '$hallsNumber'";
	$result = $connection_to_db->query($get_hallID_query);
	$idHall = mysqli_fetch_array($result, MYSQLI_ASSOC);
	
	if(count($idHall) == 0) {
		$insert_hall_query = "INSERT INTO Halls (SeatsInRow, RowsNumber, HallsNumber) VALUES ('$seatsNumber', '$rowsNumber', '$hallsNumber')";

		$connection_to_db->query($insert_hall_query);
		
		$result = $connection_to_db->query($get_hallID_query);
		$idHall = mysqli_fetch_array($result, MYSQLI_ASSOC);
	}
	$idHall = $idHall['idHall'];


	$set_CinemaHallID_query = "INSERT INTO cinemashalls (idCinema, idHall) VALUES ('$idCinema', '$idHall') ";

	$connection_to_db->query($set_CinemaHallID_query);

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