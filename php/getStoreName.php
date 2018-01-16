<?php
    if (isset($purchaseID))
    {
        $query = "select articleID from PurchaseArticles where purchaseID = " . $purchaseID;
        require './dbConnection.php';
        $purchaseArticles = $db->query($query);
        $db->close();
        $purchaseArticle = $purchaseArticles->fetch_assoc();
        $articleID = $purchaseArticle['articleID'];
    }

    $query = "select storeID from Articles where ID = " . $articleID;
    require './dbConnection.php';
    $storeResult = $db->query($query);
    $db->close();
    $storeID = $storeResult->fetch_assoc();

    $query = "select name from Store where ID = " . $storeID['storeID'];
    require './dbConnection.php';
    $storeResult = $db->query($query);
    $db->close();
    $store = $storeResult->fetch_assoc();
    $storeName = $store['name'];
?>
