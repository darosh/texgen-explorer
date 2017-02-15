import {Program} from '../../core/Program';

export class SinY extends Program {
    constructor() {
        super(SinY);
    }

    size(value) {
        this._size = Math.max(Number.EPSILON, value) / Math.PI / 2;
        return this;
    }

    offset(value) {
        this._offset = value;
        return this;
    }

    run(color, x, y) {
        const value = Math.sin(( y + this._offset ) / this._size);
        color[0] = value;
        color[1] = value;
        color[2] = value;
    }

    static get params() {
        return {
            size: {
                val: 16,
                min: Number.EPSILON,
                scale: true
            },
            offset: {
                val: 0,
                scale: true
            }
        };
    }
}
