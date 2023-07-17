// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function applyTimes() {
    // based on https://www.plus2net.com/javascript_tutorial/clock.php
  const timeClasses = document.getElementsByClassName("time");
  for (const time_e of timeClasses){
    var myTz = time_e.getAttribute("tz")
    if (myTz == null){
      myTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    var d = new Date(Date.now());
    var d_local = d.toLocaleString('en-us', {timeZone: myTz, hour12:false});
    var d_text=d_local.slice(11,19);
    time_e.innerHTML = d_text
  }
  var refresh=1000;
  mytime = setTimeout(applyTimes,refresh);
}
