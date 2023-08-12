const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
const port = 3000;

require('dotenv').config();

var mysql = require('mysql2');
console.log("host: "+ process.env.DATABASE_HOST_ADDRESS);
console.log("port: "+ process.env.DATABASE_HOST_PORT);
console.log("user: "+ process.env.DATABASE_USER);
console.log("password: "+ process.env.DATABASE_USER_PW);

var con = mysql.createConnection({
  host: process.env.DATABASE_HOST_ADDRESS,
  port: process.env.DATABASE_HOST_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PW
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