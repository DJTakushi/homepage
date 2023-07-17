// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function applyTimes() {
    // based on https://www.plus2net.com/javascript_tutorial/clock.php
  const timeClasses = document.getElementsByClassName("time");
  for (const time_e of timeClasses){
    const myTz = time_e.getAttribute("tz")
    if (myTz != null){
      // var d = new Date((new Date().getTime())+1000*myTz)
      var d = new Date(Date.now());
      // old style using timezone names.  OpenWeahter only supports seconds.
      // var d_text = d.toLocaleString("en-US", {hour12: false, hour: '2-digit', minute:'2-digit'});
      var d_text = d.toISOString().slice(11,19);//time in ISO format
      time_e.innerHTML = d_text
    }
  }
  var refresh=1000;
  mytime = setTimeout(applyTimes,refresh);
}
