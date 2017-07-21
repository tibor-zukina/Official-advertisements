<?php

require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

$stmt = $mysqli->stmt_init();
$stmt->prepare("SELECT ReceiveNewTicketUser, ReceiveTicketUpdatesUser, ReceiveTicketMessagesUser FROM Usr WHERE HashUser LIKE ?");
$stmt->bind_param("s", $_GET["id"]);
$stmt->execute();
$stmt->bind_result($_SESSION["receiveNewTicket"], $_SESSION["receiveTicketUpdates"], $_SESSION["receiveTicketMessages"]);
$stmt->fetch();
$stmt->close();

$mysqli->close();
?> 