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
        $metaData['case'] = "Es wird nichts von diesem Laden benötigt";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    $query = "insert into Purchase (userID, householdID) values(".$jsonData['user']['ID'].", ".$jsonData['household']['householdID']. ")";
    require './dbConnection.php';
    if (!$db->query($query)) {
        http_response_code(200);
        $metaData['state'] = 'error';
        $metaData['case'] = 'Fehler beim Erstellen des Einkaufs';
        $metaData['sqlQuery'] = $query;

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }
    $last_id = $db->insert_id;
    $db->close();

/*
    $query = "insert into PurchaseHouseholds (purchaseID, householdID) values(".$last_id.",".$jsonData['household']['householdID'].")";
    require './dbConnection.php';
    if (!$db->query($query))
    {
        http_response_code(200);
        $metaData['state'] = 'error';
        $metaData['case'] = 'Einkauf konnte nicht hinzugefügt werden';
        $metaData['sqlQuery'] = $query;

        $data = array();
        $data['metaData'] = $metaData;

        echo json_encode($data);
        die();
    }
    $db->close();
    */

    while(($article = $result->fetch_assoc()) !== null)
    {
        $query = "update Articles set currentAmount=" . ($article['currentAmount'] + ($article['maxAmount'] - $article['currentAmount'])) . " where articleID=" . $article['articleID'];
        require './dbConnection.php';
        if(!$db->query($query))
        {
            http_response_code(200);
            $metaData['state'] = 'error';
            $metaData['case'] = 'Stand konnte nicht erhöht werden';
            $metaData['sqlQuery'] = $query;

            $data = array();
            $data['metaData'] = $metaData;

            echo json_encode($data);
            die();
        }

        $query = "insert into PurchaseArticles (purchaseID, articleID, amount, found) values(".$last_id.", ".$article['articleID'].", ".($article['maxAmount'] - $article['currentAmount']).", 0)";
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
