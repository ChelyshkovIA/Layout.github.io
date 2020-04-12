<?php 
	require_once('login.php');
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$idFilms = $_GET['idFilms'];

	$query = "SELECT Cinemas.City, Cinemas.Title, Sessions.Date, Sessions.Start, Sessions.End, Sessions.idSessions FROM Sessions
			  INNER JOIN Cinemas ON Sessions.idCinema = Cinemas.idCinema
			  INNER JOIN Films ON Films.idFilms = Sessions.idFilm
			  WHERE Films.idFilms = '$idFilms'";

	$result = $connection_to_db->query($query);
	
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);
	echo $json;
 ?>