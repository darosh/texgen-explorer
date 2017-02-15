export class Program {
    constructor(proto) {
        this._tint = new Float32Array([1, 1, 1, 1]);

        // this._tint = {
        //     0: 1, 1: 1, 2: 1, 3: 1, set: function (a) {
        //         this._tint[0] = a[0];
        //         this._tint[1] = a[1];
        //         this._tint[2] = a[2];
        //         this._tint[3] = a[3];
        //     }
        // };

        if (proto && proto.params) {
            Object.keys(proto.params).forEach((p) => {
                const v = proto.params[p].val;

                if (v !== null) {
                    if (Array.isArray(v)) {
                        this[p].apply(this, v);
                    } else {
                        this[p].call(this, v);
                    }
                }
            });
        }
    }

    tint(r, g, b, a) {
        if (arguments.length) {
            this._tint[0] = r;
            this._tint[1] = g;
            this._tint[2] = b;
            this._tint[3] = arguments.length > 3 ? a : this._tint[3];
            return this;
        } else {
            return this._tint;
        }
    }
}

export const Type = {
    NUMBER: 0,
    INT: 1,
    BOOLEAN: 2,
    INTERPOLATION: 3,
    COLOR_POINT: 4,
    COLOR: 5,
    TEXTURE: 6,
    0: 'NUMBER',
    1: 'INT',
    2: 'BOOLEAN',
    3: 'INTERPOLATION',
    4: 'COLOR_POINT',
    5: 'COLOR',
    6: 'TEXTURE'
};

export const EPSILON = Number.EPSILON;
