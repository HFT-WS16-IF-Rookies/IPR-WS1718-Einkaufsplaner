<?php
    $dbHost = 'localhost';
    // get machine specific password and user
    require './dbPassword.php';
    $dbDatabase = 'HFT_SS18_DBS_PurchasePlanner';

    $db = new mysqli("$dbHost", "$dbUser", "$dbPassword", "$dbDatabase");
    $db->set_charset("utf8");
?>
