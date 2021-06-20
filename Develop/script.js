const currentDate = moment().format('dddd MMMM Do, YYYY');
const currentTime = moment().format('hh:mm:ss a');
const currentHour = moment().format('HH');

$("#currentDay").text(currentDate);
