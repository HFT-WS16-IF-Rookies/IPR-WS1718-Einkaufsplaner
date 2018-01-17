<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    $query = "select * from Articles where householdID = " . $jsonData['household']['householdID'] . " and storeID = ".$jsonData['store']['storeID']." and currentAmount < maxAmount";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    if($result->num_rows === 0)
    {
        http_response_code(200);
        $metaData = array();
        $metaData['state'] = "error";
        $metaData['case'] = "no articles needed from this store";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    $query = "insert into Purchases (userID) values(".$jsonData['user']['ID'].")";
    require './dbConnection.php';
    if (!$db->query($query)) {
        http_response_code(200);
        $metaData['state'] = 'error';
        $metaData['case'] = 'create new purchase failed';

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }
    $last_id = $db->insert_id;
    $db->close();

    $query = "insert into PurchaseHouseholds (purchaseID, householdID) values(".$last_id.",".$jsonData['household']['householdID'].")";
    require './dbConnection.php';
    if (!$db->query($query))
    {
        http_response_code(200);
        $metaData['state'] = 'error';
        $metaData['case'] = 'assign household to purchase failed';

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }
    $db->close();

    while(($article = $result->fetch_assoc()) !== null)
    {
        $query = "update Articles set currentAmount=" . ($article['currentAmount'] + ($article['maxAmount'] - $article['currentAmount'])) . " where ID=" . $article['ID'];
        require './dbConnection.php';
        if(!$db->query($query))
        {
            http_response_code(200);
            $metaData['state'] = 'error';
            $metaData['case'] = 'higher current amount failed';

            $data = array();
            $data['metaData'] = $metaData;

            echo json_encode($data);
            die();
        }

        $query = "insert into PurchaseArticles (purchaseID, articleID, amount, found) values(".$last_id.", ".$article['ID'].", ".($article['maxAmount'] - $article['currentAmount']).", 0)";
        require './dbConnection.php';
        $db->query($query);
        $db->close();
    }

    $metaData['state'] = 'success';
    $metaData['purchaseID'] = $last_id;

    $data = array();
    $data['metaData'] = $metaData;

    echo json_encode($data);
?>
