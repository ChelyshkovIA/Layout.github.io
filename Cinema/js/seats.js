addEventListener('DOMContentLoaded', function() {
	let filmHuge    = document.querySelector('.film-title');
	let filmSmall   = document.querySelector('.film-info__title')
	let cinema      = document.querySelector('.film-info__more-item--cinema');
	let dateSession = document.querySelector('.film-info__more-item--date');
	let format      = document.querySelector('.film-info__more-item--format');
	let poster      = document.querySelector('.film-info__image');
	let cost        = document.querySelector('.cost');
	let hall        = document.querySelector('.hall');
	let submit      = document.querySelector('.hall-seats__submit');

	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	//ПОЛУЧЕНИЕ ПАРАМЕТРОВ ИЗ URL
	let getParams = window.location.search.replace('?','').split('&').reduce((acc, curr) => {
        let arr = curr.split('=');
        acc[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        return acc;
    },{});

	console.log(getParams);

	let req = new XMLHttpRequest();
	let url = `http://cinema/php/returnFullSessionInfo.php?idSessions=${getParams.idSessions}`;
	req.open('GET', url, false);
	req.send();

	let session = JSON.parse(req.response)[0];

	//ПРЕОБРАЗОВАНИЕ ФОРМАТА ДАТЫ
	let arr = session.Date.split(' ')[0];
	arr = arr.split('-');
	let dateValue = '';
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
	dateValue = `${arr[2]}-го ${month} ${arr[0]}-го года`;

	filmHuge.append(session.Film);
	filmSmall.append(`${session.Film} (${session.Country})`);
	cinema.append(session.Cinema);
	dateSession.append(`${dateValue}. Время сенаса: ${session.Start} - ${session.End}.`);
	format.append(`${session.AF} - ${session.VF}`);

	poster.src = `http://${session.Poster}`;

	let rows  = session.RowsNumber;
	let seats = session.SeatsNumber;
	let countSeats = 0;
	let finalCost = 0;

	for(let i = 1; i <= rows; i++) {
		let row = document.createElement('div');
		row.className = "row";
		for(let j = 1; j <= seats; j++) {
			let seat = document.createElement('div');
			seat.className = 'seat-unit__sq';
			let input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'seat-unit';
			input.value = `${i}-${j}`;
			input.id = `${i} ${j}`;
			input.name = 'seat';
			seat.append(input);
			row.append(seat);
		}
		hall.append(row);
	}


	
	let seatsReq = new XMLHttpRequest();
	let seatsUrl = `http://cinema/php/returnFixedSeats.php?session=${session.idSessions}`;
	seatsReq.open('GET', seatsUrl, false);
	seatsReq.send();


	let seatsResp = JSON.parse(seatsReq.response); 
	
	seatsResp.forEach(item => {
		let place = document.getElementById(`${item.row} ${item.column}`);
		place.parentElement.classList.add('fixed');
	});


	let seatsArr = [];

	//ОБРАБОТКА ЩЕЛЧКОВ ПО МЕСТАМ В ЗАЛЕ
	hall.addEventListener('click', function(event) {
		if(event.target.classList.contains('fixed')) {
			return;
		}

		event.target.classList.toggle('seat-unit__sq--active');
		let checkbox = event.target.firstElementChild;


		if(checkbox.checked == true){
			checkbox.checked = false;
			countSeats--;
			let idx = seatsArr.indexOf(checkbox.value);
			seatsArr.splice(idx, 1);
		}else {
			checkbox.checked = true;
			countSeats++;
			seatsArr.push(checkbox.value);
		}

		console.log(seatsArr);

		finalCost = countSeats * session.Cost;
		cost.firstChild.replaceWith(`${session.Cost * countSeats}`)
	});	

	submit.addEventListener('click', function(event) {
		let cookie = getCookie('user');
		if(cookie == undefined) {
			alert('Оплата не прошла! Войдите в личный кабинет для оплаты!');
			return;
		}

		if(seatsArr.length == 0) {
			event.preventDefault();
			alert('необходимо выбрать место!');	
			return;
		}

		cookie = cookie.split('+');
		let idUser = cookie[cookie.length - 1];

		let req = new XMLHttpRequest();
		let url = `http://cinema/php/payment.php?id=${idUser}&seats=${seatsArr.join(' ')}&session=${session.idSessions}&number=${countSeats}`;
		req.open('GET', url, false);
		req.send();

		let resp = req.response;

		//ОБРАБОТКА ВАРИАНТОВ ОТВЕТА С СЕРВЕРА
		switch(resp) {
			case 'error1':
				alert('Транзакция не прошла! Повторите попытку!');
				break;
			case 'error2':
				alert('Недостаточно денег на счёте!');
				break;
			case 'error3':
				alert('Не получилось забронировать место! Повторите попытку!');
				break;
			case 'error4':
				alert('Не получилось создать билет! Повторите попытку!');
				break;
			case 'ok':
				alert('Транзакция прошла успешно!');
				break;	
			default:
				alert('Упс, какая-то неизвестная ошибка! Подалуйста сообщите об этом разработчику!');
				return;				
		}

		seatsReq.open('GET', seatsUrl, false);
		seatsReq.send();
		seatsResp = JSON.parse(seatsReq.response); 
	
		seatsResp.forEach(item => {
			let place = document.getElementById(`${item.row} ${item.column}`);
			place.parentElement.classList.add('fixed');
			place.parentElement.classList.remove('seat-unit__sq--active');
		});
	});
});