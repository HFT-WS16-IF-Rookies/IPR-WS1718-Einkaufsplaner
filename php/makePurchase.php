<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    echo print_r($jsonData, true);

    require './dbConnection.php';
    $query = "insert into Purchases (userID) values(".$jsonData['id'].")";
    $result = $db ->query($query);
    $db->close();

    require './dbConnection.php';
    $query = "insert into Purchases (userID) values(".$jsonData['id'].")";
    if ($db->query($query) === TRUE) {
    $last_id = $db->insert_id;
    $db->close();

    require './dbConnection.php';
    $query = "insert into PurchaseHouseholds (purchaseID, userID) values("$last_id",".$jsonData['ID'].")";
    $result = $db->query($query);
    $db->close();

    require './dbConnection.php';
    $query = "select * from Articles where householdID = '" . $jsonData['ID'] . "' and storeID = '".$jsonData['store']."' and currentAmount < maxAmount";
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

    while(($article = $result->fetch_assoc()) !== null)
    {
        if ($article['name'] === null)
        {
            http_response_code(500);
            die();
        }

            $nextArticle = array();
            $nextArticle['name'] = $article['name'];
            $nextArticle['neededAmount'] = $article['maxAmount'] - $article['currentAmount'];
            $nextArticle['ID'] = $article['ID']

    }

    require './dbConnection.php';
    $query = "insert into PurchaseArticles (purchaseID, userID) values("$last_id",".$jsonData['ID'].")";
    $result = $db->query($query);
    $db->close();
?>
