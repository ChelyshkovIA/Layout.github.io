<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);


	$id          = $_POST['idSession'];
	$film        = $_POST['film'];
	$cinema      = $_POST['cinema'];
	$date        = $_POST['date'];
	$start       = $_POST['start'];
	$end         = $_POST['end'];
	$cost        = $_POST['cost'];
	$videoFormat = $_POST['videoFormat'];
	$audioFormat = $_POST['audioFormat'];
	$hallsNumber = $_POST['hallsNumber'];

	$query;
	if($_POST['editRadio']  == 'update') {
		$query = "UPDATE Sessions SET 
				  Date = '$date', 
				  Start = '$start', 
				  End = '$end', 
				  Cost = $cost, 
				  VideoFormat = '$videoFormat', 
				  AudioFormat = '$audioFormat',
				  idFilm = (SELECT idFilms FROM Films WHERE Title = '$film'),
				  idHall = (SELECT idHall FROM Halls WHERE HallsNumber = '$hallsNumber'),
				  idCinema = (SELECT idCinema FROM Cinemas WHERE Title = '$cinema')
				  WHERE idSessions = '$id'";
	
	}else if($_POST['editRadio'] == 'delete') {
		$query = "DELETE FROM Sessions WHERE idSessions = '$id'";
	}

	$connection_to_db->query($query);

	$session_query = "SELECT Sessions.idSessions, Sessions.Date, Sessions.Start, Sessions.End, Sessions.Cost, Sessions.VideoFormat, Sessions.AudioFormat, Films.idFilms as idFilms, Films.Title as Film, Films.Genre as Genre, Halls.HallsNumber, Cinemas.Title as Cinema FROM Sessions
					   INNER JOIN Films 
					   ON Sessions.idFilm = Films.idFilms
					   INNER JOIN Halls
					   ON Sessions.idHall = Halls.idHall
					   INNER JOIN Cinemas
					   ON Cinemas.idCinema = Sessions.idCinema";

	$result = $connection_to_db->query($session_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

	
	
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);


	$json_file = fopen("../json/sessions.json","w");
	fwrite($json_file, $json);
	fclose($json_file);

	header("Location: ../admin.php");
 ?>