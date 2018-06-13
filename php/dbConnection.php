<?php
    $dbHost = 'localhost';
    $dbUser = 'lukas';
    $dbPassword = 'password';
    $dbDatabase = 'HFT_SS18_DBS_PurchasePlanner';

    $db = new mysqli("$dbHost", "$dbUser", "$dbPassword", "$dbDatabase");
    $db->set_charset("utf8");
?>
