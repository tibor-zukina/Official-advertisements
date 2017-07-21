var editMode = false;
var numberOfSections;
var editedId = null;
var editedIndex = null;
var editedAverageCPC = null;
var editedMaxCPC = null;
var currentAverageCPC = null;
var currentMaxCPC = null;
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

function putAd() {

  var name = document.getElementById("name").value;
    if (name == "") {
        document.getElementById("name").focus();
    } else {
        time = generateLocalDate();
        var formData = "name=" + name  + "&time=" + time;
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
            url: "put_top_ad.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('name').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 id = JSON.parse(data).id;
                 userAds.splice(0, 0, new Ad(1,name,0.00,0.00,time,id));
                 for(j = 1, tot = userAds.length; j < tot; j++) userAds[j].index = userAds[j].index + 1; 
                 if(userAds.length > 300) userAds.pop();
                 totalAds = userAds.length;
                 if(totalAds % 10 == 1)
                 document.getElementById(numberIds[(totalAds%50-1)/10]).style.display = 'inline';
                 fillTable();              
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }

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
   var newHtml = '<tr> <th class="narrow"> <input type="checkbox" name="selectAll" id="selectAll" onchange="toggleSelection(this)"> </th> <th class="narrow" onClick="finishEditing()"> # </th> <th onClick="finishEditing()"> Ad </th> <th onClick="finishEditing()"> Average CPC </th> <th onClick="finishEditing()"> Max CPC </th> <th class="noBorder" onClick="finishEditing()"> Time </th> </tr>'; 
   for(i = currentPage * 10; i < Math.min(totalAds, (currentPage+1) * 10) ; i++) {
      var htmlStr = '<tr id="' + 'entry' + userAds[i].id + '+' + userAds[i].index + '" >' + '<td class="narrow"> <input type="checkbox" class="cellCheckBox" id="' + userAds[i].id + '+' + userAds[i].index + '">' + '</td>' + '<td class="narrow" onClick="finishEditing()">' + userAds[i].index + '</td>' + '<td onClick="finishEditing()">' + userAds[i].name + '</td>' + '<td onClick="goToEditMode(this.parentNode,3)">' + userAds[i].averageCPC.toFixed(2) + ' $' + '</td>' + '<td onClick="goToEditMode(this.parentNode,4)">' + userAds[i].maxCPC.toFixed(2) + ' $' + '</td>' + '<td class="noBorder" onClick="finishEditing()">' + userAds[i].time + '</td>' + '</tr>';
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
 if (editedAverageCPC != null) editedAverageCPC.onclick = function(){ goToEditMode(this.parentNode,3); };
 if (editedMaxCPC != null) editedMaxCPC.onclick = function(){ goToEditMode(this.parentNode,4); };
 editMode = false;
 editedId = null;
 editedIndex = null;
 currentAverageCPC = null;
 currentMaxCPC = null;
 editedAverageCPC = null;
 editedMaxCPC = null;
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

function performDelete() {
  numberOfSections = Math.ceil(totalAds/10);
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
            url: "delete_top_ads.php",
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
                 if( (Math.ceil(totalAds/10)<numberOfSections || totalAds%10 == 0) && totalAds > 0) {
                    if(Math.floor(currentPage*10/50) == Math.floor(totalAds/50) && Math.ceil((totalAds%50)/10)%5 != 0 )  document.getElementById(numberIds[Math.ceil((totalAds%50)/10)]).style.display = 'none';
                    
                  if(currentPage*10 == totalAds) {
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
                  }
                 }
                numberOfSections = Math.ceil(totalAds/10);
                goToSection(document.getElementById(numberIds[currentPage%5]));              
             }
              else if (success == -666) window.location.href = 'logout.php';

        }});
  }

}

function performDelete() {
  numberOfSections = Math.ceil(totalAds/10);
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
                 if( (Math.ceil(totalAds/10)<numberOfSections || totalAds%10 == 0) && totalAds > 0) {
                    if(Math.floor(currentPage*10/100) == Math.floor(totalAds/100)   ) document.getElementById(numberIds[Math.min(4,Math.ceil((totalAds%100)/10))]).style.display = 'none';
                  if(currentPage*10 == totalAds) {
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
                  }
                 }
                numberOfSections = Math.ceil(totalAds/10);
                goToSection(document.getElementById(numberIds[currentPage%5]));              
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

function enterUpdateTopAd(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 

       updateTopAd();
    }
}

