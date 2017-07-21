var changed = 'no';
var exifOrient;
var angle;
var extension;
var base64String;
var preview;
var file;
var reader;
var exifReader;
var creatingPreview;
var transImage;
var imageWidth;
var imageHeight;
var imageAlpha;
var loadSuccess;
var profileImageUrl;

function setProfileImageUrl(imageUrl) {
 profileImageUrl = imageUrl;
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

function showEdit(){
  document.getElementById('cancel').style.display = 'inline';
  document.getElementById('uploadButton').style.display = 'inline';
  document.getElementById('edit').onclick = saveChanges;
  document.getElementById('edit').innerHTML = 'Save';
}

function removeEdit(){
 document.getElementById('cancel').style.display = 'none';
 document.getElementById('uploadButton').style.display = 'none';
 document.getElementById('edit').onclick = showEdit;
 document.getElementById('edit').innerHTML = 'Edit profile';
 document.getElementById('myProfileImage').src = profileImageUrl;
}

function saveChanges(){
 document.getElementById('cancel').style.display = 'none';
 document.getElementById('uploadButton').style.display = 'none';
 document.getElementById('edit').onclick = showEdit;
 document.getElementById('edit').innerHTML = 'Edit profile';
 if (changed == 'yes') {
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
                        data = {
                            image: base64String,
                            ext: extension
                        };
                        callback = function(response, status) {
                            success = JSON.parse(response).success;
                            spinner.stop();
                            if(success==-666){
                            window.location.replace('logout.php');
                            return;
                            }
                            else if(success==1){
                            swal('Changes saved', 'Profile picture successfully updated', 'success');
                            profileImageUrl = JSON.parse(response).imageUrl;
                            }
                        };
                        $.post('upload_profile_update.php', data, callback);
 }
}
function startUpload() {
     if (typeof FileReader == "undefined") swal("Unable to upload profile picture","Picture upload now available on this version of "+browser,"warning");
     else document.getElementById('imageUpload').click();
}

function previewFile() {
    preview = document.getElementById('myProfileImage');
    file = document.getElementById('imageUpload').files[0];
    fileName = file.name;
    extension = fileName.substr(fileName.lastIndexOf('.') + 1);
    reader = new FileReader();
    exifReader = new FileReader();
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
                        else if (exifOrient == 8) angle = 3 * Math.PI / 2;
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
