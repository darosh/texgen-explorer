import {EPSILON, Program, Type} from '../../core/Program';
import FastSimplexNoise from './simplexNoiseBase/FastSimplexNoise';
import {hashRNG} from './noiseBase/hashRNG';

export class SimplexNoise extends Program {
    constructor() {
        super(SimplexNoise);
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

    run(color, x, y) {
        this._base = this._base || new FastSimplexNoise({
                min: 0,
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
        color[0] = value;
        color[1] = value;
        color[2] = value;
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
                val: 16,
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
                max: 8
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
                octaves: 8
            },
            {
                seed: 1,
                density: 128,
                amplitude: 0.5,
                persistence: 0.75,
                octaves: 5
            },
            {
                seed: 1,
                density: 12,
                amplitude: 0.25,
                persistence: 1,
                octaves: 2
            }
        ];
    }
}
