import {Program} from '../../core/Program';
import {deg2rad} from '../../utils/deg2rad';

export class Transform extends Program {
    constructor() {
        super(Transform);
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    angle(value) {
        this._angle = deg2rad(value);
        return this;
    }

    scale(x, y) {
        if (x === 0 || y === 0) return;
        this._scale = [x, y];
        return this;
    }

    run(color, x, y, src, width, height) {
        const x2 = x - width / 2;
        const y2 = y - height / 2;

        let s = x2 * ( Math.cos(this._angle) / this._scale[0] ) + y2 * -( Math.sin(this._angle) / this._scale[0] );
        let t = x2 * ( Math.sin(this._angle) / this._scale[1] ) + y2 * ( Math.cos(this._angle) / this._scale[1] );

        s += this._offset[0] + width / 2;
        t += this._offset[1] + height / 2;

        color.set(src.getPixelBilinear(s, t));
    }

    static get params() {
        return {
            offset: {val: [0, 0]},
            angle: {val: 0, min: 0, max: 360},
            scale: {val: [1, 1]}
        };
    }

    static get examples() {
        return [
            {
                offset: [0, 0],
                angle: 45,
                scale: [2, 2]
            }
        ];
    }
}
