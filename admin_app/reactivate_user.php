<?php
session_start();

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

include 'check_auth_token.php';
include 'mail_module.php';


if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['id']) && isset($_SESSION["authTokenAdmin"]) ) {
       
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdUser, EmailUser FROM Usr WHERE HashUser LIKE ?");
    $stmt->bind_param("s", $_POST['id']);
    $stmt->execute();
    $stmt->bind_result($userId, $email);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Usr SET DeletedUser = 'no' WHERE HashUser LIKE ? ");
    $stmt->bind_param("s", $_POST['id']);
    $stmt->execute();
    $stmt->fetch();
    $stmt->close();

    $response["success"] = 1;
    $response["message"] = "User successfully deleted";

    reactivateUser($userId, $email);

    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>