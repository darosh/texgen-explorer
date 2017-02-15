import {HEIGHT, WIDTH} from './params';

export function bodyToFunction(body) {
    return new Function(WIDTH, HEIGHT, 'return ' + body);
}
