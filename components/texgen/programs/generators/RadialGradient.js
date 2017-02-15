import {Program, Type} from '../../core/Program';
import {ColorInterpolator, ColorInterpolatorMethod} from '../../utils/ColorInterpolator';
import {distance} from '../../utils/distance';

export class RadialGradient extends Program {
    constructor() {
        super(RadialGradient);
    }

    repeat(value) {
        this._gradient = this._gradient || new ColorInterpolator();
        this._gradient.setRepeat(value);
        return this;
    }

    size(value) {
        this._size = value;
        return this;
    }

    interpolation(value) {
        this._gradient = this._gradient || new ColorInterpolator();
        this._gradient.setInterpolation(value);
        return this;
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    point(position, color) {
        this._gradient = this._gradient || new ColorInterpolator();
        this._gradient.addPoint(position, color);
        return this;
    }

    run(color, x, y) {
        const dist = distance(x, y, this._offset[0], this._offset[1]);
        color.set(this._gradient.getColorAt(dist / this._size));
    }

    static get params() {
        return {
            size: {
                val: 128,
                min: Number.EPSILON,
                scale: true
            },
            offset: {
                val: [0, 0],
                scale: true
            },
            repeat: {
                val: true,
                type: Type.BOOLEAN
            },
            interpolation: {
                val: 1,
                type: Type.INTERPOLATION
            },
            point: {
                val: null,
                type: Type.COLOR_POINT
            }
        };
    }

    static get examples() {
        return [
            {
                size: 64,
                offset: [128, 128],
                repeat: false
            }
        ];
    }
}
