import {EPSILON, Program, Type} from '../../core/Program';
import FastSimplexNoise from "../generators/simplexNoiseBase/FastSimplexNoise";
import {hashRNG} from "../generators/noiseBase/hashRNG";

export class Distort extends Program {
    constructor() {
        super(Distort);
        this._count = 0;
    }

    seed(value) {
        this._seed = value;
        return this;
    }

    density(value) {
        this._density = value;
        return this;
    }

    persistence(value) {
        this._persistence = value;
        return this;
    }

    octaves(value) {
        this._octaves = Math.max(1, value);
        return this;
    }

    amplitude(value) {
        this._amplitude = value;
        return this;
    }

    weight(value) {
        this._weight = value;
        return this;
    }

    run(color, x, y, src) {
        this._base = this._base || new FastSimplexNoise({
                min: -1,
                max: 1,
                frequency: 1 / this._density,
                octaves: this._octaves,
                amplitude: this._amplitude,
                persistence: this._persistence,
                random: function () {
                    return hashRNG(this._seed, this._count++, 0);
                }
            });

        const value = this._base.scaled2D(x, y);
        const s = x + this._weight * value;
        const t = y + this._weight * value;
        color.set(src.getPixelBilinear(s, t));
    }

    static get params() {
        return {
            seed: {
                val: 1,
                type: Type.INT,
                min: 1,
                max: 65535
            },
            density: {
                val: 32,
                min: EPSILON
            },
            amplitude: {
                val: 1,
                min: EPSILON,
                max: 2
            },
            persistence: {
                val: 0.5,
                min: Number.EPSILON,
                max: 2
            },
            octaves: {
                val: 1,
                min: 1,
                type: Type.INT,
                max: 8
            },
            weight: {
                val: 4,
                min: Number.EPSILON
            }
        };
    }

    static get examples() {
        return [
            {
                seed: 1,
                density: 32,
                amplitude: 0.5,
                persistence: 0.75,
                octaves: 4
            },
            {
                seed: 1,
                density: 128,
                amplitude: 0.5,
                persistence: 0.75,
                octaves: 1,
                weight: 32
            },
            {
                seed: 1,
                density: 32,
                amplitude: 0.5,
                persistence: 0.75,
                octaves: 1,
                weight: 32
            }
        ];
    }
}
