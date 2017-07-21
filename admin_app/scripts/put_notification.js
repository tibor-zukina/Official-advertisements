function enterPutNotification(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 
        putNotification();
    }
}

function putNotification() {
    var title = document.getElementById("title").value;
    var text = document.getElementById("text").value;
    if (title.replace(/(\r\n|\n|\r)/gm,"") == "") {
        document.getElementById("title").focus();
    } else if (text.replace(/(\r\n|\n|\r)/gm,"") == "") {
        document.getElementById("text").focus();
    } else {
        var formData = "title=" + title + "&text=" + text;
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
            url: "put_notification.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {

                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1) {
                    swal('Notification successfully published', 'You have successfully published a new notification', 'success');
                    setTimeout(function(){ window.history.back(); }, 1500);
                }
                else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }
}

