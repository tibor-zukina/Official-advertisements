<?php
require_once __DIR__ . '/url_config.php';

function registerUser($username,$email,$name) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Dear ' . $username . ',</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    thank you for joining Official Advertisements!</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Your identity is being verified by our administrators.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You can login and start using all our great features for free!</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.MAIN_DOMAIN.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements',$email,$name,'Registration successful','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function notifyAdmin($username,$imageUrl) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<img src="'.$imageUrl.'" alt="" />
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    New user ' . $username . ' has registered his account at Official Advertisements</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Please login to your administrator panel and verify his identity.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.ADMIN_APP.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements','theofficialadvertisements@gmail.com','Official Advertisements','New user registered','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function newPasswordLink($hash,$email,$name) {

$link = WEB_APP.'set_new_password.php?id=' . $hash;

$message = '<html><head>
</head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    A new password has been requested for your account. If you haven\'t requested it, please report it to our support email and our support will instantly fix it.</h1><br>
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
    You have recently requested a new account password and it has been changed.</h1><br>
<h1 style="  color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    If you haven\'t made this changes, please report it to our support email and our support will instantly fix it.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You can login and continue using all our great features for free!</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.MAIN_DOMAIN.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />       
</div>
</div>
</body>
</html>';
    
sendEmail('Official Advertisements',$email,$name,'Password has been changed','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function sendSupportMessageUser($userId,$reportId,$text,$title,$description) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">'
    . $userId . ' has sent a message about ticket number ' . $reportId . ':</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">'
    . $text . '</h1><br> 
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Those were the ticket details:</h1><br> 
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Subject: ' . $title . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Problem description: ' . $description . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Join live chat to respond as soon as possible.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.ADMIN_APP.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />       
</div>
</div>
</body>
</html>';
    
$emailSubject = 'New message about ticket ' . $reportId . ' received';
sendEmail('Official Advertisements','theofficialadvertisements@gmail.com','Official Advertisements',$emailSubject,'theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function sendReport($title,$problem,$userEmail,$name,$userId,$hash,$sendToUser) {

$link  = WEB_APP.'subscription_settings.php?id=' . $hash;

if($sendToUser == 'yes') {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 1em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You have opened a new support ticket.</h1><br>
<h1 style="color:white; margin: 1em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Those are the details:</h1><br>
<h1 style="color:white; margin: 1em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Subject: ' . $title . '</h1><br>
<h1 style="color:white; margin: 1em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Problem description: ' . $problem . '</h1><br>
<h1 style="color:white; margin: 1em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Your ticket will be answered within 24 hours.</h1><br>
<h1 style="color:white; margin: 1em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Follow this link to change your email subscription settings:</h1><br>
<h1 style="color:white; font-family: Lucida Sans Unicode; margin: 0.8em 0; font-size:1.25em;">' 
    . $link . '</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />      
</div>
</div>
</body>
</html>';
       
sendEmail('Official Advertisements',$userEmail,$name,'You submitted a new ticket','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

}

function notifyAdminTicket($userId,$title,$problem) {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    User ' . $userId . ' opened a new support ticket.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Those are the details:</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Subject: ' . $title . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Problem description: ' . $problem . '</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Join live chat to respond as soon as possible.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    '.ADMIN_APP.'</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';

sendEmail('Official Advertisements','theofficialadvertisements@gmail.com','Official Advertisements','New support ticket','theofficialadvertisements@gmail.com','thea12xyz',$message);

}

function ticketStatusUpdate($email, $name, $reportId, $title,$description,$status,$hash,$sendToUser) {

$link  = WEB_APP.'subscription_settings.php?id=' . $hash;

if($sendToUser == 'yes') {

$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You have '. $status .' ticket number ' . $reportId . '.</h1><br>
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