const currentDate = moment().format('dddd MMMM Do, YYYY');
const currentTime = moment().format('hh:mm:ss a');
const currentHour = moment().format('HH');

$("#currentDay").text(currentDate);

let amPM = "AM";
let lastHour = " ";


//.. Local storage retrieve after storing on bottom of code




for (let hour = 9; hour < 18; hour++) {

    let timeBlock = $('<div>');

    if (hour < 12) {
        amPM = "AM";
    } else {
        amPM = "PM";
    }

    let timeDiv = $('<div>');
    if (hour > 12) {
        finalHour = hour - 12;
    } else {
        finalHour = hour;
    }

    timeDiv.addClass('time-block');
    timeDiv.text(lastHour + amPM);

    
    let descriptionDiv = $("<div>");
    let textAreaForDiv = $("<textarea>");
    textAreaForDiv.attr('id', 'textarea' + hour);

    descriptionDiv.append(textAreaForDiv);
    descriptionDiv.addClass("description");
    descriptionDiv.css("width", "80%");


    let saveIcon = $('<i>');
    saveIcon.addClass("fa fa-save");
    let saveDiv = $("<div>");
    saveDiv.addClass("saveBtn ");
    saveDiv.attr('id', hour);
    saveDiv.append(saveIcon);

    
    timeBlock.append(timeDiv, descriptionDiv, saveDiv);

    timeBlock.addClass("time-block");

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