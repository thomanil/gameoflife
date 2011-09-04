TestCase("FirstTestcase", {
	
    testProjectNamespaceExists:function(){
	   assertTrue(gameOfLife !== undefined);
    },


	
	"test game init": function(){
		gameOfLife.initState(400, 300);
		var grid = gameOfLife.grid;
		assertNotNull(grid);
		assertEquals(400, grid.width());
		assertEquals(300, grid.height());
	},
		
	"test should be able to add up sum of all neighbours of given cell": function(attribute){
		var grid = new Grid([[1,10,100], 
				     [5,50,500],
				     [8,80,800]]);
		var expectedSum = 1504; 
		
		var actualSum = 0;
		gameOfLife.eachNeighbour(grid, 1, 1, function(cell) {
			actualSum += cell;
		});
		
		assertEquals(expectedSum,actualSum);
	},	
	
	"test should be able to add up sum of all neighbours of given cell on edge of grid": function(attribute){
		var grid = new Grid([[1,10,100], 
				     [5,50,500],
				     [8,80,800]]);
		var expectedSum = 754; 
		
		var actualSum = 0;
		gameOfLife.eachNeighbour(grid, 2, 2, function(cell) {
			actualSum += cell;
		});
		
		assertEquals(expectedSum,actualSum);
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
