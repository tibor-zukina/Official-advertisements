<!doctype html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="design/design.css" />
    <link rel="stylesheet" type="text/css" href="design/sweetalert.css" />
    <link rel="icon" href="http://www.officialadvertisements.com/images/favicon.ico" />
    <title> Register </title>
<script type="text/javascript" src="https://www.google.com/recaptcha/api.js?hl=en"></script>
</head>

<body class="home">
    <div id="rightHeader">
   <img src="design/images/logo.png"  alt="Image can't be loaded" class="smallImage" onClick="goToHomePage()">
   <label class="blackLabel"><a href="sign_in.php" class="working" id="signIn">Sign in</a></label>
   <a href="sign_in.php"><img src="images/sign_in.png" alt="sign in" class="headerIcon"/></a>
   </div>


    <div id="section">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js"></script>
        <script type="text/javascript" src="scripts/sweetalert.min.js"></script>
        <script type="text/javascript" src="scripts/spin.js"></script>
        <script type="text/javascript" src="scripts/spin.min.js"></script>
        <script type="text/javascript" src="scripts/go_to_home.js"></script>
        <script type="text/javascript" src="scripts/registration.js"></script>
        <script type="text/javascript" src="scripts/facebook_login.js"></script>
        <script type="text/javascript" src="scripts/block_proxy.js"></script>
       
      
        <h1>Registration</h1>
        <br>
        <label>Register today for free!</label>
        <br><br>
        <input type="text" placeholder="Username" name="username" id="username" maxlength="20" title="Username may contain only letters and numbers" class="registrationInput"> <label class="bigMargin">*</label>
        <input type="email" id="email" placeholder="Email"  name="email" maxlength="100" class="registrationInput"> <label class="bigMargin">*</label>
        <br>
        <input type="text" id="name" placeholder="Name"  name="name" maxlength="50" class="registrationInput"> <label class="bigMargin">*</label>
        <input type="text" id="surname" placeholder="Surname"  name="name" maxlength="50" class="registrationInput"> <label class="bigMargin">*</label>
        <br>
        <input type="text" id="company" placeholder="Company"  name="company" maxlength="50" class="extraMargin"> 
        <input type="text" id="whatsAppNumber" placeholder="WhatsApp number"  name="company" maxlength="50" class="registrationInput"> <label class="bigMargin">*</label>
        <br>
        <input type="text" id="address" placeholder="Address"  name="address" maxlength="100" class="registrationInput"> <label class="bigMargin">*</label>
        <?php
include 'countries.php';
?> <label>*</label>
<label class="hintLabelVisible" id="countryHint">&emsp;(Select your country)</label>
<br>
<input type="text" id="facebookProfileUrl" placeholder="Facebook profile url"  name="facebookProfileUrl" maxlength="100" class="registrationInputWide"> <label class="bigMargin">*</label> <br> 
<label class="hintLabel" id="passwordRule" >Password has to be at least 8 characters long and contain uppercase letter</label><br>
        <input type="password" oninput="updateProgressBar()" placeholder="Password" name="password" id="password" title="Your password has to be at least 8 characters long and contain uppercase letter" maxlength="30" class="registrationInput"> <label class="bigMargin">*</label>
        <input type="password" oninput="updateProgressBar()" placeholder="Confirm password" name="confirmPassword" id="confirmPassword" maxlength="30" class="registrationInput"> <label class="bigMargin">*</label> <label id="matchLabel">Passwords don't match</label>
        <br>
       <div id="myProgressUncentered">
       <div id="strengthBar"></div> <label class="bigLabel" id="progressText">0%</label>
       </div>
        <br>
        <label>Document for identity verification:&emsp;*</label> <br><br>
        <div class="profileViewportBlue" id="imagePreview">
        <div class="imageDiv"> <img src="images/document.png" class="setProfileImage" id="myProfileImage" alt="Can not load image">
        <input type="image" src="images/gallery.png" class="multiFunctionButton" onClick="startUpload()" alt="Can not load image">
        </div>
        </div>
        <div class="inputDiv">
    <input type="file" id="imageUpload" accept="image/*" onchange="previewFile()">
    </div>
   <br>
   <span id="recapthaDiv" class="g-recaptcha" data-sitekey="6Lf3sBcUAAAAAKhrTZMxGoGV-EcnK9Us6tcrabC2" data-callback="recaptchaCallback" data-theme="light"></span>
    <img src="images/logo.png" id="homeImage" class="headImageInline"> 
    <input type="image" src="images/arrow_next.png" onClick="registerUser()" id="registrationButton" class="nextWidget" alt="Submit data"/>
    <label class="bigLabelCentered"><a href="sign_in.php" class="workingWhite">Already have an account? Sign in</a></label>
            <script type="text/javascript" src="scripts/show_image.js"></script>
    </div>

</body>

</html>