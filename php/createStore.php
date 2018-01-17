<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if($jsonData['newStoreName'] === null)
    {
        http_response_code(400);
        die();
    }

    $query = "select * from Store where name = '" . $jsonData['newStoreName'] . "'";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();
    if ($result->num_rows !== 0)
    {
        $metaData = array();
        $metaData['state'] = 'error';
        $metaData['case'] = 'exists yet';

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }

    $query = "insert into Store (name) values('" . $jsonData['newStoreName'] . "')";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();
    if ($result)
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
        $metaData['case'] = 'creation failed';

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }
?>
