<?php
    session_start();
    $userid = $_SESSION['userID'];
    if (!$userid)
    {
        http_response_code(403);
        die();
    }
?>
