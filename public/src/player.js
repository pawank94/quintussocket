require([], function () {
	Q.Sprite.extend('Player', {
	init: function (p) {
		this._super(p, {
		jumpSpeed: -310,
		speed: 200,
		sheet: 'golplayer'
	});
	this.add('2d, platformerControls');
	},
	step: function (dt) {
		if(Q.inputs['left'] && this.p.direction == 'right') {
            this.p.flip = 'x';
        } 
	    if(Q.inputs['right']  && this.p.direction == 'left') {
	        this.p.flip = false;                    
	    }
		/*if (Q.inputs['up']) {
		this.p.vy = -200;
		} else if (Q.inputs['down']) {
		this.p.vy = 200;
		} else if (!Q.inputs['down'] && !Q.inputs['up']) {
		this.p.vy = 0;
		}*/
		/*if(Q.inputs['up'])
		{
			this.p.vy=-200;
		}
		else if(Q.inputs['right'])
		{
			this.p.vx=300;
		}*/
	}
	});
});