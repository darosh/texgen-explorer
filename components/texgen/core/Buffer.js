export class Buffer {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.array = new Float32Array(width * height * 4);
        this.color = new Float32Array(4);
    }

    copy(buffer) {
        this.array.set(buffer.array);
    }

    getPixelNearest(x, y) {
        let _x = Math.round(x);
        let _y = Math.round(y);

        while (_y >= this.height) _y -= this.height;
        while (_y < 0) _y += this.height;
        while (_x >= this.width) _x -= this.width;
        while (_x < 0) _x += this.width;

        const array = this.array;
        const color = this.color;
        const offset = _y * this.width * 4 + _x * 4;

        color[0] = array[offset];
        color[1] = array[offset + 1];
        color[2] = array[offset + 2];

        return this.color;
    }

    getPixelBilinear(x, y) {
        const px = Math.floor(x);
        const py = Math.floor(y);
        const p0 = px + py * this.width;

        const array = this.array;
        const color = this.color;

        // Calculate the weights for each pixel
        const fx = x - px;
        const fy = y - py;
        const fx1 = 1 - fx;
        const fy1 = 1 - fy;

        const w1 = fx1 * fy1;
        const w2 = fx * fy1;
        const w3 = fx1 * fy;
        const w4 = fx * fy;

        let p1 = p0 * 4; 							// 0 + 0 * w
        let p2 = ( 1 + p0 ) * 4; 					// 1 + 0 * w
        let p3 = ( 1 * this.width + p0 ) * 4; 		// 0 + 1 * w
        let p4 = ( 1 + 1 * this.width + p0 ) * 4; 	// 1 + 1 * w

        const len = this.width * this.height * 4;

        if (p1 >= len) p1 -= len;
        if (p1 < 0) p1 += len;
        if (p2 >= len) p2 -= len;
        if (p2 < 0) p2 += len;
        if (p3 >= len) p3 -= len;
        if (p3 < 0) p3 += len;
        if (p4 >= len) p4 -= len;
        if (p4 < 0) p4 += len;

        // Calculate the weighted sum of pixels (for each color channel)
        color[0] = array[p1] * w1 + array[p2] * w2 + array[p3] * w3 + array[p4] * w4;
        color[1] = array[p1 + 1] * w1 + array[p2 + 1] * w2 + array[p3 + 1] * w3 + array[p4 + 1] * w4;
        color[2] = array[p1 + 2] * w1 + array[p2 + 2] * w2 + array[p3 + 2] * w3 + array[p4 + 2] * w4;
        color[3] = array[p1 + 3] * w1 + array[p2 + 3] * w2 + array[p3 + 3] * w3 + array[p4 + 3] * w4;

        return this.color;
    }

    getPixelOffset(offset) {
        const array = this.array;
        const color = this.color;

        offset = parseInt(offset * 4);

        color[0] = array[offset];
        color[1] = array[offset + 1];
        color[2] = array[offset + 2];
        color[3] = array[offset + 3];

        return this.color;
    }
}
