let fontReg;

const pointsAmount = 1000;

let isMobileDevice = false;

let method = 0;

async function setup() {
	fontReg = await loadFont("../assets/RobotoMono-Regular.ttf");

	const details = navigator.userAgent;
	const regexp = /android|iphone|kindle|ipad/i;
	isMobileDevice = regexp.test(details);

	console.log(details, regexp, isMobileDevice);

	const canvasSize = Math.min(windowWidth, windowHeight)
	createCanvas(canvasSize, canvasSize);

	noLoop();

	textFont(fontReg);
	textWrap(WORD);
}

function draw() {
	method = 0;
	generatePoints();
}

function keyPressed() {
	// console.log(key);
	switch (key) {
		case "1":
			method = 0;
			generatePoints();
			break;
		case "2":
			method = 1;
			generatePoints();
			break;
		case "3":
			method = 2;
			generatePoints();
			break;
		case "4":
			method = 3;
			generatePoints();
			break;
		default:
		// do nothing
	}
}

function mouseClicked() {
	if (isMobileDevice) {
		method++;
		method = method % 4;

		generatePoints();
	}
}

function generatePoints() {
	background(28);
	Random.seed = 0;

	// ----- DRAW POINTS -----

	strokeWeight(10);
	stroke(255, 255, 255, 128);

	for (let i = 0; i < pointsAmount; i++) {
		// const x = (Random.gaussian.default() / 3) * (width / 2);
		// const y = (Random.gaussian.default() / 3) * (height / 2);

		let x = 0;
		let y = 0;

		switch (method) {
			case 0:
				x = Random.gaussian.normalize() * width;
				y = Random.gaussian.normalize() * height;
				break;
			case 1:
				x = Random.gaussian.normalizedClamped() * width;
				y = Random.gaussian.normalizedClamped() * height;
				break;
			case 2:
				x = Random.gaussian.rejection() * width;
				y = Random.gaussian.rejection() * height;
				break;
			case 3:
				x = Random.gaussian.cdf() * width;
				y = Random.gaussian.cdf() * height;
				break;
			default:
				x = ((Random.gaussian.default() / 6) + 0.5) * width;
				y = ((Random.gaussian.default() / 6) + 0.5) * height;
		}
		point(x, y);
	}

	// ----- DRAW TEXT ON TOP -----

	fill(255);
	strokeWeight(3);
	stroke(0, 0, 0, 128);

	textAlign(LEFT, TOP);
	textSize(20);

	switch (method) {
		case 0:
			text("Divide by Six", 10, 10, width - 20);
			break;
		case 1:
			text("Normalize & Clamp", 10, 10, width - 20);
			break;
		case 2:
			text("Rejection Sampling", 10, 10, width - 20);
			break;
		case 3:
			text("Cumulative Distribution Function", 10, 10, width - 20);
			break;
		default:
			text("Divide by Six", 10, 10, width - 20);
			break;
	}

	textAlign(LEFT, BOTTOM);
	textSize(16);
	if (isMobileDevice) {
		text("Tap to change method", 10, height - 10, width - 20);
	} else {
		text("Press 1, 2, 3 or 4", 10, height - 10, width - 20);
	}
}