const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
require('dotenv').config();
const port = process.env.DATA_API_PORT;

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
  var drop_cities_table = "DROP TABLE cities";
  con.query(drop_cities_table, function (err, result) {
    if (err) throw err;
    console.log("Table 'cities' dropped");
  });

  /** create cities table **/
  var create_cities_table = "CREATE TABLE IF NOT EXISTS cities ( \
    id int NOT NULL, \
    cityName varchar(255), \
    tz varchar(255), \
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
    (id, cityName, tz, condition_, tempC, humidity) \
    VALUES ('0', 'Chicago', 'America/Chicago', NULL, NULL, NULL)";
  con.query(insert_chicago, function (err, result) {
      if (err) throw err;
      console.log("Inserted 'Chicago'");
    });

    /** insert Atlanta **/
  var insert_atlanta = "INSERT INTO cities \
  (id, cityName, tz, condition_, tempC, humidity) \
  VALUES ('1', 'Atlanta', 'America/New_York', NULL, NULL, NULL)";
  con.query(insert_atlanta, function (err, result) {
    if (err) throw err;
    console.log("Inserted 'Atlanta'");
  });

  /** insert UTC **/
  var insert_utc = "INSERT INTO cities \
  (id, cityName, tz, condition_, tempC, humidity) \
  VALUES ('2', 'UTC', 'UTC', NULL, NULL, NULL)";
  con.query(insert_utc, function (err, result) {
    if (err) throw err;
    console.log("Inserted 'UTC'");
  });

  /** insert Osaka **/
  var insert_osaka = "INSERT INTO cities \
  (id, cityName, tz, condition_, tempC, humidity) \
  VALUES ('3', 'Osaka', 'Japan', NULL, NULL, NULL)";
  con.query(insert_osaka, function (err, result) {
    if (err) throw err;
    console.log("Inserted 'Osaka'");
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
        tmp.tempF = Math.round((1.8*tempC_+32.0)*10)/10.0; // round to 1 dec
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