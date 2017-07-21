var exifOrient;
var creatingPreview;
var transImage;
var imageWidth;
var imageHeight;
var imageAlpha;
var loadSuccess;
var angle;
var extension = '';
var base64String;
var recapthaMarked = 'no';

function registerUser() {
    var id = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var company = document.getElementById("company").value;
    var whatsAppNumber = document.getElementById("whatsAppNumber").value.replace(/\s/g,'');
    var address = document.getElementById("address").value;
    var facebookProfileUrl = document.getElementById("facebookProfileUrl").value;
    var country = document.getElementById("country").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userRegex = /^[a-z0-9]+$/i;
     if (id == "") {
        document.getElementById("username").focus();
    } else if (email == "") {
        document.getElementById("email").focus();
    } else if (name == "") {
        document.getElementById("name").focus();
    } else if (surname == "") {
        document.getElementById("surname").focus();
    } else if (whatsAppNumber == "") {
        document.getElementById("whatsAppNumber").focus();
    } else if (address == "") {
        document.getElementById("address").focus();
    } else if (facebookProfileUrl == "") {
        document.getElementById("facebookProfileUrl").focus();
    } else if (country == "") {
        document.getElementById("country").focus();
    } else if (password == "") {
        document.getElementById("password").focus();
    } else if (confirmPassword == "") {
        document.getElementById("confirmPassword").focus();
    } else if (extension == "") {
        swal('Document picture needed','You need to upload your document picture for identity verification');
    } else if (recapthaMarked == 'no') {
       document.getElementById("recapthaDiv").focus();
       swal('Check recaptha', 'Recaptha is not checked', 'warning');
    } 
    /*else if (userRegex.test(username) == false) {
        document.getElementById("username").focus();
        swal('Invalid username', 'Username must only contain letters and numbers', 'warning');
    } */
     else if (password != confirmPassword) {
        document.getElementById("confirmPassword").focus();
        swal('Unmatching passwords', 'Passwords must match', 'warning');
    } else if (password.length < 8) {
        document.getElementById("password").focus();
        swal('Insecure password', 'Password must be at least 8 characters long', 'warning');
    } else if (password.toLowerCase() == password) {
        document.getElementById("password").focus();
        swal('Insecure password', 'Password must contain at least one uppercase letter', 'warning');
    } else if (emailRegex.test(email) == false) {
        document.getElementById("email").focus();
        swal('Invalid email address', 'Please enter a valid email address', 'warning');
    } 
    else if (whatsAppNumber.length < 8 || whatsAppNumber[0] != '+' || /^\d+$/.test(whatsAppNumber.substring(1,whatsAppNumber.length)) == false ) {
        document.getElementById("whatsAppNumber").focus();
        swal('Invalid whatsApp number', 'Please enter a valid whatsApp number', 'warning');
    }
    else {
        var formData = "id=" + id + "&email=" + email + "&name=" + name + "&surname=" + surname + "&whatsAppNumber=" + whatsAppNumber + "&address=" + address + "&facebookProfileUrl=" + facebookProfileUrl + "&country=" + country + "&company=" + company + "&password=" + password+ "&ext=" + extension;
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
            url: "register_user.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if (success == 1) {
                    data = {
                            image: base64String,
                        };
                        callback = function(response, status) {
                            success=JSON.parse(response).success;
                            if(success == -666){
                            forceLogOut();
                            return;
                            }
                            else  {
                               swal("Account successfully registered","Your account has been successfully registered","success");
                               setTimeout(function(){ 
                                  $.ajax({
                                  url: "notify_admin.php",
                                  type: "POST",
                                  data: "",
                                  success: function(data, textStatus, jqXHR) { spinner.stop(); window.location.replace('my_profile.php'); } 
                                  }); 
                                }, 1000);
                            }
                        };
                        $.post('upload_document.php', data, callback);
                } else if (success == -1) {
                    error = JSON.parse(data).error;
                    swal('Invalid data', error, 'warning');
                } else {

                }

            },

        });
    }
}

    
                       

function startUpload() {
    if (typeof FileReader == "undefined") swal("Unable to upload document picture","Picture upload now available on this browser","warning");
    else document.getElementById('imageUpload').click();
}

