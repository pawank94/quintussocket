var counter=0;
var gameId;
var win_id
var socket = io.connect('http://128.199.197.77:8080');
var opponent,player;
var Q = Quintus()
	.include('Sprites, Scenes, Input, 2D, Anim, Touch, UI')
	.setup({
		maximize: true
	}).controls().touch();
var objectFiles = [
	'./src/objects'];
require(objectFiles, function() {
	var opponent;
	Q.scene('arena', function(stage) {
		/*
		*  collision layers
		*/
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/bg.json',
			sheet: 'bg',
			type: 0
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/simple_block.json',
			sheet: 'simple_block'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/ground_grass.json',
			sheet: 'grass'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/water.json',
			sheet: 'water',
			type: 0
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 18,
 		 	dataAsset: '/maps/spikes.json',
 		 	sheet:'spike'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/box.json',
			sheet: 'box'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/water_varient.json',
			sheet: 'water_varient',
			type: 0
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/pipe.json',
			sheet: 'pipe'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,
 		 	tileH: 35,
			blockTileW: 35,
			blockTileH: 35,
			dataAsset: '/maps/pipe_head.json',
			sheet: 'pipe_head'
		}));
		/////////////////objects////////////////////

		player = stage.insert(new Q.Player({
			x: 720,
			y: 50
		}));
		var trophy = stage.insert(new Q.Trophy({
			x:1225,
			y:560,
			scale:1.1
		}));
		var trophy = stage.insert(new Q.Trophy({
			x:625,
			y:560,
			scale:1.1
		}));
		populateEnemy();//enemy population
		/////////////////////////////////////////////
		stage.add('viewport').follow(player,{x:true,y:false},{scale:1.5});//.centerOn(Q.width/2-40,Q.height/2-20);
		/*
		* Enemy populate
		*/
		function populateEnemy()
		{
			var a=0,b=0;
			var si=setInterval(function(){
				var enemy = stage.insert(new Q.Enemy({
					x: 680+a,
					y: 300-b
				}));
				if(a==200)
					stop_insert();
				a+=200;
				b=50;
			}, 100);
			function stop_insert(){
				clearInterval(si);
			};
			for(var i=0;i<3;i++)
			{
				var enemy = stage.insert(new Q.Enemy({
					x: 1000+i*10,
					y: 500
				}));
			}
		}
		/*
		*socket section
		*/
		socket.on('server_busy',function(){
			Q.clearStages();
			Q.stageScene('busy');
		});
		socket.on('connected',function(data){
			gameId=data.pid;
		});
		socket.on('disconnected',function(data){
			socket.disconnect();
			Q.clearStages();
			Q.stageScene('connection_lost',0);
		});	
		socket.on('connected_opponent',function(data){
			console.log('here');
			
			if(!gameId)
				gameId=data.pid;
			Q.stage().unpause();
			Q.stageScene('playerId',1);
			opponent = stage.insert( new Q.Opponent({
				x: data.x,
				y: data.y
			}));
		});	
		socket.on('update_opponent_pos',function(data){
			if(gameId!=data.pid)
			{
				opponent.p.x=data.x-595;
				opponent.p.y=data.y;
				opponent.p.flip=data.face;
				// console.log(opponent.x+" "+opponent.y);
			} 
		});
		socket.on('win',function(data){
			win_id=data.id;
			Q.stage().pause();
			player.destroy();
			opponent.destroy();
			Q.stageScene('win',2);
		});
	});
	/*
	*	death scene
	*/
	Q.scene('dead',function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgb(0,0,0)"
		}));
		var label = container.insert(new Q.UI.Text({x:10, y: -10, color:"rgb(0,151,123)" ,label: "You are dead" }));
		container.fit(20);
	});
	/*
	*	winning scene
	*/
	Q.scene('win',function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgb(0,0,0)"
		}));
		var label = container.insert(new Q.UI.Text({x:10, y: -10, color:"rgb(0,151,123)" ,label: "\t \t   Player "+win_id+" Won!!! \n Refresh to play again" }));
		container.fit(30);
	});
	/*
	*server busy
	*/
	Q.scene('busy',function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgb(0,0,0)"
		}));
		var label = container.insert(new Q.UI.Text({x:10, y: -10, color:"rgb(0,151,123)" ,label: "Server is busy!! try again later.." }));
		container.fit(20);
	});
	/*
	*connection lost
	*/
	Q.scene('connection_lost',function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgb(0,0,0)"
		}));
		var label = container.insert(new Q.UI.Text({x:10, y: -10, color:"rgb(0,151,123)" ,label: "Connection lost or server reset by other side :( :(" }));
		container.fit(20);
	});
	/*
	* playerID
	*/
	Q.scene('playerId',function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2-60, y: 30, fill: "rgb(0,0,0)"
		}));
		var label = container.insert(new Q.UI.Text({x:8, y: -5, color:"rgb(0,151,123)" ,label: gameId+"" }));
		container.fit(10);
	});
	/* 
	* waiting scene 
	*/
	Q.scene('waiting',function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgb(0,0,0)"
		}));
		var label = container.insert(new Q.UI.Text({x:10, y: -10, color:"rgb(0,151,123)" ,label: "Waiting for other player!!" }));
		container.fit(20);
	});
	var files = [
		'/images/tiles.png',
		'/images/tiles_map.png',
		'/images/player.png',
		'/images/tile.json',
		'/maps/arena.json',
		'/maps/box.json',
		'/maps/simple_block.json',
		'/maps/pipe.json',
		'/maps/pipe_head.json',
		'/maps/water.json',
		'/maps/spikes.json',
		'/maps/bg.json',
		'/maps/water_varient.json',
		'/images/sprites.png',
		'/images/trophy.png',
		'/images/spike.png',
		'/images/spk.png',
		'/maps/ground_grass.json',
		'/images/sprites.json'];
	/*
	* load resources
	*/
	Q.load(files.join(','), function() {
		Q.sheet('golplayer','/images/player.png',{
			tilew: 35,
			tileh: 50
		});
		Q.sheet('trophy','/images/trophy.png',{
			tilew: 40,
			tileh: 45
		});
		Q.sheet('spike','/images/spk.png',{
			sx: 46	,
	        sy: 76,
	        rows: 1,
	        tilew: 30,
	        tileh: 30,
	        frames: 1
		});
		Q.compileSheets('/images/sprites.png', '/images/sprites.json');
		Q.compileSheets('/images/tiles_map.png', '/images/tile.json');
		Q.stageScene('arena',0);
		Q.stageScene('waiting',1);
		Q.stage().pause();
	});
});
