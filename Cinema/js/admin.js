addEventListener('DOMContentLoaded', () => {
	let forms          = document.getElementsByClassName('admin-form');
	let openFormBut    = document.getElementsByClassName('menu-button--open-form');
	let closeFormBut   = document.getElementsByClassName('admin-form__go-back');
	let bg             = document.getElementsByClassName('bg')[0];

	for(let i = 0; i < forms.length; i++){
		openFormBut[i].addEventListener('click', () => {
			forms[i].classList.add('admin-form--active');
			bg.classList.add('bg--active');
			document.body.style.overflow = 'hidden';
		});

		closeFormBut[i].addEventListener('click', () => {
			forms[i].classList.remove('admin-form--active');
			bg.classList.remove('bg--active');
			document.body.style.overflow = 'visible';
		});
	}

	let findButton = document.getElementsByClassName('find-button');

	for(let i = 0; i < findButton.length; i++) {
		findButton[i].addEventListener('click', (event) => {
			let par;
			switch(event.target.form.id) {
				case 'find-film-form':
					par = 'Film';
					break;
				case 'find-session-form':
					par = 'Session';
					break;
				case 'find-cinema-form':
					par = 'Cinema';
					break;
				case 'find-hall-form':
					par = 'Hall';
					break;
				default:
					console.log('ошибка параметра!');
					break;			
			}
			findEntity(par, event.target.form);
		});
	}


	function findEntity(par, form) {
		if(document.querySelector('.json-resp')){
			document.querySelector('.json-resp').remove();
		}
		let req = new XMLHttpRequest();
		let url = 'http://cinema/json/' + par.toLowerCase() + 's.json?nocache=' + (new Date).getTime();
		req.open('GET', url, false);
		req.send();

		let json = req.response;
		let arr = JSON.parse(json);

		let newArr = arr.filter((item) => {
			for(let i = 0; i < form.elements.length - 1; i++) {
				let prop = form.elements[i].name;
				if(!(item[prop].toLowerCase().includes(form.elements[i].value.toLowerCase()))) {
					return false;
				}
			}
			return true;
		});

		console.log(newArr);

		let jsonResp = document.createElement('div');
		jsonResp.className = 'json-resp';
		if(!newArr.length){
			let text = document.createElement('div');
			text.append('По вашему запросу не найдено фильмов.');
			text.className = 'json-resp__text';
			jsonResp.append(text);
		}else{
			newArr.forEach((item) => {
				let element = document.createElement('a');
				// element.href = 'edit' + par + '.html?';
				element.href = 'edit.html?';
				for(prop in item) {
					if(prop == 'TrailerLink') {
						element.href += prop + '=' + encodeURIComponent(item[prop]) + '&';
						continue;
					}
					element.href += prop + '=' + item[prop] + '&';
				}

				//----test!
				element.href += 'param=' + par;
				//----

				switch(par) {
					case 'Film':
						element.append(item.Title);
						break;
					case 'Session':
						element.append(item.Film + ' - ');
						element.append(item.Cinema + ' - ');
						element.append(item.HallsNumber + ' - ');
						element.append(item.Date + ' - ');
						element.append(item.Start + ' - ');
						element.append(item.End + ' - ');
						break;
					case 'Hall':
						element.append(item.HallsNumber + ' - ');
						element.append(item.Cinema + ' - ');
						element.append(item.City + ' - ');
						break;
					case 'Cinema':
						element.append(item.Title);
						break;			
				}
	

				element.className = 'json-resp__film';
				jsonResp.append(element);
			});
		}

		form.append(jsonResp);
	}
	

	let clearSessBut = document.querySelector('.menu-button--clear');

	clearSessBut.addEventListener('click', function() {
		let clearReq = new XMLHttpRequest();
		let url = `http://cinema/php/clearSessions.php`;
		clearReq.open('GET', url, false);
		clearReq.send();
	});
});