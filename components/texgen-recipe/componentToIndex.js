export function componentToIndex(formula, index) {
    let f = [];

    for (let j = 0; j <= index; j++) {
        f.push(formula[j]);
    }

    return f;
}
