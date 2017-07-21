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
   var newHtml = '<tr> <th class="narrow"> # </th> <th> Website </th> <th> CTR </th> <th> Views </th> <th class="noBorder" > Date </th> </tr>';
   for(i = currentPage * 20; i < Math.min(totalWebsites, (currentPage+1) * 20) ; i++) {
      var htmlStr = '<tr>' + '<td class="narrow">' + userWebsites[i].index + '</td>' + '<td>' + userWebsites[i].website + '</td>' + '<td>' + userWebsites[i].ctr + '</td>' + '<td>' + userWebsites[i].views + '</td>' + '<td class="noBorder">' + userWebsites[i].date + '</td>' + '</tr>';
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
