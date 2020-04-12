<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$id = $_POST['id'];
	$title = $_POST['title'];
	$poster = $_POST['poster'];

	$picture_name = $title . '.jpg';

	if(isset($_FILES['poster'])){
		$errors = array();
		$file_name = $_FILES['poster']['name'];
		$file_size = $_FILES['poster']['size'];
		$file_tmp = $_FILES['poster']['tmp_name'];
		$file_type = $_FILES['poster']['type'];
		$file_ext = strtolower(end(explode('.',$_FILES['poster']['name'])));

		$expensions = array('jpeg', 'jpg', 'png');

		if($file_size > 5097152) {
			$errors[] = 'файл не должен быть 5 мб';
		}

		if(empty($errors) == true){
			
			
			if(move_uploaded_file($file_tmp, '../posterImages/'.$file_name)){

				//ТУТ КОСЯК - УДАЛЯЕТ ФАЙЛ, ЕСЛИ ПОСТЕРА НЕ БЫЛО ДО EDIT.PHP
				$deleteFileQuery = "SELECT PosterLink FROM Films WHERE idFilms = '$id'";
				$result = $connection_to_db->query($deleteFileQuery);
				$address_str = $result->fetch_array(MYSQLI_ASSOC);
				$deleteImgName = $address_str['PosterLink'];
				unlink('../../' . $deleteImgName);

				$posterLink = 'cinema/posterImages/' . $file_name;
				$query = "UPDATE Films SET PosterLink = '$posterLink' WHERE idFilms = '$id'";	

				$connection_to_db->query($query);

				$films_query = "SELECT * FROM Films";
				$result = $connection_to_db->query($films_query);
				$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
				$json = json_encode($list, JSON_UNESCAPED_UNICODE);

				$json_file = fopen("../json/films.json","w");
				fwrite($json_file, $json);
				fclose($json_file);

				
				echo $posterLink;
			}
		}else{
			echo 'что-то пошло не так!';
		}

	}
 ?>