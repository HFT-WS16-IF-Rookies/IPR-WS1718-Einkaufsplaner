<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    //echo print_r($jsonData, true);
    if ($jsonData[0]['id'] === null)
    {
        http_response_code(400);
        die();
    }

    for ($i = 0; $i < sizeof($jsonData); $i++) {
        require './dbConnection.php';
        $query = "update PurchaseArticles set found=".$jsonData[$i]['found']." where purchaseID=" .$jsonData[$i]['id']." and articleID=".$jsonData[$i]['articleID'];
        $result = $db ->query($query);
        $db->close();
    }


    $metaData = array();
    $metaData['state'] = "success";
    $data = array();
    $data['metaData'] = $metaData;
    echo json_encode($data);
    die();
?>
