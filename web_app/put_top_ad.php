<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['name']) && isset($_POST['time']) && isset($_SESSION['userId']) && isset($_SESSION['authTokenUser']) ) {
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO TopAd (UserIdTopAd, NameTopAd, TimeTopAd, AuthTokenTopAd ) VALUES(?,?,?,?)");
    $stmt->bind_param("ssss", $_SESSION['userId'], $_POST['name'], $_POST['time'], $_SESSION['authTokenUser']);
    $stmt->execute();
    $stmt->close();

    $stmt  = $mysqli->stmt_init();
    $stmt->prepare("SELECT MAX(IdTopAd) AS id FROM TopAd WHERE UserIdTopAd LIKE ? ");
    $stmt->bind_param("s", $_SESSION['userId']);
    $stmt->execute();
    $stmt->bind_result($id);
    $stmt->fetch();
    $stmt->close();
        
    $response["id"] = $id;
    $response["success"] = 1;
    $response["message"] = "Top ad successfully put";    
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 