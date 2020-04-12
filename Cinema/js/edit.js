addEventListener('DOMContentLoaded', function() {
	let getParams = window.location.search.replace('?','').split('&').reduce((acc, curr) => {
        let arr = curr.split('=');
        acc[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return acc;
    },{});
	console.log(getParams);


	let mainForm = document.querySelector('.film-info--right');
	let main = document.querySelector('.main');
	let infoBlock = document.querySelector('.film-info__block');
	
	
	let hiddenID = document.getElementById('id');


	let deleteFilm = document.querySelector('.film-info__instrument-button--red');
	let editFilm = document.querySelector('.film-info__instrument-button--blue');
	let saveFilm = document.querySelector('.film-info__instrument-button--green');

	function createLabel(text, type, name, value) {
		let label = document.createElement('label');
		label.className = 'film-info__label';
		let span = document.createElement('span');
		span.className = 'film-info__label-text';
		span.append(text);
		label.append(span);

		let input;

		if(type == 'text') {
			input = document.createElement('input');
			input.type = 'text';
		}else if(type == 'file') {
			input = document.createElement('input');
			input.type = 'file';
		}else if(type == 'textarea') {
			input = document.createElement('textarea');
			input.className = 'film-info__text--textarea';
			input.type = 'text';
			input.rows = 5;
		}else if(type == 'time') {
			input = document.createElement('input');
			input.type = 'time';
		}

		input.disabled = 1;
		input.classList.add('film-info__text');
		input.name = name;
		input.value = value;
		label.append(input);

		return label;
	}

    switch(getParams.param) {
    	case ('Film'):
    		let form = document.createElement('form');
    		form.className = 'film-info film-info--left';
    		form.enctype='multipart/form-data';
    		form.method = 'POST';
    		form.action = 'PHP/editPoster.php';

    		let div = document.createElement('div');
    		div.className = 'film-info__img-block';

    		let bg = document.createElement('div');
    		bg.className = 'film-info__img-bg';

    		let img = new Image();
    		img.className = 'film-info__img';
    		img.src = 'http://' + getParams.PosterLink;
    		img.alt = 'Постер фильма: ' + getParams.Title;

    		let label = document.createElement('label');
    		label.className = 'film-info__img-block-bg film-info__img-block-bg--hidden';
    		label.append('Загрузить');

    		let input = document.createElement('input');
    		input.type = 'file';
    		input.name = 'poster';
    		input.id = 'filmPoster';
    		input.className = 'hidden';

    		label.append(input);
    		div.append(bg);
    		div.append(img);
    		div.append(label);
    		form.append(div);

    		let id = document.createElement('input');
    		id.name = 'id';
    		id.type = 'text';
    		id.value = getParams.idFilms;
    		id.className = 'hidden';
    		form.append(id);

    		main.prepend(form);

            input.addEventListener('change', function(event) {
                let id = document.getElementById('id').value;
                let file = event.target.files[0];

                let data = new FormData();
                data.append('poster', file);
                data.append('id', id);
                data.append('title', document.querySelector('input[name="title"]').value);

                let req = new XMLHttpRequest();
                req.open('POST', 'http://cinema/php/editPoster.php', false);
                req.send(data);
                console.log(req.status);
                console.log(req.response);

                let img = document.getElementsByClassName('film-info__img')[0];
                img.src = 'http://' + req.response;
            })


    		infoBlock.append(createLabel('Название фиьма:', 'text', 'title', getParams.Title));
    		infoBlock.append(createLabel('Страна:', 'text', 'country', getParams.Country));
    		infoBlock.append(createLabel('Жанр:', 'text', 'genre', getParams.Genre));
    		infoBlock.append(createLabel('Ограничение:', 'text', 'limitation', getParams.Limitation));
    		infoBlock.append(createLabel('Описание:', 'textarea', 'description', getParams.Description));
    		infoBlock.append(createLabel('Ссылка на трейлер:', 'text', 'trailerLink', getParams.TrailerLink));
    		
    		hiddenID.value = getParams.idFilms;
    		hiddenID.name = 'idFilms';	

    		mainForm.action = 'PHP/editFilm.php';
    		break;
    	case ('Cinema'):
    		infoBlock.append(createLabel('Название кинотеатра:', 'text', 'title', getParams.Title));
    		infoBlock.append(createLabel('Город:', 'text', 'city', getParams.City));
    		infoBlock.append(createLabel('Адрес:', 'text', 'address', getParams.Address));
    		infoBlock.append(createLabel('Количество залов:', 'text', 'hallsNumber', getParams.HallsNumber));

    		hiddenID.value = getParams.idCinema;
            hiddenID.name = 'idCinema';	
    		infoBlock.append(hiddenID);
            mainForm.action = 'PHP/editCinema.php';
    		break;
    	case ('Session'):
    		infoBlock.append(createLabel('Фильм:', 'text', 'film', getParams.Film));
    		infoBlock.append(createLabel('Кинотеатр:', 'text', 'cinema', getParams.Cinema));
    		infoBlock.append(createLabel('Дата сеанса:', 'text', 'date', getParams.Date));
    		infoBlock.append(createLabel('Начало сеанса:', 'time', 'start', getParams.Start));
    		infoBlock.append(createLabel('Конец сеанса:', 'time', 'end', getParams.End));
    		infoBlock.append(createLabel('Стоимость сеанса:', 'text', 'cost', getParams.Cost));
    		infoBlock.append(createLabel('Формат видео:', 'text', 'videoFormat', getParams.VideoFormat));
    		infoBlock.append(createLabel('Формат аудио:', 'text', 'audioFormat', getParams.AudioFormat));
    		infoBlock.append(createLabel('Шифр зала:', 'text', 'hallsNumber', getParams.HallsNumber));

    		hiddenID.value = getParams.idSessions;
            hiddenID.name = 'idSession';   	
    		infoBlock.append(hiddenID);
            mainForm.action = 'PHP/editSession.php';
    		break;
    	case ('Hall'):
			infoBlock.append(createLabel('Кинотеатр:', 'text', 'cinema', getParams.Cinema));
			infoBlock.append(createLabel('Город:', 'text', 'city', getParams.City));
			infoBlock.append(createLabel('Шифр зала:', 'text', 'hallsNumber', getParams.HallsNumber));
			infoBlock.append(createLabel('Рядов:', 'text', 'rowsNumber', getParams.RowsNumber));
			infoBlock.append(createLabel('Мест (в одном ряду):', 'text', 'seatsInRow', getParams.SeatsInRow));

			hiddenID.value = getParams.idHall;	
            hiddenID.name = 'idHall';    
    		infoBlock.append(hiddenID);
            mainForm.action = 'PHP/editHall.php';
    		break;
    	default:
    		console.log('параметр сущности не опознан!');
    		break;				
    }

    deleteFilm.addEventListener('click', () => {
		document.getElementById('deleteRadio').checked = 1;
		document.getElementById('updateRadio').checked = 0;

        for(let i = 0; i < mainForm.elements.length; i++) {
            mainForm.elements[i].disabled = 0;
        }
        
		mainForm.submit();
	});

    editFilm.addEventListener('click', () => {
		saveFilm.hidden = false;
		document.getElementById('deleteRadio').checked = 0;
		document.getElementById('updateRadio').checked = 1;

		for(let i = 0; i < mainForm.elements.length; i++) {
			mainForm.elements[i].disabled = 0;
		}

		mainForm.elements[0].focus();
		if(document.querySelector('.film-info__img-block-bg--hidden') != null)
			document.querySelector('.film-info__img-block-bg--hidden').classList.remove('film-info__img-block-bg--hidden');

		saveFilm.classList.remove('hidden');
		
	});

	saveFilm.addEventListener('click', () => {
		mainForm.submit();
	});

});