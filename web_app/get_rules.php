<?php
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

$stmt = $mysqli->stmt_init();
$stmt->prepare("SELECT TitleRules, TextRules,TimeRules FROM Rules WHERE DeletedRules LIKE 'no' ORDER BY IdRules DESC");
$stmt->execute();
$stmt->bind_result($title, $text,$time);

while ($stmt->fetch()) {
    echo '<h1 class="blackTitle">' . $title . '</h1><br>';
    echo '<label class="bigBlackLabel">' . $text  . '</label>';
    echo '<br><br>';
    echo '<label class="blackLabel">' . $time . '</label>';
    echo '<br><br><br><br>';
}
$stmt->close();

$mysqli->close();
echo '<br><br>';
?> 