function drawFrom2dArray(ctx, localGrid) {
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			ctx.fillStyle = localGrid[x][y] == 0 ? "#000000" : "#EEEEEE";
			ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
		}
	}
}

function drawCell(ctx, x, y, pixelSize, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function freeHandCell(x, y) {
	drawCell(ctx, x, y, pixelSize, "#f11d1d");
}

function clear() {
	ctx.clear();
}
