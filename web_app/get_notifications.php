<?php
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
echo '<ul>';
$stmt = $mysqli->stmt_init();
$stmt->prepare("SELECT IdNotification, TitleNotification, TextNotification FROM Notification WHERE NOT EXISTS (SELECT * FROM Notified WHERE UserIdNotified LIKE ? AND NotificationIdNotified LIKE IdNotification) AND DeletedNotification LIKE 'no' ORDER BY IdNotification DESC");
$stmt->bind_param("s", $_SESSION["userId"]);
$stmt->execute();
$stmt->bind_result($id, $title, $text);
$int   = 0;
$id    = array();
$title = array();
$text  = array();
$seen  = array();

while ($stmt->fetch()) {
    echo '<li>  <p class="bigBlackLabel"><a href="notification_details.php?id=' . $id . '" class="working">' . $title . '</a></p>';
    echo '<p class="newsLabel">NEW!!!</p></li>';
    $int++;
}
$stmt->close();

$stmt = $mysqli->stmt_init();
$stmt->prepare("SELECT IdNotification, TitleNotification, TextNotification FROM Notification WHERE EXISTS (SELECT * FROM Notified WHERE UserIdNotified LIKE ? AND NotificationIdNotified LIKE IdNotification) AND DeletedNotification LIKE 'no' ORDER BY IdNotification DESC");
$stmt->bind_param("s", $_SESSION["userId"]);
$stmt->execute();
$stmt->bind_result($id, $title, $text);
$int   = 0;
$id    = array();
$title = array();
$text  = array();
$seen  = array();
while ($stmt->fetch()) {
     echo '<li>  <p class="bigBlackLabel"><a href="notification_details.php?id=' . $id . '" class="working">' . $title . '</a></p>';
     echo '</li>';
     $int++;
    }
$stmt->close();
$mysqli->close();
echo '</ul><br><br>';
?> 