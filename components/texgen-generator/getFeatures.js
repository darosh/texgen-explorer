import {getSchema} from '../texgen-schema/getSchema';
import {colors} from './colors';
import {getProgram} from './getProgram';
import * as TG from '../texgen';

const baseId = 1;
const mixId = 3;

export function getFeatures() {
    const schema = getSchema();
    let ret = [];
    addGenerators(ret, schema.definitions['generators'].definitions, schema);
    addFilters(ret, {...ret[baseId].render[0], ...{tint: [1, 1, 1]}}, schema.definitions['filters'].definitions, schema);
    addMixers(ret, {...ret[baseId].render[0]}, {...ret[mixId].render[0]});
    addOperations(ret, {...ret[baseId].render[0], ...{tint: [1, 1, 0.5]}}, {...ret[mixId].render[0]}, schema.definitions['operation'].enum);
    addAlphas(ret, {...ret[baseId].render[0], ...{tint: [1, 1, 0.5]}}, {...ret[mixId].render[0]});
    return ret;
}

function addGenerators(ret, defs, schema) {
    let color = 0;
    let keys = Object.keys(defs);
    keys.forEach(function (k) {
        let tt = defs[k];
        let pr = getProgram(tt, schema);

        ret.push({
            title: k,
            group: 'Generators',
            render: [
                {
                    tint: colors[color++ % colors.length],
                    operation: 'set',
                    program: pr
                }
            ]
        });


        if (TG[k] && TG[k].examples) {
            TG[k].examples.forEach(function (e, i) {
                let pr = getProgram(tt, schema);

                Object.keys(e).forEach(function (k) {
                    pr[k] = e[k];
                });

                ret.push({
                    title: k,
                    subTitle: '#' + (i + 1),
                    group: 'Generators',
                    render: [
                        {
                            tint: colors[color++ % colors.length],
                            operation: 'set',
                            program: pr
                        }
                    ]
                });
            })
        }
    });
}

function addFilters(ret, base, defs, schema) {
    const keys = Object.keys(defs);
    keys.map(function (k) {
        let tt = defs[k];
        let pr = getProgram(tt, schema);

        ret.push({
            title: k,
            group: 'Filters',
            render: [
                base,
                {
                    tint: [1, 1, 1],
                    operation: 'set',
                    program: pr
                }
            ]
        });

        if (TG[k] && TG[k].examples) {
            TG[k].examples.forEach(function (e, i) {
                let pr = getProgram(tt, schema);

                Object.keys(e).forEach(function (k) {
                    pr[k] = e[k];
                });

                ret.push({
                    title: k,
                    subTitle: '#' + (i + 1),
                    group: 'Filters',
                    render: [
                        base,
                        {
                            tint: [1, 1, 1],
                            operation: 'set',
                            program: pr
                        }
                    ]
                });
            })
        }
    });
}

function addMixers(ret, base, mix) {
    ret.push({
        title: 'PutTexture',
        group: 'Mixers',
        render: [
            base,
            {
                tint: [1, 1, 1],
                operation: 'add',
                program: {
                    type: 'PutTexture',
                    texture: [mix]
                }
            }
        ]
    });
}

function addOperations(ret, base, mix, keys) {
    keys.map(function (k) {
        ret.push({
            title: k,
            group: 'Operations',
            render: [
                base,
                {
                    tint: [1, .5, 1],
                    operation: k,
                    program: mix.program
                }
            ]
        });
    });
}

function addAlphas(ret, base, mix) {
    [0, 0.25, 0.5, 0.75, 1].forEach(function (k) {
        ret.push({
            title: 'Alpha ' + k,
            group: 'Alpha Blending',
            render: [
                base,
                {
                    tint: [1, .5, 1, k],
                    operation: 'set',
                    program: mix.program
                }
            ]
        });
    });
}
