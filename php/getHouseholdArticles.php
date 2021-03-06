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

    $query = "select * from Articles where householdID = '" . $jsonData['ID'] . "'";
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

    $neededArticles = $result->fetch_assoc();

    $query = "select * from Articles where householdID = '" . $jsonData['ID'] . "'";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    while(($article = $result->fetch_assoc()) !== null)
    {
        $articleID = $article['articleID'];
        require './getStoreName.php';

        $nextArticle = array();
        $nextArticle['name'] = $article['articleName'];
        $nextArticle['storeName'] = $storeName;
        $nextArticle['currentAmount'] = $article['currentAmount'];
        $nextArticle['minAmount'] = $article['minAmount'];
        $nextArticle['maxAmount'] = $article['maxAmount'];
        $nextArticle['priority'] = $article['priority'];
        $nextArticle['ID'] = $article['articleID'];
        $data[$article['articleName']] = $nextArticle;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $data['metaData'] = $metaData;

    http_response_code(200);
    echo json_encode($data);
    die();
?>
