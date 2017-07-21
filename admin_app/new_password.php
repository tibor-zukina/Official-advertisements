<?php

include 'mail_module.php';

session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['email']) || isset($_SESSION['email'])) {
    
    
    if (isset($_POST['email'])) {
        $email = $_POST['email'];
    } else {
        $email = $_SESSION['emailAdmin'];
    }
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(IdAdmin) AS num FROM Admin WHERE RemoveDots(EmailAdmin) LIKE RemoveDots(?)  AND DeletedAdmin LIKE 'no'");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($numEmail);
    $stmt->fetch();
    $stmt->close();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT HashAdmin,NameAdmin,SurnameAdmin FROM Admin WHERE RemoveDots(EmailAdmin) LIKE RemoveDots(?) ");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($hash,$name,$surname);
    $stmt->fetch();
    $stmt->close();
    
    $mysqli->close();
    
    if ($numEmail == 0) {
        $response["success"] = -1;
    }
    
    else {
        $emailName = $name.' '.$surname;
        newPasswordLink($hash,$email,$emailName);
        $response["success"] = 1;
    }
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 