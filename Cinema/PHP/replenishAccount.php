<?php 
	require_once("login.php");
	$connection_to_db = new mysqli($hn, $un, $pw, $db);

	$cash = (float) $_POST['cash'];
	$user = $_COOKIE['user'];


	//error1 - отрицательная сумма
	//error2 - cash - не число
	if($cash <= 0) {
		die('error1');
	}else if(!is_float($cash)) {
		die ('error2');
	}

	$selectCash = "SELECT Users.cash FROM Users WHERE Users.idUsers = '$user'";
	$beginTr    = "BEGIN";
	$update     = "UPDATE Users SET Cash = Cash + '$cash' WHERE Users.idUsers = '$user'";
	$rollback   = "ROLLBACK";
	$commit     = "COMMIT";

	$result = $connection_to_db->query($selectCash);
	$cashBefore = mysqli_fetch_array($result, MYSQLI_ASSOC);
	$cashBefore = $cashBefore['cash'];

	$result = $connection_to_db->query($beginTr);
	$result = $connection_to_db->query($update);

	$cashAfter = mysqli_fetch_array($connection_to_db->query($selectCash), MYSQLI_ASSOC);
	$cashAfter = $cashAfter['cash'];

	if(($cashAfter - $cash) == $cashBefore) {
		$connection_to_db->query($commit);
		die ($cashAfter);
	} else {
		$connection_to_db->query($rollback);
		die('transaction error');
	}
 ?>