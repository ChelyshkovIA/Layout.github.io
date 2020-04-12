<?php 	
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$idSessions = $_GET['idSessions'];

	$query = "SELECT Films.idFilms AS idFilm,
					 Films.Title AS Film, 
					 Films.Country AS Country,
					 Films.PosterLink as Poster,
					 Cinemas.idCinema as idCinema,
					 Cinemas.Title AS Cinema,
					 Sessions.idSessions AS idSessions,
					 Sessions.Date AS Date,
					 Sessions.Start AS Start,
					 Sessions.End AS End,
					 Sessions.Cost AS Cost,
					 Sessions.AudioFormat AS AF,
					 Sessions.VideoFormat AS VF,  
					 Halls.idHall AS idHall,
					 Halls.SeatsInRow AS SeatsNumber,
					 Halls.RowsNumber AS RowsNumber     
		      FROM Sessions
			  INNER JOIN Films
			  ON Sessions.idFilm = Films.idFilms
			  INNER JOIN Cinemas 
			  ON Cinemas.idCinema = Sessions.idCinema
			  INNER JOIN Halls
			  ON Halls.idHall = Sessions.idHall
			  WHERE Sessions.idSessions = '$idSessions'";

	$result = $connection_to_db->query($query);		  
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

	$json = json_encode($list, JSON_UNESCAPED_UNICODE);
	echo $json;
 ?>