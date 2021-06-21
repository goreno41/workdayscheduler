const currentDate = moment().format('dddd MMMM Do, YYYY');
const currentTime = moment().format('hh:mm:ss a');
const currentHour = moment().format('HH');
let amPM = "AM";
let lastHour = "";
let timeMap = new Map();

$('#currentDay').text(currentDate);



if (localStorage.getItem("myMap")) {
    timeMap = new Map(JSON.parse(localStorage.myMap));

} else {
    let timeMap = new Map();
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

    if (lastHour < 10) {
        lastHour = "  " + lastHour;
    }

    timeDiv.text(lastHour + amPM);
    timeDiv.addClass('time-div');

    let descriptionDiv = $("<div>");
    let textAreaForDiv = $("<textarea>");
    textAreaForDiv.attr('id', 'textarea' + hour);

    descriptionDiv.append(textAreaForDiv);
    descriptionDiv.addClass("description");
    descriptionDiv.css("width", "75%");

    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn ");
    saveDiv.attr('id', hour);


    
    saveDiv.append(saveIcon);
    timeBlock.append(timeDiv, descriptionDiv, saveDiv);
    timeBlock.addClass("time-block row");

    if (currentHour > hour) {
        
        timeBlock.addClass("past");

    } else if (currentHour < hour) {

        timeBlock.addClass("future");
        textAreaForDiv.attr("placeholder", "Enter a task to complete this hour...");

    } else {

        timeBlock.addClass("present");
        textAreaForDiv.attr("placeholder", "Enter activity for calendar slot");
    }

    
    $("#scheduleblock").append(timeBlock);



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