<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);
    echo print_r($jsonData, true);

    if($jsonData === null)
    {
        http_response_code(400);
        die();
    }
    $query = "delete * from Articles where ID = '" . $jsonData . "'";
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

?>
