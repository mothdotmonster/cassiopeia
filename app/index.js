import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { me as device } from "device";

var weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Update the clock every second
clock.granularity = "seconds";

// Get a handle on the <text> element
const hoursmins = document.getElementById("hoursmins");
const seconds = document.getElementById("seconds");
const ampm = document.getElementById("ampm");
const day = document.getElementById("day");
const model = document.getElementById("model");
model.text = `${device.modelName.toUpperCase()}`;

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    if (hours < 12) {
      let ap;
      ap = "AM";
      } else {
      ap = "PM";
    }
    hours = util.monoDigits(hours % 12 || 12);
  } else {
    // 24h format
    let ap = " ";
    hours = util.monoDigits(util.zeroPad(hours));
  }
  let mins = util.monoDigits(util.zeroPad(today.getMinutes()));
  let secs = util.monoDigits(util.zeroPad(today.getSeconds()));
  let date = util.monoDigits(util.zeroPad(today.getDate()));
  let month = today.toLocaleString('default', { month: 'short' }).slice(4, -26).toUpperCase();
  
  var weekdayNumber = today.getDay();
  var weekday = weekdays[weekdayNumber];
  
  hoursmins.text = `${hours}:${mins}`;
  seconds.text = `${secs}`;
  ampm.text = `${ap}`;
  day.text = `${weekday}  ${month} ${date}`;
}
