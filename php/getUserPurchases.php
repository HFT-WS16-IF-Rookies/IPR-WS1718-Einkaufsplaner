<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();
    $query = "SELECT * FROM Purchases WHERE userID=" . $jsonData['ID'] . " AND done=false";

    require './dbConnection.php';
    $resultMain = $db->query($query);
    $db->close();

    if(!$resultMain)
    {
        http_response_code(200);
        $metaData['state'] = "dumbUser";
        $metaData['reason'] = "purchase not found";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }
    while (($row = $resultMain->fetch_assoc()) !== null)
    {
        $query = "SELECT articleID FROM PurchaseArticles WHERE purchaseID=" . $row['ID'];
        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        if(!$result)
        {
            $metaData = array();
            $metaData['state'] = "success";
            $metaData['response'] = "no articles found(PurchaseArticles)";
            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }

        $articleArray = $result->fetch_assoc();
        $focusedArticle = $articleArray['articleID'];

        $query = "SELECT storeID FROM Articles WHERE ID =" . $focusedArticle;
        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        if(!$result)
        {
            $metaData = array();
            $metaData['state'] = "success";
            $metaData['response'] = "no articles found(Articles)";
            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }

        $storeArray = $result->fetch_assoc();
        $focusedStoreID = $storeArray['storeID'];

        $query = "SELECT name FROM Store WHERE ID =" . $focusedStoreID;
        require './dbConnection.php';
        $result = $db->query($query);
        $db->close();

        if(!$result)
        {
            $metaData = array();
            $metaData['state'] = "success";
            $metaData['response'] = "store not found(Store)";
            $data['metaData'] = $metaData;
            http_response_code(200);
            echo json_encode($data);
            die();
        }

        $storeArray = $result->fetch_assoc();
        $storeName = $storeArray['name'];

        $purchase['store'] = $storeName;
        $purchase['createDate'] = $row['createDate'];
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
