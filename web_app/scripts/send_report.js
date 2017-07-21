function enterSendReport(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 
        sendReport();
    }
}

function sendReport() {
    var title = document.getElementById("title").value;
    var problem = document.getElementById("problem").value;
    if (title.replace(/(\r\n|\n|\r)/gm,"") == "") {
        document.getElementById("title").focus();
    } else if (problem.replace(/(\r\n|\n|\r)/gm,"") == "") {
        document.getElementById("problem").focus();
    } else {
        var formData = "title=" + title + "&problem=" + problem;
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
        var target = document.getElementById('headerStat');
        var spinner = new Spinner(opts).spin(target);
        $.ajax({
            url: "send_report.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {

                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 setTimeout(function(){ 
                                  $.ajax({
                                  url: "notify_admin_ticket.php",
                                  type: "POST",
                                  data: "",
                                  success: function(data, textStatus, jqXHR) { 
                                          spinner.stop();
                                          swal('Report successfully sent', 'You have successfully sent your problem report. Our support will contact you in the next 24 hours', 'success');
                                          setTimeout(function() {
                                              window.history.back();
                                           }, 1500); 
                                    } 
                                  }); 
                                }, 100);
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }
}

