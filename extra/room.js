let roomCount = 0;
let roomMinSize = 6;
let rooms = [];
class Room {
	constructor() {
		rooms[roomCount] = this;
		roomCount++;
		this.roomNumber = roomCount;
		this.room = [];
		this.tiles = 0;
		this.pro = 0;
	}

	addTile(x, y) {
		this.room[this.tiles] = [x, y];
		this.tiles++;
	}

	updatePercent() {
		this.pro = (this.tiles / (width * height)) * 100;
		if (Math.round(this.pro) < 6) {
			this.delete(calculatedGrid, 0);
			roomCount--;
			drawFrom2dArray(ctx, calculatedGrid);
		}
	}

	drawRoom(ctx, pixelSize, color) {
		for (let tile = 0; tile < this.tiles; tile++) {
			drawCell(ctx, this.room[tile][0], this.room[tile][1], pixelSize, color);
		}
	}

	delete(grid, value = 0) {
		for (let i = 0; i < this.room.length; i++) {
			updatedGrid[this.room[i][0]][this.room[i][1]] = value;
		}
	}
}

function drawAllRooms() {
	for (let i = 0; i < rooms.length; i++) {
		rooms[i].drawRoom(ctx, pixelSize, "#127acf");
	}
}

function findPossibleRoom(calGrid, counter = 0) {
	let y;
	while (y == undefined && counter < calGrid.length) {
		if (calGrid[counter].filter((value) => value == 1).length == 0) {
			counter++;
			continue;
		}
		y = calGrid[counter].findIndex((value) => value == 1);
		// No Counter step after find, so it can be checked again.
	}

	lastRoomCheckPosition = counter;

	if (counter >= calGrid.length) {
		console.log("RoomFinder step has reached saturation!");
		counter = -1;
		y = -1;
	}
	return [counter, y];
}

function findAndFillAllRooms() {
	while (lastRoomCheckPosition < calculatedGrid.length - 1) {
		let test = findPossibleRoom(updatedGrid);

		if (test[0] == -1 && test[1] == -1) {
			break;
		}
		let room1 = new Room();
		floodFill(updatedGrid, room1, test[0], test[1]);
	}
}

function floodFill(grid, room, x, y) {
	if (grid[x][y] != 1) {
		return;
	}
	grid[x][y] = 2;
	room.addTile(x, y);
	freeHandCell(x, y);
	floodFill(grid, room, x, y + 1);
	floodFill(grid, room, x + 1, y);
	floodFill(grid, room, x - 1, y);
	floodFill(grid, room, x, y - 1);
}
