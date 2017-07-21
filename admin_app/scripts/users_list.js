var loadedUsers = new Array();
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
var formData = "";
var target = document.getElementById('header');

function showUnverifiedUsers() {

document.getElementById('modeLabel').innerHTML = 'Unverified users';  
for(i=0, tot=loadedUsers.length; i<tot; i++) {
 loadedUsers[i].parentNode.removeChild(loadedUsers[i]);
}
loadedUsers = new Array();
var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "get_unapproved_users.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.replace('logout.php'); 
                    return;
                }
                var customers = JSON.parse(data).customers;
                if (customers.length > 0) {
                    for (var i = 0; i < customers.length; i++) {
                      var text = customers[i].name + '&nbsp;' + customers[i].surname + '<br>' + 'Username: ' + customers[i].userId + '<br>' + 'Email: ' + customers[i].email + '<br><br>';
                      customerDiv = document.createElement('div');
                      customerDiv.style.className = 'androidViewport';
                      customerDiv.innerHTML = '<div class="androidImageDiv">' +
                        '<img src="' + customers[i].documentImageUrl + '" class="androidImage" alt="" />' + '</div>' + '<label>' + text + '</label>'; 
                        if(i%3 == 0) document.getElementById('one').appendChild(customerDiv);
                        else if(i%3 == 1) document.getElementById('two').appendChild(customerDiv);
                        else document.getElementById('three').appendChild(customerDiv);
                        loadedUsers.push(customerDiv);
                      customerDiv.id = customers[i].hash;
                      customerDiv.onclick = function() { verifyIdentity(this.id); };
                    }
                }
                else {
                    customersList = document.createElement('h3');
                    customersList.innerHTML = 'No users need to be approved';
                    document.getElementById('sectionHome').appendChild(customersList);
                    loadedUsers.push(customersList);
                }
            }
        });
 
}

function showActiveUsers() {

document.getElementById('modeLabel').innerHTML = 'Active users';  
for(i=0, tot=loadedUsers.length; i<tot; i++) {
 loadedUsers[i].parentNode.removeChild(loadedUsers[i]);
}
loadedUsers = new Array();
var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "get_active_users.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.replace('logout.php'); 
                    return;
                }
                var customers = JSON.parse(data).customers;
                if (customers.length > 0) {
                    for (var i = 0; i < customers.length; i++) {
                      var text = customers[i].name + '&nbsp;' + customers[i].surname + '<br>' + 'Username: ' + customers[i].userId + '<br>' + 'Email: ' + customers[i].email + '<br><br>';
                      customerDiv = document.createElement('div');
                      customerDiv.style.className = 'androidViewport';
                      customerDiv.innerHTML = '<div class="androidImageDiv">' +
                        '<img src="' + customers[i].imageUrl + '" class="androidImage" alt="" />' + '</div>' + '<label>' + text + '</label>'; 
                        if(i%3 == 0) document.getElementById('one').appendChild(customerDiv);
                        else if(i%3 == 1) document.getElementById('two').appendChild(customerDiv);
                        else document.getElementById('three').appendChild(customerDiv);
                      loadedUsers.push(customerDiv);
                      customerDiv.id = customers[i].hash;
                      customerDiv.onclick = function() { showActiveDetails(this.id); };
                    }
                }
                else {
                    customersList = document.createElement('h3');
                    customersList.innerHTML = 'No active users found';
                    document.getElementById('sectionHome').appendChild(customersList);
                    loadedUsers.push(customersList);
                }
            }
        });
 
}

function showDeletedUsers() {

document.getElementById('modeLabel').innerHTML = 'Deleted users'; 
for(i=0, tot=loadedUsers.length; i<tot; i++) {
 loadedUsers[i].parentNode.removeChild(loadedUsers[i]);
}
loadedUsers = new Array();
var spinner = new Spinner(opts).spin(target);
        
        $.ajax({
            url: "get_deleted_users.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                spinner.stop();
                var success = JSON.parse(data).success;
                if(success == -666) {
                    window.location.replace('logout.php'); 
                    return;
                }
                var customers = JSON.parse(data).customers;
                if (customers.length > 0) {
                    for (var i = 0; i < customers.length; i++) {
                      var text = customers[i].name + '&nbsp;' + customers[i].surname + '<br>' + 'Username: ' + customers[i].userId + '<br>' + 'Email: ' + customers[i].email + '<br><br>';
                      customerDiv = document.createElement('div');
                      customerDiv.style.className = 'androidViewport';
                      customerDiv.innerHTML = '<div class="androidImageDiv">' +
                        '<img src="' + customers[i].imageUrl + '" class="androidImage" alt="" />' + '</div>' + '<label>' + text + '</label>'; 
                       if(i%3 == 0) document.getElementById('one').appendChild(customerDiv);
                        else if(i%3 == 1) document.getElementById('two').appendChild(customerDiv);
                        else document.getElementById('three').appendChild(customerDiv);
                      loadedUsers.push(customerDiv);
                      customerDiv.id = customers[i].hash;
                      customerDiv.onclick = function() { showDeletedDetails(this.id); };
                    }
                }
                else {
                    customersList = document.createElement('h3');
                    customersList.innerHTML = 'No deleted users found';
                    document.getElementById('sectionHome').appendChild(customersList);
                    loadedUsers.push(customersList);
                }
            }
        });
 
}

showUnverifiedUsers();

function verifyIdentity(id){

 window.location.href = 'verify_identity.php?id='+id;

}

function showActiveDetails(id){

 window.location.href = 'active_details.php?id='+id;

}

function showDeletedDetails(id){

 window.location.href = 'deleted_details.php?id='+id;

}
