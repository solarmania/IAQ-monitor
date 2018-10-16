<!DOCTYPE html>
<html>
  <head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="http://172.30.1.5/myHouse/chartjs/style.css">
    <title>myHouse</title>
  </head>
  <body>
    <nav>
		IAQ
        <a href="http://172.30.1.5/myHouse/chartjs/chart_kitchen.php">kitchen</a>
        <a href="http://172.30.1.5/myHouse/chartjs/chart_living.php">living</a>
        <a href="http://172.30.1.5/myHouse/chartjs/chart_anbang.php">anbang</a>
    </nav>
    <div class="chart-container">
      <canvas id="mycanvas"></canvas>
    </div>

	<script type="text/javascript">
		var refresh = confirm("plot the recent 1 day?");
		if (refresh) {
			var d = new Date();
			d.setDate(d.getDate() - 1);
			var startDate = d.toISOString().slice(0,10); 
			var range = "up-to-date";
		}else{
			var startDate = prompt("starting date to plot: ","2018-08-18");
			var range = prompt("days to plot: ","up-to-date");
		}
	</script>
	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/Chart.min.js"></script>
	<script type="text/javascript" src="js/linegraph_living.js"></script>
  </body>
</html>
     
