<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_SESSION['notificationId']) && isset($_POST['text']) && isset($_SESSION['authTokenAdmin']) && isset($_SESSION['adminId']) ) {
    
    $time = time();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Notification SET TextNotification = ?, AuthTokenNotification = ? WHERE IdNotification = ?");
    $_POST['text'] = trim($_POST['text']);
    $stmt->bind_param("ssi", $_POST['text'], $_SESSION['authTokenAdmin'], $_SESSION['notificationId']);
    $stmt->execute();
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Notification successfully updated";    
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 