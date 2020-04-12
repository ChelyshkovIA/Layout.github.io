<?php 
	function generateCode($length=6) {
	    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";
	    $code = "";
	    $clen = strlen($chars) - 1;
	    while (strlen($code) < $length) {
	            $code .= $chars[mt_rand(0,$clen)];
	    }
	    return $code;
	}

	$hash = md5(generateCode(10));

	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);
	if(!$connection_to_db){
		die("error with connection");
	}

	if(
		$_POST['RegName'] !== '' && 
		$_POST['RegEmail'] !== '' && 
		$_POST['RegPw1'] !== '' && 
		$_POST['RegPw2'] !== ''
	){
		$name = $_POST['RegName'];
		$email = strtolower($_POST['RegEmail']);
		$pw1 = $_POST['RegPw1'];
		$pw2 = $_POST['RegPw2'];
	}else{
		die('err1');
	}

	if($pw1 != $pw2){
		die('err2');
	}
	
	$is_exists_email_query = "SELECT Email FROM Users WHERE Email = '$email'";
	$result_email_q = $connection_to_db->query($is_exists_email_query);

	$row_email = $result_email_q->fetch_array(MYSQLI_ASSOC);

	if($email == $row_email['Email']){
		die('err3');//email exists
	}

	$pw1 = md5($pw1."Qa1200PPlmx"); 

	
	$add_user_to_db_query = "INSERT INTO Users (Name, Email, Password, Hash) VALUES ('$name', '$email', '$pw1', '$hash')";
	$insert_res = $connection_to_db->query($add_user_to_db_query);

	$getUserIDQuery = "SELECT Users.idUser AS Id FROM Users WHERE Email = '$email'";
	$result = $connection_to_db->query($getUserIDQuery);
	$id = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$id = $id['Id'];

	setcookie('user', $id, time() + 3600, '/'); 
	setcookie('hash', $hash, time() + 3600, '/');

	echo('ok');
?>