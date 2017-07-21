<?php

session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if( isset($_SESSION["authTokenUser"]) ) {
$stmt = $mysqli->stmt_init();
$stmt->prepare("UPDATE AuthTokenUser SET ActiveAuthTokenUser = 'no' WHERE HashAuthTokenUser LIKE ? ");
$stmt->bind_param("s", $_SESSION["authTokenUser"]);
$stmt->execute();
$stmt->close();
}
$response["success"] = 1;
session_destroy();
$mysqli->close();
echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
echo "<script> window.location.replace('officialadvertisements.php'); </script>";
   
?> 