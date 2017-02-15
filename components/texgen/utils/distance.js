export function distance(x0, y0, x1, y1) {
    const dx = x1 - x0, dy = y1 - y0;
    return Math.sqrt(dx * dx + dy * dy);
}
