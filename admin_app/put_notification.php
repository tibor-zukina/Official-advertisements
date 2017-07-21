<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['title']) && isset($_POST['text']) && isset($_SESSION['authTokenAdmin']) && isset($_SESSION['adminId']) ) {
    
    $time = time();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO Notification (AdminIdNotification, TitleNotification, TextNotification, AuthTokenNotification) VALUES(?,?,?,?)");
    $stmt->bind_param("ssss", $_SESSION['adminId'], $_POST['title'], $_POST['text'], $_SESSION['authTokenAdmin']);
    $stmt->execute();
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Notification successfully put";    
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 