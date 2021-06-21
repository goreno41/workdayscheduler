const currentDate = moment().format('dddd MMMM Do, YYYY');
const currentTime = moment().format('hh:mm:ss a');
const currentHour = moment().format('HH');

$("#currentDay").text(currentDate);

let amPM = "AM";
let lastHour = " ";
let timeMap = newMap();


//.. Local storage retrieve after storing on bottom of code
if (localStorage.getItem("myMap")) {
    timeMap = newMap(JSON.parse(localStorage.myMap));

} else {
    let timeMap = newMap();
}


for (let hour = 9; hour < 18; hour++) {

    let timeBlock = $('<div>');

    if (hour < 12) {
        amPM = "AM";
    } else {
        amPM = "PM";
    }

    let timeDiv = $('<div>');

    if (hour > 12) {
        lastHour = hour - 12;
    } else {
        lastHour = hour;
    }

    timeBlock.addClass('time-block');
    timeBlock.text(lastHour + amPM);

    
    let descriptionDiv = $("<div>");
    let textAreaForDiv = $("<textarea>");
    textAreaForDiv.attr('id', 'textarea' + hour);

    descriptionDiv.append(textAreaForDiv);
    descriptionDiv.addClass("description");


    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn ");
    saveDiv.attr('id', hour);
    saveDiv.append(saveIcon);

    
    timeBlock.append(timeDiv, descriptionDiv, saveDiv);

    if (currentHour > hour) {

        
        timeBlock.addClass("past");

    } else if (currentHour < hour) {

        
        timeBlock.addClass("future");
        textAreaForDiv.attr("placeholder", "Enter a task to complete this hour...");

    } else {
     
        timeBlock.addClass("present");
        textAreaForDiv.attr("placeholder", "Add calendar event here");
    }

    $("#container").append(timeBlock);



}

timeMap.forEach(function (text, key) {

    let textAreaVar = "#textarea" + key;
    document.querySelector(textAreaVar).value = text;

});

$(".saveBtn").on('click', function () {

    let textAreaVar = "#textarea" + (this.id);

    timeMap.set((this.id), document.querySelector(textAreaVar).value);
    localStorage.myMap = JSON.stringify(Array.from(timeMap.entries()));


});