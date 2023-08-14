const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
require('dotenv').config();
const port = process.env.DATA_API_PORT;
const http = require('http');

var mysql = require('mysql2');
console.log("host: "+ process.env.DATABASE_HOST_ADDRESS);
console.log("port: "+ process.env.DATABASE_HOST_PORT);
console.log("user: "+ process.env.DATABASE_USER);
console.log("password: "+ process.env.DATABASE_USER_PW);

var con = mysql.createConnection({
  host: process.env.DATABASE_HOST_ADDRESS,
  port: process.env.DATABASE_HOST_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PW,
  database: "homepage"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  /** create database  - done in compose.yaml **/
  // con.query("CREATE DATABASE IF NOT EXISTS homepage", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database 'homepage' created");
  // });

  /** drop table for testing **/
  var drop_cities_table = "DROP TABLE IF EXISTS cities";
  con.query(drop_cities_table, function (err, result) {
    if (err) throw err;
    console.log("Table 'cities' dropped");
  });

  /** create cities table **/
  var create_cities_table = "CREATE TABLE IF NOT EXISTS cities ( \
    id int NOT NULL, \
    cityName varchar(255), \
    tz varchar(255), \
    latitude float(6), \
    longitude float(6), \
    condition_ varchar(512), \
    tempC float(6), \
    humidity float(6), \
    PRIMARY KEY (id));";
  con.query(create_cities_table, function (err, result) {
    if (err) throw err;
    console.log("Table 'cities' created");
  });

  /** insert Chicago **/
  var insert_chicago = "INSERT INTO cities \
    (id, cityName, tz, latitude, longitude, condition_, tempC, humidity) \
    VALUES ('0','Chicago','America/Chicago',41.85003,-87.65005,NULL,NULL,NULL)";
  con.query(insert_chicago, function (err, result) {
      if (err) throw err;
      console.log("Inserted 'Chicago'");
    });

  /** insert Atlanta **/
  var insert_atlanta = "INSERT INTO cities \
  (id, cityName, tz, latitude, longitude, condition_, tempC, humidity) \
  VALUES ('1', 'Atlanta','America/New_York',33.749,-84.38798,NULL, NULL, NULL)";
  con.query(insert_atlanta, function (err, result) {
    if (err) throw err;
    console.log("Inserted 'Atlanta'");
  });

  /** insert UTC **/
  var insert_utc = "INSERT INTO cities \
  (id, cityName, tz,latitude,longitude,condition_, tempC, humidity) \
  VALUES ('2', 'UTC', 'UTC', 51.50853, -0.12574, NULL, NULL, NULL)";
  con.query(insert_utc, function (err, result) {
    if (err) throw err;
    console.log("Inserted 'UTC'");
  });

  /** insert Osaka **/
  var insert_osaka = "INSERT INTO cities \
  (id, cityName, tz, latitude, longitude, condition_, tempC, humidity) \
  VALUES ('3', 'Osaka', 'Japan', 34.69374, 135.50218, NULL, NULL, NULL)";
  con.query(insert_osaka, function (err, result) {
    if (err) throw err;
    console.log("Inserted 'Osaka'");
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  /** get all cities in table; update them **/
  con.query("SELECT * FROM cities", function (err, result, fields) {
    if (err) throw err;
    result.forEach(function(table) {
      /** get lattitude/longitude from sql content **/
      var params_ = '?lat='+table.latitude;
      params_+='&lon='+table.longitude;

      /** API call for weather data**/
      params_+='&appid='+process.env.OPEN_WEATHER_API_KEY;
      params_+="&units=metric";
      const weather_reqeust_options = {
        hostname: 'api.openweathermap.org',
        path: '/data/2.5/weather'+params_,
        method: 'GET'
      }

      var new_temp_c_;
      var new_humidity_;
      var new_condition_;
      console.log("requesting city "+table.cityName);
      const req = http.request(weather_reqeust_options,(res) => {
        console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
          var j = JSON.parse(chunk);
          new_temp_c_ = j["main"]["temp"];
          new_humidity_ = j["main"]["humidity"];
          new_condition_="https://openweathermap.org/img/wn/"
          new_condition_+=j["weather"][0]["icon"]+"@2x.png";
        });
        res.on('end', () => {
          // console.log('No more data in response.');

          /** update weather content in table **/
          var mysql_update_city = "UPDATE cities SET tempC = " + new_temp_c_;
          mysql_update_city += ", humidity = " + new_humidity_;
          mysql_update_city += ", condition_ = '" + new_condition_ + "'";
          mysql_update_city += " WHERE cityName = '"+table.cityName+"'";
          console.log("mysql_update_city:"+mysql_update_city);
          con.query(mysql_update_city, function (err, result) {
            if (err) throw err;
            console.log("Updated city "+ table.cityName);
          });
        });
      });
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      req.end();
    });
  });
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get("/cities", (req,res) => {
  /** return cities data from database **/
  var output = []; // output

  con.query("SELECT * FROM cities", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    result.forEach(function(table) {
      var tmp = {}; //temporary entry; added to output later
      console.log("processing row "+table.cityName);
      tmp.cityName = table.cityName;
      tmp.tz = table.tz;
      tmp.condition = table.condition_;

      tmp.tempC = null;
      tmp.tempF = null;
      if(table.tempC != null){
        tmp.tempC = Math.round(table.tempC*10)/10.0; // round to 1 dec
        tmp.tempF = Math.round((1.8*tmp.tempC+32.0)*10)/10.0; // round to 1 dec
      }
      tmp.humidity = null;
      if(table.humidity != null){
        tmp.humidity = Math.round(table.humidity*10)/10.0; // round to 1 dec
      }
      output.push(tmp);
  });
    res.json(output);
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));