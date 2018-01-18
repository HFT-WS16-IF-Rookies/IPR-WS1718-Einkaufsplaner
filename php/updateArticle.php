<?php
    require './checkLogin.php';

    $jsonData = json_decode(file_get_contents('php://input'), true);

    $query = "UPDATE Articles SET "
        ."storeID=" . $jsonData['storeID']
        ." , name='" . $jsonData['name'] ."'"
        ." , currentAmount=". $jsonData['currentAmount']
        .", minAmount=" . $jsonData['minAmount']
        .", maxAmount=" . $jsonData['maxAmount']
        .", priority='" . $jsonData['priority'] . "'"
        ." where ID=" . $jsonData['articleID'];

    require './dbConnection.php';
    $result = $db ->query($query);
    $db->close();

    if ($result)
    {
        $metaData = array();
        $metaData['state'] = "success";
        $data = array();
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }
    else
    {
        $metaData = array();
        $metaData['state'] = "error";
        $data = array();
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }
?>
