const Random = (function () {
	function UnsignedMod(numer, denom) {
		return ((numer % denom) + denom) % denom;
	}

	const max = (~0) >>> 0;

	return {
		seed: 256 >>> 0,

		randInt() {
			let state = Math.imul(this.seed, 747796405) >>> 0;
			state = (state + 2891336453) >>> 0;

			let word = ((state >>> 28) + 4) >>> 0;
			word = state >>> word;
			word = (word ^ state) >>> 0;
			word = Math.imul(word, 27780373) >> 0;

			this.seed = ((word >>> 22) ^ word) >>> 0;

			return this.seed;
		},

		randFloat() {
			return this.randInt() / max;
		},

		// gaussianRandom() {
		// 	let u = 0, v = 0;

		// 	while (u === 0) u = this.randFloat();
		// 	while (v === 0) v = this.randFloat();

		// 	return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
		// },

		gaussian: (function () {
			return {
				default() {
					let u = 0, v = 0;

					while (u === 0) u = Random.randFloat();
					while (v === 0) v = Random.randFloat();

					return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
				},

				normalized() {
					const value = this.default();
					const maxSigma = 3;

					const clamped = Math.max(-maxSigma, Math.min(maxSigma, value));
					return (clamped + maxSigma) / (2 * maxSigma);
				},

				cdf() {
					function erf(x) {
						const sign = Math.sign(x);
						x = Math.abs(x);

						const a1 = 0.254829592, a2 = -0.284496736,
							a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
						const p = 0.3275911;

						const t = 1 / (1 + p * x);
						const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-x * x);

						return sign * y;
					}

					let value = this.default();
					return 0.5 * (1 + erf(value / Math.SQRT2));
				}
			}
		})(),
	}
})();