function previewFile() {

    var preview = document.getElementById('myProfileImage');
    var file = document.getElementById('imageUpload').files[0];
    fileName = file.name;
    extension = fileName.substr(fileName.lastIndexOf('.') + 1);
    var reader = new FileReader();
    var exifReader = new FileReader();
    loadSuccess = 'no';
    setTimeout(function() {
        if(loadSuccess == 'no')  swal("Unable to upload profile picture","Error occured while loading image","warning");     
    }, 3000); 
    reader.onloadend = function() {
        loadSuccess = 'yes';
        transImage = document.createElement('img');
        transImage.className = 'setProfileImage';
        transImage.src = reader.result;
        preview.src = 'images/public_image.png';
        creatingPreview = document.createElement('label');
        creatingPreview.className = 'centerPreview';
        creatingPreview.innerHTML = 'Creating preview...';
        document.getElementById('imagePreview').appendChild(creatingPreview);   
        if(angle == Math.PI/2 || angle == 3*Math.PI/2){
            setTimeout(function() {
                transImage.src = imgRotated(transImage);
                setTimeout(function() {
                   preview.src = imgCropped(transImage);
                   document.getElementById('imagePreview').removeChild(creatingPreview);
                   base64String = preview.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");   
                   changed = 'yes';      
                }, 300);        
            }, 300);
        }   
        else {
            setTimeout(function() {
                preview.src = img2Square(transImage);
                document.getElementById('imagePreview').removeChild(creatingPreview);
                base64String = preview.src.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                changed = 'yes';      
            }, 300);
        }
    }


    exifReader.onload = function() {

        var view = new DataView(exifReader.result);
        if (view.getUint16(0, false) != 0xFFD8) {
            angle = 0;
            reader.readAsDataURL(file);
            return;
        }
        var length = view.byteLength,
            offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) {
                    angle = 0;
                    reader.readAsDataURL(file);
                    return;
                }
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
                        exifOrient = view.getUint16(offset + (i * 12) + 8, little);
                        if (exifOrient == 1) angle = 0;
                        else if (exifOrient == 8) angle = 3* Math.PI / 2;
                        else if (exifOrient == 3) angle = Math.PI;
                        else if (exifOrient == 6) angle = Math.PI / 2;
                        reader.readAsDataURL(file);
                        return;
                    }
            } else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        angle = 0;
        reader.readAsDataURL(file);
        return;
    };

    if (file) {
        exifReader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    } else {
        preview.src = "";
    }

}


function img2Square(img) {

    var w = img.naturalWidth || img.width;
    var h = img.naturalHeight || img.height;
    var min = Math.min(w, h);
    var newSize;
    if (min > 500) newSize = 500;
    else newSize = min;
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.height = newSize;
    if (w > h) {
        diff = (w - min) / 2;
        ctx.drawImage(img, diff, 0, min, min, 0, 0, newSize, newSize);
    }
    else {
        diff = (h - min) / 2;
        ctx.drawImage(img, 0, diff, min, min, 0, 0, newSize, newSize);
    }
    var mCanvas=document.createElement('canvas');
    mCanvas.width=canvas.width;
    mCanvas.height=canvas.height;
    var mCtx=mCanvas.getContext('2d');
    mCtx.drawImage(canvas,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(angle);
    ctx.drawImage(mCanvas,-canvas.width/2,-canvas.height/2);
    ctx.rotate(-angle);
    ctx.translate(-canvas.width/2,-canvas.height/2);
    return canvas.toDataURL();

}

function imgRotated(img) {
    
    var canvas = document.createElement("canvas");
    var w = img.naturalWidth || img.width;
    var h = img.naturalHeight || img.height;
    canvas.width = canvas.height = Math.max(w,h);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0);
    var mCanvas=document.createElement('canvas');
    mCanvas.width=canvas.width;
    mCanvas.height=canvas.height;
    var mCtx=mCanvas.getContext('2d');
    mCtx.drawImage(canvas,0,0);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.translate(canvas.width/2,canvas.height/2);
    ctx.rotate(angle);
    ctx.drawImage(mCanvas,-canvas.width/2,-canvas.height/2);
    ctx.rotate(-angle);
    ctx.translate(-canvas.width/2,-canvas.height/2);
    imageAlpha = canvas.getContext('2d').getImageData(10, 10, 1, 1).data[3];
    imageWidth = h;
    imageHeight = w;
    return canvas.toDataURL();
}

function imgCropped(img) {

       w = imageWidth;
       h = imageHeight;
       canvas = document.createElement("canvas");
       ctx = canvas.getContext("2d");
       var min = Math.min(w, h);
       var newSize;
       if (min > 500) newSize = 500;
       else newSize = min;
       canvas.width = canvas.height = newSize;
       if(imageAlpha == 0){
          if (w > h) ctx.drawImage(img, (w-h)/2, w-h, h, h, 0, 0, newSize, newSize);
          else ctx.drawImage(img, h-w, (h-w)/2, w, w, 0, 0, newSize, newSize);
       }
       else {
          if (w > h) ctx.drawImage(img, (w-h)/2, 0, h, h, 0, 0, newSize, newSize);
          else ctx.drawImage(img, 0, (h-w)/2, w, w, 0, 0, newSize, newSize);
       }
       return canvas.toDataURL();


}

function updateProgressBar(){

  var strength = 0;
  var newPassword = document.getElementById('password').value;
  var newPasswordConfirm = document.getElementById('confirmPassword').value;
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
  else document.getElementById('strengthBar').style.backgroundColor = '#00cc00';
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

function recaptchaCallback(){

recapthaMarked = 'yes';
window.scrollTo(document.body.scrollWidth ,document.body.scrollHeight);
setTimeout(function() {
                         recapthaMarked = 'no';      
                            }, 120000);
}

function forceLogOut() {


formData="";
swal("Loging out","Invalid login session","warning");
 $.ajax({
        url: "logout_session.php",
        type: "POST",
        data: formData,
        success: function(data, textStatus, jqXHR) {
           setTimeout(function() { 
     window.location.replace('cumnsee.php');  
     },1000);
                                    
         },
            });

              
}


function countryHintInvisible() {

 document.getElementById('countryHint').style.display = 'none';

}