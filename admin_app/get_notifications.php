<?php

require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$stmt   = $mysqli->stmt_init(); 
$stmt->prepare("SELECT IdNotification, AdminIdNotification, TitleNotification FROM Notification WHERE DeletedNotification LIKE 'no' ORDER BY IdNotification DESC");
$stmt->execute();
$stmt->bind_result($id, $admin, $title);


$a = 0;
while ($stmt->fetch()) {
    echo '<label>' . $admin . ':</label><br><br>';
    echo '<label><a href="notification_details.php?id='. $id .'" class="workingWhite">' . $title . ' </a></label><br><br>';
    $a++;
}
if ($a == 0)
    echo '<p style="color:white; margin: 16px 0; font-family: Lucida Sans Unicode; font-size:1.1em; text-align:center;">NO NOTIFICATIONS PUBLISHED</biglabel>';
$stmt->close();
$mysqli->close();


?> 