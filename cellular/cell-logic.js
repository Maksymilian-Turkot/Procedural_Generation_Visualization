// Arrays used for storing tile data.
let invert = false;
let grid = [];
let calculatedGrid = [];
let updatedGrid;

// Variables
let ctx;
let smoothlevel = 0;
let roomsFilled = 0;
let lastRoomCheckPosition = 0;
let AreaCount;
let pixelSize;
let width;
let height;
let random;
let seed;

// Random Grid generation for Cellular Automata
function randomFillGrid() {
	for (let x = 0; x < width; x++) {
		grid[x] = [];
		calculatedGrid[x] = [];
		for (let y = 0; y < height; y++) {
			grid[x][y] = Math.floor(random.quick() * 101 - 1) < fillChance_Element.value ? 1 : 0;
		}
	}
}

// Cellular Automata Rule set
function smooth(localGrid, savedToGrid) {
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			savedToGrid[x][y] = getSurroundingTiles(localGrid, x, y) <= 4 ? 1 : 0;
		}
	}
}

// get Walls surrounding current tile for Rule se
function getSurroundingTiles(localGrid, gridX, gridY) {
	let wallCount = 0;
	for (let gridRow = gridX - 1; gridRow <= gridX + 1; gridRow++) {
		for (let gridColumn = gridY - 1; gridColumn <= gridY + 1; gridColumn++) {
			if (gridRow < 0 || gridRow > width - 1 || gridColumn < 0 || gridColumn > height - 1) {
				wallCount += 2;
			} else {
				if (localGrid[gridRow][gridColumn] == 0) {
					wallCount++;
				}
			}
		}
	}
	return wallCount;
}
