let fontReg;

const pointCount = 10000;

async function setup() {
	fontReg = await loadFont("../assets/RobotoMono-Regular.ttf");

	textFont(fontReg);
	textWrap(WORD);

	noLoop();

	const details = navigator.userAgent;
	const regexp = /android|iphone|kindle|ipad/i;
	isMobileDevice = regexp.test(details);

	console.log(details, regexp, isMobileDevice);

	const canvasSize = Math.min(windowWidth, windowHeight)
	createCanvas(canvasSize, canvasSize);

	Random.seed = Date.now();

	textFont(fontReg);
	textWrap(WORD);
}

function draw() {
	generateClusters();
}

function mouseClicked() {
	generateClusters();
}

function generateClusters() {
	background(28);

	const clusterCount = (Random.randInt() % 9) + 8;
	console.log("Cluster Count", clusterCount);

	let clusterCenters = [];

	for (let i = 0; i < clusterCount; i++) {
		clusterCenters.push(createVector(Random.gaussian.cdf() * width, Random.gaussian.cdf() * height));
	}
	console.log("Cluster centers", clusterCenters);

	stroke(255, 28);
	strokeWeight(10);
	// point(width / 2, height / 2);

	for (let i = 0; i < pointCount; i++) {
		const chosenCenter = Random.randInt() % clusterCenters.length;
		const chosenScalar = 200

		let pos = createVector(-1, -1);

		while (pos.x < 0 || pos.y < 0 || pos.x > width || pos.y > height) {
			pos = createVector((Random.gaussian.normalize() * 2) - 1, (Random.gaussian.normalize() * 2) - 1);
			pos.mult(chosenScalar);
			pos.add(clusterCenters[chosenCenter]);
		}

		point(pos.x, pos.y);
	}

	fill(255);
	strokeWeight(3);
	stroke(0, 0, 0, 128);

	textAlign(LEFT, BOTTOM);
	textSize(16);
	if (isMobileDevice) {
		text("Tap to re-generate", 10, height - 10, width - 20);
	} else {
		text("Click to re-generate", 10, height - 10, width - 20);
	}
}