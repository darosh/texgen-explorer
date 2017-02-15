import {Program} from '../../core/Program';

export class Or extends Program {
    constructor() {
        super(Program);
    }

    size(x, y) {
        this._size = [Math.max(Number.EPSILON, x), Math.max(Number.EPSILON, y)];
        return this;
    }

    run(color, x, y) {
        const value = ( (256 * x / this._size[0]) | (256 * y / this._size[1]) ) % 256 / 255;
        color[0] = value;
        color[1] = value;
        color[2] = value;
    }

    static get params() {
        return {
            size: {
                val: [256, 256],
                min: Number.EPSILON,
                scale: true
            }
        };
    }

    static get examples() {
        return [
            {
                size: [64, 64]
            }
        ];
    }
}
