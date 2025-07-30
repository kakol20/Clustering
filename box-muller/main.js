let canvasSize = 0;

let fontReg;

const pointsAmount = 1000;

async function setup() {
	fontReg = await loadFont("/../assets/RobotoMono-Regular.ttf");

	canvasSize = Math.min(windowWidth, windowHeight)
	createCanvas(canvasSize, canvasSize);

	noLoop();

	textFont(fontReg);
	textWrap(WORD);
}

function draw() {
	background(28);

	// ----- DRAW POINTS -----

	strokeWeight(10);
	stroke(255, 255, 255, 128);

	for (let i = 0; i < pointsAmount; i++) {
		const x = Random.gaussian.default() * (canvasSize / 2);
		const y = Random.gaussian.default() * (canvasSize / 2);

		point(x + (canvasSize / 2), y + (canvasSize / 2));
	}

	// ----- DRAW TEXT ON TOP -----

	fill(255);
	strokeWeight(3);
	stroke(0, 0, 0, 128);

	textAlign(LEFT, TOP);
	textSize(20);
	text("Un-normalized Method", 10, 10, width - 20);

	textAlign(LEFT, BOTTOM);
	textSize(16);
	text("Press 1, 2, 3 or 4", 10, height - 10, width - 20);
}

function keyPressed() {
	if (key == "1" || key == "2" || key == "3") {
		background(28);
	}

	// console.log(key);
	if (key == "1") {
		// ----- DRAW POINTS -----

		strokeWeight(10);
		stroke(255, 255, 255, 128);

		for (let i = 0; i < pointsAmount; i++) {
			const x = Random.gaussian.default() * (canvasSize / 2);
			const y = Random.gaussian.default() * (canvasSize / 2);

			point(x + (canvasSize / 2), y + (canvasSize / 2));
		}

		// ----- DRAW TEXT ON TOP -----

		fill(255);
		strokeWeight(3);
		stroke(0, 0, 0, 128);

		textAlign(LEFT, TOP);
		textSize(20);
		text("Un-normalized Method", 10, 10, width - 20);
	}
	else if (key === "2") {
		// ----- DRAW POINTS -----

		strokeWeight(10);
		stroke(255, 255, 255, 128);

		for (let i = 0; i < pointsAmount; i++) {
			const x = Random.gaussian.normalized() * canvasSize;
			const y = Random.gaussian.normalized() * canvasSize;

			point(x, y);
		}

		// ----- DRAW TEXT ON TOP -----

		fill(255);
		strokeWeight(3);
		stroke(0, 0, 0, 128);

		textAlign(LEFT, TOP);
		textSize(20);
		text("Normalize Method", 10, 10, width - 20);
	} else if (key === "3") {
		// ----- DRAW POINTS -----

		strokeWeight(10);
		stroke(255, 255, 255, 128);

		for (let i = 0; i < pointsAmount; i++) {
			const x = Random.gaussian.cdf() * canvasSize;
			const y = Random.gaussian.cdf() * canvasSize;

			point(x, y);
		}

		// ----- DRAW TEXT ON TOP -----

		fill(255);
		strokeWeight(3);
		stroke(0, 0, 0, 128);

		textAlign(LEFT, TOP);
		textSize(20);
		text("Cumulative Distribution Function", 10, 10, width - 20);
	}

	if (key == "1" || key == "2" || key == "3") {
		textAlign(LEFT, BOTTOM);
		textSize(16);
		text("Press 1, 2, or 3", 10, height - 10, width - 20);
	}
}