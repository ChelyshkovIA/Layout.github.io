addEventListener('DOMContentLoaded', function() {
	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	let addCashInput  = document.querySelector('.add-cash__input');
	let addCashButton = document.querySelector('.header__menu-button-link--addCash');
	let addCashForm   = document.querySelector('.add-cash');
	let addCashSubmit = document.querySelector('.add-cash__submit');

	let userName = document.querySelector('.header__user-info-item--user');
	let currCash = document.querySelector('.header__user-info-item--cash');
	
	let idUser = getCookie('user')
	let hashUser = getCookie('hash');
	

	let req	= new XMLHttpRequest();
	let url = `http://cinema/php/returnUsersCash.php`;
	req.open('GET', url, false);
	req.send();

	let userInfoResp = JSON.parse(req.response);

	userName.append(`Добро пожаловать, ${userInfoResp.Name} ${userInfoResp.Surname}`);
	currCash.append(` ${userInfoResp.Cash} руб.`);
	addCashButton.addEventListener('click', function() {
		addCashForm.classList.toggle('add-cash--hidden');
	});	

	addCashSubmit.addEventListener('click', function(event) {
		event.preventDefault();
		if(addCashInput.value == '')
			return;
		
		let addCashURL = 'http://cinema/php/replenishAccount.php';

		let req = new XMLHttpRequest();
		req.open('POST', addCashURL, false);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		let body = `cash=${encodeURIComponent(addCashInput.value)}`;

		req.send(body);

		let resp = req.response;
		if(resp == 'error1') {
			alert('нельзя вводить отрицательную сумму!');
			return;
		}else if(resp == 'error2') {
			alert('вы ввели не число!');
			return;
		}
		
		currCash.lastChild.replaceWith(`${req.response} руб.`);
	});



	let ticketReq = new XMLHttpRequest();
	let ticketURL = `http://cinema/php/returnTicketInfo.php`;
	ticketReq.open('GET', ticketURL, false);
	ticketReq.send();

	let ticketArr = JSON.parse(ticketReq.response);

	console.log(ticketArr);

	
	let ticketBlock = document.querySelector('.main__tickets-block');
	let noTickets = document.querySelector('.main__about-tickets');

	if(ticketArr.length == 0) {
		noTickets.classList.remove('hidden');
	}

	ticketArr.forEach(item => {
		let arr = item.Date.split(' ')[0];
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

		let ticket = document.createElement('div');
		ticket.className = 'ticket';

		let ticketInfo = document.createElement('div');
		ticketInfo.className = 'ticket__text-info text-info';

		
		let film = document.createElement('p');
		film.className = 'text-info__item';
		film.append(`Фильм: ${item.Film}`);

		let cinema = document.createElement('p');
		cinema.className = 'text-info__item';
		cinema.append(`Кинотеатр: ${item.Cinema}`);

		let row = document.createElement('p');
		row.className = 'text-info__item';
		row.append(`Ряд: ${item.Row}`);

		let seat = document.createElement('p');
		seat.className = 'text-info__item';
		seat.append(`Место: ${item.Seat}`);

		let hall = document.createElement('p');
		hall.className = 'text-info__item';
		hall.append(`Зал: ${item.Hall}`);

		let date = document.createElement('p');
		date.className = 'text-info__item';
		date.append(`Дата: ${dateValue}`);

		let start = document.createElement('p');
		start.className = 'text-info__item';
		start.append(`Начало: ${item.Start}`);

		let end = document.createElement('p');
		end.className = 'text-info__item';
		end.append(`Конец: ${item.End}`);

		let warning = document.createElement('p');
		warning.className = 'text-info__warning';
		warning.append('Предъявите скриншот работнику кинотеатра!');

		let qrBlock = document.createElement('div');
		qrBlock.className = 'ticket__qr-block qr-block';

		let qr = document.createElement('img');
		qr.className = 'qr-block__qr qr';
		qr.alt = 'qr-code';
		qr.src= `https://qrcode.tec-it.com/API/QRCode?data=Row:${item.Row} Seat:${item.Seat} Session:${item.Session}&color=%232a96f0&backcolor=%23ffffff`;

		qrBlock.append(qr);

		ticketInfo.append(film);
		ticketInfo.append(cinema);
		ticketInfo.append(row);
		ticketInfo.append(seat);
		ticketInfo.append(hall);
		ticketInfo.append(date);
		ticketInfo.append(start);
		ticketInfo.append(end);
		ticketInfo.append(warning);

		ticket.append(ticketInfo);
		ticket.append(qrBlock);

		ticketBlock.append(ticket);
	});
});