 $.ajax({
      url: "check_user.php",
           type: "POST",
           data: "",
           success: function(data, textStatus, jqXHR) { 
             var name =  JSON.parse(data).name;  
             if(name != null) {
                 var button = document. createElement("button");
                 button.className = 'commonButtonHeader';
                 button.innerHTML = 'Admin panel';
                 button.onclick = function() { window.location.replace('users_list.php'); }
                 document.getElementById('rightHeader').insertBefore(button, document.getElementById('username'));   
                 document.getElementById('username').innerHTML = name;
             }                      
             } 
         }); 