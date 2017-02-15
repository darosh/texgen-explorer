export function bufferToCanvas(buffer, width, height, canvas = null) {
    const can = canvas || document.createElement('canvas');
    can.width = width;
    can.height = height;
    const ctx = can.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    const heap = new Uint8Array(buffer);
    const last = heap.length;
    let i = 0;

    while (i < last) {
        data[i] = heap[i++];
    }

    ctx.putImageData(imageData, 0, 0);

    return can;
}
