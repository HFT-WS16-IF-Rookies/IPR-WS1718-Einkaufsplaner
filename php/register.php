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

    $query = "SELECT * FROM $dbDatabase.Users WHERE email = '$registration->email'";
    $result = $db->query($query);
    if ($result->num_rows !== 0)
    {
        http_response_code(200);
        $metaData = array();
        $metaData['state'] = "error";
        $metaData['text'] = "Diese E-Mail wurde bereits registriert.";

        $data = array();
        $data['metaData'] = $metaData;
        echo json_encode($data);
        die();
    }

    $query = "INSERT INTO $dbDatabase.Users (firstName, lastName, email, password)"
        . " values('$registration->firstName',"
        ." '$registration->lastName',"
        ." '$registration->email',"
        ." '$registration->password')";

    $dbState = $db->query($query);
    $db->close();

    if (!$dbState)
    {
        http_response_code(500);
        die();
    }

    $metaData = array();
    $metaData['state'] = "success";

    $data = array();
    $data['metaData'] = $metaData;
    echo json_encode($data);
    die();
?>
