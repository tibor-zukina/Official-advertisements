<?php 
session_start();
?>
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css"/>
    <link rel="stylesheet" type="text/css" href="design/boxes.css"/>
    <link rel="stylesheet" href="design/sweetalert.css"/>
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Subscription settings</title>
</head>
<body class="home">
<div id="rightHeader">
    <img src="design/images/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
    <label>&emsp;</label>
</div>

<div id="sectionHome">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
<script type="text/javascript" src="scripts/sweetalert.min.js"></script>
<script type="text/javascript" src="scripts/spin.min.js"></script>
<script type="text/javascript" src="scripts/spin.js"></script>
<script type="text/javascript" src="scripts/go_to_home.js"></script>
<script  type="text/javascript" src="scripts/subscription_settings.js"></script>
<script type="text/javascript" src="scripts/block_proxy.js"></script>
<img src="images/logo.png" alt="Home image" class="headImage" id="homeImage" />
<script type="text/javascript" src="scripts/show_image.js"></script>
<?php
if (isset($_GET['id'])) {

    require_once __DIR__ . '/db_config.php';

            $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
            $stmt = $mysqli->stmt_init();
            $stmt->prepare("SELECT COUNT(IdUser) AS num FROM Usr WHERE HashUser LIKE ? ");
            $stmt->bind_param("s", $_GET["id"]);
            $stmt->execute();
            $stmt->bind_result($num);
            $stmt->fetch();
            $stmt->close();

if($num > 0) {
    include 'get_account_data_simple.php';
         echo '<div class="forcedMarginBox">';
        if($_SESSION[ 'receiveNewTicket']=="yes" ) {
            echo '<input type="checkbox" class="switchStyle" id="receiveNewTicket" checked="checked" name="receiveNewTicket" value="yes">';
        }
        else {
            echo '<input type="checkbox" class="switchStyle" id="receiveNewTicket" name="receiveNewTicket" value="yes">';
        }
        echo '<label for="receiveNewTicket"></label>';
        echo '<label class="switchLabel">Receive new ticket confirmations</label>';
        echo '</div><br>';

        echo '<div class="forcedMarginBox">';
        if($_SESSION['receiveTicketUpdates']=="yes" ) {
            echo '<input type="checkbox" class="switchStyle" id="receiveTicketUpdates" checked="checked" name="receiveTicketUpdates" value="yes">';
        }
        else {
            echo '<input type="checkbox" class="switchStyle" id="receiveTicketUpdates" name="receiveTicketUpdates" value="yes">';
        }
        echo '<label for="receiveTicketUpdates"></label>';
        echo '<label class="switchLabel">Receive ticket updates notifications</label>';
        echo '</div><br>';

        echo '<div class="forcedMarginBox">';
        if($_SESSION['receiveTicketMessages']=="yes" ) {
            echo '<input type="checkbox" class="switchStyle" id="receiveTicketMessages" checked="checked" name="receiveTicketMessages" value="yes">';
        }
        else {
            echo '<input type="checkbox" class="switchStyle" id="receiveTicketMessages" name="receiveTicketMessages" value="yes">';
        }
        echo '<label for="receiveTicketMessages"></label>';
        echo '<label class="switchLabel">Receive ticket messages notifications</label>';
        echo '</div><br>';
        echo '<button onClick="updateSubscriptionSettings(\'' . $_GET["id"] . '\',\''.$_SESSION["type"].'\')" class="centerButton">Save settings</button>';
}
else {
 echo "<script>
               swal('Invalid subscription settings link','This subscription settings link is not valid','warning');
               setTimeout(function() {
               window.history.back();
        }, 500);
               </script>";
}
}
else{
  echo "<script>
               swal('Invalid subscription settings link','This subscription settings link is not valid','warning');
               setTimeout(function() {
               window.history.back();
        }, 500);
               </script>";
}

?>
</div>
</body>
</html>