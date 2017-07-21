<?php
date_default_timezone_set('Etc/UTC');
require '../PHPMailerAutoload.php';
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls';
$mail->SMTPAuth = true;
$mail->Username = "theofficialadvertisements@gmail.com";
$mail->Password = "thea12xyz";
$mail->setFrom('theofficialadvertisements@gmail.com', 'Official advertisements');
$mail->addReplyTo('theofficialadvertisements@gmail.com', 'Official advertisements');
$mail->addAddress('zukinatibor@gmail.com', 'Tibor Zukina');
$mail->Subject = 'PHPMailer GMail SMTP test';
$message = '<html>
<head></head>
<body style="width:100%; height:100%; margin:0; padding-left:3%; background-color:#668cff;">
<div style="overflow:auto; padding-bottom:49px; margin-bottom:100px;">
<div style="width:96%; padding:2%; float:right; background-color:#668cff;">
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Dear Tibor,</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    thank you for joining Official advertisements!</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    Your identity is being verified by our administrators.</h1><br>
<h1 style="color:white; margin: 0.8em 0; font-family: Lucida Sans Unicode; font-size:1.25em;">
    You can login and start using all our great features for free!</h1><br><br>
<img style="width:30%; height:auto;" src="'.LOGO_URL.'" alt="" />     
</div>
</div>
</body>
</html>';
$mail->msgHTML($message, '/home/u373774686/public_html/web_app/PHPMailer-master/examples');
$mail->send();
?>