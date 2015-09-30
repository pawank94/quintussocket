var Q = Quintus()
	.include('Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio')
	.setup({
	maximize: true
	}).controls().touch();
var objectFiles = [
	'./src/player'];
require(objectFiles, function() {
	Q.scene('arena', function(stage) {
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,  // Default tile width
 		 	tileH: 35,  // Default tile height
			blockTileW: 35,  // Default pre-render size
			blockTileH: 35,
			dataAsset: '/maps/simple_block.json',
			sheet: 'simple_block'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,  // Default tile width
 		 	tileH: 35,  // Default tile height
			blockTileW: 35,  // Default pre-render size
			blockTileH: 35,
			dataAsset: '/maps/ground_grass.json',
			sheet: 'grass'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,  // Default tile width
 		 	tileH: 35,  // Default tile height
			blockTileW: 35,  // Default pre-render size
			blockTileH: 35,
			dataAsset: '/maps/water.json',
			sheet: 'water',
			type: 0
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,  // Default tile width
 		 	tileH: 35,  // Default tile height
			blockTileW: 35,  // Default pre-render size
			blockTileH: 35,
			dataAsset: '/maps/box.json',
			sheet: 'box'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,  // Default tile width
 		 	tileH: 35,  // Default tile height
			blockTileW: 35,  // Default pre-render size
			blockTileH: 35,
			dataAsset: '/maps/pipe.json',
			sheet: 'pipe'
		}));
		stage.collisionLayer(new Q.TileLayer({
			tileW: 35,  // Default tile width
 		 	tileH: 35,  // Default tile height
			blockTileW: 35,  // Default pre-render size
			blockTileH: 35,
			dataAsset: '/maps/pipe_head.json',
			sheet: 'pipe_head'
		}));
		/*stage.collisionLayer(new Q.TileLayer({
			tileW: 70, 
  			tileH: 70,
			dataAsset: "/maps/simple_block.json",
			sheet: "simple_block"
		}));*/
		var player = stage.insert(new Q.Player({
			x: 700,
			y: 50
		}));
		stage.add('viewport').follow(player,{x:false,y:false});
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
		'/images/sprites.png',
		'/maps/ground_grass.json',
		'/images/sprites.json',
		'/images/background.png'];
	Q.load(files.join(','), function() {
		Q.sheet('golplayer','/images/player.png',{
			tilew: 35,
			tileh: 50
		});
		Q.compileSheets('/images/sprites.png', '/images/sprites.json');
		Q.compileSheets('/images/tiles_map.png', '/images/tile.json');
		Q.stageScene('arena', 0);
	});
});