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
    require './dbConnection.php';
    $query = "update Purchases set done=true where ID =".$jsonData[0]['id'];
    $result = $db ->query($query);
    $db->close();

    for ($i=0; $i < sizeof($jsonData); $i++)
    {
        $query = "select amount, found from PurchaseArticles where purchaseID="
            .$jsonData[$i]['id'] . " and articleID="
            .$jsonData[$i]['articleID'];

        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        $row = $result->fetch_assoc();
        $query = "update Articles set currentAmount=currentAmount-"
            . ($row['amount'] - $row['found'])
            . " where ID=" . $jsonData[$i]['articleID'];

        require './dbConnection.php';
        if (!$db->query($query))
        {
            http_response_code(500);
            die();
        }
    }

    $metaData = array();
    $metaData['state'] = "success";
    $data = array();
    $data['metaData'] = $metaData;
    echo json_encode($data);
    die();
?>
