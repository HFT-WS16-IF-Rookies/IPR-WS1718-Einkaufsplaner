<<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();

    require './dbConnection.php';

    $query = "select * from Household where ID = '" . $jsonData['ID'] . "'";
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

    if ($result->num_rows > 1)
    {
        http_response_code(500);
        die();
    }

    $household = $result->fetch_assoc();

    $query = "select purchaseID from PurchaseHouseholds where householdID = '" . $household['ID'] . "'";
    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    if ($result->num_rows < 1)
    {
        $metaData = array();
        $metaData['state'] = "success";
        $metaData['response'] = "emtpy";

        $data['metaData'] = $metaData;
        http_response_code(200);
        echo json_encode($data);
        die();
    }

    $query = "select * from Purchases where ID in (";
    $row = $result->fetch_assoc();
    $query .= $row['purchaseID'];

    while (($row = $result->fetch(assoc())) !== null)
    {
        $query .= ", " . $row['purchaseID'];
    }

    $query .= ") AND done = false";

    require './dbConnection.php';
    $result = $db->query($query);
    $db->close();

    while (($row = $result->fetch_assoc()) !== null)
    {
        $query = "select firstName, Lastname from Users where ID = " . $row['userID'];
        require './dbConnection.php';
        $user = $db->query($query);
        $db->close();

        $query = "select articleID from PurchaseArticles where purchaseID = " . $row['ID'];
        require './dbConnection.php';
        $purchaseArticles = $db->query($query);
        $db->close();
        $purchaseArticle = $purchaseArticles->fetch_assoc();

        $query = "select storeID from Articles where ID = " . $purchaseArticle['articleID'];
        require './dbConnection.php';
        $storeResult = $db->query($query);
        $db->close();
        $store = $storeResult->fetch_assoc();

        $purchase['createDate'] = $row['createDate'];
        $purchase['store'] = $store['name'];

        $purchase = array();
        $purchase['user'] = $user['firstName'] . " " . $user['lastName'];

        $data['purchase_' . $row['ID']] = $purchase;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $metaData['response'] = "purchaseList";

    $data['metaData'] = $metaData;

    http_response_code(200);
    echo json_encode($data);
    die();

?>
