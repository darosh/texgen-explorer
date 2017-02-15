export {Texture} from './core/Texture';
export {Buffer} from './core/Buffer';
export {Program, Type, EPSILON} from './core/Program';

export {ColorInterpolatorMethod} from './utils/ColorInterpolator';

export * from './programs/generators/index';
export * from './programs/filters/index';
export * from './programs/mixers/index';

import * as operations from './operations/index';
export const Operations = operations;
export {Programs} from './programs/index';

export {bufferToCanvas} from './utils/bufferToCanvas';

export const version = '2.0.0';
