<?php 
session_start(); 
include 'get_user_data.php';
?>
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="stylesheet" type="text/css" href="design/normalize.css" />
    <link rel="stylesheet" type="text/css" href="design/datepicker.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Overview</title>
</head>

<body class="grayWrapper">
   <div id="headerStat">
       <img src="images/logo.png"  alt="Image can't be loaded" class="smallerImage" onClick="goToHomePage();">
       <label id="notificationsNumber" class="bigLabel"></label><a href="notifications.php"><img src="images/news.png" alt="news" id="notificationsIndicator" class="headerIconUserBig"/></a>
    <label> <?php echo $_SESSION["nameUser"].' '.$_SESSION["surnameUser"]; ?> &emsp; </label>
   <label><a href="logout.php" class="workingWhite" id="logout">Log out</a></label>
   <a href="logout.php"><img src="images/logout.png" alt="log out" class="headerIconUser"/></a>
   </div>
   <div id="navigationStat"><a href="dashboard.php"><div class="navDiv" id="dashboard"><hr><label class="navLabel">Dashboard</label>
   <img src="images/dashboard.png" alt="dashboard" class="navIcon"/><hr></div></a>
   <a href="my_profile.php"><div class="navDiv" id="myProfile"><hr><label class="navLabel">My profile</label>
   <img src="images/profile_icon.png" alt="my profile" class="navIcon"/><hr></div></a> 
   <a href="customer_support.php"><div class="navDiv" id=customer support"><hr><label class="navLabel">Support</label>
   <img src="images/customer_support.png" alt="customer support" class="navIcon"/><hr></div></a>
    <a href="rules.php"><div class="navDiv" id="rules"><hr><label class="navLabel">Rules</label>
   <img src="images/rules.png" alt="rules" class="navIcon"/><hr></div></a>
    <a href="top_ads.php"><div class="navDiv" id="topAds"><hr><label class="navLabel">Top ads</label>
   <img src="images/top_ads.png" alt="top ads" class="navIcon"/><hr></div></a>
  <div class="navDivMarked" id="overview"><hr><label class="navLabel">Overview</label>
   <img src="images/overview.png" alt="overview" class="navIcon"/><hr></div>
   <a href="instructions.php"><div class="navDiv" id="instructions"><hr><label class="navLabel">Instructions</label>
   <img src="images/instructions.png" alt="instructions" class="navIcon"/><hr></div></a> </div>
    <div id="userSection">
       
        <?php
        $date = date('d.m.Y', time());
        if( !($_SESSION["statusUser"] == "free")  ) 
        echo '<label class="blackLabel"> Your identity is still being verified by our administrators </label> <br> <br> <br>
        <label class="blackLabel"> Once you are verified, you will be able to create overview for your websites </label> 
        <img src="images/logo_black.png" alt="Home image" class="dashboardImage" id="homeImage" />
        <script type="text/javascript" src="scripts/show_image.js"></script>';
        else echo '
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/notifications_number.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script>
        <script type="text/javascript" src="scripts/set_nav.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <br>
         <input type="text" id="search" placeholder="Search website" name="search" class="searchInputWide" >  <img id="searchImage" class="deleteImage" src="images/search.png" alt="search" onClick="filter();">
        <input type="text" id="from" placeholder="Earliest date" name="from" value="'.$date.'." class="searchInput" > <label class="blackLabel">&emsp;-&emsp;</label> <input type="text" id="to" placeholder="Latest date" name="to" value="'.$date.'." class="searchInput"><br>
        <img id="deleteImage" class="deleteImage" src="images/delete.png" alt="delete" onClick="performDelete();">
        <br><br>
        <button class="commonButton" onClick="goPrev();" id="prevButton" style="display:none;">Previous</button> 
        <button class="numberButtonMarked" onClick="doNothing();" id="one">1</button>
        <button class="numberButton" onClick="goToSection(this);" id="two">2</button>
        <button class="numberButton" onClick="goToSection(this);" id="three">3</button>
        <button class="numberButton" onClick="goToSection(this);" id="four">4</button>
        <button class="numberButton" onClick="goToSection(this);" id="five">5</button>
        <button class="commonButton" onClick="goNext();" id="nextButton" style="display:none;">Next</button>
        <br><br>
        <table id="websitesTable" cellspacing="0">
        <tr>
        <th class="narrow"> <input type="checkbox" name="selectAll" id="selectAll"> </th> <th class="narrow"> # </th> <th> Website </th> <th> CTR </th> <th> Views </th> <th> Date </th>
        </tr>
        </table>
        <br><br>
        <input type="text" id="website" placeholder="Website" name="website" class="largeInput" >   
        <button class="commonButtonLow" onClick="putWebsite()" id="addWebsite">Add website</button>
        <br><br>
        <script type="text/javascript" src="scripts/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="scripts/jquery-ui-1.8.18.custom.min.js"></script>
        <script type="text/javascript" src="scripts/overview.js"></script>';
        ?>
        </div>
</body>

</html>