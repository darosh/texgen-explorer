import * as TG from '../texgen';
import {HEIGHT, WIDTH} from './params';

export function recipeToBody(formula, proportional = false, block = '') {
    let r = ['new TG.Texture(' + WIDTH + ', ' + HEIGHT + ')'];
    let CR = '\n';
    let SP = '  ';

    (formula || []).forEach(function (part) {
        if (!part) {
            return;
        }

        let def = TG[part.program.type];

        if (!def || part.$hide) {
            return;
        }

        let g;

        // if (part.program.type === 'PutTexture') {
        //     g = 'new TG.' + part.program.type + '(' + recipeToBody(part.program.texture || [], proportional, SP + block) + ')';
        // } else {
        g = 'new TG.' + part.program.type + '()';
        Object.keys(part.program)
            .filter(function (p) {
                return (p !== 'type') && def.params && def.params[p];
            })
            .forEach(function (p) {
                if (p === 'point') {
                    (part.program[p] || []).forEach(function (b) {
                        g += CR + block + SP + SP + '.' + p + '(' + b[0] + ', [' + b[1].join(', ') + '])';
                    });
                } else if (p === 'texture') {
                    g += CR + block + SP + SP + '.' + p + '(' + recipeToBody(part.program.texture || [], proportional, SP + SP + block) + ')';
                } else {
                    let a = getValue(part.program[p], TG[part.program.type].params && TG[part.program.type].params[p], proportional);
                    g += CR + block + SP + SP + '.' + p + '(' + a + ')';
                }
            });
        // }

        g += CR + block + SP + SP + '.tint(' + part.tint.join(', ') + ')';

        let s = '.' + (part.operation || 'set') + '(' + g + ')';

        r.push(s);
    });

    return r.join(CR + block + SP) + (block ? '' : ';');
}

function getValue(val, param, proportional) {
    if ((param.scale !== undefined) && proportional) {
        return val.join ? val.map((v) => scaled(v, param.scale)).join(', ') : scaled(val, param.scale);
    } else {
        return val.join ? val.join(', ') : val;
    }
}

function scaled(v, s) {
    if (s) {
        return (v / 256) + ('*' + WIDTH);
    } else {
        return (v * 256) + ('/' + WIDTH);
    }
}
