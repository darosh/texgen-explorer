/*
 * A speed-improved simplex noise algorithm for 2D, 3D and 4D in JavaScript.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 */
export default class FastSimplexNoise {
    constructor(options = {}) {
        if (options.hasOwnProperty('amplitude')) {
            this.amplitude = options.amplitude;
        }
        else
            this.amplitude = 1.0;
        if (options.hasOwnProperty('frequency')) {
            this.frequency = options.frequency;
        }
        else
            this.frequency = 1.0;
        if (options.hasOwnProperty('octaves')) {
            this.octaves = options.octaves;
        }
        else
            this.octaves = 1;
        if (options.hasOwnProperty('persistence')) {
            this.persistence = options.persistence;
        }
        else
            this.persistence = 0.5;
        if (options.hasOwnProperty('random')) {
            this.random = options.random;
        }
        else
            this.random = Math.random;
        let min;
        if (options.hasOwnProperty('min')) {
            min = options.min;
        }
        else
            min = -1;
        let max;
        if (options.hasOwnProperty('max')) {
            max = options.max;
        }
        else
            max = 1;
        this.scale = min === -1 && max === 1
            ? value => value
            : value => min + ((value + 1) / 2) * (max - min);
        const p = new Uint8Array(256);
        for (let i = 0; i < 256; i++)
            p[i] = i;
        let n;
        let q;
        for (let i = 255; i > 0; i--) {
            n = Math.floor((i + 1) * this.random());
            q = p[i];
            p[i] = p[n];
            p[n] = q;
        }
        this.perm = new Uint8Array(512);
        this.permMod12 = new Uint8Array(512);
        for (let i = 0; i < 512; i++) {
            this.perm[i] = p[i & 255];
            this.permMod12[i] = this.perm[i] % 12;
        }
    }

    dot(gs, coords) {
        return gs
            .slice(0, Math.min(gs.length, coords.length))
            .reduce((total, g, i) => total + (g * coords[i]), 0);
    }

    raw2D(x, y) {
        // Skew the input space to determine which simplex cell we're in
        const s = (x + y) * 0.5 * (Math.sqrt(3.0) - 1.0); // Hairy factor for 2D
        const i = Math.floor(x + s);
        const j = Math.floor(y + s);
        const t = (i + j) * FastSimplexNoise.G2;
        const X0 = i - t; // Unskew the cell origin back to (x,y) space
        const Y0 = j - t;
        const x0 = x - X0; // The x,y distances from the cell origin
        const y0 = y - Y0;
        // Determine which simplex we are in.
        const i1 = x0 > y0 ? 1 : 0;
        const j1 = x0 > y0 ? 0 : 1;
        // Offsets for corners
        const x1 = x0 - i1 + FastSimplexNoise.G2;
        const y1 = y0 - j1 + FastSimplexNoise.G2;
        const x2 = x0 - 1.0 + 2.0 * FastSimplexNoise.G2;
        const y2 = y0 - 1.0 + 2.0 * FastSimplexNoise.G2;
        // Work out the hashed gradient indices of the three simplex corners
        const ii = i & 255;
        const jj = j & 255;
        const gi0 = this.permMod12[ii + this.perm[jj]];
        const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]];
        const gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]];
        // Calculate the contribution from the three corners
        const t0 = 0.5 - x0 * x0 - y0 * y0;
        const n0 = t0 < 0 ? 0.0 : Math.pow(t0, 4) * this.dot(FastSimplexNoise.GRAD3D[gi0], [x0, y0]);
        const t1 = 0.5 - x1 * x1 - y1 * y1;
        const n1 = t1 < 0 ? 0.0 : Math.pow(t1, 4) * this.dot(FastSimplexNoise.GRAD3D[gi1], [x1, y1]);
        const t2 = 0.5 - x2 * x2 - y2 * y2;
        const n2 = t2 < 0 ? 0.0 : Math.pow(t2, 4) * this.dot(FastSimplexNoise.GRAD3D[gi2], [x2, y2]);
        // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1, 1]
        return 70.14805770653952 * (n0 + n1 + n2);
    }

    scaled2D(x, y) {
        let amplitude = this.amplitude;
        let frequency = this.frequency;
        let maxAmplitude = 0;
        let noise = 0;
        for (let i = 0; i < this.octaves; i++) {
            noise += this.raw2D(x * frequency, y * frequency) * amplitude;
            maxAmplitude += amplitude;
            amplitude *= this.persistence;
            frequency *= 2;
        }
        return this.scale(noise / maxAmplitude);
    }
}
FastSimplexNoise.G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
FastSimplexNoise.GRAD3D = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, -1], [0, 1, -1], [0, -1, -1]
];
