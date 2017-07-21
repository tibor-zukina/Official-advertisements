<?php
error_reporting(E_ERROR);
session_start();
function isTokenValid($authToken)
{
    
    require_once __DIR__ . '/db_config.php';
    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
    $time = time();
    $difference = 100000;
    $stmt   = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(*) AS num FROM AuthTokenAdmin WHERE HashAuthTokenAdmin LIKE ? AND ActiveAuthTokenAdmin LIKE 'yes' ");
    $stmt->bind_param("s", $authToken);
    $stmt->execute();
    $stmt->bind_result($num);
    $stmt->fetch();
    $stmt->close();
    if($num>0){
        $stmt   = $mysqli->stmt_init();
        $stmt->prepare("SELECT ? - LastActivityAuthTokenAdmin AS diff FROM AuthTokenAdmin WHERE HashAuthTokenAdmin LIKE ? ");
        $stmt->bind_param("is",$time, $authToken);
        $stmt->execute();
        $stmt->bind_result($difference);
        $stmt->fetch();
        $stmt->close();
        if($difference<86400){
           $stmt   = $mysqli->stmt_init();
           $stmt->prepare("UPDATE AuthTokenAdmin SET LastActivityAuthTokenAdmin=? WHERE HashAuthTokenAdmin LIKE ? ");
           $stmt->bind_param("is",$time, $authToken);
           $stmt->execute();
           $stmt->fetch();
           $stmt->close();
        }
        else{
           $stmt = $mysqli->stmt_init();
           $stmt->prepare("UPDATE AuthTokenAdmin SET ActiveAuthTokenAdmin='no' WHERE HashAuthTokenAdmin LIKE ?");
           $stmt->bind_param("s", $authToken);
           $stmt->execute();
           $stmt->fetch();
           $stmt->close();
       }


    }
    
    return ($num > 0 && $difference < 86400);
    
}

require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);
if (isset($_SESSION["authTokenAdmin"]) && isTokenValid($_SESSION["authTokenAdmin"])) {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT UserIdAuthTokenAdmin FROM AuthTokenAdmin WHERE HashAuthTokenAdmin LIKE ? AND ActiveAuthTokenAdmin LIKE 'yes'  ");
    $stmt->bind_param("s", $_SESSION["authTokenAdmin"]);
    $stmt->execute();
    $stmt->bind_result($_SESSION['adminId']);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT EmailAdmin, NameAdmin, SurnameAdmin FROM Admin WHERE IdAdmin LIKE ?");
    $stmt->bind_param("s", $_SESSION['adminId']);
    $stmt->execute();
    $stmt->bind_result($_SESSION["emailAdmin"], $_SESSION["nameAdmin"], $_SESSION["surnameAdmin"]);
    $stmt->fetch();
    $stmt->close();

    $mysqli->close();
   
   if(!is_null($_SESSION["adminId"])) {
       echo "<script> window.location.href = 'users_list.php'; </script>";
   }
   else session_destroy();
}
 else session_destroy();
?> 