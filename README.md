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
  - kitchen.ino, living.ino, anbang.ino: arduino sketches for each monitoring spot. 
  - main.js: server program to retrieve sensor data based on node.js
  - index.html, style.css, chart_kitchen.php, chart_living.php, chart_anbang.php: user interface to visualize sensor data
  - data_kitchen.php, data_living.php, data_anbang.php; program to fetch sensor data from the database
  - linegraph_kitchen.js, linegraph_living.js, linegraph_anbang.js: java scrips to plot linegraphs of sensor data based on Chart.js
