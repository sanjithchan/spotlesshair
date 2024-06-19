
/***********************************************
* Dynamic Countdown script- © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

function ex_cdtime(container, targetdate){
if (!document.getElementById || !document.getElementById(container)) return
this.container=document.getElementById(container)
this.currentTime=new Date()
this.targetdate=new Date(targetdate)
this.timesup=false
this.updateTime()
}

ex_cdtime.prototype.updateTime=function(){
var thisobj=this
this.currentTime.setSeconds(this.currentTime.getSeconds()+1)
setTimeout(function(){thisobj.updateTime()}, 1000) //update time every second
}

ex_cdtime.prototype.displaycountdown=function(baseunit, functionref){
this.baseunit=baseunit
this.formatresults=functionref
this.showresults()
}

ex_cdtime.prototype.showresults=function(){
var thisobj=this


var timediff=(this.targetdate-this.currentTime)/1000 //difference btw target date and current date, in seconds
this.mytargettime = timediff; // modified by renjith
if (timediff<0){ //if time is up
this.timesup=true
this.container.innerHTML=this.formatresults()
return
}
var oneMinute=60 //minute unit in seconds
var oneHour=60*60 //hour unit in seconds
var oneDay=60*60*24 //day unit in seconds
var dayfield=Math.floor(timediff/oneDay)
var hourfield=Math.floor((timediff-dayfield*oneDay)/oneHour)
var minutefield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour)/oneMinute)
var secondfield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour-minutefield*oneMinute))
var hr=hourfield.toString();
if(hr.length<2)
 hourfield = "0" + hourfield;
 
var mn=minutefield.toString();
if(mn.length<2)
 minutefield = "0" + minutefield;
 
var se=secondfield.toString();
if(se.length<2)
 secondfield = "0" + secondfield;

if (this.baseunit=="hours"){ //if base unit is hours, set "hourfield" to be topmost level
hourfield=dayfield*24+hourfield
dayfield="n/a"
}
else if (this.baseunit=="minutes"){ //if base unit is minutes, set "minutefield" to be topmost level
minutefield=dayfield*24*60+hourfield*60+minutefield
dayfield=hourfield="n/a"
}
else if (this.baseunit=="seconds"){ //if base unit is seconds, set "secondfield" to be topmost level
var secondfield=timediff
dayfield=hourfield=minutefield="n/a"
}
this.container.innerHTML=this.formatresults(dayfield, hourfield, minutefield, secondfield)
setTimeout(function(){thisobj.showresults()}, 1000) //update results every second
}

/////CUSTOM FORMAT OUTPUT FUNCTIONS BELOW//////////////////////////////

//Create your own custom format function to pass into ex_cdtime.displaycountdown()
//Use arguments[0] to access "Days" left
//Use arguments[1] to access "Hours" left
//Use arguments[2] to access "Minutes" left
//Use arguments[3] to access "Seconds" left

//The values of these arguments may change depending on the "baseunit" parameter of ex_cdtime.displaycountdown()
//For example, if "baseunit" is set to "hours", arguments[0] becomes meaningless and contains "n/a"
//For example, if "baseunit" is set to "minutes", arguments[0] and arguments[1] become meaningless etc

//<span class='spn'>"+arguments[0]+" days "+arguments[1]+":"+arguments[2]+":"+arguments[3]+" </span>
function displayCountDown(){
if (this.timesup==false){ //if target date/time not yet met
var displaystring='<div class="tndays"><span>'+arguments[0]+'</span><br /> Days</div>' +
'<div class="tncounter">'+
'<div class="tnhrs"><span class="countBlack">'+arguments[1]+' </span><span class="imgStrip"></span><span id="sphours">HOURS</span></div>'+
'<div class="tnmins"><span class="countBlack">'+arguments[2]+' </span><span  class="imgStrip"></span><span id="spminutes">MINUTES</span></div>'+
'<div class="tnsecs"><span class="countBlack">'+arguments[3]+' </span><span  class="imgStrip"></span><span id="spseconds">SECONDS</span></div>'+
'</div>'
}
else{ //else if target date/time met
var displaystring="<div class='spnTimeExpnew'>Time Expired </div>" //Don't display any text
}
return displaystring
}