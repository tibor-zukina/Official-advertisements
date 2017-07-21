<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Send new password</title>
</head>

<body class="home">

    <div id="rightHeader">
        <img src="design/images/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
        <label class="blackLabel"><a href="officialadvertisements.php" class="working" id="backHome">Back to home page</a></label>
        <a href="officialadvertisements.php"> <img src="images/home_page.png" alt="home page" class="headerIcon"/></a>
           
    </div>

    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script>
        <script type="text/javascript" src="scripts/new_password.js"></script>
        <img src="images/logo.png" alt="Home image" class="headImage" id="homeImage" />
        <script type="text/javascript" src="scripts/show_image.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <br>
        <input type="email" id="mail" title="Enter a valid email address" placeholder="Enter your email" name="email" class="centeredText" maxlength="100" onKeyPress="enterSendNewPassword(event)">
        <br>
        <br>
        <button onclick="sendNewPassword()" class="centerButton">Send password</button>

    </div>

</body>

</html>