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
        $response = array();
        $response['state'] = "error";
        $response['text'] = "Es existiert kein Benutzer mit dieser E-Mail";
        echo json_encode($response);
        die();
    }

    $user = $result->fetch_assoc();

    if ($user['password'] !== $jsonData['password'])
    {
        http_response_code(200);
        $response = array();
        $response['state'] = "error";
        $response['text'] = "Passwort falsch!";
        echo json_encode($response);
        die();
    }

    session_start();
    $_SESSION['userID'] = $user['ID'];

    http_response_code(200);
    $response = array();
    $response['state'] = "success";
    $response['userID'] = $user['ID'];
    $response['firstName'] = $user['firstName'];
    $response['lastName'] = $user['lastName'];
    echo json_encode($response);
    die();
?>
