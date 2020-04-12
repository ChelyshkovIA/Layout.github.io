<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);
	
	$title       = $_POST['title'];
	$country     = $_POST['country'];
	$genre       = $_POST['genre'];
	$limitation  = $_POST['limitation'];
	$description = $_POST['description'];
	$trailerLink = $_POST['trailerLink'];
	$posterImage = $_POST['posterImage'];

	$picture_name = $title . '.jpg';
	if(isset($_FILES['posterImage'])){
		$errors = array();
		$file_name = $_FILES['posterImage']['name'];
		$file_size = $_FILES['posterImage']['size'];
		$file_tmp = $_FILES['posterImage']['tmp_name'];
		$file_type = $_FILES['posterImage']['type'];
		$file_ext = strtolower(end(explode('.',$_FILES['posterImage']['name'])));

		$expensions = array('jpeg', 'jpg', 'png');

		if($file_size > 2097152) {
			$errors[] = 'файл не должен быть 2 мб';
		}

		if(empty($errors) == true){
			move_uploaded_file($file_tmp, '../posterImages/'.$file_name);
		}else{
			echo 'test';
		}

	}

	$posterLink = 'cinema/posterImages/' . $file_name;
	$query = "INSERT INTO Films (Title, Country, Genre, Limitation, Description, TrailerLink, PosterLink) VALUES ('$title', '$country', '$genre', '$limitation', '$description', '$trailerLink', '$posterLink')";
 	$result = $connection_to_db->query($query);

 	$films_query = "SELECT * FROM Films";
	$result = $connection_to_db->query($films_query);
	$list = mysqli_fetch_all($result, MYSQLI_ASSOC);
	$json = json_encode($list, JSON_UNESCAPED_UNICODE);

	$json_file = fopen("../json/films.json","w");
	fwrite($json_file, $json);
	fclose($json_file);

	header("Location: ../index.php");
 ?>