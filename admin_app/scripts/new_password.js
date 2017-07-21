function getMobileOperatingSystem() {

 var userAgent = navigator.userAgent || navigator.vendor || window.opera;
 if (/windows phone/i.test(userAgent))  return "Windows Phone";
 if (/android/i.test(userAgent))  return "Android";
 if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return "iOS";
 return 'unknown';
}

function getDesktopOperatingSystem() {
 
 if (navigator.appVersion.indexOf("Win")!=-1) return "Windows";
 else if (navigator.appVersion.indexOf("Mac")!=-1) return "MacOS";
 else if (navigator.appVersion.indexOf("X11")!=-1) return "UNIX";
 else if (navigator.appVersion.indexOf("Linux")!=-1) return "Linux";
 else return 'unknown';

}

function getBrowser(){

 var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
 var isFirefox = typeof InstallTrigger !== 'undefined';
 var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
 var isIE = /*@cc_on!@*/false || !!document.documentMode;
 var isEdge = !isIE && !!window.StyleMedia;
 var isChrome = !!window.chrome && !!window.chrome.webstore;
 var isBlink = (isChrome || isOpera) && !!window.CSS;
 if(isOpera) return 'Opera';
 else if(isFirefox) return 'Firefox';
 else if(isSafari) return 'Safari';
 else if(isIE) return 'Internet Explorer';
 else if(isEdge) return 'Edge';
 else if(isChrome) return 'Chrome';
 else if(isBlink) return 'Blink';
 else return 'unknown';
}

function getBrowserAlternative(){

var navigatorAgent = navigator.userAgent;
var browserName  = navigator.appName;
var nameOffset,verOffset;
if ((verOffset=navigatorAgent.indexOf("Opera"))!=-1) {
 return "Opera";
}
else if ((verOffset=navigatorAgent.indexOf("MSIE"))!=-1) {
 return "Internet Explorer";
}
else if ((verOffset=navigatorAgent.indexOf("Chrome"))!=-1) {
 return "Chrome";
}
else if ((verOffset=navigatorAgent.indexOf("Safari"))!=-1) {
 return "Safari";
}
else if ((verOffset=navigatorAgent.indexOf("Firefox"))!=-1) {
 return "Firefox";
} 
else if ( (nameOffset=navigatorAgent.lastIndexOf(' ')+1) < (verOffset=navigatorAgent.lastIndexOf('/')) ) {
 browserName = navigatorAgent.substring(nameOffset,verOffset);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
 return browserName;
}

else return 'unknown';

}

var browser = getBrowser();
if (browser == 'unknown') browser=getBrowserAlternative();
var operatingSystem = getMobileOperatingSystem();
if (operatingSystem =='unknown') operatingSystem = getDesktopOperatingSystem();

function enterSendNewPassword(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 
        
       if(browser == 'Internet Explorer' && operatingSystem == 'Windows') setTimeout(function() { 
     sendNewPassword();
     },200);
        else sendNewPassword();
    }
}


function sendNewPassword() {

    var testRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var mail = document.getElementById("mail").value;
    document.getElementById("mail").blur();
    if (mail == "") {
        document.getElementById("mail").focus();
    } else if (testRegex.test(mail) == false) {
        document.getElementById("mail").focus();
        swal('Invalid email address', 'Please enter a valid email address', 'warning');
    } else {
        var formData = "email=" + mail;
        var opts = {
            lines: 13,
            length: 36,
            width: 14,
            radius: 62,
            scale: 1,
            corners: 1,
            color: 'white',
            opacity: 0.25,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 30,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: true,
            hwaccel: false,
            position: 'absolute'
        };
        var target = document.getElementById('rightHeader');
        var spinner = new Spinner(opts).spin(target);

        $.ajax({
            url: "new_password.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {

                spinner.stop();
                success = JSON.parse(data).success;
                if (success == 1) {
                    swal('New password sent', 'Password change link is sent to your email', 'success');
                    setTimeout(function() {
                        window.location.href = 'sign_in.php';
                    }, 1500);

                } else if(success == -1) {
                    swal('Unregistered email address', 'This email address is not registered', 'warning');
                }

            },

        });
    }


}

