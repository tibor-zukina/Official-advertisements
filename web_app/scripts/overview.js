$( function() {
    $('#from').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'dd.mm.yy.',
				dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			});
    $('#to').datepicker({
				inline: true,
				showOtherMonths: true,
				dateFormat: 'dd.mm.yy.',
				dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			});
  } );
var editMode = false;
var editedId = null;
var editedIndex = null;
var editedCtr = null;
var editedViews = null;
var currentCtr = null;
var currentViews = null;
var numberOfSections;
var Website = class Website {
  constructor(index,website,ctr,views,date,dayNumber,id) {
    this.index = index;
    this.website = website;
    this.ctr = ctr;
    this.views = views;
    this.date = date;
    this.dayNumber = dayNumber;
    this.id = id;
  }
};

var userWebsites = new Array();
var allUserWebsites = new Array();
var currentPage = 0;
var totalWebsites;
var allTotalWebsites;
var numberIds = ['one','two','three','four','five'];

function generateLocalDate() {

 var date = new Date();
 var year = date.getFullYear();
 var month = date.getMonth() + 1;
 var day = date.getDate();
 var dateStr = day + '.' + month + '.' + year + '.'; 
 return dateStr;
}

function getWebsites() {
  $.ajax({
                url: "get_websites.php",
                type: "POST",
                data: "",
                success: function(data, textStatus, jqXHR) {
                    success = JSON.parse(data).success;
                    if (success == -666){
                    window.location.replace('logout.php');
                    return;
                    }
                    websites = JSON.parse(data).websites;
                    totalWebsites = websites.length;
                    allTotalWebsites = websites.length;
                    for (var i = 0; i < totalWebsites; i++) {
                       var index = i + 1;
                       website  = websites[i].website;
                       ctr = websites[i].ctr;
                       views = websites[i].views;
                       id = websites[i].id;
                       date = websites[i].date;
                       dayNumber = websites[i].dayNumber;
                       website = new Website(index,website,ctr,views,date,dayNumber,id);
                       userWebsites.push(website);
                       allUserWebsites.push(website);
                    }
                    if(userWebsites.length<=80) document.getElementById('five').style.display = 'none';
                    if(userWebsites.length<=60) document.getElementById('four').style.display = 'none';
                    if(userWebsites.length<=40) document.getElementById('three').style.display = 'none';
                    if(userWebsites.length<=20) document.getElementById('two').style.display = 'none';
                    fillTable();
                    
                }

            });
}

function putWebsite() {

  var website = document.getElementById("website").value;
    if (website == "") {
        document.getElementById("website").focus();
    } else {
        date = generateLocalDate();
        dates = date.split('.');
        dayNumber = dates[2]*365 + dates[1]*30 + dates[0];
        var formData = "website=" + website + "&date=" + date + "&dayNumber=" + dayNumber;
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
            url: "put_website.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('website').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                 id = JSON.parse(data).id;
                 userWebsites.splice(0, 0, new Website(1,website,0,0,date,dayNumber,id));
                 for(j = 1, tot = userWebsites.length; j < tot; j++) userWebsites[j].index = userWebsites[j].index + 1; 
                 if(userWebsites.length > 300) userWebsites.pop();
                 totalWebsites = userWebsites.length;
                 if(totalWebsites % 20 == 1)
                 document.getElementById(numberIds[(totalWebsites%100-1)/20]).style.display = 'inline';
                 fillTable();              
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }

}


getWebsites();

