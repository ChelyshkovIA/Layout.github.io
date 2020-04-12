addEventListener('DOMContentLoaded', () => {
	let filterFormsArr  = document.getElementsByClassName("filter__form");
	let filterButtArr   = document.getElementsByClassName("filter__button");

	let headerTrailer   = document.getElementById("headerTrailer");
	let trailerButPlay  = document.getElementById("trailer-play");
	let trailerButPause = document.getElementById("trailer-pause");
	let mainVideo       = document.getElementById("main-video");

	let entBut          = document.getElementById("ent-but");
	let regBut          = document.getElementById("reg-but");
	let entForm         = document.getElementById("ent-form");
	let regForm         = document.getElementById("reg-form");

	let entClose        = document.getElementById("entClose");
	let regClose        = document.getElementById("regClose");

	let filterSubmit    = document.querySelectorAll('input[name="filter-button"]');
	let filter          = document.querySelectorAll('.filter-list');

	//filter and sort forms
	let cinemaForm = document.querySelector('.filter__form--cinemas');


	function createFilm(item) {
		let div = document.createElement('div');
		div.className = 'film';

		let img = document.createElement('img');
		img.className = 'film__img';
		img.src ='http://' + item.PosterLink;

		let pTitle = document.createElement('p');
		pTitle.className = 'film__name';
		pTitle.append(item.Title);

		let aBuyTicket = document.createElement('a');
		aBuyTicket.className = 'film__ticket-link';

		let link = encodeURIComponent(item.TrailerLink);
		// let link = item.TrailerLink;

		aBuyTicket.href = `purchaseForm.html?idFilms=${item.idFilms}&Title=${item.Title}&Country=${item.Country}&Genre=${item.Genre}&Limitation=${item.Limitation}&Description=${item.Description}&TrailerLink=${link}&PosterLink=${item.PosterLink}`;
		aBuyTicket.append('купить билет');

		div.append(img);
		div.append(pTitle);
		div.append(aBuyTicket);
		wall.append(div);
	}
	
	headerTrailer.onclick = function onTrailerClick(){
		trailerButPlay.classList.toggle('video-tool--play');
		trailerButPause.classList.toggle('video-tool--pause');
		if(trailerButPlay.classList.contains('video-tool--play'))
			mainVideo.pause();
		else
			mainVideo.play();
	}

	function filterOpenCloseListener(event) {
		let el = event.currentTarget;
		let next = el.nextElementSibling;
		next.classList.toggle('filter__form--active');
	}

	for(button of filterButtArr){
		button.addEventListener("click", filterOpenCloseListener);
	}


	if(entBut){
		entBut.addEventListener('click', function(){
			entForm.classList.add('ent-form--active');
		});
	}

	if(regBut){
		regBut.addEventListener('click', function(){
			regForm.classList.add('reg-form--active');
		});
	}


	entClose.addEventListener('click', function(){
		entForm.className = "ent-form";
	});

	regClose.addEventListener('click', function(){
		regForm.className = "reg-form";	
	});
	
	
	let filmsJson;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `json/films.json?nocache=${(new Date()).getTime()}`, false);
	xhr.send();
	if (xhr.status != 200) {
		alert( xhr.status + ': ' + xhr.statusText ); 
	} else {
		filmsJson = xhr.responseText;
	}
	
	let filmsArr = JSON.parse(filmsJson);

	let wall = document.querySelector('.wall');



	filmsArr.forEach((item) => {
		createFilm(item);
	});

	//ЗАПОЛНЕНИЕ ФИЛЬТРОВ

	function initFilter(formSelector, par, name = 'radio-form') {
		let form = document.querySelector(formSelector);
		let label = document.createElement('label');
		label.className = 'form-title';
		let input = document.createElement('input');
		input.className = 'form-item';
		input.type = 'radio';
		input.name = name;
		input.value = par;
		let span = document.createElement('span');
		span.append(par);

		label.append(input);
		label.append(span);

		form.prepend(label);
	}

	function getCinemasArr() {
		let req = new XMLHttpRequest();
		let url = 'http://cinema/json/cinemas.json?nocache=' + (new Date).getTime();
		req.open('GET', url, false);

		req.send();
		return JSON.parse(req.response);
	}

	let cinemasArr = getCinemasArr();

	cinemasArr.forEach((item) => {
		initFilter('.filter__form--cinemas', item.Title);
	});

	for(let i = 6; i >= 0; i--) {
		let date = new Date();
		date.setDate(date.getDate() + i)
		let str = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		initFilter('.filter__form--dates', str);
	}

	function getAudioFormat() {
		let req = new XMLHttpRequest();
		let url = `http://cinema/json/sessions.json?nocache=${(new Date()).getTime()}`;
		req.open('GET', url, false);
		req.send();

		let sessions = JSON.parse(req.response);
		let audioFrmt = [];
		let videoFrmt = [];
		sessions.forEach(item => {
			if(!audioFrmt.includes(item.AudioFormat.toUpperCase()))
				audioFrmt.push(item.AudioFormat.toUpperCase());
			if(!videoFrmt.includes(item.VideoFormat.toUpperCase()))
				videoFrmt.push(item.VideoFormat.toUpperCase());
		});

		return {
			audio: audioFrmt,
			video: videoFrmt
		}
	}

	let formats = getAudioFormat();

	formats.audio.forEach(item => {
		initFilter('.filter__form--formats', item, 'radio-form-audio');
	});

	formats.video.forEach(item => {
		initFilter('.filter__form--formats', item, 'radio-form-video');
	});


	filterSubmit.forEach((item) => {
		item.addEventListener('click', function() {
			let cinema;
			let date;
			let genre;
			let AudioFormat;
			let VideoFormat;
			for(let i = 0; i < filter.length; i++) {
				switch(filter[i].name) {
					case 'cinema':
						cinema = filter[i]['radio-form'].value;
						break;
					case 'date':

						if(filter[i]['radio-form'].value == 'all') {
							date = '00:00:00';
							continue;
						}

						let arr = filter[i]['radio-form'].value.split('-');
						let temp = arr[2];
						arr[2] = arr[0];
						arr[0] = temp;
						if(arr[1] < 10)
							arr[1] = '0' + arr[1].toString();
						if(arr[2] < 10)
							arr[2] = '0' + arr[2].toString();

						date = `${arr.join('-')} 00:00:00`;
						

						break;
					case 'genre':
						genre = filter[i]['radio-form'].value;
						break;
					case 'format':
						AudioFormat = filter[i]['radio-form-audio'].value;
						VideoFormat = filter[i]['radio-form-video'].value;
						break;			
					default:
						console.log(`НЕТ ФОРМЫ С АТРИБУТОМ name=${filter[i].name}!!!`)	
				}
			}	

			let req = new XMLHttpRequest();
			let url =  `http://cinema/json/sessions.json?nocache=${(new Date).getTime()}`;
			req.open('GET', url, false);
			req.send();

			let sessionsArr = JSON.parse(req.response);
			let filmsId = [];

			sessionsArr.forEach(item => {
				
				if(
					item.Date.includes(date) && 
					(item.Cinema.toLowerCase()).includes(cinema.toLowerCase()) &&
					(item.Genre.toLowerCase()).includes(genre.toLowerCase()) &&
					(item.VideoFormat.toLowerCase()).includes(VideoFormat.toLowerCase()) &&
					(item.AudioFormat.toLowerCase()).includes(AudioFormat.toLowerCase()) &&
					(!filmsId.includes(item.idFilms))
				){
					filmsId.push(item.idFilms);
				}
			});

			let trash = document.querySelectorAll('.film');
			trash.forEach(item => item.remove());


			filmsArr.forEach((item) => {
				filmsId.forEach(film => {
					if(film == item.idFilms)
						createFilm(item);
				});
			});
		});
	});
});