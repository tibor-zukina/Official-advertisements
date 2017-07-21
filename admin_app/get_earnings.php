<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_SESSION["queriedId"])) {
    
    $response["earnings"] = array();
    $earning             = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT AmountEarning, TimeEarning FROM Earning WHERE UserIdEarning LIKE ?");
    $stmt->bind_param("s", $_SESSION["queriedId"]);
    $stmt->execute();
    $stmt->bind_result($amount, $time);
    while ($stmt->fetch()) {
        $earning["amount"]   = $amount;
        $earning["time"] = $time; 
        array_push($response["earnings"], $earning);
    }
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Earnings successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} 
else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>