function updateTopAd() {

  var averageCPC = document.getElementById("averageCPCEdit").value;
  var maxCPC = document.getElementById("maxCPCEdit").value;
    if (averageCPC == "") {
        document.getElementById("averageCPCEdit").focus();
    }
    else if (/^(?:\d+\.\d{1,2}|\d+)$/.test(averageCPC) == false) {
        document.getElementById("averageCPCEdit").focus();
    }
    if (maxCPC == "") {
        document.getElementById("maxCPCEdit").focus();
    }
    else if (/^(?:\d+\.\d{1,2}|\d+)$/.test(maxCPC) == false) {
        document.getElementById("maxCPCEdit").focus();
    }
    else if (parseFloat(averageCPC) > parseFloat(maxCPC) ) {
        document.getElementById("maxCPCEdit").focus();
    }
    else {
        var formData = "averageCPC=" + averageCPC + "&maxCPC=" + maxCPC + "&id=" + editedId;
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
            url: "update_top_ad.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('averageCPCEdit').innerHTML = '';
                document.getElementById('maxCPCEdit').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 userAds[editedIndex-1].averageCPC = averageCPC; 
                 userAds[editedIndex-1].maxCPC = maxCPC;
                 editedIndex = null;
                 editedId = null;
                 currentAverageCPC = null;
                 currentMaxCPC = null;
                 editedAverageCPC.innerHTML = parseFloat(averageCPC).toFixed(2) + ' $';
                 editedMaxCPC.innerHTML = parseFloat(maxCPC).toFixed(2) + ' $';
                 editedAverageCPC.onclick = function(){ goToEditMode(this.parentNode,3); };
                 editedMaxCPC.onclick = function(){ goToEditMode(this.parentNode,4); };
                 editedAverageCPC = null;
                 editedMaxCPC = null;
                 editMode = false;
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }


}

function goToEditMode(element,focusIndex) {

 if(currentAverageCPC != null) editedAverageCPC.innerHTML = parseFloat(currentAverageCPC).toFixed(2) + ' $';
 if(editedAverageCPC != null) editedAverageCPC.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(currentMaxCPC != null) editedMaxCPC.innerHTML = parseFloat(currentMaxCPC).toFixed(2) + ' $';
 if(editedMaxCPC != null)  editedMaxCPC.onclick = function(){ goToEditMode(this.parentNode,4); };
 if(editedAverageCPC != null && editedAverageCPC.parentNode.id == element.id) return;
 editMode = true;
 var entryData = element.id.substring(5,element.id.length);
 editedId = entryData.split('+')[0];
 editedIndex = entryData.split('+')[1];
 editedAverageCPC = element.childNodes[3];
 editedMaxCPC = element.childNodes[4];
 currentAverageCPC = editedAverageCPC.innerHTML.substring(0,editedAverageCPC.innerHTML.length-2);
 currentMaxCPC = editedMaxCPC.innerHTML.substring(0,editedMaxCPC.innerHTML.length-2);
 editedAverageCPC.innerHTML = '<input type="text" id="averageCPCEdit" class="tableInputNarrow" maxlength="6" value="' + currentAverageCPC + '" onKeyPress="enterUpdateTopAd(event)" />';
 editedMaxCPC.innerHTML = '<input type="text" id="maxCPCEdit" class="tableInputNarrow" maxlength="6" value="' + currentMaxCPC + '" onKeyPress="enterUpdateTopAd(event)" />';
 editedAverageCPC.onclick = doNothing;
 editedMaxCPC.onclick = doNothing;
 if (focusIndex == 3) document.getElementById('averageCPCEdit').focus();
 else document.getElementById('maxCPCEdit').focus();
}

function finishEditing() {
 if(editMode == false) return;
 if(currentAverageCPC != null) editedAverageCPC.innerHTML = parseFloat(currentAverageCPC).toFixed(2) + ' $';
 if(editedAverageCPC != null) editedAverageCPC.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(currentMaxCPC != null) editedMaxCPC.innerHTML = parseFloat(currentMaxCPC).toFixed(2) + ' $';
 if(editedMaxCPC != null)  editedMaxCPC.onclick = function(){ goToEditMode(this.parentNode,4); };
 currentAverageCPC = null;
 editedAverageCPC = null;
 currentMaxCPC = null;
 editedMaxCPC = null;
 editMode = false;
}