// HTML Elements
let Canvas_Element;
let pixelSize_Element;
let fillChance_Element;
let seed_Element;
let randomSeed_Element;
let fillValue_Element;

addEventListener("load", () => {
	console.log("Ran!");
	Canvas_Element = document.getElementById("preview");
	pixelSize_Element = document.getElementById("pixelSize");
	fillChance_Element = document.getElementById("fillSize");
	seed_Element = document.getElementById("seed");
	randomSeed_Element = document.getElementById("randomSeed");
	fillValue_Element = document.getElementById("fillValue");
	displayFillValue();
});

function Generate() {
	reset();
	pixelSize = parseInt(pixelSize_Element.value);
	width = Math.floor(Canvas_Element.width / pixelSize);
	height = Math.floor(Canvas_Element.height / pixelSize);
	seed = seed_Element.value;

	if (randomSeed_Element.checked == false) {
		random = new Math.seedrandom(seed);
	} else {
		random = new Math.seedrandom();
	}

	randomFillGrid();

	ctx = Canvas_Element.getContext("2d");
	drawFrom2dArray(ctx, grid);
	document.getElementById("smoothGroup").classList.remove("hidden");
}

function displayFillValue() {
	fillValue_Element.textContent = fillChance_Element.value;
}

function SmoothButton() {
	if (invert) {
		smooth(calculatedGrid, grid);
		drawFrom2dArray(ctx, grid);
		updatedGrid = grid;
	} else {
		smooth(grid, calculatedGrid);
		drawFrom2dArray(ctx, calculatedGrid);
		updatedGrid = calculatedGrid;
	}
	invert = !invert;
	smoothlevel++;
	document.getElementById("smoothLevel").textContent = smoothlevel;
}

function findRooms() {
    document.getElementById("smoothButton").classList.add("hidden");
    findAndFillAllRooms()
}

function reset() {
	smoothlevel = 0;
	lastRoomCheckPosition = 0;
	roomsFilled = 0;
	roomCount = 0;
	roomMinSize = 6;
	rooms = [];
	grid = [];
	calculatedGrid = [];
	invert = false;
    document.getElementById("smoothButton").classList.remove("hidden");
    document.getElementById("findRoomButton").classList.remove("hidden");
	document.getElementById("smoothLevel").textContent = smoothlevel;
}
