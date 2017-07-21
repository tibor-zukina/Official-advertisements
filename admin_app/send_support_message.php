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

if (isset($_POST['reportId']) && isset($_POST['text']) && isset($_SESSION['adminId'])) {
    
    $time = time();
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO SupportMessage(ReportIdSupportMessage,TextSupportMessage,TimeSupportMessage,SenderSupportMessage,AuthTokenSupportMessage)  VALUES(?,?,?,'admin',?)");
    $stmt->bind_param("isis", $_POST['reportId'], $_POST['text'], $time, $_SESSION['authTokenAdmin']);
    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE Report SET TimeMessageReport = ? WHERE IdReport = ? ");
    $stmt->bind_param("ii", $time, $_POST['reportId']);
    $stmt->execute();
    $stmt->close();
    
    $response["success"] = 1;
    $response["message"] = "Support message successfully sent";
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT StatusReport,TitleReport,DescriptionReport, EmailUser, NameUser, SurnameUser, HashUser, ReceiveTicketMessagesUser FROM Report JOIN Usr ON UserIdReport LIKE IdUser WHERE IdReport=?");
    $stmt->bind_param("i", $_POST['reportId']);
    $stmt->execute();
    $stmt->bind_result($reportStatus, $title, $description, $email, $name, $surname, $hash, $receiveTicketMessages);
    $stmt->fetch();
    $stmt->close();
        
    if ($reportStatus == "Closed") {
        $stmt = $mysqli->stmt_init();
        $stmt->prepare("UPDATE Report SET StatusReport='Reopened' WHERE IdReport=?");
        $stmt->bind_param("i", $_POST['reportId']);
        $stmt->execute();
        $stmt->close();

        $response["newStatus"] = "Reopened";
    } 
    
    else {
        $stmt = $mysqli->stmt_init();
        $stmt->prepare("UPDATE Report SET StatusReport='Answered' WHERE IdReport=?");
        $stmt->bind_param("i", $_POST['reportId']);
        $stmt->execute();
        $stmt->close();
            
        $response["newStatus"] = "Answered";
    }
        $nameEmail = $name.' '.$surname;
        if($receiveTicketMessages == 'yes') sendSupportMessageAdmin($_POST["reportId"],$_POST["text"],$title,$description,$email,$nameEmail,$hash);
        
        
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} 
else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 