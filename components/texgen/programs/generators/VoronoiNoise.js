import {EPSILON, Program, Type} from '../../core/Program';
import {cellNoiseBase} from './celularNoiseBase/cellNoiseBase';

export class VoronoiNoise extends Program {
    constructor() {
        super(VoronoiNoise);
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

    run(color, x, y) {
        const p = cellNoiseBase(x, y, this._seed, this._density, this._weight);

        color[0] = p.value;
        color[1] = p.value;
        color[2] = p.value;
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
            weight: {
                val: 0,
                min: 0
            }
        };
    }

    static get examples() {
        return [
            {
                seed: 1,
                density: 16,
                weight: 0
            },
            {
                seed: 1,
                density: 16,
                weight: 16
            },
            {
                seed: 1,
                density: 16,
                weight: 0
            },
            {
                seed: 1,
                density: 16,
                weight: 1
            },
            {
                seed: 1,
                density: 16,
                weight: 4
            },
            {
                seed: 1,
                density: 16,
                weight: 128
            }
        ];
    }
}
