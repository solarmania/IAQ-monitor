# IAQ-monitor
I am going to set-up a monitoring system of the indoor air qualities of my home.
It's hardware consists of a server, Raspberry Pi 3 model B, and three monitoring spots, kitchen, living and anbang. Anbang is a Korean main bedroom.
Each spot has a controller, D1 mini, and has different sensor constitutions.
  - kitchen: temperature, relative humidity, CO2, dust(PM10, PM2.5)
  - living: temperature, relative humidity, pressure
  - anbang: temperature, relative humidity, CO2
  
Each ambient sensors are as follows. 
  - temperature and relative humidity: SHT31
  - CO2: MH-Z19
  - dust: SDS011
Descriptions of uploaded files are as follows.
  - main.js: server program based on node.js
  - 
