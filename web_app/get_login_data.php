<?php
function getClientIPEnv() {
    $ipAddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipAddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipAddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipAddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
        $ipAddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipAddress = getenv('REMOTE_ADDR');
    else
        $ipAddress = 'UNKNOWN';
 
    return $ipAddress;
}

function getClientIPServer() {
    $ipAddress = '';
    if ($_SERVER['HTTP_CLIENT_IP'])
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    else if($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ipAddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if($_SERVER['HTTP_X_FORWARDED'])
        $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
    else if($_SERVER['HTTP_FORWARDED_FOR'])
        $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if($_SERVER['HTTP_FORWARDED'])
        $ipAddress = $_SERVER['HTTP_FORWARDED'];
    else if($_SERVER['REMOTE_ADDR'])
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipAddress = 'UNKNOWN';
 
    return $ipAddress;
}
session_start();
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST["loginId"]) && isset($_POST["password"])  ) {
       
    $password = hash('sha512', $_POST['password']);

   $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT IdUser, EmailUser, NameUser, SurnameUser, CompanyUser, WhatsAppNumberUser, AddressUser, FacebookProfileUrlUser, CountryUser, ImageUrlUser, DocumentImageUrlUser, BalanceUser, StatusUser FROM Usr WHERE (IdUser LIKE ? OR RemoveDots(EmailUser) LIKE RemoveDots(?) ) AND PasswordHashCodeUser LIKE ? AND DeletedUser LIKE 'no' ");
    $stmt->bind_param("sss", $_POST["loginId"], $_POST["loginId"], $password);
    $stmt->execute();
    $stmt->bind_result($_SESSION["userId"], $_SESSION["emailUser"], $_SESSION["nameUser"], $_SESSION["surnameUser"], $_SESSION["companyUser"], $_SESSION["whatsAppNumberUser"], $_SESSION["addressUser"], $_SESSION["facebookProfileUrlUser"], $_SESSION["countryUser"], $_SESSION["imageUrlUser"], $_SESSION["documentImageUrlUser"], $_SESSION["balanceUser"], $_SESSION["statusUser"]);
    $stmt->fetch();
    $stmt->close();
   
    $response["userId"] = $_SESSION["userId"];

    if (!is_null($_SESSION["userId"])) {

    $time = time();
    $tokenHash = hash('sha512', $_SESSION["userId"] . 'jfnr33o8JuG52N' . $time);
    $_SESSION['ip'] = getClientIPServer();
    if ($_SESSION['ip'] == 'UNKNOWN') $_SESSION['ip'] = getClientIPEnv();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("UPDATE AuthTokenUser SET ActiveAuthTokenUser='no' WHERE UserIdAuthTokenUser LIKE ?");
    $stmt->bind_param("s", $_SESSION['userId']);
    $stmt->execute();
    $stmt->close();

    $stmt = $mysqli->stmt_init();
    $stmt->prepare("INSERT INTO AuthTokenUser (HashAuthTokenUser,UserIdAuthTokenUser,IPAddressAuthTokenUser,TimeAuthTokenUser,LastActivityAuthTokenUser)  VALUES(?,?,?,?,?)");
    $stmt->bind_param("sssii", $tokenHash, $_SESSION["userId"], $_SESSION['ip'], $time, $time);
    $stmt->execute();
    $stmt->close();

    $_SESSION["authTokenUser"] = $tokenHash;
    }
    else{
     unset($_SESSION["userId"]);
    }

    $mysqli->close();
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>