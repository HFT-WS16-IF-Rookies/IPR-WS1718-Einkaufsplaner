<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();

    $query = "select userID from HouseholdUsers where householdID = " . $jsonData['ID'];
    require './dbConnection.php';
    $result = $db->query($query);

    while (($row = $result->fetch_assoc()) !== null)
    {
        $user = array();
        $query = "select firstName, lastName from Users where ID = " . $row['userID'];
        require './dbConnection.php';
        $userResult = $db->query($query);
        $db->close();
        $userRow = $userResult->fetch_assoc();

        $user['firstName'] = $userRow['firstName'];
        $user['lastName'] = $userRow['lastName'];

        $data[$row['userID']] = $user;
    }

    $metaData = array();
    $metaData['state'] = 'success';
    $data['metaData'] = $metaData;

    echo json_encode($data);
    die();
?>
