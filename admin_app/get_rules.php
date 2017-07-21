<?php
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

$stmt = $mysqli->stmt_init();
$stmt->prepare("SELECT IdRules, TitleRules, TextRules,TimeRules FROM Rules WHERE DeletedRules LIKE 'no' ORDER BY IdRules DESC");
$stmt->execute();
$stmt->bind_result($id, $title, $text,$time);

while ($stmt->fetch()) {
    echo '<h1 onClick="editRule('.$id.');">' . $title . '</h1><br>';
    echo '<label class="bigLabelRules" onClick="editRule('.$id.');">' . $text  . '</label>';
    echo '<br><br>';
    echo '<label>' . $time . '</label>';
    echo '<br><br><br><br>';
}
$stmt->close();

$mysqli->close();
echo '<br><br>';
?> 