import {getRef} from "./getRef";

export function getProgram(tt, schema) {
    let pr = {
        type: tt.properties['type'].enum[0]
    };

    Object.keys(tt.properties)
        .filter(function (p) {
            return p !== 'type'
        })
        .forEach(function (p) {
            let c = tt.properties[p];

            if (c.$ref) {
                c = getRef(c.$ref, schema);
            }

            if (c.default !== undefined) {
                pr[p] = c.default;
            }
        });

    return pr;
}
