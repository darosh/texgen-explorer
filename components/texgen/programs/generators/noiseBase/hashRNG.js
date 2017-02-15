export function hashRNG(seed, x, y) {
    const s = ( Math.abs(seed % 2147483648) === 0 ) ? 1 : seed;
    let a = ( ( s * ( x + 1 ) * 777 ) ^ ( s * ( y + 1 ) * 123 ) ) % 2147483647;

    a = (a ^ 61) ^ (a >> 16);
    a = a + (a << 3);
    a = a ^ (a >> 4);
    a = a * 0x27d4eb2d;
    a = a ^ (a >> 15);
    a = a / 2147483647;

    return a;
}
