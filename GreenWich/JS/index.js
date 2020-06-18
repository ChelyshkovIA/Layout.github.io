window.addEventListener('DOMContentLoaded', function() {
	let burgerMenu = document.querySelector('.burger');
	let menuClose = document.querySelector('.menu__back');
	let logo = document.querySelector('.mobile-logo__image');
	const width = document.documentElement.clientWidth;

	console.log(width);
	if (width >= 583 && width <= 1030) {
		logo.src = 'images/Logo Greenwich png.png';
	}

	let mobileMenu = document.querySelector('.mobile__menu');

	burgerMenu.addEventListener('click', function() {
		document.querySelector('main').classList.add('blured');
		document.querySelector('footer').classList.add('blured');
		document.body.classList.add('overflowHidden');
		document.querySelector('.burger').classList.add('hidden');
		mobileMenu.classList.remove('menu--closed');
	});

	menuClose.addEventListener('click', function() {
		document.querySelector('main').classList.remove('blured');
		document.querySelector('footer').classList.remove('blured');
		document.body.classList.remove('overflowHidden');
		document.querySelector('.burger').classList.remove('hidden');
		mobileMenu.classList.add('menu--closed');
	});
});