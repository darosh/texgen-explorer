import {Program, Type} from '../../core/Program';
import {mirroredWrap, wrap} from '../../utils/wrap';
import {clamp} from '../../utils/clamp';

export class PutTexture extends Program {
    constructor() {
        super(PutTexture);
    }

    offset(x, y) {
        this._offset = [x, y];
        return this;
    }

    repeat(value) {
        this._repeat = value;
        return this;
    }

    texture(value) {
        this._srcTex = value.buffer;
        return this;
    }

    run(color, x, y, src) {
        this._srcTex = this._srcTex || src;
        const texWidth = this._srcTex.width;
        const texHeight = this._srcTex.height;

        const texX = Math.floor(x - this._offset[0]);
        const texY = Math.floor(y - this._offset[1]);

        if (texX >= texWidth || texY >= texHeight || texX < 0 || texY < 0) {
            if (this._repeat) {
                let nx, ny;
                const rangeX = texWidth - 1;
                const rangeY = texHeight - 1;

                if (this._repeat === 1) {
                    nx = wrap(texX, 0, texWidth);
                    ny = wrap(texY, 0, texHeight);
                } else if (this._repeat === 2) {
                    nx = mirroredWrap(texX, 0, rangeX);
                    ny = mirroredWrap(texY, 0, rangeY);
                } else if (this._repeat === 3) {
                    nx = clamp(texX, 0, rangeX);
                    ny = clamp(texY, 0, rangeY);
                }

                color.set(this._srcTex.getPixelNearest(nx, ny));
            } else {
                color[0] = 0;
                color[1] = 0;
                color[2] = 0;
            }
        } else {
            color.set(this._srcTex.getPixelNearest(texX, texY));
        }
    }

    static get params() {
        return {
            offset: {
                val: [0, 0]
            },
            repeat: {
                val: false,
                type: Type.BOOLEAN
            },
            texture: {
                val: null,
                type: Type.TEXTURE
            }
        };
    }
}
