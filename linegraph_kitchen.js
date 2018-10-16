$(document).ready(function(){
  $.ajax({
    url : "data_kitchen.php",
    type : "GET",
    success : function(data){
      console.log(data);
	
      var _time = [];
      var _T = [];
      var _RH = [];
      var _PM10 = [];
      var _PM25 = [];
      var _CO2 = [];
	  var startIndex = 0;
	  var endIndex = 0;

      for(var i in data) {
        _time.push(data[i].time);
        _T.push(0.01*data[i].Tx100);
        _RH.push(0.01*data[i].RHx100);
        _PM10.push(0.1*data[i].PM10x10);
        _PM25.push(0.1*data[i].PM25x10);
	    _CO2.push(0.1*data[i].CO2);  
	    }
			var total = _time.length;
			var i = 0;
			while(_time[i].slice(0,10) != startDate) {
				i = i + 1;
			}
			startIndex = i;
			if(range == "up-to-date"){
				endIndex = total;
			}else{
				var parts = startDate.split("-");
				var year = parts[0];
				var month = Number(parts[1]) - 1;
				var day = Number(parts[2]) + Number(range) + 1;
				var endDate = new Date(year, month, day);
				i = 0;
				while(_time[i].slice(0,10) != endDate.toISOString().slice(0,10)) {
					i = i + 1;
				}
				endIndex = i;
			}

		var time = _time.slice(startIndex,endIndex);
		var T = _T.slice(startIndex,endIndex);
		var RH = _RH.slice(startIndex,endIndex);
		var PM10 = _PM10.slice(startIndex,endIndex);
		var PM25 = _PM25.slice(startIndex,endIndex);
		var CO2 = _CO2.slice(startIndex,endIndex);

	  var chartdata = {
		labels: time,
		datasets: [
                {
            label: "Temperature[degC]",
            fill: false,
            lineTension: 0.1,
		    backgroundColor: "rgba(211, 72, 54, 0.75)",
            borderColor: "rgba(211, 72, 54, 1)",
            pointHoverBackgroundColor: "rgba(211, 72, 54, 1)",
            pointHoverBorderColor: "rgba(211, 72, 54, 1)",
            data: T
          	},
          	{
            label: "Relative Humidity[%]",
            fill: false,
            lineTension: 0.1,
	    	backgroundColor: "rgba(59, 89, 152, 0.75)",
            borderColor: "rgba(59, 89, 152, 1)",
            pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
            pointHoverBorderColor: "rgba(59, 89, 152, 1)",
            data: RH
          	},
	  	{
            label: "PM2.5[ug/m3]",
            fill: false,
            lineTension: 0.1,
	    	backgroundColor: "rgba(116, 132, 138, 0.75)",
            borderColor: "rgba(116, 132, 138, 1)",
            pointHoverBackgroundColor: "rgba(116, 132, 138, 1)",
            pointHoverBorderColor: "rgba(116, 132, 138, 1)",
            data: PM25
          	},
	  	{
            label: "PM10[ug/m3]", 
            fill: false,
            lineTension: 0.1,
	    	backgroundColor: "rgba(255, 140, 25, 0.75)",
            borderColor: "rgba(255, 140, 25, 1)",
            pointHoverBackgroundColor: "rgba(255, 140, 25, 1)",
            pointHoverBorderColor: "rgba(255, 140, 25, 1)",
            data: PM10
          	},
	  	{
            label: "CO2[10ppm]",
            fill: false,
            lineTension: 0.1,
	    	backgroundColor: "rgba(29, 202, 255, 0.75)",
            borderColor: "rgba(29, 202, 255, 1)",
            pointHoverBackgroundColor: "rgba(29, 202, 255, 1)",
            pointHoverBorderColor: "rgba(29, 202, 255, 1)",
            data: CO2
          	}]
            };

      var ctx = $("#mycanvas");

      var LineGraph = new Chart(ctx, {
        type: 'line',
        data: chartdata, 
    	options: {
	        elements: {
				line: {
					tension: 0, // disables bezier curves
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						max: 100
					}
				}]
			},
	       	animation: {
            	duration: 0, // general animation time
        		},
        	hover: {
            	animationDuration: 0, // duration of animations when hovering an item
        		},
        	responsiveAnimationDuration: 0, // animation duration after a resize
    		}
           });
        },
    error : function(data) {

        }
    });
});
