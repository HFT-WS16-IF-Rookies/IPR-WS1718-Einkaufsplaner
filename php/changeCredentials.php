<?php
    $jsonData= json_decode(file_get_contents('php://input'), true);

    if($jsonData['userID'] === null || $jsonData['change'] === null)
    {
        http_response_code(400);
        die();
    }


    $query = "SELECT * FROM $dbDatabase.Users WHERE ID = " . $jsonData['userID'];

    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();
    $user = $result->fetch_assoc();
    if ($user === null)
    {
        http_response_code(500);
        die();
    }

    if($jsonData['change'] === 'email')
    {
        changeMail($jsonData['userID'], $jsonData['email']);
    }
    elseif($jsonData['change'] === 'password')
    {
        changePassword($jsonData['userID'], $jsonData['password']);
    }

    function changeMail($userID, $email)
    {
        $query = "select * from Users where email = '" . $email . "'";
        require './dbConnection.php';
        $dbState = $db->query($query);
        $db->close();

        $data = array();
        if ($dbState->num_rows !== 0)
        {
            $metaData = array();
            $metaData['state'] = 'error';
            $metaData['text'] = 'email is in use';

            $data['metaData'] = $metaData;

            http_response_code(200);
            echo json_encode($data);
            die();
        }

        $query = "update Users set `email`='" . $email . "' where ID = " . $userID;
        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        if (!$result)
        {
            $metaData = array();
            $metaData['state'] = 'error';
            $metaData['text'] = 'db error';

            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }
        else
        {
            $metaData = array();
            $metaData['state'] = 'success';

            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }
    }

    function changePassword($userID, $password)
    {
        $queryPasswordChange = "Update Users set `password`='" . $password ."' where ID = " . $userID;

        require './dbConnection.php';
        $dbState = $db->query($queryPasswordChange);
        $db->close();

        if (!$dbState)
        {
            $metaData = array();
            $metaData['state'] = 'error';
            $metaData['text'] = 'db error';

            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }
        else
        {
            $metaData = array();
            $metaData['state'] = 'success';

            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }
    }

?>
