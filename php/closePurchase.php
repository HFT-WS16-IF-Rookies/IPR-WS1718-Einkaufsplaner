<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    echo print_r($jsonData, true);
    if ($jsonData[0]['id'] === null)
    {
        http_response_code(400);
        die();
    }


    require './dbConnection.php';
    for ($i = 0; $i <= $jsonData.length; $i++) {

        $query = "update PurchaseArticles set found='".$jsonData[i]['found']."' where purchaseID ='"$jsonData[i]['id']"' and articleID='"$jsonData[i]['articleID']"'";
        $result = $db ->query($query);
    }
    $db.close();


?>
