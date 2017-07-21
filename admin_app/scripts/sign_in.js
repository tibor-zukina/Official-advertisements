function enterSignIn(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 

        signIn();
    }
}

function signIn() {

    document.getElementById("loginId").blur();
    document.getElementById("password").blur();
    var loginId = document.getElementById("loginId").value;
    var password = document.getElementById("password").value;

    if (loginId == "") {
        document.getElementById("loginId").focus();
    } else if (password == "") {
        document.getElementById("password").focus();
    } else {
        var formData = "loginId=" + loginId + "&password=" + password;
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
        var target = document.getElementById('header');
        var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "get_login_data.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var adminId = JSON.parse(data).adminId;
                if (adminId != null) {
                   window.location.href = 'users_list.php';
                } else {
                    swal({
                        title: "Incorrect password",
                        text: "This password doesn't match with any admin id or email. Send new password?",
                        type: "warning",
                        showCancelButton: true
                    }, function() {
                        window.location.href = 'send_new.php';
                    });
                }
            }
        });
    }
}
