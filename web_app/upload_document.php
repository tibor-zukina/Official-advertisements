<?php
error_reporting(E_ERROR);
session_start();
include 'check_auth_token.php';

if( isset($_SESSION["filename"]) ){

$response = array();
$filename = $_SESSION["filename"];
$binary   = base64_decode($_POST['image']);
header('Content-Type: bitmap; charset=utf-8');
$path = '../documents/' . $filename;
$file = fopen($path, 'wb');
fwrite($file, $binary);
fclose($file);

$response["success"] = 1;
$response["message"] = 'Document upload complete, Please check your php file directory';

echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);

}
?>