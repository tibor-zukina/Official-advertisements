var frame;
function generateLocalDate() {

 var date = new Date();
 var year = date.getFullYear();
 var month = date.getMonth() + 1;
 var day = date.getDate();
 var hours = date.getHours();
 var minutes = date.getMinutes();
 var mark;
 if(hours == 0) {
   mark = 'AM';
   hours = 12;
 }
 else if ( hours >=1 && hours <= 11) mark = 'AM';
 else if ( hours == 12) mark = 'PM';
 else if ( hours >= 13 && hours <=23) {
   mark = 'PM';
   hours = hours -=12;
 }
 if (minutes < 10) minutes = '0'+minutes;
 var dateStr = day + '.' + month + '.' + year + '. ' + hours + ':' + minutes + ' ' + mark; 
 return dateStr;
}

function addVideo() {
    var title = document.getElementById("title").value;
    var text = document.getElementById("text").value;
    if (title.replace(/(\r\n|\n|\r)/gm,"") == "") {
        document.getElementById("title").focus();
    }
    else if ( text.indexOf('https://www.youtube.com/watch?v') == -1 ) {
        document.getElementById("text").focus();
    } else {
        time = generateLocalDate();
        var formData = "title=" + title + "&text=" + text + "&time=" + time;
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
            url: "put_video.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1) {
                    swal('Video successfully shared', 'You have successfully shared the youtube video for your users', 'success');
                    setTimeout(function(){ window.history.back(); }, 1500);
                }
                else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }
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