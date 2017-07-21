<?php session_start(); ?>
<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>New instruction</title>
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
        <script type="text/javascript" src="scripts/new_instruction.js"></script> 
        <label class="bigLabel">Title:</label>
        <br>
        <br>
        <textarea name="title" cols="60" rows="3" maxlength="100" id="title" class="newTicketTextbox"></textarea>
        <br>
        <br>
        <br>
        <label class="bigLabel">Text:</label>
        <br>
        <br>
        <textarea name="text" cols="150" rows="20" maxlength="5000" class="newTicketTextbox" id="text"></textarea>
        <br>
        <br>
        <br>
        <button class="centerButton" onClick="addInstruction()"> Publish </button> 
        <br>
    </div>


</body>

</html>