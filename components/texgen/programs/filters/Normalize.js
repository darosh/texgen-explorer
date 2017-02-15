import {Program} from '../../core/Program';

export class Normalize extends Program {
    multiplier(value) {
        this._multiplier = value;
        return this;
    }

    offset(value) {
        this._offset = value;
        return this;
    }

    run(color, x, y, src) {
        if (!this._init) {
            let high = -Infinity;
            let low = Infinity;

            let j = 0;
            const len = src.array.length;
            for (; j < len; j++) {
                if (j % 4 === 3) continue;

                high = ( src.array[j] > high ) ? src.array[j] : high;
                low = ( src.array[j] < low  ) ? src.array[j] : low;
            }

            this._offset = -low;
            this._multiplier = 1 / ( high - low );
            this._init = true;
        }

        const v = src.getPixelNearest(x, y);
        color[0] = ( v[0] + this._offset ) * this._multiplier;
        color[1] = ( v[1] + this._offset ) * this._multiplier;
        color[2] = ( v[2] + this._offset ) * this._multiplier;
    }

    static get params() {
        return {
            multiplier: {
                val: 1
            },
            offset: {
                val: 0
            }
        };
    }
}
