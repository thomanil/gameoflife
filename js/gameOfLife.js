var gameOfLife = (function() { // Module pattern
	
	// Private variables and methods
	

	
	return {
		// Public methods
		
		grid : null,
		ctx : null,

		initState: function(width, height){
			this.grid = new Grid(width, height);
		},
		
		initCanvas: function(width, height){
				var canvas = $("canvas")[0];
				canvas.width = width;
				canvas.height = height;
				this.ctx = $("canvas")[0].getContext('2d');
		},
		
		// A live cell is 1, a dead cell is 0
		updatedCellState: function(grid, x, y){
			return 1;
		},
		
		
		tick: function(grid){
			return grid.map(function(cell, x, y) {
				return gameOfLife.updatedCellState(grid, x ,y)
			});
		},

		// TODO blow up up grid, paint each pixel as big block
		drawCell: function(x, y){		    
			var id = this.ctx.getImageData(0, 0, 1, 1);
			id.data[3] = 255; // set opacity
			var r = Math.floor(Math.random() * 256);
			var g = Math.floor(Math.random() * 256);
			var b = Math.floor(Math.random() * 256);
			id.data[0] = r;
			id.data[1] = g;
			id.data[2] = b;
			
			this.ctx.putImageData(id, x, y);
		},
		
		drawState: function(grid){
			var that = this;
			grid.each(function(cell, x, y) {
				that.drawCell(x, y);
			});
		},
		
		begin: function(){
			this.initState(200, 200);
			this.initCanvas(200, 200);

			// 10 times every second
			this.grid = this.tick(this.grid);
			this.drawState(this.grid);
		},
		
	};
})();






