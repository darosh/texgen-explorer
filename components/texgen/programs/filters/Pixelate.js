import {Program, Type} from '../../core/Program';

export class Pixelate extends Program {
    constructor() {
        super(Pixelate);
    }

    size(x, y) {
        this._size = [x, y];
        return this;
    }

    run(color, x, y, src) {
        const s = this._size[0] * Math.floor(x / this._size[0]);
        const t = this._size[1] * Math.floor(y / this._size[1]);

        color.set(src.getPixelNearest(s, t));
    }

    static get params() {
        return {
            size: {
                val: [2, 2],
                type: Type.INT,
                min: 2,
                max: 256
            }
        };
    }
}
