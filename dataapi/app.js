const express = require('express');
const app = express();
const port = 3000;

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