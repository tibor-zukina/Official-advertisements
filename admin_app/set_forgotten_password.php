<?php
include 'mail_module.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['id']) && isset($_POST['password'])) {
    
    $password = hash('sha512', $_POST['password']);
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdAdmin,EmailAdmin,NameAdmin,SurnameAdmin FROM Admin WHERE HashAdmin LIKE ?");
    $stmt->bind_param("s", $_POST['id']);
    $stmt->execute();
    $stmt->bind_result($username, $email, $name, $surname);
    $stmt->fetch();
    $stmt->close();
    
    $newHash = hash('sha512', $password . 'jfnr33o8JuG52N' . $username);
    $stmt    = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Admin SET PasswordHashCodeAdmin=?, HashAdmin=? WHERE HashAdmin LIKE ? ");
    $stmt->bind_param("sss", $password, $newHash, $_POST['id']);
    $stmt->execute();
    $stmt->close();
    
    $mysqli->close();
    
    $response["success"] = 1;
    $response["message"] = "Password successfully set";
    $emailName = $name.' '.$surname;
    setForgottenPassword($email,$emailName);
    
    $response["success"] = 1;
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} 
else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 