import {Program, Type} from '../../core/Program';
import {cellNoiseBase} from './celularNoiseBase/cellNoiseBase';

export class CellularFractal extends Program {
    constructor() {
        super(CellularFractal);
    }

    seed(value) {
        this._seed = value;
        return this;
    }

    density(value) {
        this._density = value;
        return this;
    }

    weight(value) {
        this._weight = Math.max(0, value);
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

    scale(value) {
        this._scale = value;
        return this;
    }

    run(color, x, y) {
        let p;
        let value = 0;
        let amp = this._amplitude;
        let dens = this._density;

        for (let j = 1; j <= this._octaves; j++) {
            p = cellNoiseBase(x * this._scale, y * this._scale, this._seed * j, dens, this._weight);

            p.dist = 1 - ( p.dist / dens );
            if (dens < 0) p.dist -= 1;

            value += p.dist * amp;
            dens /= this._step;
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
                val: 64,
                min: 0
            },
            weight: {
                val: 0,
                min: 0,
                max: 2
            },
            amplitude: {
                val: 0.5,
                min: 0,
                max: 2
            },
            persistence: {
                val: 0.5,
                min: 0,
                max: 2
            },
            octaves: {
                val: 4,
                min: 1,
                max: 8
            },
            step: {
                val: 2,
                min: 1,
                max: 16
            },
            scale: {
                val: 1,
                scale: false
            }
        };
    }

    static get examples() {
        return [
            {
                seed: 1,
                density: 64,
                weight: 2,
                amplitude: 0.5,
                persistence: 0.5,
                octaves: 4,
                step: 2
            }, {
                seed: 1,
                density: 32,
                weight: 2,
                amplitude: 0.5,
                persistence: 0.5,
                octaves: 2,
                step: 2
            }
        ];
    }
}
