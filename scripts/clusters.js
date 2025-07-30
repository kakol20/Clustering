const Clusters = (function () {
	return {
		generateClusters(centers, scalar, count, width, height) {
			let out = [];

			for (let i = 0; i < count; i++) {
				const chosenCenter = Random.randInt() % centers.length;

				out.push(createVector(-1, -1));

				while (out[i].x < 0 || out[i].y < 0 || out.x > width || out.y > height) {
					out[i] = createVector((Random.gaussian.normalize() * 2) - 1, (Random.gaussian.normalize() * 2) - 1);
					out[i].mult(scalar);
					out[i].add(centers[chosenCenter]);
				}
			}

			return out;
		}
	}
})();