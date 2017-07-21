<?php 
    session_start(); 
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    }
    $_SESSION["instructionId"] = $_GET["id"];
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT TitleInstructions, TextInstructions FROM Instructions WHERE IdInstructions = ? ");
    $stmt->bind_param("i", $_SESSION["instructionId"]);
    $stmt->execute();
    $stmt->bind_result($title, $text);
    $stmt->fetch();
    $stmt->close();

?>
<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Update video</title>
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
        <label class="bigLabel">Title:</label>
        <br>
        <br>
        <label> <?php echo $title; ?> </label>
        <br>
        <br>
        <br> 
        <label class="bigLabel"> Url: </label>
        <br>
        <br>
        <textarea name="text" cols="60" rows="3" maxlength="100"  class="newTicketTextbox" id="text">
        <?php
         echo trim($text);
        ?>
        </textarea>
        <br>
        <br>
        <div class="centerDiv">    
        <div>
        <button class="commonButton" onClick="updateVideo()"> Update </button>
        <button class="commonButton" onClick="previewVideo()"> Video preview </button> 
        <button class="commonButton" onClick="deleteVideo()"> Delete </button> 
        </div>
        </div>
        <br>
    </div> 
    <script type="text/javascript" src="scripts/update_video.js"></script>      


</body>

</html>