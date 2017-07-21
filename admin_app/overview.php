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
 $date = date('d.m.Y', time());
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
        <br>
         <input type="text" id="search" placeholder="Search website" name="search" class="searchInputWide" >  <img id="searchImage" class="searchImage" src="images/search.png" alt="search" onClick="filter();">
        <input type="text" id="from" placeholder="Earliest date" name="from" value="<?php echo $date; ?>" class="searchInput" > <label class="bigLabel">&emsp;-&emsp;</label> <input type="text" id="to" placeholder="Latest date" name="to" value="<?php echo $date; ?>" class="searchInput">
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
        <th class="narrow"> # </th> <th> Website </th> <th> CTR </th> <th> Views </th> <th> Date </th>
        </tr>
        </table>
        <br><br>
        <script type="text/javascript" src="scripts/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="scripts/jquery-ui-1.8.18.custom.min.js"></script>
        <script type="text/javascript" src="scripts/overview.js"></script>
    </div>

</body>

</html>