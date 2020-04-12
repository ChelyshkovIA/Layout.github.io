addEventListener('DOMContentLoaded', () => {
	let inputPoster = document.getElementById('filmPoster');


	function sendImagePOST (event) {
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



	}
	inputPoster.addEventListener('change', sendImagePOST);

});