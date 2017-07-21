<?php

session_start();
include 'check_auth_token.php';
include 'mail_module.php';

if( isset($_SESSION["userId"]) && isset($_SESSION["reportTitle"]) && isset($_SESSION["reportProblem"]) ) {
notifyAdminTicket($_SESSION["userId"],$_SESSION["reportTitle"],$_SESSION["reportProblem"]);
}
?>