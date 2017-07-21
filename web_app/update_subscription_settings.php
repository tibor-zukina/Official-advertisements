<?php
session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if ( isset($_POST['id'])  && isset($_POST['receiveNewTicket']) && isset($_POST['receiveTicketUpdates']) && isset($_POST['receiveTicketMessages']) ) {
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Usr SET ReceiveNewTicketUser=?, ReceiveTicketUpdatesUser=?, ReceiveTicketMessagesUser=? WHERE HashUser LIKE ?");
    $stmt->bind_param("ssss",  $_POST['receiveNewTicket'], $_POST['receiveTicketUpdates'], $_POST['receiveTicketMessages'], $_POST['id']);
    $stmt->execute();
    $stmt->close();
    
    $response["success"] = 1;
    $response["message"] = "Subscription settings successfully updated";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>