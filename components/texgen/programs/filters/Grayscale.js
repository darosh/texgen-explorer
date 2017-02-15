import {Program} from '../../core/Program';

export class Grayscale extends Program {
    run(color, x, y, src) {
        const value = src.getPixelNearest(x, y);
        const g = .2126 * value[0] + .7152 * value[1] + .0722 * value[2];
        color[0] = g;
        color[1] = g;
        color[2] = g;
    }
}
