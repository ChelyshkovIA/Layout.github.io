<?php 
	require_once("php/login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);
	$query;
	if($_COOKIE['user'] == ''){
		header('Location: index.php');
	}else if(isset($_COOKIE['user'])) {
		$idUser = $_COOKIE['user'];
		$query = "SELECT Users.Hash FROM Users WHERE Users.idUsers = '$idUser'";
	}else if(isset($_COOKIE['admin'])) {
		$idAdmin = $_COOKIE['admin'];
		$query = "SELECT Admines.Hash FROM Admines WHERE Admines.idAdmines = '$idAdmin'";
	}

	$result = $connection_to_db->query($query);
	$hash = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$hash = $hash['Hash'];
	if($hash != $_COOKIE['hash'])
		header('Location: index.php');

?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>USER</title>
	<link rel="stylesheet" type="text/css" href="css/user.css">
	<link href="https://fonts.googleapis.com/css?family=Molle:400i&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="fontello-281a0e8d/css/fontello.css">
	<script src="js/user.js"></script>
</head>
<body style="background-color: #0c151a">
	<header class="header">
		<h1 class="header__title">Личный кабинет</h1>

		<div class="header__user-info">
			<span class="header__user-info-item header__user-info-item--user"> </span>
			<span class="header__user-info-item header__user-info-item--cash"> Текущий баланс: </span>
		</div>

		<div class="header__menu">
			<button class="header__menu-button" type="">
				<a class="header__menu-button-link" href="../index.php">На Главную</a>
			</button>

			<button class="header__menu-button header__menu-button--exit" type="">
				<a class="header__menu-button-link" href="php/userExit.php">Выйти</a>
			</button>

			<button class="header__menu-button" type="">
				<span class="header__menu-button-link header__menu-button-link--addCash">Пополнить баланс</span>
			</button>

			<form class="header__add-cash add-cash add-cash--hidden" action="">
				<label class="add-cash__label">
					<span>Введите сумму: </span>
					<input class="add-cash__input" type="number" name="addCash" value=""></label>
				<input class="add-cash__submit" type="submit" name="" value="Пополнить!">
			</form>

		</div>
		
	</header>	

	<main class="main">
		<div class="main__tickets-block">
			<h2 class="main__tickets-active">Список активных билетов</h2>
			<h6 class="main__about-tickets hidden">Активных билетов нет</h6>

			
		</div>
	</main>
</body>
</html>