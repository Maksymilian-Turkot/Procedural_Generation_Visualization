let exportedGrid = []

function FindRoomCorners(room) {
    let TileX = 0;
    let TileY = 1;
let topLeft = [99999,99999]
let bottomRight = [0,0]

for (let i = 0; i < room.room.length; i++) {
    let x = room.room[i][TileX]
    let y = room.room[i][TileY]

    if (x <= topLeft[0]) {
        topLeft[0] = x -1
    }

    if (y <= topLeft[1]) {
        topLeft[1] = y -1
    }

    if (bottomRight[0] <= x ) {
        bottomRight[0] = x + 1
    }

    if (bottomRight[1] <= y) {
        bottomRight[1] = y + 1
    }
}
console.log("TopLeft = " + topLeft)
console.log("BottomRight = " + bottomRight)
TranslateRoomToNewGrid(room, topLeft, bottomRight)
}

function TranslateRoomToNewGrid(room, topL, bottomR) {
let xLength = bottomR[0] - topL[0]
let yLength = bottomR[1] - topL[1]

for (let i = 0; i <= xLength; i++) {
    exportedGrid[i] = []
    for (let j = 0; j <= yLength; j++) {
        exportedGrid[i][j] = 0;
    }
}

for (let i = 0; i < room.room.length; i++) {
    exportedGrid[room.room[i][0] - topL[0]][room.room[i][1] - topL[1]] = 1;
}
}

let gridLine = "";
function printGrid(grid) {
    console.log("Your Grid!");
    for (let x = 0; x < grid.length; x++) {

        if (x == grid.length -1) {
            gridLine += "[" + grid[x].toString() + "] \n";
        }

        gridLine += "[" + grid[x].toString() + "], \n";

    }
    console.log(`${gridLine}`)
}
