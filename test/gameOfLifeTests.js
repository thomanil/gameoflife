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
		
	"test any live cell with fewer than two live neighbours dies, as if caused by under-population": function(){
		
	},
	
	"Any live cell with two or three live neighbours lives on to the next generation.": function(){
		
	},
	
	"Any live cell with more than three live neighbours dies, as if by overcrowding.": function(){
		
	},
	
	"Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.": function(){
		
	}
	

});
