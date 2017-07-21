<?php
session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

include 'check_auth_token.php';

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if ( isset($_SESSION["userId"]) ) {
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) FROM Notified JOIN Notification ON NotificationIdNotified = IdNotification WHERE UserIdNotified LIKE ? AND DeletedNotification LIKE 'no' ");
    $stmt->bind_param("s", $_SESSION["userId"]);
    $stmt->execute();
    $stmt->bind_result($seen);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) FROM Notification WHERE DeletedNotification LIKE 'no' ");
    $stmt->execute();
    $stmt->bind_result($total);
    $stmt->fetch();
    $stmt->close();

    $response["number"] = $total - $seen;
    
    $mysqli->close(); 
   
    $response["success"] = 1;
    $response["message"] = "Notifications successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 