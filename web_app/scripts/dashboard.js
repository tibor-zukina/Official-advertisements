var numberOfSections;
var editMode = false;
var editedId = null;
var editedIndex = null;
var editedName = null;
var editedUrl = null;
var editedIdentificator = null;
var currentName = null;
var currentUrl = null;
var currentIdentificator = null;
var Ad = class Ad {
  constructor(index,name,url,identificator,time,id) {
    this.index = index;
    this.name = name;
    this.url = url;
    this.identificator = identificator;
    this.time = time;
    this.id = id;
  }
};

var todayIncome = 0.00;
var yesterdayIncome = 0.00;
var thisMonthIncome = 0.00;
var lastMonthIncome = 0.00;
var allTimeIncome = 0.00;
var userAds = new Array();
var allUserAds = new Array();
var currentPage = 0;
var totalAds;
var allTotalAds;
var navigationRemoved = false;
var numberIds = ['one','two','three','four','five'];

function generateLocalDate() {

 var date = new Date();
 var year = date.getFullYear();
 var month = date.getMonth() + 1;
 var day = date.getDate();
 var hours = date.getHours();
 var minutes = date.getMinutes();
 var mark;
 if(hours == 0) {
   mark = 'AM';
   hours = 12;
 }
 else if ( hours >=1 && hours <= 11) mark = 'AM';
 else if ( hours == 12) mark = 'PM';
 else if ( hours >= 13 && hours <=23) {
   mark = 'PM';
   hours = hours -=12;
 }
 if (minutes < 10) minutes = '0'+minutes;
 var dateStr = day + '.' + month + '.' + year + '. ' + hours + ':' + minutes + ' ' + mark; 
 return dateStr;
}

function getAds() {
  $.ajax({
                url: "get_ads.php",
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
                       url  = ads[i].url;
                       identificator = ads[i].identificator;
                       time = ads[i].time;
                       id = ads[i].id;
                       ad = new Ad(index,name,url,identificator,time,id);
                       userAds.push(ad);
                       allUserAds.push(ad);
                    }
                    if(userAds.length<=80) document.getElementById('five').style.display = 'none';
                    if(userAds.length<=60) document.getElementById('four').style.display = 'none';
                    if(userAds.length<=40) document.getElementById('three').style.display = 'none';
                    if(userAds.length<=20) document.getElementById('two').style.display = 'none';
                    fillTable();
                    
                }

            });
}

function getEarnings() {
  $.ajax({
                url: "get_earnings.php",
                type: "POST",
                data: "",
                success: function(data, textStatus, jqXHR) {
                    success = JSON.parse(data).success;
                    if (success == -666){
                    window.location.replace('logout.php');
                    return;
                    }
                    earnings = JSON.parse(data).earnings;
                    var today = new Date();
                    var dayToday = today.getDate();
                    var monthToday = today.getMonth() + 1;
                    var yearToday = today.getFullYear();

                    var yesterday = new Date();
                    yesterday.setDate(yesterday.getDate()-1);
                    var dayYesterday = yesterday.getDate();
                    var monthYesterday = yesterday.getMonth() + 1;
                    var yearYesterday = yesterday.getFullYear();
                    for (var i = 0, tot = earnings.length; i < tot; i++) {
                       amount = earnings[i].amount;
                       time  = earnings[i].time;
                       earningDate = time.split(' ')[0];
                       earningDay = earningDate.split('.')[0];
                       earningMonth = earningDate.split('.')[1];
                       earningYear = earningDate.split('.')[2];
                       if(earningDay.indexOf('0') == 0) earningDay = earningDay.substring(1,2);
                       if( (dayToday == earningDay) && (monthToday == earningMonth) && (yearToday == earningYear) ) todayIncome += amount; 
                       if( (dayYesterday == earningDay) && (monthYesterday == earningMonth) && (yearYesterday == earningYear) ) yesterdayIncome += amount; 
                       if(monthToday == earningMonth) thisMonthIncome += amount;
                       else if( (monthToday-1 == earningMonth) || ( (monthToday == 1) && (earningMonth == 12) ) ) lastMonthIncome += amount;
                       allTimeIncome += amount;
                    }
                    todayIncome = Math.round(todayIncome * 100) / 100;
                    yesterdayIncome = Math.round(yesterdayIncome * 100) / 100;
                    thisMonthIncome = Math.round(thisMonthIncome * 100) / 100;
                    lastMonthIncome = Math.round(lastMonthIncome * 100) / 100;
                    allTimeIncome = Math.round(allTimeIncome * 100) / 100;
                    document.getElementById("todayIncome").innerHTML = todayIncome.toFixed(2) + ' $';
                    document.getElementById("yesterdayIncome").innerHTML = yesterdayIncome.toFixed(2) + ' $';
                    document.getElementById("thisMonthIncome").innerHTML = thisMonthIncome.toFixed(2) + ' $';
                    document.getElementById("lastMonthIncome").innerHTML = lastMonthIncome.toFixed(2) + ' $';
                    document.getElementById("allTimeIncome").innerHTML = allTimeIncome.toFixed(2) + ' $';
                    
                }

            });
}

