/*global TankLobber, window*/
if(TankLobber === undefined) { throw("TankLobber is not loaded."); }

(function () {
    
    function Tank(x, y, size, direction) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.direction = direction;
		if(this.direction == TankLobber.Directions.RIGHT) {
			this.maxLeft = 0;
			this.maxRight = 90;
			this.setAngle(15);
		} else {
			this.maxLeft = 270;
			this.maxRight = 360;
			this.setAngle(360 - 15);
		}
		this.rotationSpeed = 5;
		this.move = null;
		
		var tank = this;
		
		window.onkeydown = function(event) {
			tank.move = event.keyCode;
		};
		window.onkeyup = function(event) {
			tank.move = null;
		};
		
    }
    
    TankLobber.Tank = Tank;

	Tank.prototype.setAngle = function(degrees) {
		if(degrees > this.maxRight) { degrees = this.maxRight; }
		if(degrees < this.maxLeft) { degrees = this.maxLeft; }
		this.angle = TankLobber.Utils.deg2rad(degrees);
	};
	
	Tank.prototype.getAngle = function() {
		return TankLobber.Utils.rad2deg(this.angle);
	};
    
	Tank.prototype.draw = function(ctx) {
		// Draw body
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, Math.PI, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
		// Draw gun
		if(this.move == TankLobber.Directions.RIGHT) { this.setAngle(this.getAngle() + 5); }
		if(this.move == TankLobber.Directions.LEFT) { this.setAngle(this.getAngle() - 5); }
		var opp = Math.sin(this.angle) * (this.size*2);
		var adj = Math.cos(this.angle) * (this.size*2);
		ctx.beginPath();  // Need this?
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + opp, this.y - adj);
		ctx.closePath();
		ctx.stroke();
	};

})();