function goNext() {
 currentPage++;
 if(currentPage % 5 == 0) {
  document.getElementById('one').innerHTML = currentPage + 1;
  document.getElementById('two').innerHTML = currentPage + 2;
  document.getElementById('three').innerHTML = currentPage + 3;
  document.getElementById('four').innerHTML = currentPage + 4;
  document.getElementById('five').innerHTML = currentPage + 5;
  if(userWebsites.length<=(currentPage+4)*20) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userWebsites.length<=(currentPage+3)*20) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userWebsites.length<=(currentPage+2)*20) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userWebsites.length<=(currentPage+1)*20) document.getElementById('two').style.display = 'none';
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
  if(userWebsites.length<=currentPage*20) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(userWebsites.length<=(currentPage-1)*20) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(userWebsites.length<=(currentPage-2)*20) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(userWebsites.length<=(currentPage-3)*20) document.getElementById('two').style.display = 'none';
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
   if(currentPage >= ((totalWebsites/20) - 1)  ) next.style.display = 'none';
   else next.style.display = 'inline';
   websitesTable = document.getElementById('websitesTable');
   var newHtml = '<tr> <th class="narrow"> <input type="checkbox" name="selectAll" id="selectAll" onchange="toggleSelection(this)"> </th> <th class="narrow" onClick="finishEditing()"> # </th> <th onClick="finishEditing()"> Website </th> <th onClick="finishEditing()"> CTR </th> <th onClick="finishEditing()"> Views </th> <th class="noBorder" onClick="finishEditing()" > Date </th> </tr>';
   for(i = currentPage * 20; i < Math.min(totalWebsites, (currentPage+1) * 20) ; i++) {
      var htmlStr = '<tr id="' + 'entry' + userWebsites[i].id + '+' + userWebsites[i].index + '">' + '<td class="narrow" > <input type="checkbox" class="cellCheckBox" id="' + userWebsites[i].id + '+' + userWebsites[i].index + '">' + '</td>' + '<td class="narrow" onClick="finishEditing()">' + userWebsites[i].index + '</td>' + '<td onClick="finishEditing()">' + userWebsites[i].website + '</td>' + '<td onClick="goToEditMode(this.parentNode,3)">' + userWebsites[i].ctr.toFixed(2) + '</td>' + '<td onClick="goToEditMode(this.parentNode,4)">' + userWebsites[i].views + '</td>' + '<td class="noBorder" onClick="finishEditing()">' + userWebsites[i].date + '</td>' + '</tr>';
      newHtml += htmlStr;
   }
    websitesTable.innerHTML = newHtml;
}


function filter(){
  searchFilter = document.getElementById('search').value;
  fromDate = document.getElementById('from').value;
  toDate = document.getElementById('to').value;
  fromDates = fromDate.split('.');
  toDates = toDate.split('.');
  fromDayNumber = fromDates[2]*365 + fromDates[1]*30 + fromDates[0];
  toDayNumber = toDates[2]*365 + toDates[1]*30 + toDates[0];
  if(searchFilter == '') document.getElementById('search').focus();
  else if (fromDate == '') document.getElementById('from').focus();
  else if (toDate == '') document.getElementById('to').focus();
  else if (toDayNumber < fromDayNumber) document.getElementById('to').focus();
  else {
  document.getElementById('search').innerHTML = '';
  userWebsites = new Array();
  currentPage = 0;
  var newIndex = 1;
  for (i = 0; i < allTotalWebsites; i++) {
      if(allUserWebsites[i].website.indexOf(searchFilter) != -1 && allUserWebsites[i].dayNumber >= fromDayNumber && allUserWebsites[i].dayNumber <= toDayNumber  ) {
          allUserWebsites[i].index = newIndex;
          newIndex++;
          userWebsites.push(allUserWebsites[i]);
      }
  }
  totalWebsites = userWebsites.length;
  document.getElementById('one').innerHTML = 1;
  document.getElementById('two').innerHTML = 2;
  document.getElementById('three').innerHTML = 3;
  document.getElementById('four').innerHTML = 4;
  document.getElementById('five').innerHTML = 5;
  if(totalWebsites<=80) document.getElementById('five').style.display = 'none';
  else document.getElementById('five').style.display = 'inline';
  if(totalWebsites<=60) document.getElementById('four').style.display = 'none';
  else document.getElementById('four').style.display = 'inline';
  if(totalWebsites<=40) document.getElementById('three').style.display = 'none';
  else document.getElementById('three').style.display = 'inline';
  if(totalWebsites<=20) document.getElementById('two').style.display = 'none';
  else document.getElementById('two').style.display = 'inline';
  goToSection(document.getElementById('one'));
  }

}

function goToSection(element) {
 if(editedCtr != null) editedCtr.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(editedViews != null) editedViews.onclick = function(){ goToEditMode(this.parentNode,4); };
 editMode = false;
 editedId = null;
 editedIndex = null;
 editedCtr = null;
 editedViews = null;
 currentCtr = null;
 currentViews = null;
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
  numberOfSections = Math.ceil(totalWebsites/20);
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
            url: "delete_websites.php",
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
                        userWebsites.splice(deleteIndex,1);
                        numDel++;
                     }
                 }
                 for(j = 0, tot = userWebsites.length; j < tot; j++) userWebsites[j].index = j+1; 
                 totalWebsites = userWebsites.length;
                 if( (Math.ceil(totalWebsites/20)<numberOfSections || totalWebsites%20 == 0) && totalWebsites > 0) {
                    if(Math.floor(currentPage*20/100) == Math.floor(totalWebsites/100) && Math.ceil((totalWebsites%100)/20)%5 != 0 )  document.getElementById(numberIds[Math.ceil((totalWebsites%100)/20)]).style.display = 'none';
                    
                  if(currentPage*20 == totalWebsites) {
                    currentPage--;
                    if(currentPage % 5 == 4) {
                       document.getElementById('one').innerHTML = currentPage -3;
                       document.getElementById('two').innerHTML = currentPage -2;
                       document.getElementById('three').innerHTML = currentPage -1 ;
                       document.getElementById('four').innerHTML = currentPage;
                       document.getElementById('five').innerHTML = currentPage +1;
                       if(userWebsites.length<=currentPage*20) document.getElementById('five').style.display = 'none';
                       else document.getElementById('five').style.display = 'inline';
                       if(userWebsites.length<=(currentPage-1)*20) document.getElementById('four').style.display = 'none';
                       else document.getElementById('four').style.display = 'inline';
                       if(userWebsites.length<=(currentPage-2)*20) document.getElementById('three').style.display = 'none';
                       else document.getElementById('three').style.display = 'inline';
                       if(userWebsites.length<=(currentPage-3)*20) document.getElementById('two').style.display = 'none';
                       else document.getElementById('two').style.display = 'inline';
                   }
                  }
                 }
                numberOfSections = Math.ceil(totalWebsites/20);
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

