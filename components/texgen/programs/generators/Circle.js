import {Program} from '../../core/Program';
import {distance} from '../../utils/distance';
import {smoothStep} from '../../utils/smoothStep';

export class Circle extends Program {
    constructor() {
        super(Circle);
    }

    weight(value) {
        this._delta = value;
        return this;
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    size(value) {
        this._size = value;
        return this;
    }

    run(color, x, y) {
        const dist = distance(x, y, this._offset[0], this._offset[1]);
        const value = 1 - smoothStep(this._size - this._delta, this._size, dist);
        color[0] = value;
        color[1] = value;
        color[2] = value;
    }

    static get params() {
        return {
            offset: {
                val: [0, 0],
                scale: true
            },
            size: {
                val: 128,
                min: Number.EPSILON,
                scale: true
            },
            weight: {
                val: 1,
                min: 0,
                scale: true
            }
        };
    }

    static get examples() {
        return [
            {
                offset: [128, 128],
                size: 128,
                weight: 32
            },
            {
                offset: [128, 128],
                size: 128,
                weight: 128
            }
        ];
    }
}
