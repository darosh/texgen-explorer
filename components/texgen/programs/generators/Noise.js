import {Program, Type} from '../../core/Program';
import {hashRNG} from './noiseBase/hashRNG';

export class Noise extends Program {
    constructor() {
        super(Noise);
    }

    seed(value) {
        this._seed = value;
        return this;
    }

    run(color, x, y) {
        const value = hashRNG(this._seed, x, y);
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
            }
        };
    }
}
