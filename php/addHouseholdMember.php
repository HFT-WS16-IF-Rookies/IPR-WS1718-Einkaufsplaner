<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['householdID'] === null || $jsonData['newUser'] === null)
    {
        http_response_code(400);
        die();
    }

    $query = "select ID from Users where email = '" . $jsonData['newUser'] . "'";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    if($result->num_rows === 0)
    {
        $metaData = array();
        $metaData['state'] = 'error';
        $metaData['case'] = 'Benutzer nicht gefunden';

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }

    $newUserID = $result->fetch_assoc()['ID'];

    $query = "select * from HouseholdUsers where"
        ." householdID = " . $jsonData['householdID']
        ." and userID = " . $newUserID;
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    if ($result->num_rows === 0)
    {
        $query = "insert into HouseholdUsers (householdID, userID)" .
            "values(" . $jsonData['householdID'] . ", " . $newUserID . ")";

        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        if($result)
        {
            $metaData = array();
            $metaData['state'] = 'success';

            $data = array();
            $data['metaData'] = $metaData;

            echo json_encode($data);
            die();
        }
        else
        {
            $metaData = array();
            $metaData['state'] = 'error';
            $metaData['case'] = 'DB Fehler';

            $data = array();
            $data['metaData'] = $metaData;

            echo json_encode($data);
            die();
        }
    }

    $metaData = array();
    $metaData['state'] = 'error';
    $metaData['case'] = 'Benutzer ist schon Mitglied';

    $data = array();
    $data['metaData'] = $metaData;

    echo json_encode($data);
    die();
?>
