var i = 0;
var k = 0;
var number = 2;
var backgroundUrls = ['images/animation_1.png','images/animation_2.png'];
var texts = [ ['Official advertisements', '#1 unique advertising website', 'Register today!', 'It\'s completely free'],['The first website that deals with the unique advertising','Register for free today!','&nbsp;','&nbsp;'] ];
var numberOfFields = [5,5];
var titles;
var tot;
var titleTimer = null;
var animationTimeout = null;

function showElement(titleElement){
  var titleOpacity = 0;
  if (titleElement.innerHTML == ' ') {
      k = 0;
      animationTimeout = setTimeout(function(){ startAnimation(k); }, 3000);
  }
  else titleTimer = setInterval(function () {
      if (titleOpacity >= 100) {
       clearInterval(titleTimer);
       titleTimer = null;
       i++;
       if(i<tot) { showElement(titles[i]); }
       else {
         k++;
         if( k == number) k = 0;
         animationTimeout = setTimeout(function(){ startAnimation(k); }, 3000);
       }
      }
      else{
         titleElement.style.opacity = titleOpacity/100;
         titleElement.style.filter = 'alpha(opacity=' + titleOpacity  + ")";
         if(i==0) titleOpacity+=4;
         else titleOpacity+=10;
        }
    }, 40);
}

function startAnimation(index) {
  animationTimeout = null;
  titles = new Array();
  i = 0;
  var homeImage = document.getElementById('homeImage');
  homeImage.style.opacity = 0;
  homeImage.style.filter = 'alpha(opacity=0)';
  homeImage.src = backgroundUrls[index];
  titles.push(homeImage);
  titleElements = document.getElementsByClassName('titleCentered');
  for(j=0, total = titleElements.length; j<total; j++) {
   titleElements[j].style.opacity = 0;
   titleElements[j].style.filter = 'alpha(opacity=0)';
   titleElements[j].innerHTML = texts[index][j];
   titles.push(titleElements[j]);
  }
  tot = numberOfFields[index];
  showElement(titles[i]); 

}

number = texts.length;
startAnimation(0);

function back() {
 if(titleTimer != null) clearInterval(titleTimer);
 if(animationTimeout != null) { clearTimeout(animationTimeout);  }
 else k--;
 if(k == -1) k = number -1;
 startAnimation(k);
}

function next() {
 if(titleTimer != null) clearInterval(titleTimer);
 if(animationTimeout != null) { clearTimeout(animationTimeout);  }
 else k++;
 if(k == number) k = 0;
 startAnimation(k);
}

 

 