<?php session_start(); ?>
<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Ticket details</title>
</head>

<body class="home">

   <div id="rightHeader">
  <?php include 'template_header.html'; ?>
   </div>
    <div id="sectionHome">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script> 
        <script type="text/javascript" src="scripts/messaging.js"></script>
         <?php
           require_once __DIR__ . '/db_config.php';
           $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

           $stmt   = $mysqli->stmt_init();
           $stmt->prepare("SELECT TitleReport, StatusReport FROM Report WHERE IdReport LIKE ? ");
           $stmt->bind_param("i", $_GET['id']);
           $stmt->execute();
           $stmt->bind_result($subject, $status);
           $stmt->fetch();
           $stmt->close();
          echo '<label>Subject:</label> <label>'.$subject.'</label><br><br><br>';
           echo '<label>Status:</label> <label id="statusValue" >'.$status.'</label><br><br><br><br>';
if ($status != 'Closed')
    echo '<button id="statusButton" class="commonButtonWide" onClick="closeTicket()">CLOSE TICKET</button><br><br><br>';
else
    echo '<button id="statusButton" class="commonButtonWide" onClick="closeTicket()">REOPEN TICKET</button><br><br><br>';

echo '<div id="supportMessages">';
echo '</div>';
echo '<script type="text/javascript"> periodical(' . $_GET["id"] . ',\'' . $status . '\'); </script>';
echo '<textarea rows="3" id="messageText" class="supportSendTextbox" placeholder="Type your text here"></textarea>
        <input type="image" src="images/send.png" class="supportSendWidget" onclick="addMessages()"  alt="Send message" id="sendMessage" >
        <br>
        <br>';
         ?>
       
    </div>


</body>

</html>