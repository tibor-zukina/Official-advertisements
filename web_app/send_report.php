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

if (isset($_POST['title']) && isset($_POST['problem']) && isset($_SESSION['userId'])) {
    
    $time = time();
   
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO Report (UserIdReport,TitleReport, DescriptionReport,TimeReport,TimeMessageReport,AuthTokenReport) VALUES(?,?,?,?,?,?)");
    $stmt->bind_param("sssiis", $_SESSION['userId'], $_POST['title'], $_POST['problem'], $time, $time, $_SESSION['authToken']);
    $stmt->execute();
    $stmt->close();
        
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT ReceiveNewTicketUser, HashUser, IdReport FROM Report JOIN Usr ON UserIdReport LIKE IdUser WHERE UserIdReport LIKE ? ORDER BY TimeReport DESC LIMIT 0,1");
    $stmt->bind_param("s", $_SESSION['userId']);
    $stmt->execute();
    $stmt->bind_result($receiveNewTicket, $hash, $reportId);
    $stmt->fetch();
    $stmt->close();
        
        $stmt = $mysqli->stmt_init();
        $stmt->prepare("INSERT INTO SupportMessage (ReportIdSupportMessage,TextSupportMessage,TimeSupportMessage,SenderSupportMessage,AuthTokenSupportMessage)  VALUES(?,?,?,?,?)");
        $stmt->bind_param("isiss", $reportId, $_POST['problem'], $time, $_SESSION['userId'], $_SESSION['authToken']);
        $stmt->execute();
        $stmt->close();
        $response["success"] = 1;
        $response["message"] = "Report successfully sent";

        $name = $_SESSION['nameUser'].' '.$_SESSION['surnameUser'];
        $_SESSION["reportTitle"] = $_POST['title'];
        $_SESSION["reportProblem"] = $_POST['problem'];
        sendReport($_POST["title"],$_POST["problem"],$_SESSION["emailUser"],$name,$_SESSION["userId"],$hash,$receiveNewTicket);
        
        echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?> 