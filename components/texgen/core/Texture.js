import {Buffer} from './Buffer';
import {set} from '../operations/basic';

export class Texture {
    constructor(width, height) {
        this.color = new Float32Array(4);
        this.buffer = new Buffer(width, height);
        this.bufferCopy = new Buffer(width, height);
    }

    toImageData(context) {
        const buffer = this.buffer;
        const array = buffer.array;

        const imageData = context.createImageData(buffer.width, buffer.height);
        const data = imageData.data;

        let i;
        const il = array.length;

        for (i = 0; i < il; i += 4) {
            data[i] = array[i] * 255;
            data[i + 1] = array[i + 1] * 255;
            data[i + 2] = array[i + 2] * 255;
            data[i + 3] = 255;
        }

        return imageData;
    }

    toCanvas(canvas) {
        if (canvas === undefined) {
            canvas = document.createElement('canvas');
        }

        canvas.width = this.buffer.width;
        canvas.height = this.buffer.height;

        const context = canvas.getContext('2d');
        const imageData = this.toImageData(context);

        context.putImageData(imageData, 0, 0);

        return canvas;
    }

    set(program, operation) {
        this.bufferCopy.copy(this.buffer);

        const op = operation === undefined ? set : operation;
        const dst = this.buffer;
        const src = this.bufferCopy;
        const color = this.color;
        const tint = program.tint();

        const array = dst.array;
        const width = dst.width;
        const height = dst.height;
        const il = array.length;

        let a = 1 - tint[3];
        let b = tint[3];
        let x = 0;
        let y = 0;
        let i;

        if (tint[3] === 1) {
            for (i = 0; i < il;) {
                program.run(color, x, y, src, width, height);
                array[i] = op(array[i++], color[0] * tint[0]);
                array[i] = op(array[i++], color[1] * tint[1]);
                array[i] = op(array[i++], color[2] * tint[2]);
                i++;

                if (++x === width) {
                    x = 0;
                    y++;
                }
            }
        } else if (tint[3] !== 0) {
            for (i = 0; i < il;) {
                program.run(color, x, y, src, width, height);
                array[i] = array[i] * a + op(array[i++], color[0] * tint[0]) * b;
                array[i] = array[i] * a + op(array[i++], color[1] * tint[1]) * b;
                array[i] = array[i] * a + op(array[i++], color[2] * tint[2]) * b;
                i++;

                if (++x === width) {
                    x = 0;
                    y++;
                }
            }
        }


        return this;
    }

    toArrayBuffer() {
        const array = this.buffer.array;
        const il = array.length;
        const buffer = new ArrayBuffer(il);
        const res = new Uint8ClampedArray(buffer);
        let i;

        for (i = 0; i < il; i += 4) {
            res[i] = array[i] * 255;
            res[i + 1] = array[i + 1] * 255;
            res[i + 2] = array[i + 2] * 255;
            res[i + 3] = 255;
        }

        return buffer;
    }

    static isSingleColor(buffer) {
        const a = new Uint8ClampedArray(buffer);
        const l = a.length;
        let i = 4;

        while (i < l) {
            if (a[0] !== a[i++] || a[1] !== a[i++] || a[2] !== a[i++]) {
                return false;
            }

            i++;
        }

        return true;
    }
}

import * as operations from '../operations/index';

for (let o in operations) {
    if (!Texture.prototype[o]) {
        Texture.prototype[o] = function (program) {
            return this.set(program, operations[o]);
        };
    }
}
