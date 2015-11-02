require([], function () {
	var oldpx,oldpy;
	Q.Sprite.extend('Opponent', {
		init: function(p){
			this._super(p,{
				sheet: 'golplayer'
		});
		this.add('2d');
		}
	});
	Q.Sprite.extend('Player', {
	init: function (p) {
		this._super(p, {
		jumpSpeed: -290,
		speed: 200,
		sheet: 'golplayer'
	});
	this.add('2d, platformerControls');
	/*
	* hit function
	*/
	this.on('hit',function(collision){
		if(collision.obj.isA('Trophy'))
		{
			this.p.direction = "top";
			Q.stage().pause();
			socket.emit('win',{id:gameId});
			this.p.x+=40;
			collision.obj.destroy();
			counter=1;
		}
		if(collision.obj.p.sheet=='spike'&&!counter)
		{
			/*this.destroy();
			Q.stageScene("dead",1);*/
			this.p.x=700;
			this.p.y=50;
		}
		if(collision.obj.p.sheet=='water_varient'&&!counter)
		{
			collision.obj.p.type = 0;
			collision.obj.destroy();
		}

	});
	///////////////////////////////////
	},
	step: function (dt) {
	    if(Q.inputs['left'] && this.p.direction == 'right') {
         	   this.p.flip = 'x';
	    }
	    if(Q.inputs['right']  && this.p.direction == 'left') {
	        this.p.flip = false;
	    }
	    if(!oldpx||!oldpy)
		{
			oldpx=this.p.x;
			oldpy=this.p.y;
		}
		if(Math.abs(this.p.x-oldpx)>5)
		{	
			socket.emit('update',{x:this.p.x,y:this.p.y,face:this.p.flip,pid:gameId});
			oldpx=this.p.x;
			oldpy=this.p.y;
		}
	}
	});
	Q.Sprite.extend('Enemy' , {
		init: function(p){
			this._super(p,{
				sheet: 'enemy',
				vx: -100,
				visiblityOnly: true,
				scale:0.8	
			});
			this.add('2d','aiBounce');
			this.on('bump.left',function(collision){
				if(collision.obj.isA('Player')&&!counter)
				{
					collision.obj.p.x=700;
					collision.obj.p.y=50;
					this.p.vx=100;
					/*collision.obj.destroy();
					Q.stageScene("dead",1);*/
				}
				else
				{
					this.p.vx=100;
				}
			});
			this.on('bump.right',function(collision){
				if(collision.obj.isA('Player')&&!counter)
				{
					/*collision.obj.destroy();
					Q.stageScene("dead",1);*/
					collision.obj.p.x=700;
					collision.obj.p.y=50;
					this.p.vx=-100;
				}
				else
				{
					this.p.vx=-100;
				}
			});
			this.on('bump.top',function(collision){
				if(collision.obj.isA('Player'))
				{
					this.destroy();
				}
			});
		}
	 });
	Q.Sprite.extend("Trophy", {
			init: function(p){
				this._super(p,{
					sheet:'trophy'
				});
			}
		})
});
