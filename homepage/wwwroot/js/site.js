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
async function populateCityTable(){
  const uri = 'http://localhost:3000/cities';
  const r = await fetch(uri);
  const rCode = await r.status;
  if (rCode==200){
    const responseJson = await r.json();
    for(const jrow of responseJson){
      genCityTableRow(jrow.cityName,jrow.tz,jrow.condition,jrow.tempC,jrow.tempF,
        jrow.humidity);
    }
  }
  else{
    console.log("API returns code:"+rCode+", using defaults");
    populateCityTableDefault();
  }
}
function populateCityTableDefault(){
  genCityTableRow("Chicago","America/Chicago",
    "https://openweathermap.org/img/wn/10d@2x.png","-","-","-");
  genCityTableRow("Atlanta","America/New_York",
    "https://openweathermap.org/img/wn/10d@2x.png","-","-","-");
  genCityTableRow("UTC","UTC",
    "https://openweathermap.org/img/wn/10d@2x.png","-","-","-");
  genCityTableRow("Osaka","Japan",
  "https://openweathermap.org/img/wn/10d@2x.png","-","-","-");
}
function genCityTableRow(name_, tz_,icon_,tc_,tf_,hum_){
  const tbl = document.getElementById("cityTable");
  var row = tbl.insertRow();
  row.classList.add("cityRow");

  var name_c = row.insertCell();
  name_c.innerHTML=name_;
  name_c.setAttribute("scope","col");
  name_c.classList.add("cityName");

  var time_c = row.insertCell();
  time_c.innerHTML="-";
  time_c.setAttribute("scope","col");
  time_c.setAttribute("tz",tz_);
  time_c.classList.add("time");
  
  var cond_c = row.insertCell();
  cond_c.setAttribute("scope","col");
  cond_c.classList.add("condition");
  if(icon_ == null) cond_c.innerHTML="-";
  else{
    var iconImg = document.createElement("IMG");
    iconImg.height=40;
    iconImg.src=icon_;
    cond_c.appendChild(iconImg);
  }

  var temp_c = row.insertCell();
  if (tc_ == null){
    temp_c.innerHTML="-";
  }
  else{
    temp_c.innerHTML=tc_+" C <br>"+tf_+" f";
  }
  temp_c.setAttribute("scope","col");
  temp_c.classList.add("temp");

  var humid_c = row.insertCell();
  if (hum_ == null) humid_c.innerHTML="-";
  else humid_c.innerHTML=hum_+"%";
  humid_c.setAttribute("scope","col");
  humid_c.classList.add("humidity");
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