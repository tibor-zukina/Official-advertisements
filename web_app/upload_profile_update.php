<?php
error_reporting(E_ERROR);
session_start();
include 'check_auth_token.php';

if( isset($_SESSION["userId"]) ){

$response = array();
$filename = $_SESSION['userId'] . '_'. time(). '.' . $_POST['ext'];
$binary   = base64_decode($_POST['image']);
header('Content-Type: bitmap; charset=utf-8');
$path = '../profiles/' . $filename;
$file = fopen($path, 'wb');
fwrite($file, $binary);
fclose($file);
$fileUrl = 'http://www.officialadvertisements.com/profiles/' . $filename;

require_once __DIR__ . '/db_config.php';

$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$stmt = $mysqli->stmt_init();
$stmt->prepare("UPDATE Usr SET ImageUrlUser=? WHERE IdUser LIKE ? ");
$stmt->bind_param("ss", $fileUrl, $_SESSION["userId"]);
$stmt->execute();
$stmt->close();

$response["success"] = 1;
$response["message"] = 'Image upload complete, Please check your php file directory';
$response["imageUrl"] = $fileUrl;
echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

}
?> 