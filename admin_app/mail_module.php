<?php
require_once __DIR__ . '/url_config.php';

function approveUser($username,$email,$name) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Dear ' . $username . ',</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    we are happy to notify you that your identity has been successfully verified.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You can login and start using all our great features for free!</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.MAIN_DOMAIN.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements',$email,$name,'Identity verification successfull','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function rejectUser($username,$email,$name) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Dear ' . $username . ',</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    unfortunately our administrators couldn\'t verify your identity</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    For verification, please resend your document picture by replying to this email.</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements',$email,$name,'Identity verification failed','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function deleteUser($username,$email,$name) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Dear ' . $username . ',</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    our administrators have deleted your account.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    To file complaints or ask for your account reactivation please answer to this email.</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements',$email,$name,'Your account has been deleted','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function reactivateUser($username,$email,$name) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Dear ' . $username . ',</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    we are happy to notify you that your account has been reactivated.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You can login and continue using all our great features for free!</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.MAIN_DOMAIN.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements',$email,$name,'Your account has been reactivated','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function newPasswordLink($hash,$email,$name) {

$link = ADMIN_APP.'set_new_password.php?id=' . $hash;

$message = '<html><head>
</head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    A new password has been requested for your admin account.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Follow this link to set new password: ' . $link . '</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />      
</div>
</div>
</body>
</html>';
       
        
sendEmail('Official Advertisements',$email,$name,'New password requested','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function setForgottenPassword($email,$name) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="  color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You have recently requested a new admin account password and it has been changed.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You can login to your admin panel again:</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.ADMIN_APP.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />       
</div>
</div>
</body>
</html>';
    
sendEmail('Official Advertisements',$email,$name,'Password has been changed','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function sendSupportMessageAdmin($reportId,$text,$title,$description,$email,$name,$hash) {

$link    = WEB_APP.'subscription_settings.php?id=' . $hash;

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;"> 
    Admin has responded to your ticket number ' . $reportId . ':</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">'
    . $text . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Those were the ticket details:</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Subject: ' . $title . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Problem description: ' . $description . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Log in to respond: '.MAIN_DOMAIN.'</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Follow this link to change your email subscription settings:</h1><br>
<h1 style="color:white; font-family: Lucida Sans Unicode; margin: 0.8em; font-size:1.25em;">' 
    . $link . '</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';
        
$emailSubject = 'New message about ticket ' . $reportId . ' received';
sendEmail('Official Advertisements',$email,$name, $emailSubject,'theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function ticketStatusUpdate($email, $name, $reportId,$title,$description,$status,$hash,$sendToUser) {

$link  = WEB_APP.'subscription_settings.php?id=' . $hash;

if($sendToUser == 'yes') {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Admin has '. $status .' ticket number ' . $reportId . '.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;"> 
    Those were the ticket details:</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Subject: ' . $title . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;"> 
    Problem description: ' . $description . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Follow this link to change your email subscription settings:</h1><br>
<h1 style="color:white; font-family: Lucida Sans Unicode; margin: 1em 1em 1em 1em; font-size:1.25em;">' 
    . $link . '</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />       
</div>
</div>
</body>
</html>';
    
$emailSubject = 'Ticket ' . $reportId . ' '.$status;
sendEmail('Official Advertisements',$email,$name,$emailSubject,'theofficialadvertisements@gmail.com','thea12xyz',$message);

}

}


function sendEmail($from,$email,$name,$subject,$username,$password,$message) {

date_default_timezone_set('Etc/UTC');
require '/home/u373774686/public_html/web_app/PHPMailer-master/PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = $username;
$mail->Password = $password;
$mail->setFrom($username, $from);
$mail->addReplyTo($username, $from);
$mail->addAddress($email, $name);
$mail->Subject = $subject;
$mail->msgHTML($message, '/home/u373774686/public_html/web_app/PHPMailer-master/examples');
$mail->send();

}
?>