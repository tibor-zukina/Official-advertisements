<?php
session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

include 'check_auth_token.php';

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if ( isset($_SESSION["authTokenAdmin"]) ) {
    
    $response["customers"] = array();
    $customer              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdUser, EmailUser, NameUser, SurnameUser, CompanyUser, WhatsAppNumberUser, AddressUser , CountryUser , ImageUrlUser, DocumentImageUrlUser, StatusUser, HashUser FROM Usr WHERE StatusUser LIKE 'pending verification' AND DeletedUser LIKE 'no' ");
    $stmt->execute();
    $stmt->bind_result($userId, $email, $name, $surname, $company, $whatsAppNumber, $address, $country, $imageUrl, $documentImageUrl, $status, $hash);
    while ($stmt->fetch()) {
        $customer["userId"]      = $userId;
        $customer["email"]       = $email;
        $customer["name"]        = $name;
        $customer["surname"]     = $surname;
        $customer["company"]     = $company;
        $customer["whatsAppNumber"]  = $whatsAppNumber;
        $customer["address"]     = $address;
        $customer["country"]     = $country;
        $customer["imageUrl"]    = $imageUrl;
        $customer["documentImageUrl"]  = $documentImageUrl;
        $customer["status"]  = $status;
        $customer["hash"]  = $hash;
        array_push($response["customers"], $customer);
    }
    $stmt->close();
    
    $response["success"] = 1;
    $response["message"] = "My customers successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>