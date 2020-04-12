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

	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);


	if($_POST['login'] == '') {
		die('err1');
	}else if($_POST['password'] == '') {
		die('err2');
	}

	
	$log = $_POST['login'];
	$pw = $_POST['password'];
	


	$pw = md5($pw."Qa1200PPlmx");

	
	$get_logpw = "SELECT Name as Name, Password AS Password, Email AS Email, idUser AS id FROM Users WHERE Password = '$pw' AND Email = '$log'";
	

	$result = $connection_to_db->query($get_logpw);
	$logpw_row = mysqli_fetch_array($result, MYSQLI_ASSOC);

	$userName    = $logpw_row['Name'];
	$userEmail   = $logpw_row['Email'];
	$userPw      = $logpw_row['Password'];
	$userId      = $logpw_row['id'];	

	$hash = md5(generateCode(10));
	if($userEmail == $log && $userPw == $pw){
		
		$updateUserQuery = "UPDATE Users SET Users.Hash = '$hash' WHERE Users.idUser = '$userId'";
		$connection_to_db->query($updateUserQuery);

		setcookie('hash', $hash , time() + 3600, '/');
		setcookie('user', $userId, time() + 3600, '/'); 
		die('ok');
	}else{
		die('err3');//проверить данные
	}
?>