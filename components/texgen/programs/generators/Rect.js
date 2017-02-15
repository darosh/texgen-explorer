import {Program} from '../../core/Program';

export class Rect extends Program {
    constructor() {
        super(Rect);
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    size(x, y) {
        this._size = [x, y];
        return this;
    }

    run(color, x, y) {
        const value = ( x >= this._offset[0] && x <= ( this._offset[0] + this._size[0] ) && y <= ( this._offset[1] + this._size[1] ) && y >= this._offset[1] ) ? 1 : 0;
        color[0] = value;
        color[1] = value;
        color[2] = value;
    }

    static get params() {
        return {
            offset: {
                val: [0, 0],
                scale: true
            },
            size: {
                val: [128, 64],
                min: Number.EPSILON,
                scale: true
            }
        };
    }

    static get examples() {
        return [
            {
                offset: [(256 - 128) / 2, (256 - 64) / 2],
                size: [128, 64]
            }
        ];
    }
}
