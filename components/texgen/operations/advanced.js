export function average(a, b) {
    return (a + b) / 2;
}

export function screen(a, b) {
    return 1 - (1 - a) * (1 - b);
}

export function overlay(a, b) {
    return (b < .5)
        ? (2 * a * b)
        : (1 - 2 * (1 - a) * (1 - b));
}

export function linearBurn(a, b) {
    return a + b - 1;
}

export function colorBurn(a, b) {
    return (b === 0) ? b : (1 - (1 - a) / b);
}

export function colorDodge(a, b) {
    return (b >= 1) ? b : (a / (1 - b));
}

export function difference(a, b) {
    return Math.abs(a - b);
}

export function exclusion(a, b) {
    return .5 - 2 * (a - .5) * (b - .5);
}

export function softLight(a, b) {
    return (b < .5)
        ? (2 * ((a / 2) + .25)) * b
        : (1 - (2 * (1 - ((a / 2) + .25)) * (1 - b)));
}
export function hardLight(a, b) {
    return (a < .5)
        ? (2 * b * a)
        : (1 - 2 * (1 - b) * (1 - a));
}

export function vividLight(a, b) {
    return (a > .5)
        ? (1 - (1 - b) / (2 * (a - .5)))
        : (b / (1 - 2 * a));
}
export function linearLight(a, b) {
    return (b > 0.5)
        ? (a + 2 * (b - .5))
        : (a + 2 * b - 1);
}

export function pinLight(a, b) {
    return (b > 0.5)
        ? Math.max(a, 2 * (b - .5))
        : Math.min(a, 2 * b);
}
