window.addEventListener('DOMContentLoaded', function() {
	let burgerMenu = document.querySelector('.burger');
	let menuClose = document.querySelector('.menu__back');

	let mobileMenu = document.querySelector('.mobile__menu');

	burgerMenu.addEventListener('click', function() {
		mobileMenu.classList.remove('menu--closed');
	});

	menuClose.addEventListener('click', function() {
		mobileMenu.classList.add('menu--closed');
	});
});