import {EPSILON, Program} from '../../core/Program';

export class SineDistort extends Program {
    constructor() {
        super(SineDistort);
    }

    size(x, y) {
        this._size = [Math.max(Number.EPSILON, x) / Math.PI / 2, Math.max(Number.EPSILON, y) / Math.PI / 2];
        return this;
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    amplitude(x, y) {
        this._amplitude = [x, y];
        return this;
    }

    run(color, x, y, src) {
        const s = x + Math.sin(y / this._size[0] + this._offset[0]) * this._amplitude[0];
        const t = y + Math.sin(x / this._size[1] + this._offset[1]) * this._amplitude[1];
        color.set(src.getPixelBilinear(s, t));
    }

    static get params() {
        return {
            size: {val: [32, 32], min: EPSILON},
            offset: {val: [0, 0]},
            amplitude: {val: [8, 8], min: EPSILON}
        };
    }

    static get examples() {
        return [
            {
                size: [128, 128],
                offset: [0, 0],
                amplitude: [64, 64],
            },
            {
                size: [256, 256],
                offset: [0, 0],
                amplitude: [32, 32],
            }
        ];
    }
}
