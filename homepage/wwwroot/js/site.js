// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// function to set a given theme/color-scheme
// from https://medium.com/@haxzie/dark-and-light-theme-switcher-using-css-variables-and-pure-javascript-zocada-dd0059d72fa2
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
  console.log("document.documentElement.className = ",document.documentElement.className);
  const tables = document.getElementsByClassName("table");
  const buttons = document.getElementsByClassName("btn");
  if(themeName=='theme-dark'){
    for (const t of tables){ t.classList.add("table-dark"); }
    for (const b of buttons){
      b.classList.add("btn-dark");
      b.classList.remove("btn-light");
    }
  }
  else{
    for (const t of tables){ t.classList.remove("table-dark"); }
    for (const b of buttons){
      b.classList.add("btn-light");
      b.classList.remove("btn-dark");
    }
  }
}
// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark'){
     setTheme('theme-light');
  }
  else { setTheme('theme-dark'); }
}

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


// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') == 'theme-light') {
      setTheme('theme-light');
  } else {
      setTheme('theme-dark');
  }
})();