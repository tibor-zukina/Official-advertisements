<?php

session_start();
include 'mail_module.php';
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_SESSION['userId']) && isset($_SESSION['filename'])  ) {
       
    $documentImageUrl  = 'http://www.officialadvertisements.com/documents/' . $_SESSION["filename"];
    
    notifyAdmin($_SESSION['userId'], $documentImageUrl); 

    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>