<?php
    class Registration
    {
        public $firstName;
        public $lastName;
        public $email;
        public $password;
    }

    //echo (file_get_contents('php://input'));
    $jsonData = json_decode(file_get_contents('php://input'), true);

    $registration = new Registration();
    $registration->firstName = $jsonData['firstName'];
    $registration->lastName = $jsonData['lastName'];
    $registration->email = $jsonData['email'];
    $registration->password = $jsonData['password'];

    if (
        $registration->firstName === null ||
        $registration->lastName === null ||
        $registration->email === null ||
        $registration->password === null)
    {
        http_response_code(400);
        die();
    }

    require 'dbConnection.php';
    $query = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
        . " values('$registration->firstName',"
        ." '$registration->lastName',"
        ." '$registration->email',"
        ." '$registration->password')";

    echo $query;

    $dbState = $db->query($query);
    $db->close();

    if ($dbState)
    {
        // TO-DO: move on to login
    }
    else
    {
        http_response_code(500);
        die();
    }
?>
