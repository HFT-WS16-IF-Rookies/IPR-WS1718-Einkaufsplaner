<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();
    $query = "SELECT * FROM Purchase WHERE userID=" . $jsonData['ID'] . " AND done=false";

    require './dbConnection.php';
    $resultMain = $db->query($query);
    $db->close();

    if(!$resultMain)
    {
        http_response_code(200);
        $metaData['state'] = "dumbUser";
        $metaData['reason'] = "Einkauf nicht gefunden";
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }
    while (($row = $resultMain->fetch_assoc()) !== null)
    {
        $purchaseID = $row['purchaseID'];
        require './getStoreName.php';

        $purchase['purchaseID'] = $purchaseID;
        $purchase['store'] = $storeName;
        $purchase['createDate'] = $row['createDate'];
        $data['purchase_' . $row['purchaseID']] = $purchase;
    }

    $metaData = array();
    $metaData['state'] = "success";
    $metaData['response'] = "purchaseList";

    $data['metaData'] = $metaData;
    http_response_code(200);
    echo json_encode($data);
    die();
?>
