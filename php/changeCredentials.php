<?php
require 'dbConnection.php';

class userInfo{
    public $firstName;
    public $lastName;
    public $email;
    public $password;
}

$jsonData= json_decode(file_get_contents('php://input'), true);

$thisUser = new userInfo();
$thisUser->firstName = $jsonData['firstName'];
$thisUser->lastName = $jsonData['lastName'];
$thisUser->email = $jsonData['email'];
$thisUser->password = $jsonData['password'];

if($thisUser->firstName === null || $thisUSer->lastName === null)
{
    http_response_code(400);
    die();
}

$query = "SELECT * FROM $dbDatabase.Users WHERE firstName = '$thisUser->firstName'
AND lastName = '$thisUser->lastName'";

$result = $db->query($query);
$user = $result->fetch_assoc();

$emailSavedState = $user['email'];
$passwordSavedState = $user['password'];

if($thisUser->email !== "")
{
    changeMail();
}elseif($thisUser->password !== "")
{
    changePassword();
}

if ($dbState)
{

}else
    {
        http_response_code(500);
        die();
    }

    function changeMail()
    {
        $queryEmailChange = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
        + " VALUES('$thisUser->firstName', '$thisUser->lastName',"
        +" '$thisUser->email', '$passwordSavedState')";

        $dbState = $db->query($queryEmailChange);
        $db->close();
    }

    function changePassword()
    {
        $queryPasswordChange = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
        + " VALUES('$thisUser->firstName', '$thisUser->lastName',"
        +" '$emailSavedState', '$thisUser->password')";

        $dbState = $db->query($queryPasswordChange);
        $db->close();
    }

    ?>
