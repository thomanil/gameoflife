var gameOfLife = (function() { // Module pattern	
	var zoom = 3;
	var ctx = null;
	var width = 200;
	var height = 100;
	var populationDensityPercent = 40;
	
	return {	
		
		// Game state 
		
		grid : null,

		// Game logic
		
		initState: function(width, height){
			this.grid = new Grid(width, height);
		},
				
		countLiveNeighbours: function(grid, x, y) {
			var count = 0;
			grid.eachNeighbour(x,y,function(cell) {
				count += cell;
			});
			return count;
		},
				
		willLive: function(grid, x, y){						
			var liveNeighbours = this.countLiveNeighbours(grid, x, y);
			var cell = grid.get(x, y);

			if (cell === 1) { // alive
				if (liveNeighbours <= 1) {
					return false;
				} else if (liveNeighbours > 3)  {
					return false;
				} else {
					return true;
				}
			} else {
				if (liveNeighbours === 3) {
					return true;
				} else{
					return false;
				}
			}		
		},
		
		tick: function(grid){
			return grid.map(function(cell, x, y) {
				if(gameOfLife.willLive(grid, x ,y)){
					return 1;
				} else {
					return 0;
				}
			});
		},		
				
		randomSeededState : function(width, height) {			
			return new Grid(width, height).map(function(cell, x, y) {
				var deadOrAlive = Math.floor(Math.random() * 100);
				if(deadOrAlive <= populationDensityPercent){
					return 1;
				} else {
					return 0;
				}
			});
		},
		
		
		// Canvas drawing logic
		
		initCanvas: function(width, height){
				var canvas = document.getElementById("viewport");
				canvas.width = width;
				canvas.height = height;
				ctx = canvas.getContext('2d');
		},

		randomRgbStyle: function(){
			var r = 0;
			var g = 0;
			var b = 50 + Math.floor(Math.random() * 206);
			return "rgb("+r+","+g+","+b+")";
		},

		drawCell: function(x, y){
			var z = zoom;
			ctx.fillStyle = this.randomRgbStyle();
			ctx.fillRect (x*z, y*z, z, z);
		},
		
		drawState: function(grid){
			var that = this;
			grid.each(function(cell, x, y) {
				if (cell !== 0) {
					that.drawCell(x, y);	
				}
			});
		},
		
		clearCanvas: function(width, height){
			ctx.clearRect(0, 0, width, height);
		},
		
		
		// Game launch logic
		
		startGameLoop: function(){
			var that = this;
			window.setInterval(function() {
				that.clearCanvas(width*zoom, height*zoom);
				that.grid = that.tick(that.grid);
				that.drawState(that.grid);
			}, 100);
		},
		
		begin: function(){
			this.initState(width, height);
			this.grid = this.randomSeededState(width, height);
			this.initCanvas(width*zoom, height*zoom);
			this.startGameLoop();
		}
		
	};
})();






