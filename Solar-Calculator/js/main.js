function addMonths(elem){
    var annualUseKw= 0, dailyUseKw = 0, i = 0, x =0;
    var months = document.getElementById(elem).getElementsByTagName('input');
    for(i=0; i<months.length; i++){
        x = Number(months[i].value);//value of Kw hours per month
        annualUseKw += x;
    }//end of loop
dailyUseKw = annualUseKw/365;
return dailyUseKw;
}//end of function

//function to calculate sun hours
function sunHours(){
var hrs; //simply gives us a place to store stuff for SWITCH/CASE
//NOTE: <form> in html will ONLY WORK if you put FORMS PLURAL here
var theZone = document.forms.solarForm.zone.selectedIndex;
theZone +=1;  //adds 1 to index so that zone1 returns 1 and not 0

switch(theZone){
    case 1:
        hrs=6;
        break;
    case 2:
        hrs=5.5;
        break;
    case 3:
        hrs=5;
        break;
    case 4:
        hrs=4.5;
        break;
    case 5:
        hrs=4.2;
        break;
    case 6:
        hrs=3.5;
        break;
    default:
        hrs=0;

  }//end switch
  return hrs;
}//end function

//function to select solar panel and watts it needs to generate
function calculatePanel(){
var userChoice = document.forms.solarForm.panel.selectedIndex;
var panelOptions= document.forms.solarForm.panel.options;
var power = panelOptions[userChoice].value;
var name = panelOptions[userChoice].text;
var x = [power, name];
 //basically what this does it filter all this data down to 'x'
return x;
}

function calculateSolar(){ //this function calls all functions
var dailyUseKw = addMonths('mpc'); //any argument can go here AND it takes over the placeholders
//console.log(dailyUseKw);
var sunHoursPerDay = sunHours();//calls function
//console.log(sunHoursPerDay);

var minKwNeeds = dailyUseKw/sunHoursPerDay;
//console.log(minKwNeeds);
var realKwNeeds = minKwNeeds * 1.25;
//console.log(realKwNeeds);
var realWattNeeds = realKwNeeds * 1000;
//console.log(realWattNeeds);
var panelInfo = calculatePanel();
var panelOutput = panelInfo[0];
var panelName = panelInfo[1];
console.log(panelOutput);
console.log(panelName);

var panelsNeeded = Math.ceil(realWattNeeds/panelOutput);
console.log(panelsNeeded);

var feedback = "";
feedback += "<p>Based on your average daily use of: "+ Math.round(dailyUseKw) +" KWs you will need to purchase "+ panelsNeeded+" "+panelName +" to offset 100% of your electric bill.</p>";
feedback += "<h2>Additional Details</h2>";
feedback += "<p> Your average daily electricity consumption: "+Math.round (dailyUseKw)+" KWs</p>";
feedback += "<p> Your average sunshine hours per day: "+sunHoursPerDay+" hours </p>";
feedback += "<p> Realistic watts needed per hour: "+ Math.round(realWattNeeds) +" KWH</p>";
feedback += "<p> The "+ panelName+" panel you selcted generates about "+ panelOutput+" watts per hour.</p>";
document.getElementById('feedback').innerHTML = feedback;

}//end of function