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
		isset($_POST['RegName']) && 
		isset($_POST['RegSurname']) && 
		isset($_POST['RegEmail']) && 
		isset($_POST['RegPw1']) && 
		isset($_POST['RegPw2'])
	){
		$name = $_POST['RegName'];
		$surname = $_POST['RegSurname'];
		$email = strtolower($_POST['RegEmail']);
		$pw1 = $_POST['RegPw1'];
		$pw2 = $_POST['RegPw2'];
	}else{
		header("Location: ../index.php");
	}

	if($pw1 != $pw2){
		header("Location: ../index.php");
		exit();
	}
	
	$is_exists_email_query = "SELECT Email FROM Users WHERE Email = '$email'";
	$result_email_q = $connection_to_db->query($is_exists_email_query);

	$row_email = $result_email_q->fetch_array(MYSQLI_ASSOC);

	if($email == $row_email['Email']){
		header('Location: ../index.php');
		exit();
	}

	$pw1 = md5($pw1."Qa1200PPlmx"); 

	if(strpos($email, 'admin000@') !== false){
		$add_admin_to_db_query = "INSERT INTO Admines (Name, Surname, Email, Password, hash) VALUES ('$name', '$surname', '$email', '$pw1', '$hash')";
		$insert_res = $connection_to_db->query($add_admin_to_db_query);

		$getAdminIDQuery = "SELECT Admines.idAdmines AS Id FROM Admines WHERE Email = '$email'";
		$result = $connection_to_db->query($getAdminIDQuery);
		$id = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$id = $id['Id']; 
		
		setcookie('admin', $id, time() + 3600, '/');
		setcookie('hash', $hash, time() + 3600, '/');
		header("Location: ../admin.php"); 
		exit();
	}
	$add_user_to_db_query = "INSERT INTO Users (Name, Surname, Email, Password, hash) VALUES ('$name', '$surname', '$email', '$pw1', '$hash')";
	$insert_res = $connection_to_db->query($add_user_to_db_query);

	$getUserIDQuery = "SELECT Users.idUsers AS Id FROM Users WHERE Email = '$email'";
	$result = $connection_to_db->query($getUserIDQuery);
	$id = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$id = $id['Id'];

	setcookie('user', $id, time() + 3600, '/'); 
	setcookie('hash', $hash, time() + 3600, '/');

	header("Location: ../user.php");
?>