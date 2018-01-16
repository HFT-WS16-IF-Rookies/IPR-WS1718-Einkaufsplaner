<?php
    class userInfo
    {
        public $firstName;
        public $lastName;
        public $email;
        public $password;
    }

    $jsonData= json_decode(file_get_contents('php://input'), true);
    echo print_r($jsonData, true);

    $thisUser = new userInfo();
    $thisUser->firstName = $jsonData['firstName'];
    $thisUser->lastName = $jsonData['lastName'];
    $thisUser->email = $jsonData['email'];
    $thisUser->password = $jsonData['password'];

    if($thisUser->firstName === null || $thisUser->lastName === null)
    {
        http_response_code(400);
        die();
    }


    $query = "SELECT * FROM $dbDatabase.Users WHERE firstName = '$thisUser->firstName'
    AND lastName = '$thisUser->lastName'";

    require 'dbConnection.php';
    $result = $db->query($query);
    $db->close();
    $user = $result->fetch_assoc();

    $emailSavedState = $user['email'];
    $passwordSavedState = $user['password'];

    if($thisUser->email !== "")
    {
        changeMail();
    }
    elseif($thisUser->password !== "")
    {
        changePassword($user['ID']);
    }

    function changeMail()
    {
        require 'dbConnection.php';
        $queryEmailChange = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
        + " VALUES('$thisUser->firstName', '$thisUser->lastName',"
        +" '$thisUser->email', '$passwordSavedState')";

        $dbState = $db->query($queryEmailChange);
        $db->close();
    }

    function changePassword($userID)
    {
        require 'dbConnection.php';
        $queryPasswordChange = "Update set `password`='" . $thisUser.password ."' where ID = " . $userID;

        $dbState = $db->query($queryPasswordChange);
        $db->close();
    }

?>
