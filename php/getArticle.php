<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['articleID'] === null)
    {
        http_response_code(400);
        die();
    }

    $query = 'select * from Articles where articleID=' . $jsonData['articleID'];
    require './dbConnection.php';
    $result = $db->query($query);

    if ($result->num_rows !== 1)
    {
        $metaData = array();
        $metaData['state'] = 'error';
        $metaData['case'] = 'not found';

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }

    $articleRS = $result->fetch_assoc();

    $article = array();
    $articleID = $articleRS['articleID'];
    require './getStoreName.php';
    $article['articleID'] = $articleRS['articleID'];
    $article['name'] = $articleRS['articleName'];
    $article['store'] = $storeName;
    $article['currentAmount'] = $articleRS['currentAmount'];
    $article['minAmount'] = $articleRS['minAmount'];
    $article['maxAmount'] = $articleRS['maxAmount'];
    $article['priority'] = $articleRS['priority'];

    $metaData = array();
    $metaData['state'] = 'success';

    $data = array();
    $data['metaData'] = $metaData;
    $data['article'] = $article;

    echo json_encode($data);
    die();
?>
