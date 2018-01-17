<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();
    $query = "SELECT householdID FROM HouseholdUsers WHERE userID=" . $jsonData['ID'];

    require './dbConnection.php';
    $resultMain = $db->query($query);
    $db->close();

    if(!$resultMain)
    {
        http_response_code(200);
        $metaData['state'] = "dumbUser";
        $metaData['reason'] = "user not found(HouseholdUsers)";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    while(($row = $resultMain->fetch_assoc()) !== null)
    {
        $query = "SELECT name FROM Household WHERE ID=" . $row['householdID'];
        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        if(!$result)
        {
            $metaData = array();
            $metaData['state'] = "success";
            $metaData['response'] = "name not found(Household)";
            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }

        $householdName = $result->fetch_assoc();
        $household['name'] = $householdName['name'];
        $household['householdID'] = $row['householdID'];
        $data['household_' . $row['householdID']] = $household;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $metaData['response'] = "householdList";

    $data['metaData'] = $metaData;
    http_response_code(200);
    echo json_encode($data);
    die();
?>
