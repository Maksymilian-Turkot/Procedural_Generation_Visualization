// HTML Elements
let Canvas_Element;
let pixelSize_Element;
let fillChance_Element;
let seed_Element;
let randomSeed_Element;
let fillValue_Element;

// Arrays used for Canvas
let invert = false;
let grid = [];
let calculatedGrid = [];

// Variables
let pixelSize;
let width
let height
let random
let seed
let ctx
let smoothlevel = 0;

addEventListener("load", () => {
    console.log("Ran!")
    Canvas_Element = document.getElementById("preview");
    pixelSize_Element = document.getElementById("pixelSize");
    fillChance_Element = document.getElementById("fillSize");
    seed_Element = document.getElementById("seed")
    randomSeed_Element = document.getElementById("randomSeed");
    fillValue_Element = document.getElementById("fillValue");
    displayFillValue();
})


function displayFillValue() {
    fillValue_Element.textContent = fillChance_Element.value;
}

function Generate() {
    reset()
    pixelSize = parseInt(pixelSize_Element.value)
    width = Math.floor(Canvas_Element.width / pixelSize);
    height = Math.floor(Canvas_Element.height / pixelSize);
    seed = seed_Element.value;

    if (randomSeed_Element.checked == false) {
        random = new Math.seedrandom(seed);
    } else {
        random = new Math.seedrandom();
    }

    randomFillGrid()

    ctx = Canvas_Element.getContext("2d")
    draw(grid)
    document.getElementById("smoothGroup").attributes.removeNamedItem("class")
}

function randomFillGrid() {
    for(let x = 0; x < width; x++) {
        grid[x] = [];
        calculatedGrid[x] = [];
        for(let y = 0; y < height; y++) {
            grid[x][y] = (Math.floor(random.quick()* 102 - 1) < fillChance_Element.value ? 1 : 0);
        }
    }
}

function draw(localGrid) {
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
                ctx.fillStyle = localGrid[x][y] == 0 ? "#000000" : "#EEEEEE"
                ctx.fillRect(x*pixelSize,y*pixelSize,pixelSize,pixelSize)
        }
    }
}

function SmoothButton() {
    if (invert) {
        smooth(calculatedGrid, grid)
        draw(grid)
    } else {
        smooth(grid, calculatedGrid)
        draw(calculatedGrid)
    }
    invert = !invert;
    smoothlevel++;
    document.getElementById("smoothLevel").textContent = smoothlevel;
}

function smooth(localGrid, savedToGrid) {
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
                savedToGrid[x][y] = getSurroundingTiles(localGrid, x , y) <= 4 ? 1 : 0
        }
    }
}

function getSurroundingTiles(localGrid, gridX, gridY) {
    let wallCount = 0;
    for (let gridRow = gridX-1; gridRow <= gridX+1; gridRow++) {
        for (let gridColumn = gridY-1; gridColumn <= gridY +1; gridColumn++) {
            if (gridRow < 0 || gridRow > width-1 || gridColumn < 0 || gridColumn > height-1) {
                wallCount++;
            } else {
                if (localGrid[gridRow][gridColumn] == 0) {
                    wallCount++
                }
            }
        }
    }
    return wallCount
}

function reset() {
    smoothlevel = 0;
    grid = []
    calculatedGrid = []
    invert = false;
    document.getElementById("smoothLevel").textContent = smoothlevel;
}