function putEarning() {

    var amount = document.getElementById("amount").value;
    if (amount == "") {
        document.getElementById("amount").focus();
    } 
     else if (/^(?:\d+\.\d{1,2}|\d+)$/.test(amount) == false) {
        document.getElementById("amount").focus();
    } else {
        time = generateLocalDate();
        var formData = "amount=" + amount + "&time=" + time;
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
            url: "put_earning.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {

                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                  todayIncome = parseFloat(todayIncome) + parseFloat(amount);
                  thisMonthIncome = parseFloat(thisMonthIncome) + parseFloat(amount);
                  allTimeIncome = parseFloat(allTimeIncome) + parseFloat(amount);
                  todayIncome = Math.round(todayIncome * 100) / 100;
                  thisMonthIncome = Math.round(thisMonthIncome * 100) / 100;
                  allTimeIncome = Math.round(allTimeIncome * 100) / 100;
                  document.getElementById('todayIncome').innerHTML = todayIncome.toFixed(2)+ ' $';
                  document.getElementById('thisMonthIncome').innerHTML = thisMonthIncome.toFixed(2)+ ' $';
                  document.getElementById('allTimeIncome').innerHTML = allTimeIncome.toFixed(2)+ ' $';
                  document.getElementById('amount').value = '';
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }
}

function putAd() {

  var name = document.getElementById("name").value;
  var url = document.getElementById("url").value;
  var identificator = document.getElementById("identificator").value;
    if (name == "") {
        document.getElementById("name").focus();
    }
    else if (url == "") {
        document.getElementById("url").focus();
    } 
    else if (identificator == "") {
        document.getElementById("identificator").focus();
    } else {
        time = generateLocalDate();
        var formData = "name=" + name + "&url=" + url + "&identificator=" + identificator + "&time=" + time;
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
            url: "put_ad.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('name').innerHTML = '';
                document.getElementById('url').innerHTML = '';
                document.getElementById('identificator').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 id = JSON.parse(data).id;
                 userAds.splice(0, 0, new Ad(1,name,url,identificator,time,id));
                 for(j = 1, tot = userAds.length; j < tot; j++) userAds[j].index = userAds[j].index + 1; 
                 if(userAds.length > 300) userAds.pop();
                 totalAds = userAds.length;
                 if(totalAds % 20 == 1)
                 document.getElementById(numberIds[(totalAds%100-1)/20]).style.display = 'inline';
                 fillTable();              
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }

}

function putAdLimited() {

  var name = document.getElementById("name").value;
  var url = document.getElementById("url").value;
  var identificator = document.getElementById("identificator").value;
    if (name == "") {
        document.getElementById("name").focus();
    }
    else if (url == "") {
        document.getElementById("url").focus();
    } 
    else if (identificator == "") {
        document.getElementById("identificator").focus();
    } else {
        time = generateLocalDate();
        var formData = "name=" + name + "&url=" + url + "&identificator=" + identificator + "&time=" + time;
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
            url: "put_ad.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('name').innerHTML = '';
                document.getElementById('url').innerHTML = '';
                document.getElementById('identificator').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 id = JSON.parse(data).id;
                 userAds.splice(0, 0, new Ad(1,name,url,identificator,time,id));
                 for(j = 1, tot = userAds.length; j < tot; j++) userAds[j].index = userAds[j].index + 1; 
                 if(userAds.length > 300) userAds.pop();
                 totalAds = userAds.length;
                 if(totalAds % 20 == 1)
                 document.getElementById(numberIds[(totalAds%100-1)/20]).style.display = 'inline';
                 fillTableLimited();
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }

}

