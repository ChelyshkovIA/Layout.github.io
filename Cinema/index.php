<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>INDEX</title>
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<link href="https://fonts.googleapis.com/css?family=Molle:400i&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="fontello-281a0e8d/css/fontello.css">
	<script src="js/index.js"></script>
</head>
<body>
	<header id="header" class="header">

		<div class="ent-form" id="ent-form">
			<div class="ent-reg-form-block">
				<span class="exit-icon icon-cancel-circled-outline" id="entClose"></span>
				<form class="avtor-form" action="php/ent.php" method="post">
					<label class="avtor-form__label"><input class="avtor-form__input" type="email" placeholder="Введите E-Mail: " name="login"></label>
					<label class="avtor-form__label"><input class="avtor-form__input" type="password" placeholder="Введите пароль: " name="password" ></label>
					<input class="avtor-form__butt" type="submit" value="Войти">
				</form>
			</div>		
		</div>
		<div class="reg-form" id="reg-form">
			<div class="ent-reg-form-block">
				<span class="exit-icon icon-cancel-circled-outline" id="regClose"></span>
				<form class="avtor-form" action="php/reg.php" method="post">
					<label class="avtor-form__label"><input class="avtor-form__input" type="text" name="RegName" placeholder="Ваше имя: "></label>
					<label class="avtor-form__label"><input class="avtor-form__input" type="text" name="RegSurname" placeholder="Ваша фамилия: "></label>
					<label class="avtor-form__label"><input class="avtor-form__input" type="email" name="RegEmail" placeholder="E-Mail: "></label>
					<label class="avtor-form__label"><input class="avtor-form__input" type="password" name="RegPw1" placeholder="Придумайте пароль: "></label>
					<label class="avtor-form__label"><input class="avtor-form__input" type="password" name="RegPw2" placeholder="Повторите пароль: "></label>
					<input class="avtor-form__butt" type="submit" value="Зарегистрироваться">
				</form>
			</div>		
		</div>

		<h1 class="header__logo"><span>C</span>helyshkoff &nbsp;<span>C</span>inema</h1>
		<nav class="nav">
			<h1 class="nav__logo"><span>C</span>helyshkoff &nbsp;<span>C</span>inema</h1>
			<div class="nav__but">
				
				<?php if($_COOKIE['user'] == '' && $_COOKIE['admin'] == ''): ?>
					<div class="nav__ent" id="ent-but">Войти</div>
					<div class="nav__ent" id="reg-but">Зарегистрироваться</div>
				<?php elseif($_COOKIE['user'] != ''): ?>
					<a href="user.php" class="nav__ent" id="ent-but">Личный кабинет</a>
					<a href="php/userExit.php" class="nav__ent" id="ent-but">Выйти</a>
				<?php elseif($_COOKIE['admin'] != ''): ?>
					<a href="admin.php" class="nav__ent" id="ent-but">Админка</a>
					<a href="php/adminExit.php" class="nav__ent" id="ent-but">Выйти</a>	
				<?php endif; ?>	
			
			</div>	
		</nav>				

		<div class="trailer">
			<video playsinline loop poster="http://cinema/images/poster2.jpg" class="trailer__content" id="main-video">
       			<source src="images/Zомбилэнд.mp4" type="video/mp4">
       			Ваш браузер не поддерживает тег video. Пожалуйста, обновите свой браузер до более свежей версии.
			</video>
			<div class="trailer-bgc" id="headerTrailer">
				<span id="trailer-play" class="video-tool video-tool--play icon-play-1"></span>
				<span id="trailer-pause" class="video-tool icon-pause"></span>
			</div>
		</div>
	</header>

	<main class="main">
		<nav class="filter">
			
			<?php if($_COOKIE['user'] == '' && $_COOKIE['admin'] == ''):  ?>
				<div class="filter__button filter__button--small-screen">Войти<span class="button-icon icon-key"></span></div>
				<form class="filter__form" action="php/ent.php" method="post">
					<label class="form-title"><input class="form-reg-ent" type="email" name="login" value="" placeholder="Логин:"></label>
					<label class="form-title"><input class="form-reg-ent" type="password" name="password" value="" placeholder="Пароль:"></label>
					
					<input class="filter-form-button" type="submit" name="" value="Войти">
				</form>

				<div class="filter__button filter__button--small-screen">Зарегистрироваться<span class="button-icon icon-user-plus"></span></div>
				<form class="filter__form" action="php/reg.php" method="post">
					<label class="form-title"><input class="form-reg-ent" type="text" name="RegName" value="" placeholder="Ваше имя:"></label>
					<label class="form-title"><input class="form-reg-ent" type="text" name="RegSurnname" value="" placeholder="Ваша фамилия: "></label>
					<label class="form-title"><input class="form-reg-ent" type="email" name="RegEmail" value="" placeholder="E-Mail:"></label>
					<label class="form-title"><input class="form-reg-ent" type="password" name="RegPw1" value="" placeholder="Пароль:"></label>
					<label class="form-title"><input class="form-reg-ent" type="password" name="RegPw2" value="" placeholder="Повторите пароль:"></label>


					<input class="filter-form-button" type="submit" name="" value="Зарегистрироваться">	
				</form>
			
			<?php elseif($_COOKIE['user'] != ''): ?>
				<a href="user.php" class="filter__button filter__button--small-screen">Личный кабинет<span class="button-icon icon-user-plus"></span></a>
			<?php elseif($_COOKIE['admin'] != ''): ?>
				<a href="admin.php" class="filter__button filter__button--small-screen">Админка<span class="button-icon icon-user-plus"></span></a>
			<?php endif; ?>	

			<div class="filter-block filter-block--1">
				<div class="filter__button">Список кинотеатров <span class="button-icon icon-list-bullet"></span></div>
				<form class="filter-list filter__form filter__form--cinemas" action="#" name="cinema">
					<label class="form-title">
						<input class="form-item" type="radio" value="" name="radio-form">
						<span>Все фильмы в прокате</span>
					</label>
					<input class="filter-form-button filter-form-button--cinemas" type="button" name="filter-button" value="Поиск">
				</form>
			</div>	

			<div class="filter-block filter-block--2">
				<div class="filter__button">Выбрать дату <span class="button-icon icon-calendar"></span></div>
				<form class="filter-list filter__form filter__form--dates" action="#" id="index-datepicker-form" name="date">
					<label class="form-title">
						<input class="form-item" type="radio" value="all" name="radio-form" checked>
						<span>Любая дата</span>
					</label>
					<input class="filter-form-button" type="button" name="filter-button" value="Поиск">
				</form>
			</div>	
			
			<div class="filter-block filter-block--3">
				<div class="filter__button">Выбрать жанр <span class="button-icon icon-glasses"></span></div>
				<form class="filter-list filter__form" action="#" name="genre">
					<label class="form-title">
						<input class="form-item" type="radio" value="комедия" name="radio-form" checked>
						<span>Комедия</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="драма" name="radio-form" checked>
						<span>Драма</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="боевик" name="radio-form" checked>
						<span>Боевик</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="триллер" name="radio-form" checked>
						<span>Триллер</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="мультфильм" name="radio-form" checked>
						<span>Мультфильм</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="хоррор" name="radio-form" checked>
						<span>Хоррор</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="фэнтези" name="radio-form" checked>
						<span>Фэнтези</span>
					</label>
					
					<label class="form-title">
						<input class="form-item" type="radio" value="" name="radio-form" checked>
						<span>Все жанры</span>
					</label>
					
					<input class="filter-form-button" type="button" name="filter-button" value="Поиск">
				</form>
			</div>

			<div class="filter-block filter-block--4">
				<div class="filter__button">Выбрать формат <span class="button-icon icon-glasses"></span></div>
				<form class="filter-list filter__form filter__form--formats" action="#" name="format">
					<label class="form-title">
						<input class="form-item" type="radio" value="" name="radio-form-video" checked>
						<span>Все видеоформаты</span>
					</label>

					<label class="form-title">
						<input class="form-item" type="radio" value="" name="radio-form-audio" checked>
						<span>Все аудиоформаты</span>
					</label>
					
					<input class="filter-form-button" type="button" name="filter-button" value="Поиск">
				</form>
			</div>	

		</nav>

		<div class="wall">
			<!-- <div class="film">
				<img class="film__img" alt="постер к фильму">
				<p class="film__name">название фильма</p>
				<a class="film__ticket-link" href="seats.html">купить билет</a>
			</div> -->
		</div>
	</main>

	<footer class="footer">
		<nav class="social-nav">
			<a class="social-nav__link" href="#"><span class="footer-link-icon footer-link-icon--lightblue icon-twitter"></span></a>
			<a class="social-nav__link" href="#"><span class="footer-link-icon footer-link-icon--blue icon-vkontakte"></span></a>
			<a class="social-nav__link" href="#"><span class="footer-link-icon footer-link-icon--red icon-instagram"></span></a>
			<a class="social-nav__link" href="#"><span class="footer-link-icon footer-link-icon--blue icon-facebook"></span></a>
		</nav>

		<a class="footer__tel" href="tel: +375291425865">+375 29 142 58 65</a>

		<div class="copyright">(c) CHELYSHKOFF MOVIE</div>
	</footer>
	
</body>
</html>