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
    
    $response["ads"] = array();
    $ad              = array();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdAd, NameAd, UrlAd, IdentificatorAd, TimeAd FROM Ad WHERE UserIdAd LIKE ? AND DeletedAd LIKE 'no' ORDER BY IdAd DESC LIMIT 300 OFFSET 0");
    $stmt->bind_param("s", $_SESSION["queriedId"]);
    $stmt->execute();
    $stmt->bind_result($id, $name, $url, $identificator, $time);
    while ($stmt->fetch()) {
        $ad["id"] = $id;
        $ad["name"]   = $name;
        $ad["url"] = $url;
        $ad["identificator"]   = $identificator;
        $ad["time"] = $time;    
        array_push($response["ads"], $ad);
    }
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Ads successfully fetched";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} 
else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>