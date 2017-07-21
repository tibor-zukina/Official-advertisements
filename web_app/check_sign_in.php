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
    $stmt->prepare("SELECT COUNT(*) AS num FROM AuthTokenUser WHERE HashAuthTokenUser LIKE ? AND ActiveAuthTokenUser LIKE 'yes' ");
    $stmt->bind_param("s", $authToken);
    $stmt->execute();
    $stmt->bind_result($num);
    $stmt->fetch();
    $stmt->close();
    if($num>0){
        $stmt   = $mysqli->stmt_init();
        $stmt->prepare("SELECT ? - LastActivityAuthTokenUser AS diff FROM AuthTokenUser WHERE HashAuthTokenUser LIKE ? ");
        $stmt->bind_param("is",$time, $authToken);
        $stmt->execute();
        $stmt->bind_result($difference);
        $stmt->fetch();
        $stmt->close();
        if($difference<86400){
           $stmt   = $mysqli->stmt_init();
           $stmt->prepare("UPDATE AuthTokenUser SET LastActivityAuthTokenUser=? WHERE HashAuthTokenUser LIKE ? ");
           $stmt->bind_param("is",$time, $authToken);
           $stmt->execute();
           $stmt->fetch();
           $stmt->close();
        }
        else{
           $stmt = $mysqli->stmt_init();
           $stmt->prepare("UPDATE AuthTokenUser SET ActiveAuthTokenUser='no' WHERE HashAuthTokenUser LIKE ?");
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
if (isset($_SESSION["authTokenUser"]) && isTokenValid($_SESSION["authTokenUser"])) {

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT UserIdAuthTokenUser FROM AuthTokenUser WHERE HashAuthTokenUser LIKE ? AND ActiveAuthTokenUser LIKE 'yes'  ");
    $stmt->bind_param("s", $_SESSION["authTokenUser"]);
    $stmt->execute();
    $stmt->bind_result($_SESSION['userId']);
    $stmt->fetch();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT EmailUser, NameUser, SurnameUser, CompanyUser, WhatsAppNumberUser, AddressUser, CountryUser, ImageUrlUser, DocumentImageUrlUser, BalanceUser, StatusUser FROM Usr WHERE IdUser LIKE ?");
    $stmt->bind_param("s", $_SESSION['userId']);
    $stmt->execute();
    $stmt->bind_result($_SESSION["emailUser"], $_SESSION["nameUser"], $_SESSION["surnameUser"], $_SESSION["companyUser"], $_SESSION["whatsAppNumberUser"], $_SESSION["addressUser"], $_SESSION["countryUser"], $_SESSION["imageUrlUser"], $_SESSION["documentImageUrlUser"], $_SESSION["balanceUser"], $_SESSION["statusUser"]);
    $stmt->fetch();
    $stmt->close();

    $mysqli->close();
   
   if(!is_null($_SESSION["userId"])) {
      echo '<script> window.location.replace("dashboard.php"); </script>';
   }
   else {
      session_destroy();
   }
   
}
 else session_destroy();
?> 