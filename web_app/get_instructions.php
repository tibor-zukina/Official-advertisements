<?php
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

$stmt = $mysqli->stmt_init();
$stmt->prepare("SELECT IdInstructions, TitleInstructions, TextInstructions, TypeInstructions, TimeInstructions FROM Instructions WHERE DeletedInstructions LIKE 'no' ORDER BY IdInstructions DESC");
$stmt->execute();
$stmt->bind_result($id, $title, $text, $type, $time);

while ($stmt->fetch()) {
    if($type == 'video') {
      echo '<h1 class="blackTitle">' . $title . '</h1><br>';
      echo ' <iframe width="640" height="480" src="'.str_replace("watch?v=","embed/",$text).'"> </iframe><br><br>';
    }
    else { 
      echo '<h1 class="blackTitle">' . $title . '</h1><br>';
      echo '<label class="bigBlackLabel">' . $text  . '</label>';
    }
    echo '<br><br>';
    echo '<label class="blackLabel">' . $time . '</label>';
    echo '<br><br><br><br>';
}
$stmt->close();

$mysqli->close();
echo '<br><br>';
?> 