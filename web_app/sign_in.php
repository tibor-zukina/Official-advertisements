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
           <img src="design/images/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
           <label class="blackLabel"><a href="officialadvertisements.php" class="working" id="backHome">Back to home page</a></label>
           <a href="officialadvertisements.php"> <img src="images/home_page.png" alt="sign in" class="headerIcon"/></a>
          
   </div>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script>
        <script type="text/javascript" src="scripts/sign_in.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <h1>Sign in</h1>
        <br>
        <br>
        <label class="bigLabelCentered"><a href="registration.php" class="workingWhite">Don't have an account? Register now for free</a></label>
        <br>
        <img src="images/logo.png" alt="Image can't be loaded" class="headImage" id="homeImage">
        <script type="text/javascript" src="scripts/show_image.js"></script>
        <input type="text" placeholder="Username or email" id="loginId" class="centeredText" maxlength="100" onKeyPress="enterSignIn(event)">
        <br>
        <input type="password" placeholder="Password" id="password" class="centeredText" maxlength="100" onKeyPress="enterSignIn(event)">
        <br>
        <br>
        <button onClick="signIn()" class="centerButton">Sign in</button>
    <?php
        include 'check_sign_in.php';
    ?>
    </div>

</body>

</html>