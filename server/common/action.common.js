var action = {};


//date
action.formatDateDDMMYYY = function (date) {
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();

  return year + '-' + monthIndex + '-' + day;
}

//date
action.formatDateDDMMYYYHHmmss = function (date) {
  var day = date.getDate();
  var monthIndex = date.getMonth() + 1;
  var year = date.getFullYear();

  return year + '' + monthIndex + '' + day + '' + date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
}

action.secondToFormatDDMMYYYHHmmss = function (seconds) {
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));
    var days = Math.floor(hours/24);
    hours %= 24;

    if (days   < 10) {days   = "0"+days;}
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return days + 'day : ' + hours + 'h : '+ minutes + 'm : '+seconds + 's';
}

module.exports = action;