getAds();
getEarnings();

function goNext() {
 currentPage++;
 if(currentPage % 5 == 0) {
  document.getElementById('one').innerHTML = currentPage + 1;
  document.getElementById('two').innerHTML = currentPage + 2;
  document.getElementById('three').innerHTML = currentPage + 3;
  document.getElementById('four').innerHTML = currentPage + 4;
  document.getElementById('five').innerHTML = currentPage + 5;
  if(userAds.length<=(currentPage+4)*20) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userAds.length<=(currentPage+3)*20) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userAds.length<=(currentPage+2)*20) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userAds.length<=(currentPage+1)*20) document.getElementById('two').style.display = 'none';
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
  if(userAds.length<=currentPage*20) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userAds.length<=(currentPage-1)*20) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userAds.length<=(currentPage-2)*20) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userAds.length<=(currentPage-3)*20) document.getElementById('two').style.display = 'none';
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
   if(currentPage >= ((totalAds/20) - 1)  ) next.style.display = 'none';
   else next.style.display = 'inline';
   adsTable = document.getElementById('adsTable');
   var newHtml = '<tr> <th class="narrow"> <input type="checkbox" name="selectAll" id="selectAll" onchange="toggleSelection(this)"> </th> <th class="narrow" onClick="finishEditing()"> # </th> <th onClick="finishEditing()"> Name </th> <th onClick="finishEditing()"> Url </th> <th onClick="finishEditing()"> Ad </th> <th class="noBorder" onClick="finishEditing()" > Time </th> </tr>';
   for(i = currentPage * 20; i < Math.min(totalAds, (currentPage+1) * 20) ; i++) {
      var htmlStr = '<tr id="' + 'entry' + userAds[i].id + '+' + userAds[i].index + '">' + '<td class="narrow"> <input type="checkbox" class="cellCheckBox" id="' + userAds[i].id + '+' + userAds[i].index + '">' + '</td>' + '<td class="narrow" onClick="finishEditing()">' + userAds[i].index + '</td>' + '<td onClick="goToEditMode(this.parentNode,2)">' + userAds[i].name + '</td>' + '<td onClick="goToEditMode(this.parentNode,3)">' + userAds[i].url + '</td>' + '<td onClick="goToEditMode(this.parentNode,4)">' + userAds[i].identificator + '</td>' + '<td class="noBorder" onClick="finishEditing()">' + userAds[i].time + '</td>' + '</tr>';
      newHtml += htmlStr;
   }
    adsTable.innerHTML = newHtml;
}

function fillTableLimited() {

   adsTable = document.getElementById('adsTable');
   var newHtml = '<tr> <th class="narrow"> <input type="checkbox" name="selectAll" id="selectAll" onchange="toggleSelection(this)"> </th> <th class="narrow" onClick="finishEditing()"> # </th> <th onClick="finishEditing()"> Name </th> <th onClick="finishEditing()"> Url </th> <th onClick="finishEditing()"> Ad </th> <th class="noBorder" onClick="finishEditing()"> Time </th> </tr>';
   for(i = 0; i < totalAds ; i++) {
      var htmlStr = '<tr id="' + 'entry' + userAds[i].id + '+' + userAds[i].index + '">' + '<td class="narrow"> <input type="checkbox" class="cellCheckBox" id="' + userAds[i].id + '+' + userAds[i].index + '">' + '</td>' + '<td class="narrow" onClick="finishEditing()">' + userAds[i].index + '</td>' + '<td onClick="goToEditMode(this.parentNode,2)">' + userAds[i].name + '</td>' + '<td onClick="goToEditMode(this.parentNode,3)">' + userAds[i].url + '</td>' + '<td onClick="goToEditMode(this.parentNode,4)">' + userAds[i].identificator + '</td>' + '<td class="noBorder" onClick="finishEditing()">' + userAds[i].time + '</td>' + '</tr>';
      newHtml += htmlStr;
   }
   adsTable.innerHTML = newHtml
}

