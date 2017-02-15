import {hashRNG} from '../noiseBase/hashRNG';

export function cellNoiseBase(x, y, seed, density, weight) {
    let qx, qy, rx, ry, w, px, py, dx, dy;
    let dist, value;
    let shortest = Infinity;
    density = Math.abs(density);

    for (let sx = -2; sx <= 2; sx++) {
        for (let sy = -2; sy <= 2; sy++) {
            qx = Math.ceil(x / density) + sx;
            qy = Math.ceil(y / density) + sy;

            rx = hashRNG(seed, qx, qy);
            ry = hashRNG(seed * 2, qx, qy);
            w = ( weight > 0 ) ? 1 + hashRNG(seed * 3, qx, qy) * weight : 1;

            px = ( rx + qx ) * density;
            py = ( ry + qy ) * density;

            dx = Math.abs(px - x);
            dy = Math.abs(py - y);

            dist = ( dx * dx + dy * dy ) * w;

            if (dist < shortest) {
                shortest = dist;
                value = rx;
            }
        }
    }

    return {dist: Math.sqrt(shortest), value: value};
}
