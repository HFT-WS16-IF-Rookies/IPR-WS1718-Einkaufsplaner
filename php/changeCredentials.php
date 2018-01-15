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
$emailChange = "";
$passwordChange = "";

if($thisUser->firstName === null || $thisUSer->lastName === null)
{
    http_response_code(400);
    die();
}

$query = "SELECT * FROM $dbDatabase.Users WHERE firstName = '$thisUser->firstName'
          AND lastName = '$thisUser->lastName'";'text'
 = $result = $db->query($query);

if($result->num_rows === 0)
{
    http_response_code(200);
    $response = array();
    $response['state'] = "error";
    $response['text'] = "Dieser User existiert nicht.";
    echo json_encode($response);
    die();
}

if($jsonData['email'] !== null)
{
    $emailChange = $jsonData['email'];
    changeMail();
}elseif($jsonData['password'] !== null)
{
    $passwordChange = $jsonData['password'];
    changePassword();
}

if ($dbState)
{
    // TO-DO: move on to login
}
else
{
    http_response_code(500);
    die();
}

function changeMail()
{
    $queryEmailChange = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
    + " VALUES('$thisUser->firstName', '$thisUser->lastName',"
    +" '$emailChange', '$thisUser->password')";

    $dbState = $db->query($queryEmailChange);
    $db->close();
}

function changePassword()
{
    $queryPasswordChange = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
    + " VALUES('$thisUser->firstName', '$thisUser->lastName',"
    +" '$thisUser->email', '$passwordChange')";

    $dbState = $db->query($queryPasswordChange);
    $db->close();
}

?>