function getLimitedAds(){
   
   timeLimit = document.getElementById('timeLimit').value * 3600;
   if(!navigationRemoved) {
   var userSection = document.getElementById('userSection');
   userSection.removeChild(document.getElementById('prevButton'));
   userSection.removeChild(document.getElementById('one'));
   userSection.removeChild(document.getElementById('two'));
   userSection.removeChild(document.getElementById('three'));
   userSection.removeChild(document.getElementById('four'));
   userSection.removeChild(document.getElementById('five'));
   userSection.removeChild(document.getElementById('nextButton'));
   userSection.removeChild(document.getElementById('search'));
   userSection.removeChild(document.getElementById('searchImage'));
   navigationRemoved = true;
   }
   formData = 'timeLimit=' + timeLimit;
   $.ajax({
                url: "get_limited_ads.php",
                type: "POST",
                data: formData,
                success: function(data, textStatus, jqXHR) {
                    success = JSON.parse(data).success;
                    if (success == -666){
                    window.location.replace('logout.php');
                    return;
                    }
                    ads = JSON.parse(data).ads;
                    totalAds = ads.length;
                    adsTable = document.getElementById('adsTable');
                    var newHtml = '<tr> <th class="narrow"> <input type="checkbox" name="selectAll" id="selectAll" onchange="toggleSelection(this)"> </th> <th class="narrow" onClick="finishEditing()"> # </th> <th onClick="finishEditing()"> Name </th> <th onClick="finishEditing()"> Url </th> <th onClick="finishEditing()"> Ad </th> <th onClick="finishEditing()"> Time </th> </tr>';
                    userAds = new Array();
                    document.getElementById('addAd').onclick = putAdLimited; 
                    document.getElementById('deleteImage').onclick = performDeleteLimited;
                    for (var i = 0; i < totalAds; i++) {
                       var index = i + 1;
                       name = ads[i].name;
                       url  = ads[i].url;
                       identificator = ads[i].identificator;
                       time = ads[i].time;
                       id = ads[i].id;
                       ad = new Ad(index,name,url,identificator,time,id);
                       userAds.push(ad);
                       var htmlStr = '<tr id="' + 'entry' + userAds[i].id + '+' + userAds[i].index + '">' + '<td class="narrow"> <input type="checkbox" class="cellCheckBox" id="' + userAds[i].id + '+' + userAds[i].index + '">' + '</td>' + '<td class="narrow" onClick="finishEditing()">' + index + '</td>' + '<td onClick="goToEditMode(this.parentNode,2)">' + name + '</td>' + '<td onClick="goToEditMode(this.parentNode,3)">' + url + '</td>' + '<td onClick="goToEditMode(this.parentNode,4)">' + identificator + '</td>' + '<td onClick="finishEditing()">' + time + '</td>' + '</tr>';
                       newHtml += htmlStr;
                    }
                       adsTable.innerHTML = newHtml;
                    
                    
                }

            });
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
      if(allUserAds[i].url.indexOf(searchFilter) != -1) {
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
  if(totalAds<=80) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(totalAds<=60) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(totalAds<=40) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(totalAds<=20) document.getElementById('two').style.display = 'none';
  else document.getElementById('two').style.display = 'inline';
  goToSection(document.getElementById('one'));
  }

}

