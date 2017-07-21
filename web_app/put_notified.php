<?php


$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);


if (isset($_SESSION["userId"])) {
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) FROM Notified AS num WHERE UserIdNotified LIKE ? AND NotificationIdNotified LIKE ?");
    $stmt->bind_param("si", $_SESSION["userId"], $id);
    $stmt->execute();
    $stmt->bind_result($num);
    $stmt->fetch();
    $stmt->close();

    if($num == 0) {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO Notified (UserIdNotified, NotificationIdNotified, AuthTokenNotified) VALUES(?,?,?)");
    $stmt->bind_param("sis", $_SESSION["userId"], $id, $_SESSION["authTokenUser"]);
    $stmt->execute();
    $stmt->close();
    }
}
$mysqli->close();
?> 