export function wrap(value, min, max) {
    const v = value - min;
    const r = max - min;

    return ( ( r + v % r ) % r ) + min;
}

export function mirroredWrap(value, min, max) {
    let v = value - min;
    const r = ( max - min ) * 2;

    v = ( r + v % r ) % r;

    if (v > max - min) {
        return ( r - v ) + min;
    } else {
        return v + min;
    }
}