function goToSection(element) {
 editMode = false;
 editedId = null;
 editedIndex = null;
 if(editedName != null) editedName.onclick = function(){ goToEditMode(this.parentNode,2); };
 if(editedUrl != null) editedUrl.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(editedIdentificator != null) editedIdentificator.onclick = function(){ goToEditMode(this.parentNode,4); };
 editedName = null;
 editedUrl = null;
 editedIdentificator = null;
 currentName = null;
 currentUrl = null;
 currentIdentificator = null;
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

function performDelete() {
  numberOfSections = Math.ceil(totalAds/20);
  deleteList = '';
  var checkboxes = document.getElementsByClassName('cellCheckBox');
  for (totCheck = checkboxes.length, i = 0; i < totCheck; i++){
   if(checkboxes[i].checked) deleteList += checkboxes[i].id.split('+')[0] + ',';
  }
  if (deleteList.length > 0) {
     deleteList = deleteList.substring(0,deleteList.length-1);
      var formData = "ids=" + deleteList;
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
            url: "delete_ads.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 var numDel=0;
                 for (totCheck = checkboxes.length, i = 0; i < totCheck; i++){
                     if(checkboxes[i].checked){
                        deleteIndex = checkboxes[i].id.split('+')[1]-1-numDel;
                        userAds.splice(deleteIndex,1);
                        numDel++;
                     }
                 }
                 for(j = 0, tot = userAds.length; j < tot; j++) userAds[j].index = j+1; 
                 totalAds = userAds.length;
                 if( (Math.ceil(totalAds/20)<numberOfSections || totalAds%20 == 0) && totalAds > 0) {
                    if(Math.floor(currentPage*20/100) == Math.floor(totalAds/100) && Math.ceil((totalAds%100)/20)%5 != 0 )  document.getElementById(numberIds[Math.ceil((totalAds%100)/20)]).style.display = 'none';
                    
                  if(currentPage*20 == totalAds) {
                    currentPage--;
                    if(currentPage % 5 == 4) {
                       document.getElementById('one').innerHTML = currentPage -3;
                       document.getElementById('two').innerHTML = currentPage -2;
                       document.getElementById('three').innerHTML = currentPage -1 ;
                       document.getElementById('four').innerHTML = currentPage;
                       document.getElementById('five').innerHTML = currentPage +1;
                       if(userAds.length<=currentPage*20) document.getElementById('five').style.display = 'none';
                       else document.getElementById('five').style.display = 'inline';
                       if(userAds.length<=(currentPage-1)*20) document.getElementById('four').style.display = 'none';
                       else document.getElementById('four').style.display = 'inline';
                       if(userAds.length<=(currentPage-2)*20) document.getElementById('three').style.display = 'none';
                       else document.getElementById('three').style.display = 'inline';
                       if(userAds.length<=(currentPage-3)*20) document.getElementById('two').style.display = 'none';
                       else document.getElementById('two').style.display = 'inline';
                   }
                  }
                 }
                numberOfSections = Math.ceil(totalAds/20);
                goToSection(document.getElementById(numberIds[currentPage%5]));              
             }
              else if (success == -666) window.location.href = 'logout.php';

        }});
  }

}

function performDeleteLimited() {
   deleteList = '';
   var checkboxes = document.getElementsByClassName('cellCheckBox');
   for (totCheck = checkboxes.length, i = 0; i < totCheck; i++){
     if(checkboxes[i].checked) deleteList += checkboxes[i].id.split('+')[0] + ',';
   }
   if (deleteList.length > 0) {
     deleteList = deleteList.substring(0,deleteList.length-1);
      var formData = "ids=" + deleteList;
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
            url: "delete_ads.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 var adsTable = document.getElementById('adsTable');
                 var numDel=0;
                 for (totCheck = checkboxes.length, i = 0; i < totCheck; i++){
                     if(checkboxes[i].checked){
                        deleteIndex = checkboxes[i].id.split('+')[1]-1-numDel;
                        userAds.splice(deleteIndex,1);
                        adsTable.childNodes[0].removeChild(document.getElementById('entry'+checkboxes[i].id));
                        numDel++;
                     }
                 }
                 for(j = 0, tot = userAds.length; j < tot; j++) userAds[j].index = j+1; 
                 totalAds = userAds.length; 
                }
               else if (success == -666) window.location.href = 'logout.php';         
        }});
  }


}

function toggleSelection(element) {
 var isChecked = element.checked;
 var checkboxes = document.getElementsByClassName('cellCheckBox');
 for (totCheck = checkboxes.length, i = 0; i < totCheck; i++)
  checkboxes[i].checked = isChecked;
}

function enterUpdateAd(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 

       updateAd();
    }
}


