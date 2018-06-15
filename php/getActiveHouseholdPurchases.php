<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    if ($jsonData['ID'] === null)
    {
        http_response_code(400);
        die();
    }

    $data = array();

    $query = "select firstName, lastName, storeName, purchaseID, createDate from Household
                natural join HouseholdUsers
                natural join
                (
                    select userID, firstName, lastName from Users
                ) as UsersCut
                natural join
                (
                    select purchaseID, userID, householdID, done, storeName, createDate from
                    (
                        select purchaseID, userID, householdID, createDate, done from Purchase
                    ) as a
                    natural join PurchaseArticles natural join Articles natural join Store
                ) as PurchaseCut where done = '0' and householdID = '" . $jsonData['ID'] . "'";

    require "./dbConnection.php";
    $result = $db->query($query);
    $db->close();

    while (($row = $result->fetch_assoc()) !== null)
    {
        $purchase = array();

        $purchase['purchaseID'] = $row['purchaseID'];
        $purchase['createDate'] = $row['createDate'];
        $purchase['store'] = $row['storeName'];

        $purchase['user'] = $row['firstName'] . " " . $row['lastName'];

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
