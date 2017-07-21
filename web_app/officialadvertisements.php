<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Official advertisements</title>
</head>

<body class="white">

   <div id="rightHeader">
           <img src="design/images/logo.png"  alt="Image can't be loaded" class="smallImage">
        <label class="blackLabel" id="username">&nbsp;</label>
        <button class="commonButtonHeader" onClick="goToSignIn()" id="signIn">Sign in</button>  <button class="commonButtonHeader" onClick="goToRegister()">Register</button>
   </div>
    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/main.js"></script>
        <br>
        <br>
        <br>
        <div class="centerDiv">
        <div>
        <img src="images/prev.png" alt="Previous animation" class="prevImage" onClick="back()">
        <img src="images/logo.png" alt="Image can't be loaded" class="headImageHome" id="homeImage">
        <img src="images/next.png" alt="Next animation" class="nextImage" onClick="next()">
        </div>
        </div>
        <h1 class="titleCentered">Official Advertisements</h1>
        <h1 class="titleCentered">#1 unique advertising website</h1> 
        <h1 class="titleCentered">Register today!</h1>
        <h1 class="titleCentered">It is completely free</h1>
        <script type="text/javascript" src="scripts/check_user.js"></script>
        <script type="text/javascript" src="scripts/show_titles.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
         <img src="images/down.png" alt="Down page" class="downImage" onClick="down()">
    <?php
        include 'check_sign_in_dont.php';
    ?>
    </div>
    <div class="whiteSection">
    <label class="mainTitleLabel"> Official Advertisements </label>
    <br>
    <p class="subtitleDescription"> 
     Official Advertisements is a #1 unique website that deals with advertising. It enables you to track all your online ads, websites and earnings. You will also be able to see your top ads and
     show the best of them. Our customer support will always by available to you. You can also post comments on our website with facebook.
    </p>
    <br><br>
    <div class="columnDiv">
    <img src="images/dashboard_icon.png" alt="dashboard" class="iconImage"/><label class="bigBlackMarginLabel">Dashboard </label> <br><br>
    <p class="blackLabelFade">Track all your adds, their urls time when they are added, show ads in last 24 hours or show ads in last 48 hours. Also search ads by urls.</p> <br>
    <img src="images/overview_icon.png" alt="overview" class="iconImage"/><label class="bigBlackMarginLabel">Overview </label> <br><br>
    <p class="blackLabelFade">Track statistics of your websites, cost through rate and number of views. Search websites by url and add new website date for every day.</p>
    </div>
    <div class="columnDiv">
    <img src="images/customer_support_icon.png" alt="customer support" class="iconImage"/><label class="bigBlackMarginLabel">Customer support </label> <br><br>
    <p class="blackLabelFade">Submit tickets when you have problems and our support agent will answer to you in the next 24 hours. You will receive an email confirmation for every submitted ticket, ticket message and ticket status change</p> <br>
    <img src="images/top_ads_icon.png" alt="top icon" class="iconImage"/><label class="bigBlackMarginLabel">Top ads</label> <br><br>
    <p class="blackLabelFade">Track all your top ads, see and update average cost per click, see and update max cost per click. You can also show your best ads ordered by descending max cost per click</p>
    </div>
    <br><br>
    </div>
     <div class="centerDiv">
    <div>
    <button class="centerButtonWideBig" onClick="goToRegister()">Start earning!</button><br>
    </div>
    </div>

   
</body>

</html> 