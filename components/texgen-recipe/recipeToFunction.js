import {recipeToBody} from './recipeToBody';
import {bodyToFunction} from './bodyToFunction';

export function recipeToFunction(formula) {
    return bodyToFunction(recipeToBody(formula));
}
