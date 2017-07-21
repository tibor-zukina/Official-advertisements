<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if ( isset($_POST['ids']) && isset($_SESSION['authTokenUser']) && isset($_SESSION['userId']) ) {
    
    $idsArray = explode(',', $_POST['ids']);
    reset($idsArray);
    
    foreach ($idsArray as $id) {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Website SET DeletedWebsite = 'yes' WHERE IdWebsite = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    }

    $response["success"] = 1;
    $response["message"] = "Websites successfully deleted";    
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 