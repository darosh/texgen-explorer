import {Program} from '../../core/Program';

export class CheckerBoard extends Program {
    constructor() {
        super(CheckerBoard);
    }

    size(x, y) {
        this._size = [x, y];
        return this;
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    shift(value) {
        this._shift = value;
        return this;
    }

    run(color, x, y) {
        const value = ( ( ( y + this._offset[1] ) / this._size[1] ) & 1 ) ^ ( ( ( x + this._offset[0] + parseInt(y / this._size[1]) * this._shift ) / this._size[0] ) & 1 ) ? 0 : 1;
        color[0] = value;
        color[1] = value;
        color[2] = value;
    }

    static get params() {
        return {
            size: {
                val: [32, 32],
                min: Number.EPSILON,
                scale: true
            },
            offset: {
                val: [0, 0],
                scale: true
            },
            shift: {
                val: 0,
                scale: true
            }
        };
    }

    static get examples() {
        return [
            {
                size: [16, 16],
                offset: [8, 8],
                shift: 0
            },
            {
                size: [64, 16],
                offset: [0, 0],
                shift: 8
            }
        ];
    }
}
