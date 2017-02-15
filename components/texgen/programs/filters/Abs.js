import {Program} from '../../core/Program';

export class Abs extends Program {
    run(color, x, y, src) {
        const value = src.getPixelNearest(x, y);
        color[0] = Math.abs(value[0]);
        color[1] = Math.abs(value[1]);
        color[2] = Math.abs(value[2]);
    }
}
