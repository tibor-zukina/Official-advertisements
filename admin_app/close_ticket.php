<?php
session_start();
include 'mail_module.php';
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

include 'check_auth_token.php';

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if ( isset($_SESSION['adminId'])  && isset($_POST['reportId'])) {
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Report SET StatusReport='Closed' WHERE IdReport=?");
    $stmt->bind_param("i", $_POST['reportId']);
    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT UserIdReport,TitleReport,DescriptionReport FROM Report WHERE IdReport LIKE ?");
    $stmt->bind_param("i", $_POST['reportId']);
    $stmt->execute();
    $stmt->bind_result($userId,$title, $description);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT HashUser, ReceiveTicketUpdatesUser, EmailUser, NameUser, SurnameUser FROM Usr WHERE IdUser LIKE ?");
    $stmt->bind_param("s", $userId);
    $stmt->execute();
    $stmt->bind_result($hash, $receiveTicketUpdates, $email, $name, $surname);
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