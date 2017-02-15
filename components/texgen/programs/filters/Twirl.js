import {Program} from '../../core/Program';
import {distance} from '../../utils/distance';

export class Twirl extends Program {
    constructor() {
        super(Twirl);
    }

    weight(value) {
        this._weight = value;
        return this;
    }

    size(value) {
        this._size = value;
        return this;
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    run(color, x, y, src) {
        let dist = distance(x, y, this._offset[0], this._offset[1]);
        let s, t;

        // no distortion if outside of whirl size.
        if (dist < this._size) {
            dist = Math.pow(this._size - dist, 2) / this._size;

            const angle = 2.0 * Math.PI * (dist / (this._size / this._weight));
            s = (((x - this._offset[0]) * Math.cos(angle)) - ((y - this._offset[0]) * Math.sin(angle)) + this._offset[0] + 0.5);
            t = (((y - this._offset[1]) * Math.cos(angle)) + ((x - this._offset[1]) * Math.sin(angle)) + this._offset[1] + 0.5);
        } else {
            s = x;
            t = y;
        }

        color.set(src.getPixelBilinear(s, t));
    }

    static get params() {
        return {
            weight: {
                val: 0.5,
                min: -1,
                max: 1
            },
            size: {
                val: 128
            },
            offset: {
                val: [128, 128]
            }
        };
    }
}
