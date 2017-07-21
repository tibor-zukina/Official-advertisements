<?php 
session_start(); 
?>
<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Notification details</title>
</head>

<body class="grayWrapper">
   <div id="headerStat">
       <img src="images/logo.png"  alt="Image can't be loaded" class="smallerImage" onClick="goToHomePage();">
    <label id="notificationsNumber" class="bigLabel"></label> <img src="images/news.png" alt="news" id="notificationsIndicator" class="headerIconUserBigMarked"/>
    <label> <?php echo $_SESSION["nameUser"].' '.$_SESSION["surnameUser"]; ?> &emsp; </label>
   <label><a href="logout.php" class="workingWhite" id="logout">Log out</a></label>
   <a href="logout.php"><img src="images/logout.png" alt="log out" class="headerIconUser"/></a>
   </div>
   <div id="navigationStat"><a href="dashboard.php"><div class="navDiv" id="dashboard"><hr><label class="navLabel">Dashboard</label>
   <img src="images/dashboard.png" alt="dashboard" class="navIcon"/><hr></div></a>
   <a href="my_profile.php"><div class="navDiv" id="myProfile"><hr><label class="navLabel">My profile</label>
   <img src="images/profile_icon.png" alt="my profile" class="navIcon"/><hr></div></a>
    <a href="customer_support.php"><div class="navDiv" id="customerSupport"><hr><label class="navLabel">Support</label>
   <img src="images/customer_support.png" alt="customer support" class="navIcon"/><hr></div></a>
    <a href="info.php"><div class="navDiv" id="rules"><hr><label class="navLabel">Rules</label>
   <img src="images/info.png" alt="rules" class="navIcon"/><hr></div></a>
   <a href="top_ads.php"><div class="navDiv" id="topAds"><hr><label class="navLabel">Top ads</label>
   <img src="images/top_ads.png" alt="top ads" class="navIcon"/><hr></div></a>
   <a href="overview.php"><div class="navDiv" id="overview"><hr><label class="navLabel">Overview</label>
   <img src="images/overview.png" alt="overview" class="navIcon"/><hr></div></a>
    <a href="instructions.php"><div class="navDiv" id="instructions"><hr><label class="navLabel">Instructions</label>
   <img src="images/instructions.png" alt="instructions" class="navIcon"/><hr></div></a></div>
    <div id="userSection">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/notifications_number.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script>
        <script type="text/javascript" src="scripts/set_nav.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <?php
          $id = $_GET["id"];
          require_once __DIR__ . '/db_config.php';
          $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
          $stmt   = $mysqli->stmt_init();
          $stmt->prepare("SELECT TitleNotification, TextNotification FROM Notification WHERE IdNotification LIKE ? ");
          $stmt->bind_param("i", $id);
          $stmt->execute();
          $stmt->bind_result($title, $text);
          $stmt->fetch();
          $stmt->close();

          include 'put_notified.php';
        ?>
        <h1 class="blackTitle"><?php echo $title; ?></h1>
        <br>
        <p class="bigBlackLabel"> <?php echo $text; ?> </p>
        <br>
        <br>
        </div>
</body>

</html>