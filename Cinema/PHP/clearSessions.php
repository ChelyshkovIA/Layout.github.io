<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$query;
	if($_COOKIE['admin'] == ''){
		header('Location: index.php');
	}else if(isset($_COOKIE['admin'])) {
		$idAdmin = $_COOKIE['admin'];
		$query = "SELECT Admines.Hash FROM Admines WHERE Admines.idAdmines = '$idAdmin'";
	}

	$result = $connection_to_db->query($query);
	$hash = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$hash = $hash['Hash'];
	if($hash != $_COOKIE['hash'])
		header('Location: index.php');

	$clearQuery = "DELETE FROM Sessions WHERE `date` < now()";

	$connection_to_db->query($clearQuery);

	$sessions_query = "SELECT Sessions.idSessions, Sessions.Date, Sessions.Start, Sessions.End, Sessions.Cost, Sessions.VideoFormat, Sessions.AudioFormat, Films.idFilms as idFilms, Films.Title as Film, Films.Genre as Genre, Halls.HallsNumber, Cinemas.Title as Cinema FROM Sessions
					   INNER JOIN Films 
					   ON Sessions.idFilm = Films.idFilms
					   INNER JOIN Halls
					   ON Sessions.idHall = Halls.idHall
					   INNER JOIN Cinemas
					   ON Cinemas.idCinema = Sessions.idCinema";
	$result = $connection_to_db->query($sessions_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/sessions.json","w");
	fwrite($json_file, $json);
	fclose($json_file);

	$films_query = "SELECT * FROM Films";
	$result = $connection_to_db->query($films_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/films.json","w");
	fwrite($json_file, $json);
	fclose($json_file);
 ?>