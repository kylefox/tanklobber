/*global TankLobber */
if(TankLobber === undefined) { throw("TankLobber is not loaded."); }

(function() {
	
	function Terrain(width, height) {
		this.maxWidth = width;
		this.maxHeight = height;
		this.initPeaks(10, 250);
	}
	TankLobber.Terrain = Terrain;
	
	Terrain.prototype.initPeaks = function(numPeaks, peakHeight) {
		this.peaks = [];
		var peakDistance = this.maxWidth / numPeaks; // How far apart should the peaks be.
		for(var i=0; i<numPeaks+1; i++) {
			var peak = {x: i*peakDistance, y:this.maxHeight - Math.random()*peakHeight - 100};
			this.peaks.push(peak);
		};
	};
	
	Terrain.prototype.placeTank = function(tank, x) {
		var adj = this.getAdjacentPeaks(x);
		var leftPeak = this.peaks[adj[0]];
		var rightPeak = this.peaks[adj[1]];
		var y = TankLobber.Utils.interpolate(x, leftPeak, rightPeak);
		tank.x = x;
		tank.y = y;
		// Add two new peaks on either side of the tank so it's sitting flat.
		var p1 = {x: tank.x - tank.size*2.5, y: tank.y};
		var p2 = {x: tank.x + tank.size*2.5, y: tank.y};
		this.peaks.splice(adj[0], 0, p1, p2);
	};
	
	Terrain.prototype.getAdjacentPeaks = function(x) {
		for(i in this.peaks) {
			if(this.peaks[i].x >= x) {
				return [i, i-1];
			}
		};
		return [null, null];
	};
	
	Terrain.prototype.draw = function(ctx) {
		ctx.beginPath();
		for(i in this.peaks) {
			ctx.lineTo(this.peaks[i].x, this.peaks[i].y);
			ctx.moveTo(this.peaks[i].x, this.peaks[i].y);
			ctx.stroke();
		};
		ctx.closePath();
	};
	
})();