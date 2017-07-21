<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST["offset"]) && isset($_POST["reportId"]) && isset($_SESSION["userId"])) {
    
    $response["supportMessages"] = array();
    $supportMessage              = array();
    $currentTime                     = time();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT TextSupportMessage, SenderSupportMessage, ? -TimeSupportMessage FROM SupportMessage  WHERE ReportIdSupportMessage=? LIMIT ?,1000000");
    $stmt->bind_param("iii", $currentTime, $_POST['reportId'], $_POST['offset']);
    $stmt->execute();
    $stmt->bind_result($text, $sender, $time);
    while ($stmt->fetch()) {
        $supportMessage["text"]   = $text;
        $supportMessage["sender"] = $sender;
        $supportMessage["time"]   = $time;
        array_push($response["supportMessages"], $supportMessage);
    }
    $stmt->close();
    
    $stmt   = $mysqli->stmt_init();
    $stmt->prepare("SELECT StatusReport FROM Report WHERE IdReport LIKE ? ");
    $stmt->bind_param("i", $_POST['reportId']);
    $stmt->execute();
    $stmt->bind_result($response["newStatus"]);
    $stmt->fetch();
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Support messages successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} 
else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>