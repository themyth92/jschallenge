'use strict';
function TestHelper() {

}

TestHelper.createNewDate = function createNewDate(hour, min, sec) {
  
  // create a new date object which hours, mins, secs and millisecs is set to predefined value
  // We dont really care about date but care about time (hours)
  var date =  new Date();

  hour = hour || 0;
  min = min || 0;
  sec = sec || 0;

  date.setHours(hour);
  date.setMinutes(min);
  date.setSeconds(sec);
  return date;
};
