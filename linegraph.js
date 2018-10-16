$(document).ready(function(){
  $.ajax({
    url : "http://localhost/home/pi/myHouse/chartjs/data_kitchen.php",
    type : "GET",
    success : function(data){
      console.log(data);

      var time = [];
      var T = [];
      var RH = [];
      var PM10 = [];
      var PM25 = [];
      var CO2 = [];

      for(var i in data) {
        time.push(data[i].time);
        T.push(data[i].Tx100);
        RH.push(data[i].RHx100);
        PM10.push(data[i].PM10x10);
        PM25.push(data[i].PM25x10);
	CO2.push(data[i].CO2);  
      }

      var chartdata = {
        labels: time,
        datasets: [
          {
            label: "temperature",
            fill: false,
            lineTension: 0.1,
	    backgroundColor: "rgba(211, 72, 54, 0.75)",
            borderColor: "rgba(211, 72, 54, 1)",
            pointHoverBackgroundColor: "rgba(211, 72, 54, 1)",
            pointHoverBorderColor: "rgba(211, 72, 54, 1)",
            data: T
          },
          {
            label: "humidity",
            fill: false,
            lineTension: 0.1,
	    backgroundColor: "rgba(59, 89, 152, 0.75)",
            borderColor: "rgba(59, 89, 152, 1)",
            pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
            pointHoverBorderColor: "rgba(59, 89, 152, 1)",
            data: RH
          },
	  {
            label: "PM10", 
            fill: false,
            lineTension: 0.1,
	    backgroundColor: "rgba(255, 140, 25, 0.75)",
            borderColor: "rgba(255, 140, 25, 1)",
            pointHoverBackgroundColor: "rgba(255, 140, 25, 1)",
            pointHoverBorderColor: "rgba(255, 140, 25, 1)",
            data: PM10
          },
	  {
            label: "PM2.5",
            fill: false,
            lineTension: 0.1,
	    backgroundColor: "rgba(255, 255, 153, 0.75)",
            borderColor: "rgba(255, 255, 153, 1)",
            pointHoverBackgroundColor: "rgba(255, 255, 153, 1)",
            pointHoverBorderColor: "rgba(255, 255, 153, 1)",
            data: PM25
          },
	  {
            label: "CO2/10",
            fill: false,
            lineTension: 0.1,
	    backgroundColor: "rgba(29, 202, 255, 0.75)",
            borderColor: "rgba(29, 202, 255, 1)",
            pointHoverBackgroundColor: "rgba(29, 202, 255, 1)",
            pointHoverBorderColor: "rgba(29, 202, 255, 1)",
            data: CO2
          },
	]
      };

      var ctx = $("#mycanvas");

      var LineGraph = new Chart(ctx, {
        type: 'line',
        data: chartdata
      });
    },
    error : function(data) {

    }
  });
});
