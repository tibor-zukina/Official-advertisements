<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['averageCPC']) && isset($_POST['maxCPC']) && isset($_POST['id']) && isset($_SESSION['userId'])) {
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("Update TopAd SET AverageCPCTopAd=?, MaxCPCTopAd=? WHERE IdTopAd=?");
    $stmt->bind_param("ddi", $_POST['averageCPC'], $_POST['maxCPC'], $_POST['id']  );
    $stmt->execute();
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "Top ad successfully updated";    
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 