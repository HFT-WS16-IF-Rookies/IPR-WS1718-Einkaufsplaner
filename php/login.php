<?php
    require './logout.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['email'] === null || $jsonData['password'] === null)
    {
        http_response_code(400);
        die();
    }

    require './dbConnection.php';

    $query = "SELECT * FROM $dbDatabase.Users WHERE email = '" . $jsonData['email'] . "'";
    $result = $db->query($query);
    $db->close();

    if ($result->num_rows > 1)
    {
        http_response_code(500);
        die();
    }

    if ($result->num_rows === 0)
    {
        http_response_code(200);
        $metaData = array();
        $metaData['state'] = "error";
        $metaData['text'] = "Es existiert kein Benutzer mit dieser E-Mail";

        $data = array();
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    $user = $result->fetch_assoc();

    if ($user['password'] !== $jsonData['password'])
    {
        http_response_code(200);
        $metaData = array();
        $metaData['state'] = "error";
        $metaData['text'] = "Passwort falsch!";

        $data = array();
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    session_start();
    $_SESSION['userID'] = $user['userID'];

    http_response_code(200);
    $metaData = array();
    $metaData['state'] = "success";

    $data = array();
    $data['metaData'] = $metaData;
    $userData = array();
    $userData['userID'] = $user['userID'];
    $userData['firstName'] = $user['firstName'];
    $userData['lastName'] = $user['lastName'];
    $userData['email'] = $user['email'];

    $data['user'] = $userData;
    echo json_encode($data);
    die();
?>