function updateAd() {

  var name = document.getElementById("nameEdit").value;
  var url = document.getElementById("urlEdit").value;
  var identificator = document.getElementById("identificatorEdit").value;
    if (name == "") {
        document.getElementById("nameEdit").focus();
    }
    else if (url == "") {
        document.getElementById("urlEdit").focus();
    } 
    else if (identificator == "") {
        document.getElementById("identificatorEdit").focus();
    } else {
        var formData = "name=" + name + "&url=" + url + "&identificator=" + identificator + "&id=" + editedId;
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
            url: "update_ad.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('nameEdit').innerHTML = '';
                document.getElementById('urlEdit').innerHTML = '';
                document.getElementById('identificatorEdit').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                  userAds[editedIndex-1].name = name; 
                  userAds[editedIndex-1].url = url;
                  userAds[editedIndex-1].identificator = identificator;
                  editedIndex = null;
                  editedId = null;
                  currentName = null;
                  currentUrl = null;
                  currentIdentificator = null;
                  editedName.innerHTML = name;
                  editedUrl.innerHTML = url;
                  editedIdentificator.innerHTML = identificator;
                  editedName.onclick = function(){ goToEditMode(this.parentNode,2); };
                  editedUrl.onclick = function(){ goToEditMode(this.parentNode,3); };
                  editedIdentificator.onclick = function(){ goToEditMode(this.parentNode,4); };
                  editedName = null;
                  editedUrl = null;
                  editedIdentificator = null;
                  editMode = false;
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }


}

function goToEditMode(element, focusIndex) {

 if(currentName != null) editedName.innerHTML = currentName;
 if(editedName != null) editedName.onclick = function(){ goToEditMode(this.parentNode,2); };
 if(currentUrl != null) editedUrl.innerHTML = currentUrl;
 if(editedUrl != null)  editedUrl.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(currentIdentificator != null) editedIdentificator.innerHTML = currentIdentificator;
 if(editedIdentificator != null)  editedIdentificator.onclick = function(){ goToEditMode(this.parentNode,4); };
 if(editedName != null && editedName.parentNode.id == element.id) return;
 editMode = true;
 var entryData = element.id.substring(5,element.id.length);
 editedId = entryData.split('+')[0];
 editedIndex = entryData.split('+')[1];
 editedName = element.childNodes[2];
 editedUrl = element.childNodes[3];
 editedIdentificator = element.childNodes[4];
 currentName = editedName.innerHTML;
 currentUrl = editedUrl.innerHTML;
 currentIdentificator = editedIdentificator.innerHTML;
 editedName.innerHTML = '<input type="text" id="nameEdit" maxlength="50" class="tableInput" maxlength="" value="' + currentName + '" onKeyPress="enterUpdateAd(event)" />';
 editedUrl.innerHTML = '<input type="text" id="urlEdit" maxlength="250" class="tableInput" maxlength="" value="' + currentUrl + '" onKeyPress="enterUpdateAd(event)" />';
 editedIdentificator.innerHTML = '<input type="text" id="identificatorEdit" maxlength="50" class="tableInput" maxlength="" value="' + currentIdentificator + '" onKeyPress="enterUpdateAd(event)" />';
 editedName.onclick = doNothing;
 editedUrl.onclick = doNothing;
 editedIdentificator.onclick = doNothing;
 if (focusIndex == 2) document.getElementById("nameEdit").focus();
 else if (focusIndex == 3) document.getElementById("urlEdit").focus();
 else if (focusIndex == 4) document.getElementById("identificatorEdit").focus();
}

function finishEditing() {
 if(editMode == false) return;
 if(currentName != null) editedName.innerHTML = currentName;
 if(editedName != null) editedName.onclick = function(){ goToEditMode(this.parentNode,2); };
 if(currentUrl != null) editedUrl.innerHTML = currentUrl;
 if(editedUrl != null)  editedUrl.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(currentIdentificator != null) editedIdentificator.innerHTML = currentIdentificator;
 if(editedIdentificator != null)  editedIdentificator.onclick = function(){ goToEditMode(this.parentNode,4); };
 currentName = null;
 editedName = null;
 currentUrl = null;
 editedUrl = null;
 currentIdentificator = null;
 editedIdentificator = null;
 editMode = false;
}