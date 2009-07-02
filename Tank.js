var _global = this;

function rad2deg(radians) {
	return radians * 180 / Math.PI;
}

function deg2rad(degrees) {
	return degrees * Math.PI / 180;
}

(function () {
    
	// PUBLIC
	LEFT = 37;
	RIGHT = 39;
	
	MAX_LEFT = 0;
	MAX_RIGHT = 90;

    function Tank(x, y) {
		this.x = x;
		this.y = y;
		this.size = 15;
		this.setAngle(45);
		this.rotationSpeed = 5;
		this.move = null;
		
		var tank = this;
		
		window.onkeydown = function(event) {
			tank.move = event.keyCode;
		};
		window.onkeyup = function(event) {
			tank.move = null;
		};
		
    };
    
    _global.Tank = Tank;

	Tank.prototype.setAngle = function(degrees) {
		if(degrees > MAX_RIGHT) degrees = MAX_RIGHT;
		if(degrees < MAX_LEFT) degrees = MAX_LEFT;
		this.angle = deg2rad(degrees);
	};
	
	Tank.prototype.getAngle = function() {
		return rad2deg(this.angle);
	};
    
	Tank.prototype.draw = function(ctx) {
    ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, Math.PI, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
		
		ctx.moveTo(this.x, this.y);
		
		if(this.move == RIGHT) this.setAngle(this.getAngle() + 5);
		if(this.move == LEFT) this.setAngle(this.getAngle() - 5);
		
		// opposize side size:
		var opp = Math.sin(this.angle) * (this.size*2);
		
		// Adjacent size:
		var adj = Math.cos(this.angle) * (this.size*2);
		
    ctx.lineTo(this.x + opp, this.y - adj);
    ctx.closePath();
    ctx.stroke();
	};
    

})();
