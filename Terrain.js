/*global TankLobber */
if(TankLobber === undefined) { throw("TankLobber is not loaded."); }

(function() {
	
	function Terrain(width, height) {
		this.maxWidth = width;
		this.maxHeight = height;
		this.initPeaks(10, 150);
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
		var y =TankLobber.Utils.interpolate(x, adj[0], adj[1]);
		tank.x = x;
		tank.y = y;
	};
	
	Terrain.prototype.getAdjacentPeaks = function(x) {
		for(i in this.peaks) {
			if(this.peaks[i].x >= x) {
				return [this.peaks[i-1], this.peaks[i]];
			}
		};
		return [null, null];
	};
	
	Terrain.prototype.draw = function(ctx) {
		ctx.beginPath();  // Need this?
		for(i in this.peaks) {
			ctx.lineTo(this.peaks[i].x, this.peaks[i].y);
			ctx.moveTo(this.peaks[i].x, this.peaks[i].y);
			ctx.stroke();
		};
		ctx.closePath();
	};
	
})();