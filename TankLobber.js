var _global = this;

(function () {
    
	// PUBLIC

    function TankLobber(canvas, fps) {
        this.init(canvas, fps);
    }
    
    _global.TankLobber = TankLobber;
    
    TankLobber.prototype.init = function(canvas, fps) {
        this._canvas = canvas;
        this._context = this._canvas.getContext("2d");
        this._width = this._canvas.width;
        this._height = this._canvas.height;
		this._fps = fps;
    };
    
	TankLobber.prototype.start = function() {
		this.setupRound();
		this.mainLoop();
	};

	TankLobber.prototype.stop = function() {
		_global.window.clearInterval(this._interval);
	}

	// Sets up the objects for a new round.
	TankLobber.prototype.setupRound = function() {
		var tankSize = 8;
		this.tank1 = new Tank(tankSize*2, this._canvas.height-tankSize, tankSize, "east");
		this.tank2 = new Tank(this._canvas.width - tankSize*2, this._canvas.height-tankSize, tankSize, "west");
	};
	
	// Starts the main drawing cycle.
	TankLobber.prototype.mainLoop = function() {
		var self = this;
		closure = function(){ self.tick(); };
		this._interval = _global.window.setInterval(closure, Math.ceil(1000 / self._fps));
	};

	// Clears the contents of the game.
	TankLobber.prototype.clear = function() {
		this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
	};

  
	TankLobber.prototype.tick = function() {
		this.clear();
		this.tank1.draw(this._context);
		this.tank2.draw(this._context);
		// this.stop();
  };
    
})();
