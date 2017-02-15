import {Program, Type} from '../../core/Program';
import {ColorInterpolator, ColorInterpolatorMethod} from '../../utils/ColorInterpolator';

export class GradientMap extends Program {
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

    run(color, x, y, src) {
        const v = src.getPixelNearest(x, y);

        const r = this._gradient.getColorAt(v[0])[0];
        const g = this._gradient.getColorAt(v[1])[1];
        const b = this._gradient.getColorAt(v[2])[2];

        color[0] = r;
        color[1] = g;
        color[2] = b;
    }

    static get params() {
        return {
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
}