function enterUpdateWebsite(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 

       updateWebsite();
    }
}

function updateWebsite() {

  var ctr = document.getElementById("ctrEdit").value;
  var views = document.getElementById("viewsEdit").value;
    if (ctr == "") {
        document.getElementById("ctrEdit").focus();
    }
    else if (/^(?:\d+\.\d{1,2}|\d+)$/.test(ctr) == false) {
        document.getElementById("ctrEdit").focus();
    }
    else if (views == "") {
        document.getElementById("viewsEdit").focus();
    } 
    else if (/^\d+$/.test(views) == false) {
        document.getElementById("viewsEdit").focus();
    }
    else {
        var formData = "ctr=" + ctr + "&views=" + views + "&id=" + editedId;
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
            url: "update_website.php",
            type: "POST",
            data: formData,
            success: function(data, textStatus, jqXHR) {
                document.getElementById('ctrEdit').innerHTML = '';
                document.getElementById('viewsEdit').innerHTML = '';
                success = JSON.parse(data).success;
                spinner.stop();
                if(success==1){
                  userWebsites[editedIndex-1].ctr = ctr; 
                  userWebsites[editedIndex-1].views = views;
                  editedIndex = null;
                 editedId = null;
                 currentCtr = null;
                 currentViews = null;
                 editedCtr.innerHTML = parseFloat(ctr).toFixed(2);
                 editedViews.innerHTML = views;
                 editedCtr.onclick = function(){ goToEditMode(this.parentNode,3); };
                 editedViews.onclick = function(){ goToEditMode(this.parentNode,4); };
                 editedCtr = null;
                 editedViews = null;
                 editMode = false;
              }
              else if (success == -666) window.location.href = 'logout.php';
            },

        });
    }


}

function goToEditMode(element,focusIndex) {

 if(editedCtr != null && editedCtr.parentNode.id == element.id) return;
 if(currentCtr != null) editedCtr.innerHTML = parseFloat(currentCtr).toFixed(2);
 if(editedCtr != null) editedCtr.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(currentViews != null) editedViews.innerHTML = currentViews;
 if(editedViews != null)  editedViews.onclick = function(){ goToEditMode(this.parentNode,4); };
 editMode = true;
 var entryData = element.id.substring(5,element.id.length);
 editedId = entryData.split('+')[0];
 editedIndex = entryData.split('+')[1];
 editedCtr = element.childNodes[3];
 editedViews = element.childNodes[4];
 currentCtr = editedCtr.innerHTML;
 currentViews = editedViews.innerHTML;
 editedCtr.innerHTML = '<input type="text" id="ctrEdit" class="tableInputNarrow" maxlength="6" value="' + currentCtr + '" onKeyPress="enterUpdateWebsite(event)" />';
 editedViews.innerHTML = '<input type="text" id="viewsEdit" class="tableInputNarrow" maxlength="7" value="' + currentViews + '" onKeyPress="enterUpdateWebsite(event)" />';
 editedCtr.onclick = doNothing;
 editedViews.onclick = doNothing;
 if (focusIndex == 3) document.getElementById("ctrEdit").focus();
 else if(focusIndex == 4) document.getElementById("viewsEdit").focus();
}

function finishEditing() {
 if(editMode == false) return;
 if(currentCtr != null) editedCtr.innerHTML = currentCtr;
 if(editedCtr != null) editedCtr.onclick = function(){ goToEditMode(this.parentNode,3); };
 if(currentViews != null) editedViews.innerHTML = currentViews;
 if(editedViews != null)  editedViews.onclick = function(){ goToEditMode(this.parentNode,4); };
 currentCtr = null;
 editedCtr = null;
 currentViews = null;
 editedViews = null;
 editMode = false;
}