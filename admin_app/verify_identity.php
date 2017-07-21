<?php session_start();?>
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Verify identity</title>
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
        <script type="text/javascript" src="scripts/user_details.js"></script>
        <?php echo '<script type="text/javascript"> getUserDetails(\'' . $_GET["id"] . '\') </script>'; ?> 
        <label id="userId">User id:&nbsp; </label> <br><br>
        <label id="email">Email:&nbsp; </label> <br><br>
        <label id="name">Name:&nbsp; </label> <br><br>
        <label id="surname">Surname:&nbsp; </label> <br><br>
        <label id="company">Company:&nbsp; </label> <br><br>
        <label id="whatsAppNumber">WhatsApp number:&nbsp; </label> <br><br>
        <label id="address">Address:&nbsp; </label> <br><br>
        <label id="country">Country:&nbsp; </label> <br><br>
        <label id="status">Status:&nbsp; </label> <br><br>
        <label id="facebookProfileUrl">Facebook profile url:&nbsp; </label> <br><br>
        <img src="images/document.png" class="image" id="documentImage" alt="User profile image"/><br><br>
        <button class="commonButton" onClick="verifyUser()">Verify</button>
        <button class="commonButton" onClick="rejectUser()">Reject</button><br><br>
    </div>

</body>

</html>