import {Program} from '../../core/Program';

export class Posterize extends Program {
    constructor() {
        super(Posterize);
    }

    step(value) {
        this._step = Math.max(value, 2);
        return this;
    }

    run(color, x, y, src) {
        const v = src.getPixelNearest(x, y);
        color[0] = Math.floor(Math.floor(v[0] * 255 / ( 255 / this._step )) * 255 / ( this._step - 1 )) / 255;
        color[1] = Math.floor(Math.floor(v[1] * 255 / ( 255 / this._step )) * 255 / ( this._step - 1 )) / 255;
        color[2] = Math.floor(Math.floor(v[2] * 255 / ( 255 / this._step )) * 255 / ( this._step - 1 )) / 255;
    }

    static get params() {
        return {
            step: {
                val: 2
            }
        };
    }
}
