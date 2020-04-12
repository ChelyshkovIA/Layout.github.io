<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$idUser = $_COOKIE['user'];

	$query = "SELECT DISTINCT
			 Sessions.idSessions AS Session,	 
			 Films.Title AS Film,
			 Cinemas.Title AS `Cinema`,
			 Tickets.Row AS `Row`, 
			 Tickets.SeatsNumber AS `Seat`, 
			 Halls.HallsNumber AS `Hall`, 
			 Sessions.Date AS `Date`, 
			 Sessions.Start AS `Start`, 
			 Sessions.End AS `End`
			FROM Tickets
			INNER JOIN Sessions ON Tickets.idSession = Sessions.idSessions
			INNER JOIN Films ON Sessions.idFilm = Films.idFilms
			INNER JOIN Cinemas ON Sessions.idCinema = Cinemas.idCinema
			INNER JOIN Halls ON Sessions.idHall = Halls.idHall
			INNER JOIN Seats ON Sessions.idSessions = Seats.idSession
			WHERE Tickets.idUser = '$idUser'";

	$result = $connection_to_db->query($query);

	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);

	if(count($list) == 0) {
		die('[]');
	}
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	echo $json;		
 ?>