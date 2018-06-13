<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    $query = "INSERT INTO Articles (storeID, householdID, articleName, currentAmount, minAmount, maxAmount, priority)"
                ." VALUES (".$jsonData['storeID'].",".$jsonData['ID'].",'".$jsonData['name']."',".$jsonData['currentAmount'].",".$jsonData['minAmount'].",".$jsonData['maxAmount'].",'".$jsonData['priority']."')";

    require './dbConnection.php';
    $result = $db ->query($query);
    $db->close();

    $metaData = array();
    $metaData['state'] = "success";
    $data = array();
    $data['metaData'] = $metaData;
    echo json_encode($data);
    die();
?>
