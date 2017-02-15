export function mixColors(c1, c2, delta) {
    return [
        c1[0] * ( 1 - delta ) + c2[0] * delta,
        c1[1] * ( 1 - delta ) + c2[1] * delta,
        c1[2] * ( 1 - delta ) + c2[2] * delta
        // c1[3] * ( 1 - delta ) + c2[3] * delta
    ];
}
