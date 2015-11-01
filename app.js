var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
 
app.use(express.static(__dirname + '/public'));
 
app.get('/', function(req, res){
  res.render('/index.html');
});
var playercount=0;
io.on('connection', function (socket) {
	playercount++;
	setTimeout(function () {
	if(playercount==1)
	{
		io.emit('connected',{pid:playercount});
		console.log(playercount);
	}
	else if(playercount==2)
	{
		io.emit('connected_opponent', {x:125,y:50,pid:playercount});
		console.log(playercount);
	}
	else{
		socket.emit('server_busy');
	}
	}, 1500);
	socket.on('update',function(data){
		//console.log(data);
		io.emit('update_opponent_pos',data);
	});
	socket.on('win',function(data){
		console.log(data);
		io.emit('win',data);
	});
	});
server.listen(8080);
console.log("Multiplayer app listening on port 8080");