let fontReg;

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
	console.clear();
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

	let points = Clusters.generateClusters(clusterCenters, 200, 10000, width, height);
	console.log("Points", points);

	for (let i = 0; i < points.length; i++) {
		point(points[i].x, points[i].y);
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