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
        $metaData['reason'] = "not found";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    $neededArticles = $result->fetch_assoc();
    /*echo print_r($purchase, true);
    die();*/

    $query = "select * from Articles where householdID = '" . $jsonData['ID'] . "'";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    while(($article = $result->fetch_assoc()) !== null)
    {
        $query = "select * from Articles";

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
        $nextArticle['name'] = $articleName['name'];
        $nextArticle['currentAmount'] = $article['currentAmount'];
        $nextArticle['minAmount'] = $article['minAmount'];
        $nextArticle['maxAmount'] = $article['maxAmount'];
        $nextArticle['priority'] = $article['priority'];
        $data[$articleName['name']] = $nextArticle;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $data['metaData'] = $metaData;

    http_response_code(200);
    echo json_encode($data);
    die();
?>
