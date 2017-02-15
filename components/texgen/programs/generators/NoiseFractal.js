import {Program, Type} from '../../core/Program';
import {ColorInterpolator, ColorInterpolatorMethod} from '../../utils/ColorInterpolator';
import {hashRNG} from './noiseBase/hashRNG';

export class NoiseFractal extends Program {
    constructor() {
        super(NoiseFractal);
    }

    seed(value) {
        this._seed = value;
        return this;
    }

    density(value) {
        this._baseFrequency = 1 / value;
        return this;
    }

    amplitude(value) {
        this._amplitude = value;
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

    step(value) {
        this._step = Math.max(1, value);
        return this;
    }

    interpolation(value) {
        this._interpolator = this._interpolator || new ColorInterpolator();
        this._interpolator.setInterpolation(value);
        return this;
    }

    run(color, x, y) {
        let value = 0;
        let amp = this._amplitude;
        let freq = this._baseFrequency;
        let x1, y1, dx, dy;
        let v1, v2, v3, v4;
        let i1, i2;

        for (let j = 1; j <= this._octaves; j++) {
            x1 = Math.floor(x * freq);
            y1 = Math.floor(y * freq);

            if (this._interpolator.interpolation === ColorInterpolatorMethod.STEP) {
                value += hashRNG(this._seed * j, x1, y1) * amp;
            } else {
                dx = ( x * freq ) - x1;
                dy = ( y * freq ) - y1;

                v1 = hashRNG(this._seed * j, x1, y1);
                v2 = hashRNG(this._seed * j, x1 + 1, y1);
                v3 = hashRNG(this._seed * j, x1, y1 + 1);
                v4 = hashRNG(this._seed * j, x1 + 1, y1 + 1);

                this._interpolator.set([
                    {pos: 0, color: [v1]},
                    {pos: 1, color: [v2]}
                ]);

                i1 = this._interpolator.getColorAt(dx);

                this._interpolator.set([
                    {pos: 0, color: [v3]},
                    {pos: 1, color: [v4]}
                ]);

                i2 = this._interpolator.getColorAt(dx);

                this._interpolator.set([
                    {pos: 0, color: [i1[0]]},
                    {pos: 1, color: [i2[0]]}
                ]);

                value += this._interpolator.getColorAt(dy)[0] * amp;
            }

            freq *= this._step;
            amp *= this._persistence;
        }

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
                min: 0
            },
            amplitude: {
                val: 0.5,
                min: 0,
                max: 2
            },
            persistence: {
                val: 0.75,
                min: 0,
                max: 2
            },
            octaves: {
                val: 3,
                min: 1,
                max: 8
            },
            step: {
                min: 1,
                val: 4,
                max: 16
            },
            interpolation: {
                val: 1,
                type: Type.INTERPOLATION
            }
        };
    }

    static get examples() {
        return [
            {
                seed: 1,
                density: 16,
                amplitude: 1,
                persistence: 0,
                octaves: 1,
                step: 4,
                interpolation: 2
            },
            {
                seed: 1,
                density: 8,
                amplitude: 1,
                persistence: 1,
                octaves: 1,
                step: 4,
                interpolation: 1
            },
            {
                seed: 1,
                density: 64,
                amplitude: 1,
                persistence: 1,
                octaves: 1,
                step: 4,
                interpolation: 0
            },
            {
                seed: 1,
                density: 64,
                amplitude: 1,
                persistence: 1,
                octaves: 2,
                step: 2,
                interpolation: 0
            },
            {
                seed: 1,
                density: 64,
                amplitude: 0.25,
                persistence: 0.75,
                octaves: 4,
                step: 2,
                interpolation: 0
            },
            {
                seed: 1,
                density: 16,
                amplitude: 0.25,
                persistence: 0.75,
                octaves: 4,
                step: 2,
                interpolation: 0
            },
            {
                seed: 1,
                density: 32,
                amplitude: 0.5,
                persistence: 0.75,
                octaves: 3,
                step: 4,
                interpolation: 1
            },
            {
                seed: 1,
                density: 32,
                amplitude: 0.5,
                persistence: 0.75,
                octaves: 3,
                step: 4,
                interpolation: 2
            }
        ];
    }
}
