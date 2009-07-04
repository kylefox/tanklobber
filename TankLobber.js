/*global Tank, window, Math*/

var TankLobber = {
	Directions: {
		LEFT: 37,
		RIGHT: 39
	},
	Utils: {
		rad2deg: function(radians) { return radians * 180 / Math.PI; },
		deg2rad: function(degrees) { return degrees * Math.PI / 180; },
		interpolate: function(x, pA, pB) {
			return pA.y  + ((x - pA.x) * (pB.y - pA.y)/(pB.x - pA.x));
		}
	}
};

(function () {
    
    function Game(canvas, fps) {
        this.init(canvas, fps);
    }
    
    TankLobber.Game = Game;
    
    Game.prototype.init = function(canvas, fps) {
        this._canvas = canvas;
        this._context = this._canvas.getContext("2d");
        this._width = this._canvas.width;
        this._height = this._canvas.height;
		this._fps = fps;
    };
    
	Game.prototype.start = function() {
		this.setupRound();
		this.mainLoop();
	};

	Game.prototype.stop = function() {
		window.clearInterval(this._interval);
	};

	// Sets up the objects for a new round.
	Game.prototype.setupRound = function() {
		var tankSize = 8;
		this.terrain = new TankLobber.Terrain(this._width, this._height);
		this.tank1 = new TankLobber.Tank(tankSize*2, this._height-tankSize, tankSize, TankLobber.Directions.RIGHT);
		this.tank2 = new TankLobber.Tank(this._width - tankSize*2, this._height-tankSize, tankSize, TankLobber.Directions.LEFT);
		this.terrain.placeTank(this.tank1, 50);
		this.terrain.placeTank(this.tank2, this._width - 50);
	};
	
	// Starts the main drawing cycle.
	Game.prototype.mainLoop = function() {
		var self = this;
		var ticker = function(){ self.tick(); };
		this._interval = window.setInterval(ticker, Math.ceil(1000 / self._fps));
	};

	// Clears the contents of the game.
	Game.prototype.clear = function() {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	};

	Game.prototype.tick = function() {
		this.clear();
		this.tank1.draw(this._context);
		this.tank2.draw(this._context);
		this.terrain.draw(this._context);
		// this.stop();
  	};
    
})();
