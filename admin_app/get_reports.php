<?php
function time_since($since)
{
    $chunks = array(
        array(
            60 * 60 * 24 * 365,
            'year'
        ),
        array(
            60 * 60 * 24 * 30,
            'month'
        ),
        array(
            60 * 60 * 24 * 7,
            'week'
        ),
        array(
            60 * 60 * 24,
            'day'
        ),
        array(
            60 * 60,
            'hour'
        ),
        array(
            60,
            'minute'
        ),
        array(
            1,
            'second'
        )
    );
    
    for ($i = 0, $j = count($chunks); $i < $j; $i++) {
        $seconds = $chunks[$i][0];
        $name    = $chunks[$i][1];
        if (($count = floor($since / $seconds)) != 0) {
            break;
        }
    }
    
    $print = ($count == 1) ? '1 ' . $name : "$count {$name}s";
    return $print;
}

require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
$stmt   = $mysqli->stmt_init(); 
$stmt->prepare("SELECT IdReport, TitleReport, TimeMessageReport, StatusReport, UserIdReport FROM Report ORDER BY TimeMessageReport DESC, TimeReport DESC");
$stmt->execute();
$stmt->bind_result($id, $title, $time, $status, $userId);


$a = 0;
while ($stmt->fetch()) {
    $daysAgo = time_since(time() - $time);
    echo '<label>' . $userId . ':</label><br><br>';
    echo '<label><a href="ticket_details.php?id='. $id .'" class="workingWhite">' . $title . ' </a></label><br><br>';
    echo '<label>' . $daysAgo . ' ago</label> <div class="forcedMarginLine" ><label>' . $status . '</label></div> <br><br><br><br>';
    $a++;
}
if ($a == 0)
    echo '<p style="color:white; margin: 16px 0; font-family: Lucida Sans Unicode; font-size:1.1em; text-align:center;">NO SUPPORT TICKETS</biglabel>';
$stmt->close();
$mysqli->close();


?> 