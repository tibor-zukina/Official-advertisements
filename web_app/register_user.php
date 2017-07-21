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
include 'mail_module.php';
$response = array();
require_once __DIR__ . '/db_config.php';
$mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_DATABASE);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

if (isset($_POST['id']) && isset($_POST['email']) && isset($_POST['name']) && isset($_POST['surname']) && isset($_POST['company']) && isset($_POST['whatsAppNumber']) && isset($_POST['address']) && isset($_POST['facebookProfileUrl']) && isset($_POST['country']) && isset($_POST['password']) && isset($_POST['ext'])  ) {
       

    $_SESSION['ip'] = getClientIPServer();
    if ($_SESSION['ip'] == 'UNKNOWN') $_SESSION['ip'] = getClientIPEnv();

    $password = hash('sha512', $_POST['password']);
    $hash     = hash('sha512', $password . 'jfnr33o8JuG52N' . $_POST['id']);
    
    $filename = $_POST['id'] . '_'. time(). '.' . $_POST['ext'];
    $documentImageUrl  = 'http://www.officialadvertisements.com/documents/' . $filename;
    $_SESSION["filename"] = $filename;
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(IdUser) AS numId FROM Usr WHERE IdUser LIKE ?");
    $stmt->bind_param("s", $_POST['id']);
    $stmt->execute();
    $stmt->bind_result($numId);
    $stmt->fetch();
    $stmt->close();
    
    $stmt = $mysqli->stmt_init();
    $stmt->prepare("SELECT COUNT(EmailUser) AS numEmail FROM Usr WHERE RemoveDots(EmailUser) LIKE RemoveDots(?) ");
    $stmt->bind_param("s", $_POST['email']);
    $stmt->execute();
    $stmt->bind_result($numEmail);
    $stmt->fetch();
    $stmt->close();

    if ($numId == 1) {
        $response["success"] = -1;
        $response["error"]   = "Already used user id";
    } else if ($numEmail == 1) {
        $response["success"] = -1;
        $response["error"]   = "Already used email";
    }
    else {
        $whatsAppNumber = '+'.substr($_POST['whatsAppNumber'],1,strlen($_POST['whatsAppNumber']));
        $stmt = $mysqli->stmt_init();
        $stmt->prepare("INSERT INTO Usr(IdUser,EmailUser,NameUser,SurnameUser,CompanyUser,WhatsAppNumberUser,AddressUser,FacebookProfileUrlUser,CountryUser,DocumentImageUrlUser,PasswordHashCodeUser,HashUser) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ");
        $stmt->bind_param("ssssssssssss", $_POST['id'], $_POST['email'], $_POST['name'], $_POST['surname'], $_POST['company'], $whatsAppNumber, $_POST['address'], $_POST['facebookProfileUrl'], $_POST['country'], $documentImageUrl, $password, $hash);
        $stmt->execute();
        $stmt->close();
        $name = $_POST["name"].' '.$_POST["surname"];
        registerUser($_POST["id"],$_POST["email"],$name); 
        $response["success"]              = 1;
        $response["message"]              = "User successfully registered";
        $_SESSION["userId"]               = $_POST['id'];
        $_SESSION["emailUser"]                  = $_POST['email'];
        $_SESSION["nameUser"]               = $_POST['name'];
        $_SESSION["surnameUser"]                 = $_POST['surname'];
        $_SESSION["companyUser"]               = $_POST['company'];
        $_SESSION["whatsAppNumberUser"]          = $whatsAppNumber;
        $_SESSION["addressUser"]                = $_POST['address'];
        $_SESSION["countryUser"]         = $_POST['country'];
        $_SESSION["balanceUser"]            = 0;
        $_SESSION["statusUser"]           = 'pending verification';
        
        $time = time();

        $tokenHash = hash('sha512', $_SESSION["userId"] . 'jfnr33o8JuG52N' . $time);

        $stmt = $mysqli->stmt_init();
        $stmt->prepare("INSERT INTO AuthTokenUser(HashAuthTokenUser,UserIdAuthTokenUser,IPAddressAuthTokenUser,TimeAuthTokenUser,LastActivityAuthTokenUser)  VALUES(?,?,?,?,?)");
        $stmt->bind_param("sssii", $tokenHash, $_SESSION["userId"], $_SESSION['ip'], $time, $time);
        $stmt->execute();
        $stmt->close();
    
        $_SESSION["authTokenUser"] = $tokenHash;
       
        
    }
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
    
} else {
    
    $response["success"] = 0;
    $response["message"] = "Secret authorization failed";
    echo json_encode($response,JSON_UNESCAPED_UNICODE|JSON_PARTIAL_OUTPUT_ON_ERROR);
}
?>