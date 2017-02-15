import {Program} from '../../core/Program';

export class Copy extends Program {
    run(color, x, y, src) {
        const value = src.getPixelNearest(x, y);
        color.set(value);
    }
}
