<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);
    echo print_r($jsonData, true);
?>
