addEventListener('DOMContentLoaded', function() {
	const CLIENT_ID_YMAPS = 'ce4293d3-32c9-46f0-9a73-6b28ecf9f0c8';
	ymaps.ready(init);

	let btnToEnt = document.getElementById('toEnt');
	let btnToReg = document.getElementById('toReg');

	let manualModeChbx = document.getElementsByName('route-master')[0];
	let autoModeChbx = document.getElementsByName('route-master')[1];
	let autoModeMaster = document.querySelector('.user-menu--auto-route-maker');
	let manualModeMaster = document.querySelector('.user-menu--manual-route-maker');
	let routeTitleAM  = document.getElementById('routeTitle-autoMaster');
	let routeDescriptionAM  = document.getElementById('routeDescription-autoMaster');

	let createAutoRouteBtn = document.getElementById('createAutoRoute');
	let saveAutoRouteBtn = document.getElementById('saveAutoRoute');
	let saveManualRouteBtn = document.getElementById('saveManualRoute');
	
	function initRouteBtn(map) {
		let showRouteBtn = document.getElementsByClassName('route-btn--show');
		let deleteRouteBtn = document.getElementsByClassName('route-btn--delete');
		
		for(let i = 0; i < showRouteBtn.length; i++) {
			showRouteBtn[i].addEventListener('click', function() {
				showRouteBtn[i].classList.add('hidden');
				if(this.parentElement['data-type'] == 'auto') {

					console.log('auto');

					let routeCoords = JSON.parse(this['data-track']);
					let userRoute = new ymaps.multiRouter.MultiRoute(
						{referencePoints: routeCoords}, 
						{boundsAutoApply: true} );

					map.geoObjects.add(userRoute);

					let hideRouteBtn = document.createElement('input');
					hideRouteBtn.type = 'button';
					hideRouteBtn.className = 'route-btn route-btn--hide';
					hideRouteBtn.value = 'Hide route';

					this.after(hideRouteBtn);

					hideRouteBtn.addEventListener('click', function() {
						showRouteBtn[i].classList.remove('hidden');
						map.geoObjects.remove(userRoute);
						hideRouteBtn.remove();
					});
				}else if(this.parentElement['data-type'] == 'manual') {
					showRouteBtn[i].classList.add('hidden');
					let routeCoords = JSON.parse(this['data-track']);
					let tempPolyline = new ymaps.Polyline(routeCoords, {}, {
				        strokeColor: "#2a96f0",
				        strokeWidth: 2,
				        editorMaxPoints: 1000,
				        editorMenuManager: function (items) {
				            items.push({
				                title: "Удалить линию",
				                onClick: function () {
				                    map.geoObjects.remove(tempPolyline);
				                }
				            });
				            return items;
				        }
				    });

				    
				    map.geoObjects.add(tempPolyline);

					let hideRouteBtn = document.createElement('input');
					hideRouteBtn.type = 'button';
					hideRouteBtn.className = 'route-btn route-btn--hide';
					hideRouteBtn.value = 'Hide route';

					this.after(hideRouteBtn);

					hideRouteBtn.addEventListener('click', function() {
						showRouteBtn[i].classList.remove('hidden');
						map.geoObjects.removeAll();
						hideRouteBtn.remove();
					});
				}else {
					customAlert('an error occurred - tell the developer', 'error');
				}
			});

			deleteRouteBtn[i].addEventListener('click', function() {
				let idRoute = this['data-id'];

				let deleteRouteReq = new XMLHttpRequest();
				let url = `http://SparrowMap/PHP/deleteRoute.php?idRoute=${idRoute}`;
				deleteRouteReq.open('GET', url);
				deleteRouteReq.send();

				deleteRouteReq.addEventListener('load', function() {
					if(deleteRouteReq.response == 'ok') {
						customAlert('Route successfull deleted!', 'success');
						deleteRouteBtn[i].parentElement.classList.add('hidden');
					}else {
						customAlert('ERROR TRY AGAIN!', 'error');
						console.log(deleteRouteReq.response);
					}
				});
				if (this.previousElementSibling.classList.contains('route-btn--hide')) {
					this.previousElementSibling.click();
				}
			});	
		}
	}

	function init() {
		let map = new ymaps.Map('map', {
			center: [54.438972, 27.246695],
			zoom: 10,
			controls: ['zoomControl', 'typeSelector'],
			behaviors: ['drag']
		});

		let coordArr = [];
		let polyline = false;
		let autoRoute = false;

		let mapCollection = new ymaps.GeoObjectCollection();


		saveManualRouteBtn.addEventListener('click', function() {
			if(!polyline)
				customAlert('Draw the route!', 'warning');
		});

		map.events.add('click', function(event) {

			if(autoModeChbx.checked || manualModeChbx.checked) {
				document.querySelector('.mode-label--button').addEventListener('click', function() {
					map.geoObjects.removeAll();

					createAutoRouteBtn.classList.remove('hidden');	
					saveAutoRouteBtn.classList.add('hidden');

					let routeInfoBlock = document.querySelector('.route-info');
					while(routeInfoBlock.children.length >= 1) {
						routeInfoBlock.children[0].remove();
					}

					coordArr = [];
				});
			}

			if(autoModeChbx.checked == true){

				let coords = event.get('coords');
				let tempNode = new ymaps.GeoObject({
					geometry: {
						type: 'Point',
						coordinates: coords
					}
				});
				coordArr.push(coords);

				mapCollection.add(tempNode);

				map.geoObjects.add(tempNode);

				tempNode.events.add('click', function(event) {
					let coords =  event.get('coords');
					coordArr.splice(coordArr.indexOf(coords), 1);
					map.geoObjects.remove(tempNode);
				});

			}else if(manualModeChbx.checked == true) {

				polyline = new ymaps.Polyline([], {}, {
					strokeColor: '#2a96f0',
                    strokeWidth: 2,
                     editorMenuManager: function (items) {
			            items.push({
			                title: "Удалить линию",
			                onClick: function () {
			                    map.geoObjects.remove(polyline);
			                }
			            });
			            return items;
			        }
                });
 
				map.geoObjects.add(polyline);
				polyline.editor.startEditing();	
				polyline.editor.startDrawing();	
				
			}
		});


		saveManualRouteBtn.addEventListener('click', function() {
			if(!polyline) {
				customAlert('Draw the route!', 'warning');
				return;	
			}
			if(this.form.title.value == '' || this.form.description.value == '') {
				customAlert('Enter all inputs!', 'warning');
				return;
			}

			let coordArr = polyline.geometry.getCoordinates();
			polyline = false;

			let addRouteReq = new XMLHttpRequest();
			let reqURL = 'http://sparrowmap/php/saveManualRoute.php';
			let body = `Track=${JSON.stringify(coordArr)}&Title=${this.form.title.value}&Description=${this.form.description.value}`;

			this.form.title.value = '';
			this.form.description.value = '';

			addRouteReq.open('POST', reqURL);
			addRouteReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			addRouteReq.send(body);

			addRouteReq.addEventListener('load', function() {
				switch(this.response) {
					case 'ok': 

						customAlert('Your route successfully saved!', 'success');
						map.geoObjects.removeAll();

						let routeListEl = document.querySelector('.route-list');

						while(routeListEl.children[0] != null) {
							routeListEl.children[0].remove();
						}

						coordArr = [];

						let autPr = new Promise(function(resolve) {
							autorisation(resolve);
						});
						autPr.then(function() {
							initRouteBtn(map);
						});

						break;
					case 'insert err':
						customAlert('Oops.. We have some trobles.. Try again!', 'warning');
						break;
					default:
						customAlert('FATAL ERROR! Say to developer!');
						return;		
				}
			});
		});

		createAutoRouteBtn.addEventListener('click', function() {
			if(coordArr.length <= 1) {
				customAlert('Draw the route!', 'warning');
				return;
			}
			autoRoute = new ymaps.multiRouter.MultiRoute(
				{referencePoints: coordArr}, 
				{boundsAutoApply: true} );

			map.geoObjects.add(autoRoute);

			autoRoute.editor.start();

			saveAutoRouteBtn.classList.remove('hidden');
			createAutoRouteBtn.classList.add('hidden');

			autoRoute.model.events.add('requestsuccess', function() {
				let activeRoute = autoRoute.getActiveRoute();

				let routeInfoBlock = document.querySelector('.route-info');
				while(routeInfoBlock.children.length >= 1) {
					routeInfoBlock.children[0].remove();
				}

			    let routeItem = document.createElement('li');
			    routeItem.className = 'route-info__item';
			    routeItem.append(activeRoute.properties.get("distance").text);
			    routeInfoBlock.append(routeItem);

			    routeItem = document.createElement('li');
			    routeItem.className = 'route-info__item';
			    routeItem.append("Travel time: " + activeRoute.properties.get("duration").text);
				routeInfoBlock.append(routeItem);
			});
		});

		saveAutoRouteBtn.addEventListener('click', function() {
			if(autoRoute == false) {
				customAlert('Draw the route!','warning');
				return;
			}
			if(routeTitleAM.value == '' || routeDescriptionAM.value == ''){
				customAlert('Enter all inputs!','warning');
				return;
			}

			createAutoRouteBtn.classList.remove('hidden');	
			saveAutoRouteBtn.classList.add('hidden');

			map.geoObjects.remove(autoRoute);
			autoRoute = false;

			let str = JSON.stringify(coordArr);
			let body = `Track=${str}&Title=${routeTitleAM.value}&Description=${routeDescriptionAM.value}`;

			routeTitleAM.value = '';
			routeDescriptionAM.value = '';

			let coordReq = new XMLHttpRequest();
			let url = 'http://SparrowMap/PHP/saveRoute.php';
			coordReq.open('POST', url);
			coordReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			coordReq.send(body);

			let routeInfoBlock = document.querySelector('.route-info');
			while(routeInfoBlock.children.length >= 1) {
				routeInfoBlock.children[0].remove();
			}

			coordReq.addEventListener('load', function() {
				if(coordReq.response == 'ok') {
					customAlert('Your route successfuly saved!', 'success');
					
					map.geoObjects.removeAll();

					let routeListEl = document.querySelector('.route-list');

					while(routeListEl.children[0] != null) {
						routeListEl.children[0].remove();
					}

					let autPr = new Promise(function(resolve) {
						autorisation(resolve);
					});

					autPr.then(function() {
						initRouteBtn(map);
					});

					coordArr = [];
				}else {
					console.log(coordReq.response);
				}
			});
		});

		btnToReg.addEventListener('click', function() {
			let form = this.form;
			let regReq = new XMLHttpRequest();
			let reqURL = 'http://SparrowMap/PHP/reg.php';
			regReq.open('POST', reqURL);
			regReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				
			let body = `RegName=${form.name.value}&RegEmail=${form.email.value}&RegPw1=${form['first-password'].value}&RegPw2=${form.password.value}`;
			regReq.send(body);

			regReq.addEventListener('load', function() {
				switch(this.response) {
					case 'err1':
						customAlert('Заполните все поля!', 'warning');
						break;
					case 'err2':
						customAlert('Пароли не совпадают!', 'warning');
						break;
					case 'err3':
						customAlert('Такой E-Mail уже существует!', 'warning');
						break;
					case 'ok':
						customAlert('Регистрация прошла успешно!', 'success');
						regForm.classList.add('closed');
						menu.classList.remove('closed');
						let autPr = new Promise(function(resolve) {
							autorisation(resolve);
						});
						autPr.then(function() {
							initRouteBtn(map);
						});
						
						break;
					default:
						break;				
				}
			});	

			regReq.addEventListener('error', function() {
				cosole.log(regReq.response);
			});
		});

		btnToEnt.addEventListener('click', function() {
			let entReq = new XMLHttpRequest();
			let entURL = 'http://SparrowMap/PHP/ent.php';
			entReq.open('POST', entURL);
			entReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			let body = `login=${this.form.login.value}&password=${this.form.password.value}`;
			entReq.send(body);

			entReq.addEventListener('load', function() {
				console.log(this.response);
				if(entReq.response == 'err1'){
					customAlert('login not specified', 'warning');
					return;
				}else if(entReq.response == 'err2'){
					customAlert('password not specified', 'warning');
					return;
				}else if(entReq.response == 'err3'){
					customAlert('not valid data!', 'error');
					return;
				}else if(entReq.response == 'ok') {
					customAlert('you have been successfully authorized', 'success');

					let autPr = new Promise(function(resolve) {
						autorisation(resolve);
					});
					autPr.then(function() {
						initRouteBtn(map);
					});
				}
			});
		});

		if(getCookie('user') != undefined){
			let autPr = new Promise(function(resolve) {
				autorisation(resolve);
			});
			autPr.then(function() {
				initRouteBtn(map);
			});
		}
	}


	let entForm = document.querySelector('.user-menu--ent');
	let regForm = document.querySelector('.user-menu--reg');
	let menu = document.querySelector('.user-menu--routes');
	
	let btnAddRoute = document.querySelector('.btn--add-route-btn');
	let btnUserMenu = document.querySelector('.btn--open-user-menu');
	let btnEnt = document.querySelector('.btn--ent');
	let btnReg = document.querySelector('.btn--reg');

	
	let btnExit = document.getElementById('exit');

	let routeModeBock = document.querySelector('.mode-label-block');
	
	let btnShowMap = document.getElementsByClassName('show-map');
	for(let i = 0; i < btnShowMap.length; i++) {
		btnShowMap[i].addEventListener('click', function() {
			this.parentElement.parentElement.classList.add('closed');
		});
	}

	function customAlert(text, type) {
		let map = document.querySelector('.map');

		let w = document.createElement('div');
		w.className = 'alert alert--twisted';
		let span = document.createElement('span');
		span.append(text);
		w.append(span);

		map.after(w);

		setTimeout(() => w.classList.remove('alert--twisted'), 100);

		switch(type) {
			case 'success':
				w.classList.add('alert--success');
				break;
			case 'warning':
				w.classList.add('alert--warning');
				break;
			case 'error':
				w.classList.add('alert--error');
				break;
			default:
				break;			
		}


		setTimeout(function() {
			w.classList.add('alert--twisted');
			setTimeout(function() {
				span.remove();
				w.remove();
			}, 2000);
		}, 3000);
	}

	function getCookie(name) {
	  let matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	  ));
	  return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	if(getCookie('user') === undefined) {
		btnAddRoute.classList.add('hidden');
		btnUserMenu.classList.add('hidden');
	}else {
		btnEnt.classList.add('hidden');
		btnReg.classList.add('hidden');
	}

	function autorisation(resolve) {
		let userReq = new XMLHttpRequest();
		let userURL = 'http://SparrowMap/PHP/returnUserInfo.php';
		userReq.open('GET', userURL);
		userReq.send();

		userReq.addEventListener('load', function() {
			if(userReq.response == 'err4') {
				customAlert('Ошибка авторизации :(', 'error');
				return;
			}
			entForm.classList.add('closed');
			regForm.classList.add('closed');
			menu.classList.remove('closed');
			let userNameEl = document.querySelector('.name--userName');
			let routeListEl = document.querySelector('.route-list');


			let userInfoArr = JSON.parse(userReq.response);
			let userName = userInfoArr[1].name;
			if(userNameEl.textContent == '')
				userNameEl.append(`Welcome, ${userName}!`);
			
				

			if(userInfoArr[0].json.length == 0) {
				let route = document.createElement('li');
				route.className = 'route-list__route route';
				route.append('You didn\'t add any routes');
				routeListEl.append(route);
			}else {

				
				userInfoArr[0].json.forEach(item => {
					let route = document.createElement('li');
					route.className = 'route-list__route route';
					route['data-type'] = item.Type;
					
					let title = document.createElement('h2');
					title.append(item.Title);
					title.className = 'route__title';

					let desc = document.createElement('h3');
					desc.append(item.Description);
					desc.className = 'route__desc';

					let showBtn = document.createElement('input');
					showBtn.type = 'button';
					showBtn.className = 'route-btn route-btn--show';
					showBtn.value = 'Show on the map';
					showBtn['data-track'] = item.Track;

					let deleteBtn = document.createElement('input');
					deleteBtn.type = 'button';
					deleteBtn.className = 'route-btn route-btn--delete';
					deleteBtn.value = 'Delete';
					deleteBtn['data-track'] = item.Track;
					deleteBtn['data-id'] = item.idRoute;

					route.append(title);
					route.append(desc);
					route.append(showBtn);
					route.append(deleteBtn);


					routeListEl.append(route);
				});
			}

			btnEnt.classList.add('hidden');
			btnReg.classList.add('hidden');
			btnUserMenu.classList.remove('hidden');
			btnAddRoute.classList.remove('hidden');

			resolve();
		});
	}

	if(btnUserMenu != null) {

		btnUserMenu.addEventListener('click', function() {
			menu.classList.remove('closed');

			entForm.classList.add('closed');
			regForm.classList.add('closed');
			autoModeMaster.classList.add('closed');
			manualModeMaster.classList.add('closed');
			document.getElementsByName('route-master')[0].checked = false;
			document.getElementsByName('route-master')[1].checked = false;
		});

		btnAddRoute.addEventListener('click', function() {
			routeModeBock.classList.remove('hidden');

			document.getElementsByName('route-master')[0].addEventListener('change', function() {
				manualModeMaster.classList.remove('closed');
				autoModeMaster.classList.add('closed');
				menu.classList.add('closed');
			});

			document.getElementsByName('route-master')[1].addEventListener('change', function() {
				autoModeMaster.classList.remove('closed');
				manualModeMaster.classList.add('closed');
				menu.classList.add('closed');
			});

			document.querySelector('.mode-label--button').addEventListener('click', function() {
				routeModeBock.classList.add('hidden');
				autoModeMaster.classList.add('closed');
				manualModeMaster.classList.add('closed');
				document.getElementsByName('route-master')[0].checked = false;
				document.getElementsByName('route-master')[1].checked = false;
			});
		});
	}		
	btnEnt.addEventListener('click', function() {
		menu.classList.add('closed');
		entForm.classList.remove('closed');
		regForm.classList.add('closed');
	});

	btnReg.addEventListener('click', function() {
		menu.classList.add('closed');
		entForm.classList.add('closed');
		regForm.classList.remove('closed');
	});
});