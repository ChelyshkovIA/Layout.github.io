<?php 
	require_once('login.php');
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$cinema =  $_GET['cinema'];

	$query = "SELECT Films.* FROM Films 
			  INNER JOIN Sessions ON Films.idFilms = Sessions.idFilm
			  INNER JOIN Cinemas ON Sessions.idCinema = Cinemas.idCinema
			  WHERE Cinemas.Title = '$cinema' GROUP BY Films.Title";

	
	$result = $connection_to_db->query($query);

	$list = $result->fetch_all(MYSQLI_ASSOC);
	
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	echo $json;		  
 ?>