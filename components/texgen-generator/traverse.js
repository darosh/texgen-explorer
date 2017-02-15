import {getRef} from "./getRef";
import {randomUniform} from "d3-random";

export function traverse(current, root = null) {
    let c = current;
    let r = root || current;
    let result = {};

    if (!c) {
        throw new Error();
    }

    if (c.$ref) {
        c = getRef(c.$ref, r);
    }

    // if (c.default) {
    //     return c.default;
    // }

    if (c.enum) {
        return c.enum[Math.floor(randomUniform(c.enum.length)())];
    }

    if (c.type === 'number') {
        return parseFloat(randomUniform(c.minimum || Number.MIN_VALUE, c.maximum || Number.MAX_VALUE)().toPrecision(2));
        // return rand(c.minimum, c.default, c.maximum);
    } else if (c.type === 'integer') {
        return Math.floor(randomUniform(c.minimum || Number.MIN_VALUE, c.maximum || Number.MAX_VALUE)());
        // return  Math.floor(rand(c.minimum, c.default, c.maximum));
    } else if (c.type === 'boolean') {
        return Math.floor(randomUniform(2)()) === 1;
    } else if (c.type === 'array') {
        let items = c.items.length
        || Math.min((c.maxItems || 8), Math.floor(randomUniform(c.minItems || 1, (c.maxItems || 8) + 1)()));

        result = [];

        for (let i = 0; i < items; i++) {
            let item = c.items.length ? c.items[i] : c.items;
            let value = traverse(item, r);

            result.push(value);
        }

        return result;
    }

    if (c.anyOf) {
        let picked = c.anyOf[Math.floor(randomUniform(c.anyOf.length)())];
        return traverse(picked, r);
    }

    if (c.properties) {
        Object.keys(c.properties).forEach((prop) => {
            result[prop] = traverse(c.properties[prop], r);
        });
    }

    return result;
}
