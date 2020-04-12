<?php 
	setcookie('user', $userInfo, time() - 3600, '/');
	setcookie('hash', $userInfo, time() - 3600, '/');
	header("Location: ../index.php");
?>