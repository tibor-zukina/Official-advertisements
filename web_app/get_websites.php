<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_SESSION["userId"]) ) {
    
    $response["websites"] = array();
    $website              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdWebsite, UrlWebsite, CTRWebsite, ViewsWebsite, DayNumberWebsite, DateWebsite FROM Website WHERE UserIdWebsite LIKE ? AND DeletedWebsite LIKE 'no' ORDER BY IdWebsite DESC LIMIT 300 OFFSET 0");
    $stmt->bind_param("s", $_SESSION["userId"]);
    $stmt->execute();
    $stmt->bind_result($id, $url, $ctr, $views, $dayNumber, $date);
    while ($stmt->fetch()) {
        $website["id"] = $id;
        $website["website"] = $url;
        $website["ctr"]   = $ctr;
        $website["views"] = $views;
        $website["dayNumber"] = $dayNumber;  
        $website["date"] = $date;   
        array_push($response["websites"], $website);
    }
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Websites successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} 
else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>