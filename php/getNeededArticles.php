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

    $query = "select storeName, articleName, (maxAmount - currentAmount) as neededAmount
                from Articles
                natural join Household
                natural join Store
                where
                    maxAmount > currentAmount
                    and householdID = '" . $jsonData['ID'] . "'
                order by storeName";
    $result = $db->query($query);
    $db->close();

    if ($result->num_rows === 0)
    {
        http_response_code(200);
        $metaData = array();
        $metaData['state'] = "success";
        $metaData['reason'] = "empty";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    while(($article = $result->fetch_assoc()) !== null)
    {
        if ($article['articleName'] === null)
        {
            http_response_code(500);
            die();
        }
        $nextArticle = array();
        $nextArticle['storeName'] = $article['storeName'];
        $nextArticle['articleName'] = $article['articleName'];
        $nextArticle['neededAmount'] = $article['neededAmount'];

        $data[$article['articleName']] = $nextArticle;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $metaData['reason'] = "articleList";
    $data['metaData'] = $metaData;

    http_response_code(200);
    echo json_encode($data);
    die();
?>
