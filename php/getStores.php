<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    /*
    if ($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }
    */

    $data = array();

    require './dbConnection.php';
    $query = "select * from Store ";
    $result = $db->query($query);
    $db->close();

    if ($result->num_rows === 0)
    {
        http_response_code(200);
        $metaData = array();
        $metaData['state'] = "dumbUser";
        $metaData['reason'] = "nicht gefunden";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    $results = array();
    while(($row = $result->fetch_assoc()) !== null)
    {
        if ($row['storeName'] === null)
        {
            http_response_code(500);
            die();
        }

        $nextStore = array();
        $nextArticle['name'] = $row['storeName'];
        $nextArticle['storeID'] = $row['storeID'];
        $data[$row['storeName']] = $nextArticle;

    }

    $metaData = array();
    $metaData['state'] = "success";
    $data['metaData'] = $metaData;

    http_response_code(200);
    echo json_encode($data);
    die();

?>
