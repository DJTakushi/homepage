CREATE DATABASE IF NOT EXISTS homepage;
CREATE TABLE IF NOT EXISTS cities (
  int ID NOT NULL,
  cityName varchar(255) NOT NULL,
  condition varchar(512),
  tempC float(10,10),
  humidity float(10,10),
  PRIMARY KEY (ID)
);
