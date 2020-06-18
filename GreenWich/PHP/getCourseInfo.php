<?php
    require_once('login.php');
    $connection_to_db = new mysqli($hn, $un, $pw, $db);

    $id = $_GET['c'];
    $query = "SELECT * FROM Courses WHERE id = '$id'";
    $res = $connection_to_db->query($query);

    if(!$res) {
        die('db_err');
    }

    $list = mysqli_fetch_all($res, MYSQLI_ASSOC);
    $json = json_encode($list, JSON_UNESCAPED_UNICODE);

	die($json);
?>