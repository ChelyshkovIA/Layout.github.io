addEventListener('DOMContentLoaded', () => {
	let idFilms = document.getElementById('idFilms');
	let getParams = window.location.search.replace('?','').split('&').reduce((acc, curr) => {
        let arr = curr.split('=');
        acc[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return acc;
    },{});

	
	let input = document.getElementsByClassName('film-info__text');
	let posterLabel = document.querySelector('.film-info__img-block-bg');
	let txtForm = document.querySelector('.film-info--right');
	
	for(let i = 0; i < input.length; i++){
		let name = input[i].name;
		input[i].disabled = 1;
		switch(name) {
			case 'title':
				input[i].value = getParams.Title;
				break;
			case 'country':
				input[i].value = getParams.Country;
				break;
			case 'genre':
				input[i].value = getParams.Genre;
				break;
			case 'limitation':
				input[i].value = getParams.Limitation;
				break;
			case 'description':
				input[i].value = getParams.Description;
				break;
			case 'trailerLink':
				input[i].value = getParams.TrailerLink;
				break;
			default:
				break;				
		}

	}
	let img = document.querySelector('.film-info__img');
	img.src = 'http://' + getParams.PosterLink;

	let deleteFilm = document.getElementsByClassName('film-info__instrument-button--red')[0];
	let editFilm   = document.getElementsByClassName('film-info__instrument-button--blue')[0];
	let saveFilm   = document.getElementsByClassName('film-info__instrument-button--green')[0];

	saveFilm.hidden = true;
	idFilms.value = getParams.idFilms;

	deleteFilm.addEventListener('click', () => {
		document.getElementById('deleteRadio').checked = 1;
		document.getElementById('updateRadio').checked = 0;
	});

	editFilm.addEventListener('click', () => {
		saveFilm.hidden = false;
		document.getElementById('deleteRadio').checked = 0;
		document.getElementById('updateRadio').checked = 1;

		for(let i = 0; i < input.length; i++){
			input[i].disabled = 0;
		}

		input[0].focus();
		posterLabel.classList.remove('film-info__img-block-bg--hidden');	
	});

	saveFilm.addEventListener('click', () => {
		txtForm.submit();
	});

	
});