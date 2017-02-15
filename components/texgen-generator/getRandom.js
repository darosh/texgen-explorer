import {getSchema} from '../texgen-schema';
import {traverse} from "./traverse";

export function getRandom() {
    var r = traverse(getSchema());

    if (!TG.Programs.Generators[r.render[0].program.type]) {
        r.render[0].program = {
            type: 'Number'
        }
    }

    return r;
}
