<?php session_start(); ?>
<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Unverified users</title>
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
        <div class="centerDiv">    
        <div>
        <button class="commonButtonWide" onClick="showActiveUsers()"> Active users </button> 
        <button class="commonButtonWide" onClick="showUnverifiedUsers()"> Unverified users </button> 
        <button class="commonButtonWide" onClick="showDeletedUsers()"> Deleted users </button> 
        </div>
        </div>
        <h1 id="modeLabel">Unverified users</h1>
        <div id="wrapper">
        <div id="one" class="columnDiv" > </div>
        <div id="two" class="columnDiv" > </div>   
        <div id="three" class="columnDiv"> </div>
        </div>
        <br>
        <br>
    </div>
<script type="text/javascript" src="scripts/go_to_home.js"></script> 
<script type="text/javascript" src="scripts/users_list.js"></script>

</body>

</html>