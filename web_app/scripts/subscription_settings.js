function updateSubscriptionSettings(id, type) {
  
    var receiveNewTicket = null;
    var receiveTicketUpdates = null;
    var receiveTicketMessages = null;
    if (document.getElementById("receiveNewTicket").checked) {
        receiveNewTicket = "yes";
    } else {
        receiveNewTicket = "no";
    }
    if (document.getElementById("receiveTicketUpdates").checked) {
        receiveTicketUpdates = "yes";
    } else {
        receiveTicketUpdates = "no";
    }
    if (document.getElementById("receiveTicketMessages").checked) {
        receiveTicketMessages = "yes";
    } else {
        receiveTicketMessages = "no";
    }
  
    var formData = "receiveNewTicket=" + receiveNewTicket + "&receiveTicketUpdates=" + receiveTicketUpdates + "&receiveTicketMessages=" + receiveTicketMessages + '&id=' + id;
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
        url: "update_subscription_settings.php",
        type: "POST",
        data: formData,
        success: function(data, textStatus, jqXHR) {
            success = JSON.parse(data).success;
            spinner.stop();
            if(success == 1) {
            swal('Changes saved', 'Subscription settings successfully updated', 'success');
            setTimeout(function() {
                        window.location.replace('officialadvertisements.php');
                    }, 1500);
           }

        },

    });

}
