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
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>My profile</title>
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
   <div class="navDivMarked" id="myProfile"><hr><label class="navLabel">My profile</label>
   <img src="images/profile_icon.png" alt="my profile" class="navIcon"/><hr></div>
   <a href="customer_support.php"><div class="navDiv" id=customer support"><hr><label class="navLabel">Support</label>
   <img src="images/customer_support.png" alt="customer support" class="navIcon"/><hr></div></a> 
    <a href="rules.php"><div class="navDiv" id="rules"><hr><label class="navLabel">Rules</label>
   <img src="images/rules.png" alt="rules" class="navIcon"/><hr></div></a> 
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
        <script type="text/javascript" src="scripts/my_profile.js"></script>
        <script type="text/javascript" src="scripts/set_nav.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
        <script type="text/javascript"> setProfileImageUrl('<?php echo $_SESSION["imageUrlUser"]; ?>'); </script>
        <label class="blackLabel" id="userId"><?php echo $_SESSION["userId"] ?></label> <br><br>
        <div class="profileViewport" id="imagePreview">
        <div class="imageDiv"> <img src="<?php echo $_SESSION['imageUrlUser']; ?>"  class="setProfileImage" id="myProfileImage" alt="Can not load image">
        <input type="image" src="images/gallery.png" class="multiFunctionButton" onClick="startUpload()" id="uploadButton" alt="Can not load image" style="display:none;">
        </div>
        </div>
        <div class="inputDiv"> 
        <input type='file' id='imageUpload' accept="image/*" onchange="previewFile()">
        </div> 
        <br>
        <label class="blackLabel" id="email">Email:&nbsp; <?php echo $_SESSION["emailUser"] ?> </label> <br><br>
        <label class="blackLabel" id="name">Name:&nbsp; <?php echo $_SESSION["nameUser"] ?> </label> <br><br>
        <label class="blackLabel" id="surname">Surname:&nbsp;<?php echo $_SESSION["surnameUser"] ?> </label> <br><br>
        <label class="blackLabel" id="company">Company:&nbsp;<?php echo $_SESSION["companyUser"] ?> </label> <br><br>
        <label class="blackLabel" id="whatsAppNumber">WhatsApp number:&nbsp;<?php echo $_SESSION["whatsAppNumberUser"] ?> </label> <br><br>
        <label class="blackLabel" id="address">Address:&nbsp;<?php echo $_SESSION["addressUser"] ?> </label> <br><br>
        <label class="blackLabel" id="facebookProfileUrl">Facebook profile url:&nbsp;<?php echo $_SESSION["facebookProfileUrlUser"] ?> </label> <br><br>
        <label class="blackLabel" id="country">Country:&nbsp;<?php echo $_SESSION["countryUser"] ?> </label> <br><br>
        <label class="blackLabel" id="status">Status:&nbsp;<?php echo $_SESSION["statusUser"] ?> </label> <br><br>
        <div class="centerDiv">
        <div>
        <button class="commonButton" onClick="showEdit()" id="edit">Edit profile</button>
        <button class="commonButton" onClick="removeEdit()" id="cancel" style="display:none;" >Cancel</button>
        </div>
        </div>
        <br><br>
    </div>
</body>

</html>