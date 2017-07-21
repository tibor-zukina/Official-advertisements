var number = 0;
var reportId = null;
var ticketStatus = null;
var fetching = "no";
var firstLoad = true;

function timeText(timePassed) {

    if (timePassed < 60) return 'Moments ago'
    else if (timePassed >= 60 && timePassed < 3600) return Math.floor(timePassed / 60) + ' minutes ago';
    else if (timePassed >= 3600 && timePassed < 86400) return Math.floor(timePassed / 3600) + ' hours ago';
    else if (timePassed >= 86400) return Math.floor(timePassed / 86400) + ' days ago';

}

function addMessages() {
    var textBox = document.getElementById('messageText');
    var text = textBox.value;
    textBox.value = '';
    if (text != '') {
        var formData ="text=" + text + "&reportId=" + reportId;
        $.ajax({
            url: "send_support_message.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                success=JSON.parse(data).success;
                if(success==1){
                ticketStatus = JSON.parse(data).newStatus;
                document.getElementById("statusValue").innerHTML = ticketStatus;
                if(ticketStatus == 'Closed'){
                  document.getElementById("statusButton").innerHTML = 'REOPEN TICKET';
                }
                else {
                  document.getElementById("statusButton").innerHTML = 'CLOSE TICKET';
                }
                if (fetching == "no") update();
                }
                else if(success == -666)  window.location.replace('logout.php');
            }

        });
    }
}


function periodical(id, status) {

    reportId = id;
    ticketStatus = status;
    number = 0;
    if (fetching == "no") update();
    setInterval(function() {
        if (fetching == "no") {
            fetching = "yes";
            var formData = "offset=" + number + "&reportId=" + reportId;
            $.ajax({
                url: "get_support_messages.php",
                type: "POST",
                data: formData,
                success: function(data, textStatus, jqXHR) {
                    success = JSON.parse(data).success;
                    if (success == -666){
                    window.location.replace('logout.php');
                    return;
                    }
                    ticketStatus = JSON.parse(data).newStatus;
                    document.getElementById("statusValue").innerHTML = ticketStatus;
                    if(ticketStatus == 'Closed'){
                      document.getElementById("statusButton").innerHTML = 'REOPEN TICKET';
                    }
                    else {
                      document.getElementById("statusButton").innerHTML = 'CLOSE TICKET';
                    }
                    supportMessages = JSON.parse(data).supportMessages;
                    tot = supportMessages.length;
                    for (var i = 0 ; i < tot; i++) {
                        var senderLabel = document.createElement('label');
                        senderLabel.innerHTML = supportMessages[i].sender + ':<br><br>';
                        senderLabel.className = 'blackLabel';
                        document.getElementById('supportMessages').appendChild(senderLabel);
                        var textLabel = document.createElement('label');
                        textLabel.innerHTML = supportMessages[i].text + '<br><br>';
                        textLabel.className = 'blackLabel';
                        document.getElementById('supportMessages').appendChild(textLabel);
                        var timeLabel = document.createElement('label');
                        timeLabel.innerHTML = timeText(supportMessages[i].time) + '<br><br><br><br>';
                        timeLabel.className = 'blackLabel';
                        document.getElementById('supportMessages').appendChild(timeLabel);
                        number++;
                    }
                    fetching = "no";
                    if(!firstLoad && tot>0) window.scrollTo(0,document.body.scrollHeight);
                    if(firstLoad) firstLoad = false;
                    
                }

            });
        }
    }, 10000);
}


function update() {

    fetching = "yes";
    var formData = "offset=" + number + "&reportId=" + reportId;
    $.ajax({
        url: "get_support_messages.php",
        type: "POST",
        data: formData,
        success: function(data, textStatus, jqXHR) {
            success = JSON.parse(data).success;
            if(success == -666) {
              window.location.replace('logout.php');
              return;
            }
            ticketStatus = JSON.parse(data).newStatus;
            document.getElementById("statusValue").innerHTML = ticketStatus;
            if(ticketStatus == 'Closed'){
              document.getElementById("statusButton").innerHTML = 'REOPEN TICKET';
            }
            else {
              document.getElementById("statusButton").innerHTML = 'CLOSE TICKET';
            }
            supportMessages = JSON.parse(data).supportMessages;
            tot = supportMessages.length;
            for (var i = 0 ; i < tot; i++) {
                var senderLabel = document.createElement('label');
                senderLabel.innerHTML = supportMessages[i].sender + ':<br><br>';
                senderLabel.className = 'blackLabel';
                document.getElementById('supportMessages').appendChild(senderLabel);
                var textLabel = document.createElement('label');
                textLabel.innerHTML = supportMessages[i].text + '<br><br>';
                textLabel.className = 'blackLabel';
                document.getElementById('supportMessages').appendChild(textLabel);
                var timeLabel = document.createElement('label');
                timeLabel.innerHTML = timeText(supportMessages[i].time) + '<br><br><br><br>';
                timeLabel.className= 'blackLabel';
                document.getElementById('supportMessages').appendChild(timeLabel);
                number++;
            }
            fetching = "no";
            if(!firstLoad && tot>0) window.scrollTo(0,document.body.scrollHeight);
            if(firstLoad) firstLoad = false;
        }
    });
}

function closeTicket() {
    if (ticketStatus == 'Closed') calledUrl = "reopen_ticket.php";
    else calledUrl = "close_ticket.php";
    var formData = "reportId=" + reportId;
    $.ajax({
        url: calledUrl,
        type: "POST",
        data: formData,
        success: function(data, textStatus, jqXHR){
                var success = JSON.parse(data).success;      
                if (success == 1) {
                if (ticketStatus == 'Closed') {
                    ticketStatus = 'Reopened';
                    document.getElementById("statusValue").innerHTML = 'Reopened';
                    document.getElementById("statusButton").innerHTML = 'CLOSE TICKET';
                } else {
                    ticketStatus = 'Closed';
                    document.getElementById("statusValue").innerHTML = 'Closed';
                    document.getElementById("statusButton").innerHTML = 'REOPEN TICKET';
                    window.history.back();
                }
            } 
            else if(success == -666) window.location.replace('logout.php');        
        }
    });
}

