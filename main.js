var http = require('http');
var mysql = require('mysql');
var qs = require('querystring');

http.createServer(function(request, response){
    var body = '';
    request.on('data', function(data){
	body += data;
    });
    request.on('end', function(){
	var post = qs.parse(body);
	if (post.user == 'kitchen'){
	    var db = 'airquality';
	    var queryData = {'Tx100':post.T,
			     'RHx100':post.H,
			     'PM10x10':post.P10,
			     'PM25x10':post.P25,
			     'CO2':post.C};
	}else if(post.user == 'anbang'){
	    var db = 'airquality';
	    var queryData = {'Tx100':post.T,
			     'RHx100':post.H,
			     'CO2':post.C};
	}else if(post.user == 'living'){
	    var db = 'airquality';
	    var queryData = {'Tx100':post.T,
			     'RHx100':post.H,
			     'Px10':post.P};
	}else if(post.user == 'pv'){
	    var db = 'energy';
	    var queryData = {'PV1':post.PV1,
			     'PV2':post.PV2};
	}else if(post.user == 'board'){
	    var db = 'energy';
	    var queryData = {'HEAT1':post.H1,
			     'HEAT2':post.H2,
			     'COOK':post.COOK,
			     'TOTAL':post.TOT};
	}else{
	    var db = 'energy';
	    var queryData = {'Wh':post.Wh};
	}
	var connection = mysql.createConnection({
	    host : 'localhost',
	    user : post.user,
	    password : post.user,
	    database : db
	});
	connection.connect();
	connection.query('INSERT INTO ' + post.user + ' SET ?',queryData , function(error, results, fields){
	    if(error){
		console.log(error);
	    }
	    console.log(results);
	});
	connection.end();
    });

}).listen(8000);

