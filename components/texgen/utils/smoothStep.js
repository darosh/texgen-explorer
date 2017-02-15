import {clamp} from './clamp';

export function smoothStep(edge0, edge1, x) {
    // Scale, bias and saturate x to 0..1 range
    let xx = clamp(( x - edge0 ) / ( edge1 - edge0 ), 0, 1);

    // Evaluate polynomial
    return xx * xx * ( 3 - 2 * xx );
}
