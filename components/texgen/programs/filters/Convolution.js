import {Program, Type} from '../../core/Program';
import {clamp} from "../../utils/clamp";

export class Convolution extends Program {
    constructor() {
        super(Convolution);
    }

    preset(value) {
        this._weights = Convolution.Presets[value] || Convolution.Presets[0];
        this._side = Math.round(Math.sqrt(this._weights.length));
        this._halfSide = Math.floor(this._side / 2);
        return this;
    }

    static get Presets() {
        return {
            0: [0, -1, 0,
                -1, 5, -1,
                0, -1, 0],
            1: [1 / 9, 1 / 9, 1 / 9,
                1 / 9, 1 / 9, 1 / 9,
                1 / 9, 1 / 9, 1 / 9],
            2: [1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25,
                1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25,
                1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25,
                1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25,
                1 / 25, 1 / 25, 1 / 25, 1 / 25, 1 / 25],
            3: [2, 1, 0,
                1, 1, -1,
                0, -1, -2],
            4: [0, 1, 0,
                1, -4, 1,
                0, 1, 0]
        };
    }

    run(color, x, y, src, width, height) {
        const sy = y;
        const sx = x;
        let r = 0, g = 0, b = 0;

        for (let cy = 0; cy < this._side; cy++) {
            for (let cx = 0; cx < this._side; cx++) {
                const scy = sy + cy - this._halfSide;
                const scx = sx + cx - this._halfSide;
                const wt = this._weights[cy * this._side + cx];
                const value = src.getPixelNearest(clamp(scx, 0, width - 1), clamp(scy, 0, height - 1));
                r += value[0] * wt;
                g += value[1] * wt;
                b += value[2] * wt;
            }
        }

        color[0] = r;
        color[1] = g;
        color[2] = b;
    }

    static get params() {
        return {
            preset: {
                val: 0,
                min: 0,
                max: 4,
                type: Type.INT
            }
        };
    }

    static get examples() {
        return [
            {
                preset: 1
            },
            {
                preset: 2
            },
            {
                preset: 3
            }
        ];
    }
}
