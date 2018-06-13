<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();

    require './dbConnection.php';

    $query = "select * from Purchase where purchaseID = '" . $jsonData['ID'] . "'";
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

    if ($result->num_rows > 1)
    {
        http_response_code(500);
        die();
    }

    $purchase = $result->fetch_assoc();
    /*echo print_r($purchase, true);
    die();*/

    $query = "select * from PurchaseArticles where purchaseID = '" . $purchase['purchaseID'] . "'";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    while(($article = $result->fetch_assoc()) !== null)
    {
        $query = "select articleName from Articles where articleID = '" . $article['articleID'] . "'";

        require './dbConnection.php';
        $articleResult = $db->query($query);
        $db->close();
        $articleName = $articleResult->fetch_assoc();
        if ($articleName === null)
        {
            http_response_code(500);
            die();
        }

        $nextArticle = array();
        $nextArticle['name'] = $articleName['articleName'];
        $nextArticle['amount'] = $article['amount'];
        $nextArticle['found'] = $article['found'];
        $nextArticle['id'] = $jsonData['ID'];
        $nextArticle['articleID'] = $article['articleID'];


        $data[$articleName['articleName']] = $nextArticle;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $data['metaData'] = $metaData;

    http_response_code(200);
    echo json_encode($data);
    die();
?>
