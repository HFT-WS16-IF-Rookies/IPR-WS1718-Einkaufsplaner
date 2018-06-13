<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if($jsonData['userID'] === null || $jsonData['name'] === null)
    {
        http_response_code(400);
        die();
    }

    $query = "INSERT INTO Household (householdName) VALUES('" . $jsonData['name'] . "')";

    require './dbConnection.php';

    $last_id = null;

    if($db->query($query) === true)
    {
        $last_id = $db->insert_id;
        $db->close();
    }
    else
    {
        echo http_response_code(500);
        die();
    }

    require './dbConnection.php';
    $query = "INSERT INTO HouseholdUsers (householdID, userID) VALUES(" . $last_id . ", " . $jsonData['userID'] . ")";
    $dbState = $db->query($query);
    $db->close();

    if ($dbState)
    {}
    else
    {
        http_response_code(500);
        die();
    }
?>
