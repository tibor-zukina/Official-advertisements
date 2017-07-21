var initialElement = document.getElementById("homeImage");
 var initialOpacity = 0;
 var initialTimer = setInterval(function () {
        
   if (initialOpacity >= 100 ) clearInterval(initialTimer);
   else{
      initialElement.style.opacity = initialOpacity/100;
      initialElement.style.filter = 'alpha(opacity=' + initialOpacity  + ")";
      initialOpacity+=4;
        }
    }, 40);