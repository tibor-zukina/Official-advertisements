var hashId;

function getUserDetails(id) {

        hashId = id;
        var formData = "id=" + id;
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
            url: "get_user_details.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                success = JSON.parse(data).success;
                if(success == -666) { 
                   window.location.replace('logout.php'); 
                   return;
                }
                else if(success == 1) {
                   user = JSON.parse(data).user;
                   userId = user.userId;
                   email = user.email;
                   name = user.name;
                   surname = user.surname;
                   company = user.company;
                   whatsAppNumber = user.whatsAppNumber;
                   address = user.address;
                   facebookProfileUrl = user.facebookProfileUrl;
                   country = user.country;
                   status = user.status;
                   imageUrl = user.imageUrl;
                   documentImageUrl = user.documentImageUrl;
                   document.getElementById('userId').innerHTML += userId;
                   document.getElementById('email').innerHTML += email;
                   document.getElementById('name').innerHTML += name;
                   document.getElementById('surname').innerHTML += surname;
                   document.getElementById('company').innerHTML += company;
                   document.getElementById('whatsAppNumber').innerHTML += whatsAppNumber;
                   document.getElementById('address').innerHTML += address;
                   document.getElementById('facebookProfileUrl').innerHTML += facebookProfileUrl;
                   document.getElementById('country').innerHTML += country;
                   document.getElementById('status').innerHTML += status;
                   userImage = document.getElementById('userImage');
                   documentImage = document.getElementById('documentImage');
                   if(userImage != null) userImage.src = imageUrl;
                   if(documentImage != null) documentImage.src = documentImageUrl;
                }
            }
        });
}

function verifyUser() {

        var formData = "id=" + hashId;
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
            url: "approve_user.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                success = JSON.parse(data).success;
                if(success == -666) { 
                   window.location.replace('logout.php'); 
                   return;
                }
                else if(success == 1) {
                   swal('User verified', 'You have verified a new user', 'success');
                   setTimeout(function(){ window.history.back(); }, 1500);
                   
                }
            }
        });
}

function rejectUser() {

        var formData = "id=" + hashId;
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
            url: "reject_user.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                success = JSON.parse(data).success;
                if(success == -666) { 
                   window.location.replace('logout.php'); 
                   return;
                }
                else if(success == 1) {
                   swal('User rejected', 'You have rejected a new user', 'success');
                   setTimeout(function(){ window.history.back(); }, 1500);
                }
            }
        });

}

function deleteUser()  {

var formData = "id=" + hashId;
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
            url: "delete_user.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                success = JSON.parse(data).success;
                if(success == -666) { 
                   window.location.replace('logout.php'); 
                   return;
                }
                else if(success == 1) {
                   swal('User deleted', 'You have deleted an active user', 'success');
                   setTimeout(function(){ window.history.back(); }, 1500);
                }
            }
        });

}

function reactivateUser() {

var formData = "id=" + hashId;
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
            url: "reactivate_user.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                success = JSON.parse(data).success;
                if(success == -666) { 
                   window.location.replace('logout.php'); 
                   return;
                }
                else if(success == 1) {
                   swal('User reactivated', 'You have reactivated a deleted user', 'success');
                   setTimeout(function(){ window.history.back(); }, 1500);
                }
            }
        });


}


function goToDashboard(){

 window.location.href = 'dashboard.php?id='+hashId; 

}

function goToTopAds(){

 window.location.href = 'top_ads.php?id='+hashId; 

}

function goToOverview(){

 window.location.href = 'overview.php?id='+hashId; 

}