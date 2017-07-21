<?php
session_start();
include 'check_auth_token.php';
include 'mail_module.php';

$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['reportId']) && isset($_SESSION["userId"]) ) {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Report SET StatusReport='Closed' WHERE IdReport=?");
    $stmt->bind_param("i", $_POST['reportId']);
    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT ReceiveTicketUpdatesUser, HashUser, EmailUser, NameUser, SurnameUser FROM Usr WHERE IdUser LIKE ?");
    $stmt->bind_param("s", $_SESSION["userId"]);
    $stmt->execute();
    $stmt->bind_result($receiveTicketUpdates, $hash, $email, $name, $surname);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT TitleReport,DescriptionReport FROM Report WHERE IdReport LIKE ?");
    $stmt->bind_param("i", $_POST['reportId']);
    $stmt->execute();
    $stmt->bind_result( $title, $description);
    $stmt->fetch();
    $stmt->close();
    $nameEmail = $name.' '.$surname;
    ticketStatusUpdate($email, $nameEmail, $_POST['reportId'], $title, $description, 'closed', $hash, $receiveTicketUpdates);
    $response["success"] = 1;
    $response["message"] = "Ticket successfully closed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 
