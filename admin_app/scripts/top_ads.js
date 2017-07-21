var Ad = class Ad {
  constructor(index,name,averageCPC,maxCPC,time,id) {
    this.index = index;
    this.name = name;
    this.averageCPC = averageCPC;
    this.maxCPC = maxCPC;
    this.time = time;
    this.id = id;
  }
};

var userAds = new Array();
var allUserAds = new Array();
var currentPage = 0;
var totalAds;
var allTotalAds;
var numberIds = ['one','two','three','four','five'];

function getAds() {
  $.ajax({
                url: "get_top_ads.php",
                type: "POST",
                data: "",
                success: function(data, textStatus, jqXHR) {
                    success = JSON.parse(data).success;
                    if (success == -666){
                    window.location.replace('logout.php');
                    return;
                    }
                    ads = JSON.parse(data).ads;
                    totalAds = ads.length;
                    allTotalAds = ads.length;
                    for (var i = 0; i < totalAds; i++) {
                       var index = i + 1;
                       name = ads[i].name;
                       time = ads[i].time;
                       averageCPC = ads[i].averageCPC;
                       maxCPC = ads[i].maxCPC;
                       id = ads[i].id;
                       ad = new Ad(index,name,averageCPC,maxCPC,time,id);
                       userAds.push(ad);
                       allUserAds.push(ad);
                    }
                    if(userAds.length<=40) document.getElementById('five').style.display = 'none';
                    if(userAds.length<=30) document.getElementById('four').style.display = 'none';
                    if(userAds.length<=20) document.getElementById('three').style.display = 'none';
                    if(userAds.length<=10) document.getElementById('two').style.display = 'none';
                    fillTable();
                    
                }

            });
}


getAds();

function goNext() {
 currentPage++;
 if(currentPage % 5 == 0) {
  document.getElementById('one').innerHTML = currentPage + 1;
  document.getElementById('two').innerHTML = currentPage + 2;
  document.getElementById('three').innerHTML = currentPage + 3;
  document.getElementById('four').innerHTML = currentPage + 4;
  document.getElementById('five').innerHTML = currentPage + 5;
  if(userAds.length<=(currentPage+4)*10) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userAds.length<=(currentPage+3)*10) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userAds.length<=(currentPage+2)*10) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userAds.length<=(currentPage+1)*10) document.getElementById('two').style.display = 'none';
  else document.getElementById('four').style.display = 'two';
 }
 goToSection(document.getElementById(numberIds[currentPage%5]));
}

function goPrev() {
 currentPage--;
 if(currentPage % 5 == 4) {
  document.getElementById('one').innerHTML = currentPage -3;
  document.getElementById('two').innerHTML = currentPage -2;
  document.getElementById('three').innerHTML = currentPage -1 ;
  document.getElementById('four').innerHTML = currentPage;
  document.getElementById('five').innerHTML = currentPage +1;
  if(userAds.length<=currentPage*10) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userAds.length<=(currentPage-1)*10) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userAds.length<=(currentPage-2)*10) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userAds.length<=(currentPage-3)*10) document.getElementById('two').style.display = 'none';
  else document.getElementById('two').style.display = 'inline';
 }
 goToSection(document.getElementById(numberIds[currentPage%5]));
}

function fillTable() {
   var prev = document.getElementById('prevButton');
   var next = document.getElementById('nextButton');
   if(currentPage > 0) {
       prev.style.display = 'inline';
   }
   else {
       prev.style.display = 'none';
   }
   if(currentPage >= ((totalAds/10) - 1)  ) next.style.display = 'none';
   else next.style.display = 'inline';
   adsTable = document.getElementById('adsTable');
   var newHtml = '<tr> <th class="narrow"> # </th> <th> Ad </th> <th> Average CPC </th> <th> Max CPC </th> <th class="noBorder"> Time </th> </tr>';
   for(i = currentPage * 10; i < Math.min(totalAds, (currentPage+1) * 10) ; i++) {
      var htmlStr = '<tr>' + '<td class="narrow">' + userAds[i].index + '</td>' + '<td>' + userAds[i].name + '</td>' + '<td>' + userAds[i].averageCPC.toFixed(2) + ' $' + '</td>' + '<td>' + userAds[i].maxCPC.toFixed(2) + ' $' + '</td>' + '<td class="noBorder">' + userAds[i].time + '</td>' + '</tr>';
      newHtml += htmlStr;
   }
   adsTable.innerHTML = newHtml;
}

function filter(){
  searchFilter = document.getElementById('search').value;
  if(searchFilter == '') document.getElementById('search').focus();
  else {
  document.getElementById('search').innerHTML = '';
  userAds = new Array();
  currentPage = 0;
  var newIndex = 1;
  for (i = 0; i < allTotalAds; i++) {
      if(allUserAds[i].name.toUpperCase().indexOf(searchFilter.toUpperCase()) != -1) {
          allUserAds[i].index = newIndex;
          newIndex++;
          userAds.push(allUserAds[i]);
      }
  }
  totalAds = userAds.length;
  document.getElementById('one').innerHTML = 1;
  document.getElementById('two').innerHTML = 2;
  document.getElementById('three').innerHTML = 3;
  document.getElementById('four').innerHTML = 4;
  document.getElementById('five').innerHTML = 5;
  if(totalAds<=40) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(totalAds<=30) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(totalAds<=20) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(totalAds<=10) document.getElementById('two').style.display = 'none';
  else document.getElementById('two').style.display = 'inline';
  goToSection(document.getElementById('one'));
  }

}

function goToSection(element) {
 currentPage = element.innerHTML - 1;
 markedElements = document.getElementsByClassName('numberButtonMarked');
 if(markedElements!=null && markedElements.length > 0) {
     markedElements[0].onclick = function() { goToSection(this); };
     markedElements[0].className = 'numberButton';
 }
 element.onclick = doNothing;
 element.className = 'numberButtonMarked';
 fillTable(); 
}

function doNothing() {

}

function bestAds() {

  for(tot = userAds.length, i = 0; i < tot; i++)
    for(j = i + 1; j < tot; j++)
      if (userAds[i].maxCPC < userAds[j].maxCPC) {
         var pom = userAds[i];
         userAds[i] = userAds[j];
         userAds[j] = pom;
      }
  for (tot = userAds.length, i = 0; i < tot; i++) userAds[i].index = i + 1;
  if(userAds.length<=40) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userAds.length<=30) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userAds.length<=20) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userAds.length<=10) document.getElementById('two').style.display = 'none';
  else document.getElementById('two').style.display = 'inline';
  currentPage = 0;
  goToSection(document.getElementById('one'));

}
