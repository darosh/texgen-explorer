let schema = null;

import * as TG from '../texgen';

export function getSchema() {
    if (schema) {
        return schema;
    }

    const s = {
        type: "object",
        properties: {
            render: {
                $ref: "#/definitions/texture"
            }
        },
        required: [
            "render"
        ],
        definitions: {
            operation: {},
            texture: {
                type: "array",
                minItems: 3,
                maxItems: 7,
                items: {
                    type: "object",
                    properties: {
                        operation: {
                            $ref: "#/definitions/operation"
                        },
                        tint: {
                            $ref: "#/definitions/tint"
                        },
                        program: {
                            anyOf: []
                        }
                    },
                    required: [
                        "operation",
                        "program"
                    ]
                }

            },
            tint: {
                type: "array",
                minItems: 3,
                maxItems: 4,
                items: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    'default': 0.5
                }
            },
            color: {
                type: "array",
                minItems: 3,
                maxItems: 3,
                items: {
                    type: "number",
                    minimum: 0,
                    maximum: 1,
                    'default': 0.5
                }
            },
            point: {
                type: "array",
                minItems: 2,
                maxItems: 8,
                items: {
                    type: "array",
                    items: [
                        {
                            type: "number",
                            minimum: 0,
                            maximum: 1,
                            'default': 0.5
                        },
                        {
                            $ref: "#/definitions/color"
                        }
                    ]
                },
                'default': [[0, [0, 0, 0]], [.4, [1, 1, 1]], [.6, [1, 1, 1]], [1, [0, 0, 0]]]
            },
            interpolation: {
                'enum': [
                    0,
                    1,
                    2
                ],
                'default': 1
            }
        }
    };

    s.definitions.operation.enum = Object.keys(TG.Operations);

    let r = s.definitions.texture.items.properties.program.anyOf;

    addPrograms(s, 'generators', TG.Programs.Generators, r, TG);
    addPrograms(s, 'filters', TG.Programs.Filters, r, TG);
    addPrograms(s, 'mixers', TG.Programs.Mixers, r, TG);

    schema = s;

    return s;
}

function addPrograms(s, n, l, r, TG) {
    Object.keys(l).forEach((k) => {
        r.push({
            $ref: '#/definitions/' + n + '/definitions/' + k
        });

        s.definitions[n] = s.definitions[n] || {definitions: {}};

        let o = s.definitions[n].definitions[k] = {
            properties: {
                type: {
                    enum: [k]
                }
            },
            required: ['type']
        };

        if (l[k].params) {
            Object.keys(l[k].params).forEach((p) => {
                let q = o.properties[p] = {};
                let t = l[k].params[p];
                let pt = {
                    isArray: Array.isArray(t.val),
                    type: t.type || 0,
                    min: !isNaN(t.min) ? t.min : -256,
                    max: !isNaN(t.max) ? t.max : 256,
                    length: Array.isArray(t.val) ? t.val.length : 1,
                    val: t.val
                };

                if (pt.isArray) {
                    q.type = 'array';
                    q.items = {
                        type: pt.type ? 'number' : 'integer',
                        minimum: pt.min,
                        maximum: pt.max
                    };

                    q.minItems = pt.length;
                    q.maxItems = pt.length;
                } else if (pt.type === TG.Type.BOOLEAN) {
                    q.type = 'boolean';
                } else if (pt.type === TG.Type.COLOR_POINT) {
                    q.$ref = '#/definitions/point';
                } else if (pt.type === TG.Type.INTERPOLATION) {
                    q.$ref = '#/definitions/interpolation';
                } else if (pt.type === TG.Type.NUMBER) {
                    q.type = 'number';
                    q.minimum = pt.min;
                    q.maximum = pt.max;
                } else if (pt.type === TG.Type.INT) {
                    q.type = 'integer';
                    q.minimum = pt.min;
                    q.maximum = pt.max;
                }

                q.default = pt.val;
            })
        }

        if (k === 'PutTexture') {
            o.properties.texture = {
                $ref: "#/definitions/texture"
            };
        }
    });
}
