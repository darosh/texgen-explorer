import {Program, Type} from '../../core/Program';
import {ColorInterpolator, ColorInterpolatorMethod} from '../../utils/ColorInterpolator';

export class LinearGradient extends Program {
    constructor() {
        super(LinearGradient);
    }

    size(value) {
        this._size = Math.max(LinearGradient.params.size.min, value);
        return this;
    }

    repeat(value) {
        this._gradient = this._gradient || new ColorInterpolator();
        this._gradient.setRepeat(value);
        return this;
    }

    interpolation(value) {
        this._gradient = this._gradient || new ColorInterpolator();
        this._gradient.setInterpolation(value);
        return this;
    }

    point(position, color) {
        this._gradient = this._gradient || new ColorInterpolator();
        this._gradient.addPoint(position, color);
        return this;
    }

    run(color, x) {
        color.set(this._gradient.getColorAt(x / this._size));
    }

    static get params() {
        return {
            size: {
                val: 256,
                min: Number.EPSILON,
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
                interpolation: ColorInterpolatorMethod.STEP
            },
            {
                interpolation: ColorInterpolatorMethod.SPLINE,
                size: 128
            },
            {
                interpolation: ColorInterpolatorMethod.SPLINE,
                repeat: false,
                size: 32
            }
        ];
    }
}