function enterNewPassword(e,id){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 
        
       if(browser == 'Internet Explorer' && operatingSystem == 'Windows') setTimeout(function() { 
     setForgottenPassword(id);
     },200);
        else setForgottenPassword(id);
    }
}

function setForgottenPassword(id) {
    var newPassword = document.getElementById("newPassword").value;
    var confirmNewPassword = document.getElementById("confirmNewPassword").value;
    document.getElementById("newPassword").blur();
    document.getElementById("confirmNewPassword").blur();
    if (newPassword == "") {
        document.getElementById("newPassword").focus();
    } else if (confirmNewPassword == "") {
        document.getElementById("confirmNewPassword").focus();
    } else if (newPassword != confirmNewPassword) {
        document.getElementById("confirmNewPassword").focus();
        swal('Unmatching passwords', 'Passwords must match','warning');
    } else if (newPassword.length < 8) {
        document.getElementById("newPassword").focus();
        swal('Insecure password', 'Password must be at least 8 characters long', 'warning');
    } else if (newPassword.toLowerCase() == newPassword) {
        document.getElementById("newPassword").focus();
        swal('Insecure password', 'Password must contain at least one uppercase letter', 'warning');
    } else {
        var formData = 'id=' + id + '&password=' + newPassword;
        var opts = {
            lines: 13,
            length: 36,
            width: 14,
            radius: 62,
            scale: 1,
            corners: 1,
            color: 'white',
            opacity: 0.25,
            rotate: 0,
            direction: 1,
            speed: 1,
            trail: 60,
            fps: 30,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: true,
            hwaccel: false,
            position: 'absolute'
        };
        var target = document.getElementById('rightHeader');
        var spinner = new Spinner(opts).spin(target);

        $.ajax({
            url: "set_forgotten_password.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                success = JSON.parse(data).success;
                if (success == 1) {
                    swal('Password successfully changed', 'You have successfully changed your password', 'success');
                    setTimeout(function() { 
     window.location.replace('sign_in.php');  
     },1500); 
                }
                else if (success == -666) window.location.replace('sign_in.php');
            }
        });
    }
}

function updateProgressBar(){

  var strength = 0;
  var newPassword = document.getElementById('newPassword').value;
  var newPasswordConfirm = document.getElementById('confirmNewPassword').value;
  if(newPassword.toLowerCase() != newPassword && newPassword.length >= 8) document.getElementById('passwordRule').style.display = 'none';
  else document.getElementById('passwordRule').style.display = 'inline';
  strength = strength + Math.min(50,newPassword.length*5);
  if ( newPassword.toLowerCase() != newPassword ) strength = strength + 25;
  if ( /\d+/g.test(newPassword) ) strength = strength + 25;
  document.getElementById('strengthBar').style.width = strength + '%';
  document.getElementById('progressText').innerHTML = strength + '%';
  if(strength<25) document.getElementById('strengthBar').style.backgroundColor = '#d61310';
  else if(strength<50) document.getElementById('strengthBar').style.backgroundColor = '#ede20a';
  else if(strength<75) document.getElementById('strengthBar').style.backgroundColor = '#ed920a';
  else if(strength<100) document.getElementById('strengthBar').style.backgroundColor = '#13870f';
  else document.getElementById('strengthBar').style.backgroundColor = '#10c616';
  var matchLabel = document.getElementById('matchLabel');
  if(newPassword != '' && newPasswordConfirm != ''){
    matchLabel.style.visibility = 'visible';
    if(newPassword !=newPasswordConfirm) {
      matchLabel.innerHTML = "Passwords don't match";
      matchLabel.style.color = '#ede20a';
    }
    else if(newPassword == newPasswordConfirm) {
      matchLabel.innerHTML = "Passwords match";
      matchLabel.style.color = '#13870f';
    }
  }
  else matchLabel.style.visibility = 'hidden';
}
