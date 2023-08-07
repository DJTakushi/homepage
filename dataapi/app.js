const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const port = 3000;

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "host.docker.internal",
  port: 3306,
  user: "root",
  password: "1234"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get("/cities", (req,res) => {
  const cities = [
  {
    name: "Chicago",
    tz: "America/Chicago",
    icon: "http://openweathermap.org/img/wn/01d@2x.png", 
    tempc: 29.0,
    tempf: 69.69,
    humidity: 26
  },
  {
    name: "Osaka",
    tz: "Japan",
    icon: "http://openweathermap.org/img/wn/11d@2x.png", 
    tempc: 31.0,
    tempf: 90.4,
    humidity: 99
  },
 ];

 res.json(cities);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));