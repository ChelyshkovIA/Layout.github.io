addEventListener('DOMContentLoaded', function() {
	let getParams = window.location.search.replace('?','').split('&').reduce((acc, curr) => {
        let arr = curr.split('=');
        acc[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return acc;
    },{});

	let poster          = document.querySelector('.img');
	let filmText        = document.querySelector('.text-block__par--film');
	let limitationText  = document.querySelector('.text-block__par--limitation');
	let countryText     = document.querySelector('.text-block__par--country');
	let genreText       = document.querySelector('.text-block__par--genre');
	let descriptionText = document.querySelector('.text-block__par--description');
	let trailerLinkText = document.querySelector('.text-block__par--trailerLink');

	let selectCity = document.querySelector('.select--city');
	let selectCinema = document.querySelector('.select--cinema');
	let selectDate = document.querySelector('.select--date');
	let selectSessions = document.querySelector('.select--sessions');
	let idSession = document.querySelector('.hidden--idSessions');


	let submit = document.querySelector('.film-options__button');

	poster.src =`http://${getParams.PosterLink}`;
	poster.alt = `Постер к фильму ${getParams.Title}`;

	filmText.append(getParams.Title);
	limitationText.append(getParams.Limitation);
	countryText.append(getParams.Country);
	genreText.append(getParams.Genre);
	descriptionText.append(getParams.Description);
	trailerLinkText.href = getParams.TrailerLink;
	trailerLinkText.target = '_blank';

	let req = new XMLHttpRequest();
	let url = `http://cinema/php/returnSession.php?nocache=${(new Date()).getTime()}&idFilms=${getParams.idFilms}`;
	req.open('GET', url, false);
	req.send();

	let sessionsArr = JSON.parse(req.response);
	console.log(sessionsArr);

	let cityArr = [];
	for(let i = 0; i < sessionsArr.length; i++) {
		if(!(cityArr.includes(sessionsArr[i].City)))
			cityArr.push(sessionsArr[i].City);
	}

	function createOption(item, select, idSessions) {
		let option = document.createElement('option');
		option.className = 'select__option option';
		
		if(select.classList.contains('select--date')) {
			let arr = item.split(' ')[0];
			arr = arr.split('-');
			let value = '';
			let month;
			switch(arr[1]) {
				case '01':
					month = 'Января';
					break;
				case '02':
					month = 'Февраля';
					break;
				case '03':
					month = 'Марта';
					break;
				case '04':
					month = 'Апреля';
					break;
				case '05':
					month = 'Мая';
					break;
				case '06':
					month = 'Июня';
					break;
				case '07':
					month = 'Июля';
					break;
				case '08':
					month = 'Августа';
					break;
				case '09':
					month = 'Сентября';
					break;
				case '10':
					month = 'Октября';
					break;
				case '11':
					month = 'Ноября';
					break;
				case '12':
					month = 'Декабря';
					break;	
				default:
					break;											
			}

			value = `${arr[2]} ${month} ${arr[0]}-го года`;
			option.append(value);
		}else {
			option.append(item);
		}


		if(select.classList.contains('select--sessions')) {
			option.value = idSessions;
		}else{
			option.value = item;
		}

		select.append(option);
	}

	cityArr.forEach(item => {
		createOption(item, selectCity);
	});


	selectCity.addEventListener('change', function(event) {
		while(selectCinema.children.length > 1) 
			selectCinema.children[1].remove();
		while(selectDate.children.length > 1) 
			selectDate.children[1].remove();
		while(selectSessions.children.length > 1) 
			selectSessions.children[1].remove()
		
		let cinemaArr = [];

		sessionsArr.forEach(item => {
			if(event.target.value == item.City) {
				if(!cinemaArr.includes(item.Title)) {
					cinemaArr.push(item.Title);
					createOption(item.Title, selectCinema);
				}
			}
		});
	});

	selectCinema.addEventListener('change', function(event) {
		while(selectDate.children.length > 1) 
			selectDate.children[1].remove();
		while(selectSessions.children.length > 1) 
			selectSessions.children[1].remove()
		let dateArr = [];
		sessionsArr.forEach(item => {
			if(item.City == selectCity.value && item.Title == selectCinema.value) {
				if(!dateArr.includes(item.Date)){
					dateArr.push(item.Date)
					createOption(item.Date, selectDate);
				}	
			}
		});
	});

	selectDate.addEventListener('change', function(event) {
		while(selectSessions.children.length > 1) 
			selectSessions.children[1].remove()

		let sessArr = [];
		sessionsArr.forEach(item => {
			if(item.City == selectCity.value && item.Title == selectCinema.value && item.Date == selectDate.value) {
				if(!sessArr.includes(item.idSessions)){
					sessArr.push(item.idSessions);
					createOption(`Начало: ${item.Start} - Конец: ${item.End}`, selectSessions, item.idSessions);
				}
			}
		});
	});
});