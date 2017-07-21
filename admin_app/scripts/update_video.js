var frame;
function updateVideo() {
    var text = document.getElementById("text").value;
    if (text.indexOf('https://www.youtube.com/watch?v=') == -1) {
        document.getElementById("text").focus();
    } else {
        var formData = "text=" + text;
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
            url: "update_instructions.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1) {
                    swal('Video successfully updated', 'You have successfully updated the url of youtube video for your users', 'success');
                    setTimeout(function(){ window.history.back(); }, 1500);
                }
                else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }
}

function deleteVideo() {
        var formData = "";
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
            url: "delete_instructions.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1) {
                    swal('Video successfully deleted', 'You have successfully deleted the youtube video for your users', 'success');
                    setTimeout(function(){ window.history.back(); }, 1500);
                }
                else if (success == -666) window.location.href = 'logout.php';
            },

        });
}

function previewVideo() {
   var text = document.getElementById("text").value;
   if ( text.indexOf('https://www.youtube.com/watch?v') == -1 ) {
        document.getElementById("text").focus();
    }
   else {
     if(frame != null) document.getElementById('sectionHome').removeChild(frame);
     frame = document.createElement('iframe');
     frame.width = 640;
     frame.height = 480;
     frame.src = text.replace('watch?v=','embed/');
     document.getElementById('sectionHome').appendChild(frame);
   }
}
previewVideo();