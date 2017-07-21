<?php
session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

include 'check_auth_token.php';

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if ( isset($_SESSION["authTokenAdmin"]) && isset($_POST["id"])  ) {
    
    $user = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdUser, EmailUser, NameUser, SurnameUser, CompanyUser, WhatsAppNumberUser, AddressUser, FacebookProfileUrlUser, CountryUser ,DocumentImageUrlUser, StatusUser, ImageUrlUser FROM Usr WHERE HashUser LIKE ? ");
    $stmt->bind_param("s", $_POST["id"]);
    $stmt->execute();
    $stmt->bind_result($userId, $email, $name, $surname, $company, $whatsAppNumber, $address, $facebookProfileUrl, $country, $documentImageUrl, $status, $imageUrl);
    $stmt->fetch();
    $stmt->close();

    $user["userId"]      = $userId;
    $user["email"]       = $email;
    $user["name"]        = $name;
    $user["surname"]     = $surname;
    $user["company"]     = $company;
    $user["whatsAppNumber"]  = $whatsAppNumber;
    $user["address"]     = $address;
    $user["facebookProfileUrl"]     = $facebookProfileUrl;
    $user["country"]     = $country;
    $user["documentImageUrl"]  = $documentImageUrl;
    $user["status"]  = $status;
    $user["imageUrl"]  = $imageUrl;
   
    $response["user"] = $user;
    
    $response["success"] = 1;
    $response["message"] = "User details successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>