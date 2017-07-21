<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css"/>
    <link rel="stylesheet" href="design/sweetalert.css"/>
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Change password</title></head>
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
<script  type="text/javascript" src="scripts/new_password.js"></script>
<script type="text/javascript" src="scripts/block_proxy.js"></script>
<img src="images/logo.png" alt="Home image" class="headImage" id="homeImage" />
<script type="text/javascript" src="scripts/show_image.js"></script>
<?php
if (isset($_GET['id'])) {

    require_once __DIR__ . '/db_config.php';

            $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
            $stmt = $mysqli->stmt_init();
            $stmt->prepare("SELECT COUNT(IdAdmin) AS num FROM Admin WHERE HashAdmin LIKE ? ");
            $stmt->bind_param("s", $_GET["id"]);
            $stmt->execute();
            $stmt->bind_result($num);
            $stmt->fetch();
            $stmt->close();

if($num > 0) {

    echo '<div class="centerDiv">
<label class="hintLabel" id="passwordRule" >Password has to be at least 8 characters long and contain uppercase letter</label>
</div>
<input type="password" oninput="updateProgressBar()" onKeyPress="enterNewPassword(event,'.'\'' . $_GET["id"] . '\')" placeholder="New password" name="newPassword" maxlength="30" required id="newPassword" class="centeredText" > 
<div id="myProgress">
       <div id="strengthBar"></div> <label class="bigLabel" id="progressText">0%</label>
       </div>
       <br>
<input type="password" placeholder="Confirm new password" oninput="updateProgressBar()" onKeyPress="enterNewPassword(event,'.'\'' . $_GET["id"] . '\')" name="confirmNewPassword" maxlength="30" required id="confirmNewPassword" class="movedText"> 
<label id="matchLabel">Passwords don\'t match</label>
<br><br>
<button onClick="setForgottenPassword(\'' . $_GET["id"] . '\')" class="centerButton">Set password</button>
';
}
else {
 echo "<script>
               swal('Invalid password change link','This password change link is not valid','warning');
               setTimeout(function() {
               window.history.back();
        }, 500);
               </script>";
}
}
else{
  echo "<script>
               swal('Invalid password change link','This password change link is not valid','warning');
               setTimeout(function() {
               window.history.back();
        }, 500);
               </script>";
}

?>
</div>
</body>
</html>