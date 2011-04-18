var gameOfLife = (function() { // Module pattern	
	var zoom = 5;
	var ctx = null;
	
	return {	
		
		// Game state 
		grid : null,

		// Game logic
		initState: function(width, height){
			this.grid = new Grid(width, height);
		},
				
		randomSeededState : function(width, height) {
			var seed = new Grid(width, height);
			return seed.map(function(cell, x, y) {
				var percentLikelyAlive = 10;
				var deadOrAlive = Math.floor(Math.random() * 100);
				if(deadOrAlive <= percentLikelyAlive){
					return 1;
				} else {
					return 0;
				}
			});
		},
		
		deadOrAlive: function(grid, x, y){
			return 1; // A live cell is 1, a dead cell is 0
		},
				
		tick: function(grid){
			return grid.map(function(cell, x, y) {
				return gameOfLife.deadOrAlive(grid, x ,y)
			});
		},
		
		// Canvas drawing
		initCanvas: function(width, height){
				var canvas = $("canvas")[0];
				canvas.width = width;
				canvas.height = height;
				ctx = $("canvas")[0].getContext('2d');
		},

		randomRgbStyle: function(){
			var r = 0;
			var g = Math.floor(Math.random() * 256);
			var b = 0;
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
		
		begin: function(){
			var width = 150;
			var height = 80;
			var z = zoom;
			this.initState(width, height);
			this.grid = this.randomSeededState(width, height);
			this.initCanvas(width*z, height*z);

			var that = this;

			//var fps = 5;
			window.setInterval(function() {
				that.grid = that.tick(that.grid);
				that.clearCanvas(width*z, height*z);
				that.drawState(that.grid);
			}, 300);
			
		},
		
	};
})();






