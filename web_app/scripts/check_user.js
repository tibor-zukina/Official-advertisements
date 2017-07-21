 $.ajax({
      url: "check_user.php",
           type: "POST",
           data: "",
           success: function(data, textStatus, jqXHR) { 
             var name =  JSON.parse(data).name;  
             if(name != null) {
                 document.getElementById('signIn').innerHTML = 'My account';    
                 document.getElementById('username').innerHTML = name;
             }    
             else document.getElementById('username').parentNode.removeChild(document.getElementById('username'));                  
             } 
         }); 