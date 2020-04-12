<?php 
	require_once("php/login.php");
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
?>
<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>ADMIN</title>
	<link rel="stylesheet" type="text/css" href="css/admin.css">
	<link href="https://fonts.googleapis.com/css?family=Molle:400i&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="fontello-281a0e8d/css/fontello.css">	
	<link rel="stylesheet" type="text/css" href="fontello-47fee67f/css/fontello.css">
	<script src="js/admin.js"></script>			
</head>
<body>
	<div class="bg" id="bg"></div>
	<header class="header">
		<h1 class="header__title">Админка</h1>

		<div class="header__user-info"></div>

		<div class="header__menu-buttons">
			<a class="menu-button" href="index.php">На главную</a>
			<a class="menu-button" href="php/adminExit.php">Выйти</a>
		</div>

		<div class="header__menu-buttons">
			<button class="menu-button menu-button--open-form" id="add-film">Добавить фильм</button>
			<button class="menu-button menu-button--open-form" id="found-film">Найти фильм</button>
		</div>

		<div class="header__menu-buttons">
			<button class="menu-button menu-button--open-form" id="add-session">Добавить сеанс</button>
			<button class="menu-button menu-button--open-form" id="found-session">Найти сеанс</button>
		</div>

		<div class="header__menu-buttons">
			<button class="menu-button menu-button--open-form" id="add-session">Добавить кинотеатр</button>
			<button class="menu-button menu-button--open-form" id="found-session">Найти кинотеатр</button>
		</div>

		<div class="header__menu-buttons">
			<button class="menu-button menu-button--open-form" id="add-session">Добавить зал</button>
			<button class="menu-button menu-button--open-form" id="found-session">Найти зал</button>
		</div>

		<br>
		<br>
		<br>

		<div class="header__menu-buttons">
			<button class="menu-button menu-button--clear">Почистить сеансы!</button>
		</div>
		
		<!-- ФИЛЬМЫ -->

		<form  class="admin-form" enctype="multipart/form-data" action="php/addFilm.php" id="admin-form" method="post">
			<label class="admin-form__label">
				Название: <input class="admin-form__input" type="text" name="title">
			</label>
			
			<label class="admin-form__label">
				Страна: <input class="admin-form__input" type="text" name="country">
			</label>
			
			<label class="admin-form__label">
				Жанр: <input class="admin-form__input" type="text" name="genre">
			</label>
			
			<label class="admin-form__label">
				Ограничение: <input class="admin-form__input" type="text" name="limitation">
			</label>
			
			<label class="admin-form__label">
				Описание: <input class="admin-form__input" type="text" name="description">
			</label>
			
			<label class="admin-form__label">
				Ссылка трейлера: <input class="admin-form__input" type="text" name="trailerLink">
			</label>
			
			<label class="admin-form__label">
				Постер: <input class="admin-form__input" type="file" name="posterImage">
			</label>

			<div>
				<input class="admin-form__submit" type="submit" name="" value="Добавить фильм">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>

		<form class="admin-form admin-form--find-film" id="find-film-form" method="POST">
			<label class="admin-form__label">
				Название фильма<input class="admin-form__input" type="text" name="Title" placeholder="Введите название фильма">
			</label>
			
			<div>
				<input class="admin-form__submit find-button admin-form__submit--find-film" type="button" name="" value="Найти фильм">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>
		
		<!-- СЕАНСЫ -->

		<form class="admin-form admin-form--add-session" id="add-session-form" method="POST" action="php/addSession.php">
			<label class="admin-form__label">
				Название кинотеатра<input class="admin-form__input" type="text" name="cinema" placeholder="Введите название кинотеатра">
			</label>

			<label class="admin-form__label">
				Зал<input class="admin-form__input" type="text" name="hall" placeholder="Введите номер зала: ">
			</label>

			<label class="admin-form__label">
				Дата<input class="admin-form__input" type="date" name="date" placeholder="Введите дату: ">
			</label>

			<label class="admin-form__label">
				Начало<input class="admin-form__input" type="time" name="start" placeholder="Начало сеанса: ">
			</label>

			<label class="admin-form__label">
				Конец<input class="admin-form__input" type="time" name="end" placeholder="Конец сенса: ">
			</label>

			<label class="admin-form__label">
				Фильм<input class="admin-form__input" type="text" name="film" placeholder="Название фильма: ">
			</label>

			<label class="admin-form__label">
				Цена<input class="admin-form__input" type="text" name="cost" placeholder="Стоимость сеанса: ">
			</label>

			<label class="admin-form__label">
				Формат видео<input class="admin-form__input" type="text" name="videoFormat" placeholder="Формат видео: ">
			</label>

			<label class="admin-form__label">
				Формат аудио<input class="admin-form__input" type="text" name="audioFormat" placeholder="Формат аудио: ">
			</label>
			
			<div>
				<input class="admin-form__submit admin-form__submit--add-session" type="submit" name="" value="Добавить сеанс">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>

		<form class="admin-form admin-form--find-session" id="find-session-form" method="POST">
			<label class="admin-form__label">
				Название кинотеатра<input class="admin-form__input" type="text" name="Cinema" placeholder="Введите название кинотеатра">
			</label>

			<label class="admin-form__label">
				Дата сеанса<input class="admin-form__input" type="date" name="Date" placeholder="Введите дату санса">
			</label>

			<label class="admin-form__label">
				Начало сеанса<input class="admin-form__input" type="time" name="Start" placeholder="Время начала сеанса">
			</label>
			
			<div>
				<input class="admin-form__submit find-button admin-form__submit--find-session" type="button" name="" value="Найти сеанс">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>
		

		<!-- КИНОТЕАТРЫ -->

		<form class="admin-form admin-form--add-cinema" id="add-cinema-form" method="POST" action="PHP/addCinema.php">
			<label class="admin-form__label">
				Название кинотеатра<input class="admin-form__input" type="text" name="title" placeholder="Введите название кинотеатра">
			</label>

			<label class="admin-form__label">
				Город<input class="admin-form__input" type="text" name="city" placeholder="Введите название города">
			</label>

			<label class="admin-form__label">
				Адрес<input class="admin-form__input" type="text" name="address" placeholder="Адрес кинотеатра">
			</label>

			<label class="admin-form__label">
				Количество залов<input class="admin-form__input" type="number" name="amount" placeholder="Количество залов">
			</label>
			
			<div>
				<input class="admin-form__submit admin-form__submit--add-cinema" type="submit" name="" value="Добавить кинотеатр">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>

		<form class="admin-form admin-form--find-cinema" id="find-cinema-form" method="POST">
			<label class="admin-form__label">
				Название кинотеатра<input class="admin-form__input" type="text" name="Title" placeholder="Введите название кинотеатра">
			</label>

			<label class="admin-form__label">
				Город<input class="admin-form__input" type="text" name="City" placeholder="Введите название города">
			</label>
			
			<div>
				<input class="admin-form__submit find-button admin-form__submit--find-cinema" type="button" name="" value="Найати кинотеатр">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>

		<!-- ЗАЛЫ -->
		<form class="admin-form admin-form--add-hall" id="add-hall-form" method="POST" action="PHP/addHall.php">
			<label class="admin-form__label">
				Название кинотеатра<input class="admin-form__input" type="text" name="title" placeholder="Введите название кинотеатра">
			</label>

			<label class="admin-form__label">
				Город <input class="admin-form__input" type="text" name="city" placeholder="Введите название название города">
			</label>

			<label class="admin-form__label">
				Номер зала<input class="admin-form__input" type="text" name="hallsNumber" placeholder="Введите номер зала">
			</label>

			<label class="admin-form__label">
				Количество рядов <input class="admin-form__input" type="number" name="rowsNumber" placeholder="Введите количество рядов">
			</label>

			<label class="admin-form__label">
				Мест в ряду <input class="admin-form__input" type="number" name="seatsNumber" placeholder="Введите количество мест в одном ряду">
			</label>
			
			<div>
				<input class="admin-form__submit admin-form__submit--add-hall" type="submit" name="" value="Добавить зал">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>

		<form class="admin-form admin-form--find-hall" id="find-hall-form" method="POST">
			<label class="admin-form__label">
				Город <input class="admin-form__input" type="text" name="City" placeholder="Введите название города">
			</label>

			<label class="admin-form__label">
				Название кинотеатра <input class="admin-form__input" type="text" name="Cinema" placeholder="Введите название кинотеатра">
			</label>

			<label class="admin-form__label">
				Номер зала <input class="admin-form__input" type="text" name="HallsNumber" placeholder="Введите номер зала">
			</label>

			<div>
				<input class="admin-form__submit find-button admin-form__submit--find-hall" type="button" name="" value="Найати кинотеатр">
				<span class="icon-level-up admin-form__go-back"></span>
			</div>
		</form>
	</header>
</body>
</html>