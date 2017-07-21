<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Sign in</title>
</head>

<body class="home">

   <div id="rightHeader">
   <img src="design/images/logo.png"  alt="Image can't be loaded" onClick="goToHomePage()" class="smallImage">
   <label id="username" class="blackHeaderLabel">&emsp;</label>
   </div>
    <div id="sectionHome">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script> 
        <script type="text/javascript" src="scripts/sign_in.js"></script>
        <script type="text/javascript" src="scripts/check_user.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <h1>Admin sign in</h1>
        <br>
        <br>
        <img src="images/logo.png" alt="Image can't be loaded" class="headImage" id="homeImage">
        <script type="text/javascript" src="scripts/show_image.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <input type="text" placeholder="Admin id" id="loginId" class="centeredText" maxlength="20" onKeyPress="enterSignIn(event)">
        <br>
        <input type="password" placeholder="Password" id="password" class="centeredText" maxlength="20" onKeyPress="enterSignIn(event)">
        <br>
        <br>
        <button onClick="signIn()" class="centerButton">Sign in</button>
    </div>

</body>

</html>