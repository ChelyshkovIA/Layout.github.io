<?php 
	//error1 - транзакия не прошла
	//error2 - нет денег на счете
	//error3 - не получилось забронировать место
	//error4 - не получилось создать билет
	//ok     - транзакция прошла
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$idUser   = $_COOKIE['user'];
	$hashUser = $_COOKIE['hash']; 
	$seats   = $_GET['seats'];
	$session = $_GET['session'];
	$seatsNumber = $_GET['number'];

	$checkUserQuery = "SELECT idUsers FROM Users WHERE idUsers = '$idUser' AND Hash = '$hashUser'";
	$result = $connection_to_db->query($checkUserQuery);
	$user = mysqli_fetch_array($result, MYSQLI_ASSOC);
	if(!isset($user)) {
		die('чёт не получилось :(');
	}

	$begin    = "BEGIN";
	$commit   = "COMMIT";
	$rollback = "ROLLBACK";

	
	if(!($connection_to_db->query($begin))){
		die('error1');
	}

	$getUsersBalanse = "SELECT Users.Cash AS Cash FROM Users WHERE Users.idUsers = '$idUser' AND Users.Hash = '$hashUser'";
	$result = $connection_to_db->query($getUsersBalanse);
	$userBalanse = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$userBalanse = $userBalanse['Cash'];


	$getCash = "SELECT Sessions.Cost AS Cost FROM Sessions WHERE Sessions.idSessions = '$session'";
	$getCinema = "SELECT Sessions.idCinema AS idCinema FROM Sessions WHERE Sessions.idSessions = '$session'";

	$result = $connection_to_db->query($getCash);
	$cash = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$cash = $cash['Cost'];
	$cash = $cash * $seatsNumber;
	
	if($userBalanse < $cash) {
		$connection_to_db->query($rollback);
		die('error2');
	}
	

	$result = $connection_to_db->query($getCinema);
	$idCinema = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$idCinema = $idCinema['idCinema'];
	//


	$selectCashUser   = "SELECT Users.Cash AS Cash FROM Users WHERE Users.idUsers = '$idUser' AND Users.Hash = '$hashUser'";
	$selectCashCinema = "SELECT Cinemas.Cash AS Cash FROM Cinemas WHERE Cinemas.idCinema = '$idCinema'";
	
	$result = $connection_to_db->query($selectCashUser);
	$userBefore = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$userBefore = $userBefore['Cash'];

	$result = $connection_to_db->query($selectCashCinema);
	$cinemaBefore = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$cinemaBefore = $cinemaBefore['Cash'];

	$transferFrom     = "UPDATE Users SET Users.Cash = Users.Cash - '$cash' WHERE Users.idUsers = '$idUser' AND Users.Hash = '$hashUser'";
	$transferTo       = "UPDATE Cinemas SET Cinemas.Cash = Cinemas.Cash + '$cash' WHERE Cinemas.idCinema = '$idCinema'";
	
	$result = $connection_to_db->query($transferFrom);
	$result = $connection_to_db->query($transferTo);

	$result = $connection_to_db->query($selectCashUser);
	$userAfter = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$userAfter = $userAfter['Cash'];

	$result = $connection_to_db->query($selectCashCinema);
	$cinemaAfter = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$cinemaAfter = $cinemaAfter['Cash'];	

	$seats = explode(' ', $seats);

	for($i = 0; $i < count($seats); $i++) {
		
		$place = explode('-', $seats[$i]);

		$row = $place[0];
		$seat = $place[1];

		$query = "INSERT INTO Seats (`idHall`, `row`, `column`, `status`, `idSession`) VALUES
		(
			(SELECT Sessions.idHall AS idHall FROM Sessions WHERE idSessions = '$session'),
			'$row',
			'$seat',
			'fixed',
			'$session'     
		)";

		if(!($connection_to_db->query($query))) {
			$connection_to_db->query($rollback);
			die('error3');
		}

		$createTicketQuery = "INSERT INTO Tickets (`FilmTitle`, `idSession`, `Row`, `SeatsNumber`, `idUser`) VALUES 
							  (
									(SELECT Films.Title FROM Films INNER JOIN Sessions ON Films.idFilms = Sessions.idFilm WHERE Sessions.idSessions = '$session'),
									'$session',
									'$row',
									'$seat',
									'$idUser'     
							  )";
		if(!($connection_to_db->query($createTicketQuery))) {
			$connection_to_db->query($rollback);
			die('error4');	
		}					  
	}

	if(($cinemaAfter - $cinemaBefore) != $cash) {
		$connection_to_db->query($rollback);
		die('error1');
	}else if(($userBefore - $userAfter) != $cash) {
		$connection_to_db->query($rollback);
		die('error1');
	}else {
		$connection_to_db->query($commit);
		die('ok');
	}

 ?>