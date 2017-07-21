<?php

session_start();
include 'check_auth_token.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['website']) && isset($_POST['date']) && isset($_POST['dayNumber']) && isset($_SESSION['userId'])) {
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO Website (UserIdWebsite, UrlWebsite, DayNumberWebsite, DateWebsite, AuthTokenWebsite) VALUES(?,?,?,?,?)");
    $stmt->bind_param("ssiss", $_SESSION['userId'], $_POST['website'], $_POST['dayNumber'], $_POST['date'], $_SESSION['authTokenUser']);
    $stmt->execute();
    $stmt->close();

    $stmt  = $mysqli->stmt_init();
    $stmt->prepare("SELECT MAX(IdWebsite) AS id FROM Website WHERE UserIdWebsite LIKE ? ");
    $stmt->bind_param("s", $_SESSION['userId']);
    $stmt->execute();
    $stmt->bind_result($id);
    $stmt->fetch();
    $stmt->close();
        
    $response["id"] = $id;
    $response["success"] = 1;
    $response["message"] = "Website successfully put";    
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 