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
	if(isset($_POST['login']) && isset($_POST['password'])){
		$log = $_POST['login'];
		$pw = $_POST['password'];
	}


	$pw = md5($pw."Qa1200PPlmx");

	if(strpos($log, 'admin000@')!== false){
		$get_logpw = "SELECT Name, Surname, Password, Email, idAdmines AS id FROM Admines WHERE Password = '$pw' AND Email = '$log'";
	}else{
		$get_logpw = "SELECT Name, Surname, Password, Email, idUsers AS id FROM Users WHERE Password = '$pw' AND Email = '$log'";
	}

	$result = $connection_to_db->query($get_logpw);
	$logpw_row = $result->fetch_array(MYSQLI_ASSOC);

	$userName    = $logpw_row['Name'];
	$userSurname = $logpw_row['Surname'];
	$userEmail   = $logpw_row['Email'];
	$userPw      = $logpw_row['Password'];
	$userId      = $logpw_row['id'];	

	// $userInfo = $userName . " " . $userSurname . " " . $userEmail . " " . $userId;


	$userInfo = $userId;
	$hash = md5(generateCode(10));
	if($userEmail == $log && $userPw == $pw){
		if(strpos($userEmail, 'admin000@') !== false){


			$updateAdminQuery = "UPDATE Admines SET Admines.Hash = '$hash' WHERE Admines.idAdmines = '$userId'";
			$connection_to_db->query($updateAdminQuery);

			setcookie('hash', $hash , time() + 3600, '/');
			setcookie('admin', $userInfo, time() + 3600, '/');
			header("Location: ../admin.php");
			exit(); 	
		}	


		$updateUserQuery = "UPDATE Users SET Users.Hash = '$hash' WHERE Users.idUsers = '$userId'";
		$connection_to_db->query($updateUserQuery);

		setcookie('hash', $hash , time() + 3600, '/');
		setcookie('user', $userInfo, time() + 3600, '/'); 
		header("Location: ../user.php");
	}else{
		header("Location: ../index.php");
	}
?>