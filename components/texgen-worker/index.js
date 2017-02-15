// importScripts('../texgen/texgen.js');
import * as TG from '../texgen'

import {bodyToFunction} from '../texgen-recipe'

self.TG = TG;

self.addEventListener('message', function (e) {
    const data = e.data;
    const fnc = bodyToFunction(data.fnc);

    let passed = true;
    let texture;
    let time;
    let buffer;

    if (data.test) {
        texture = fnc(data.test[0], data.test[1]);
        passed = !TG.Texture.isSingleColor(texture.toArrayBuffer());
    }

    if (passed) {
        time = performance.now();
        buffer = fnc(data.width, data.height).toArrayBuffer();
        time = performance.now() - time;
    }

    const ret = {
        buffer: buffer,
        passed: passed,
        time: time,
        version: TG.version
    };

    Object.keys(data).forEach(function (k) {
        ret[k] = data[k];
    });

    if (buffer) {
        self.postMessage(ret, [buffer])
    } else {
        self.postMessage(ret)
    }
});
