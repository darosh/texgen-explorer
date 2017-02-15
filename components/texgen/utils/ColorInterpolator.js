import {mixColors} from './mixColors';
import {mirroredWrap, wrap} from './wrap';
import {clamp} from './clamp';

export const ColorInterpolatorMethod = {
    STEP: 0,
    LINEAR: 1,
    SPLINE: 2
};

export class ColorInterpolator {
    constructor(method) {
        this.points = [];
        this.low = 0;
        this.high = 0;
        this.interpolation = ( typeof( method ) === 'undefined' ) ? ColorInterpolatorMethod.LINEAR : method;
        this.repeat = false;

        return this;
    }

    set(points) {
        this.points = points;
        this.points.sort(function (a, b) {
            return a.pos - b.pos;
        });

        this.low = this.points[0].pos;
        this.high = this.points[this.points.length - 1].pos;

        return this;
    }

    addPoint(position, color) {

        this.points.push({pos: position, color: color});
        this.points.sort(function (a, b) {
            return a.pos - b.pos;
        });

        this.low = this.points[0].pos;
        this.high = this.points[this.points.length - 1].pos;

        return this;
    }

    setRepeat(value) {
        this.repeat = value;
        return this;
    }

    setInterpolation(value) {
        this.interpolation = value;
        return this;
    }

    getColorAt(pos) {
        if (!this.points.length) {
            return [0, 0, 0];
        } else if (this.repeat === 2) {
            pos = mirroredWrap(pos, this.low, this.high);
        }
        else if (this.repeat) {
            pos = wrap(pos, this.low, this.high);
        }
        else {
            pos = clamp(pos, this.low, this.high);
        }

        let i = 0;
        const points = this.points;

        while (points[i + 1].pos < pos) i++;

        const p1 = points[i];
        const p2 = points[i + 1];

        const delta = ( pos - p1.pos ) / ( p2.pos - p1.pos );

        if (this.interpolation === ColorInterpolatorMethod.STEP) {
            return p1.color;
        } else if (this.interpolation === ColorInterpolatorMethod.LINEAR) {
            return mixColors(p1.color, p2.color, delta);
        } else if (this.interpolation === ColorInterpolatorMethod.SPLINE) {
            const ar = 2 * p1.color[0] - 2 * p2.color[0];
            const br = -3 * p1.color[0] + 3 * p2.color[0];
            const dr = p1.color[0];

            const ag = 2 * p1.color[1] - 2 * p2.color[1];
            const bg = -3 * p1.color[1] + 3 * p2.color[1];
            const dg = p1.color[1];

            const ab = 2 * p1.color[2] - 2 * p2.color[2];
            const bb = -3 * p1.color[2] + 3 * p2.color[2];
            const db = p1.color[2];

            const delta2 = delta * delta;
            const delta3 = delta2 * delta;

            return [
                ar * delta3 + br * delta2 + dr,
                ag * delta3 + bg * delta2 + dg,
                ab * delta3 + bb * delta2 + db
            ];
        }
    }
}
