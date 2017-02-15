import * as TG from '../texgen';

export function componentOnIndex(formula, index) {
    let f = {...formula[index]};
    f.operation = 'set';
    delete f.$hide;

    return !TG.Programs.Filters[f.program.type]
        ? f.program.texture ? f.program.texture : [f]
        : null;
}
