<?php 
 session_start();
 require_once __DIR__ . '/db_config.php';
 $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}
 $stmt = $mysqli->stmt_init();
 $stmt->prepare("SELECT IdUser FROM Usr WHERE HashUser LIKE ? ");
 $stmt->bind_param("s", $_GET["id"]);
 $stmt->execute();
 $stmt->bind_result($_SESSION["queriedId"]);
 $stmt->fetch();
 $stmt->close();
?>
<!doctype html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title>Top ads</title>
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
        <script type="text/javascript" src="scripts/top_ads.js"></script>
        <br><br>
        <input type="text" id="search" placeholder="Search ads" name="search" class="searchInput" >  <img id="searchImage" class="searchImage" src="images/search.png" alt="search" onClick="filter();">
        <button class="commonButton" onClick="bestAds();" >Best ads</button>
        <br><br>
        <button class="commonButton" onClick="goPrev();" id="prevButton" style="display:none;">Previous</button> 
        <button class="numberButtonMarked" onClick="doNothing();" id="one">1</button>
        <button class="numberButton" onClick="goToSection(this);" id="two">2</button>
        <button class="numberButton" onClick="goToSection(this);" id="three">3</button>
        <button class="numberButton" onClick="goToSection(this);" id="four">4</button>
        <button class="numberButton" onClick="goToSection(this);" id="five">5</button>
        <button class="commonButton" onClick="goNext();" id="nextButton" style="display:none;">Next</button>
        <br><br>
        <table id="adsTable">
        <tr>
        <th class="narrow"> # </th> <th> Ad </th> <th> Average CPC </th> <th> Max CPC </th> <th> Time </th>
        </tr>
        </table>
    </div>

</body>

</html>