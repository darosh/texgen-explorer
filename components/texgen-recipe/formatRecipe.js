export function formatRecipe(render, precision = 2, removeHide = false) {
    const ret = [];

    render.forEach((d) => {
        const r = {
            operation: d.operation
        };

        if (removeHide && d.$hide) {
            return;
        } else if (!removeHide && (d.$hide !== undefined)) {
            r.$hide = d.$hide;
        }

        if (d.tint) {
            r.tint = d.tint.map((n) => {
                return formatNumber(n, precision);
            });
        }

        r.program = {};

        Object.keys(d.program).forEach((p) => {
            var v = d.program[p];

            if (Array.isArray(v)) {
                v = v.map((n) => {
                    if (typeof n === 'number') {
                        return formatNumber(n, precision)
                    } else {
                        if (Array.isArray(n)) {
                            return n.map((m) => {
                                if (typeof m === 'number') {
                                    return formatNumber(m, precision)
                                } else {
                                    return m;
                                }
                            });
                        } else {
                            return n;
                        }
                    }
                });
            } else if (typeof v === 'number') {
                v = formatNumber(v, precision);
            }

            r.program[p] = v;
        });

        ret.push(r);
    });

    return ret;
}

function formatNumber(n, p) {
    if (p) {
        return parseFloat(n.toPrecision(p));
    } else {
        return n;
    }
}
