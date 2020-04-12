<?php 
	require_once('login.php');
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$cinema       = $_POST['cinema'];
	$hall         = $_POST['hall'];
	$date         = $_POST['date'];
	$start        = $_POST['start'];
	$end          = $_POST['end'];
	$film         = $_POST['film'];
	$cost         = $_POST['cost'];
	$video_format = $_POST['videoFormat'];
	$audio_format = $_POST['audioFormat'];

	$get_film_query = "SELECT idFilms FROM Films WHERE Title = '$film'";
	$result = $connection_to_db->query($get_film_query);
	$idFilm = mysqli_fetch_array($result, MYSQLI_ASSOC);
	if (count($idFilm) > 1) {
		die('<h2>фильмов с таким названием больше одного, а значит ты не можешь добавить сеанс, тк разработчик рукожоп. есть выход - отредактируй нужный тебе фильм (название)</h2>');
	}else if(count($idFilm) == 0) {
		die('<h2>чет нет таких фильмов (' . $film . ') - пиши внимательнее</h2>');
	}else if(count($idFilm) == 1) {
		$idFilm = $idFilm['idFilms'];
	}

	$find_hall_query = "SELECT Halls.idHall FROM Cinemas
						INNER JOIN CinemasHalls
						ON Cinemas.idCinema = CinemasHalls.idCinema
						INNER JOIN Halls
						ON CinemasHalls.idHall = Halls.idHall
						WHERE Halls.HallsNumber = '$hall' AND Cinemas.Title = '$cinema'";					

	$result = $connection_to_db->query($find_hall_query);

	$isHall = mysqli_fetch_array($result, MYSQLI_ASSOC);
	if($isHall['idHall'] == null) {
		die ('no halls like ' . $hall . ' in cinema like ' . $cinema);
	}						

	$query = "INSERT INTO Sessions (idHall, Date, Start, End, Cost, VideoFormat, AudioFormat, idFilm, idCinema) 
	VALUES (
		(SELECT Halls.idHall AS idHall FROM Halls WHERE Halls.HallsNumber = '$hall'), 
		'$date', '$start', '$end', '$cost', '$video_format', '$audio_format', '$idFilm', 
		(SELECT Cinemas.idCinema as idCinema FROM Cinemas WHERE Cinemas.Title = '$cinema')); ";

	$connection_to_db->query($query);
	
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