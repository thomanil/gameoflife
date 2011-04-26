TestCase("FirstTestcase", {
	
	"test game init": function(){
		gameOfLife.initState(400, 300);
		var grid = gameOfLife.grid;
		assertNotNull(grid);
		assertEquals(400, grid.width());
		assertEquals(300, grid.height());
	},
			
	// Any live cell with fewer than two live neighbours dies, as if caused by under-population
	"test live cell with no neighbours dies": function(){
		var grid = new Grid([[0,0,0], 
					        [0,1,0],
					 		[0,0,0]]);
		assertFalse(gameOfLife.willLive(grid, 1, 1));						
	},
	
	"test live cell with one neighbour dies": function(){
		var grid = new Grid([[1,0,0], 
					        [0,1,0],
					 		[0,0,0]]);
		assertFalse(gameOfLife.willLive(grid, 1, 1));			
	},
	
	
	// Any live cell with two or three live neighbours lives on to the next generation.
	"test live cell with two live neighbours lives on": function(){
		var grid = new Grid([[1,1,0], 
				        	[0,1,0],
						 	[0,0,0]]);
		assertTrue(gameOfLife.willLive(grid, 1, 1));		
	},
	
	"test live cell with three live neighbours lives on": function(){
		var grid = new Grid([[1,1,1], 
				        	[0,1,0],
						 	[0,0,0]]);
		assertTrue(gameOfLife.willLive(grid, 1, 1));					
	},
	
	// Any live cell with more than three live neighbours dies, as if by overcrowding.
	"test live cell with more than three live neighbours dies": function(){
		var grid = new Grid([[1,1,1], 
				        	[0,1,1],
						 	[0,0,0]]);
		assertFalse(gameOfLife.willLive(grid, 1, 1));
	},
	
	// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	"test dead cell with three live neighbours becomes a live cell": function(){
		var grid = new Grid([[1,1,1], 
				        	[0,0,0],
						 	[0,0,0]]);
		assertTrue(gameOfLife.willLive(grid, 1, 1));
	}
	

});
