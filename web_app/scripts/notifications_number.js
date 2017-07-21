 $.ajax({
            url: "get_notifications_number.php",
            type: "POST",
            data: "",
            success: function(data, textStatus, jqXHR) {

                notificationsNumber = JSON.parse(data).number;
                if(notificationsNumber > 0) {
                   document.getElementById('notificationsNumber').innerHTML = notificationsNumber;
                   if( (window.location.href.indexOf('notifications.php') == -1) && (window.location.href.indexOf('notification_details.php') == -1) ) document.getElementById('notificationsIndicator').src = 'images/news_red.png';
                }
            }
        });