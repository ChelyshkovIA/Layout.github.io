<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	if($_POST['editRadio']  == 'update'){
		$idFilms     = $_POST['idFilms'];
		$title       = $_POST['title'];
		$country     = $_POST['country'];
		$genre       = $_POST['genre'];
		$limitation  = $_POST['limitation'];
		$description = $_POST['description'];
		$trailerLink = $_POST['trailerLink'];
		
		$query = "UPDATE Films SET Title = '$title',
								   Country = '$country',
								   Genre = '$genre', 
								   Limitation = '$limitation', 
								   Description = '$description', 
								   TrailerLink = '$trailerLink' 
								   WHERE idFilms = '$idFilms'";	

		$connection_to_db->query($query);
	}
	else if($_POST['editRadio'] == 'delete'){
		$idFilms = $_POST['idFilms'];
		$deleteFileQuery = "SELECT PosterLink FROM Films WHERE idFilms = '$idFilms'";
		$result = $connection_to_db->query($deleteFileQuery);
		$address_str = $result->fetch_array(MYSQLI_ASSOC);
		$deleteImgName = $address_str['PosterLink'];
		
		
		unlink('../../' . $deleteImgName);

		$query = "DELETE FROM Films Where idFilms = '$idFilms'";
		$connection_to_db->query($query);
	}

	$films_query = "SELECT * FROM Films";
	$result = $connection_to_db->query($films_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/films.json","w");
	fwrite($json_file, $json);
	fclose($json_file);

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

	header("Location: ../admin.php");
?>