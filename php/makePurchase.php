<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    $query = "insert into Purchases (userID) values(".$jsonData['user']['ID'].")";
    require './dbConnection.php';
    if (!$db->query($query)) {
        http_response_code(500);
        die();
    }
    $last_id = $db->insert_id;
    $db->close();

    $query = "insert into PurchaseHouseholds (purchaseID, householdID) values(".$last_id.",".$jsonData['household']['householdID'].")";
    require './dbConnection.php';
    $result = $db->query($query);
    if (!$result)
    {
        http_response_code(500);
        die();
    }
    $db->close();

    $query = "select * from Articles where householdID = " . $jsonData['household']['householdID'] . " and storeID = ".$jsonData['store']['storeID']." and currentAmount < maxAmount";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    if($result->num_rows === 0)
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
        $query = "insert into PurchaseArticles (purchaseID, articleID, amount, found) values(".$last_id.", ".$article['ID'].", ".($article['maxAmount'] - $article['currentAmount']).", 0)";
        require './dbConnection.php';
        $db->query($query);
        $db->close();
    }
?>
