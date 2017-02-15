import sourcemaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify';
import node from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import json from 'rollup-plugin-json';
import path from 'path';

export default {
    entry: path.join(__dirname, 'index.js'),
    dest: path.join(__dirname, path.basename(__dirname) + '.js'),
    format: 'umd',
    sourceMap: true,
    plugins: [
        node(),
        json(),
        babel(babelrc()),
        sourcemaps(),
        uglify()
    ],
    external: [path.resolve('./components/texgen/index.js')],
    globals: {
        [path.resolve('./components/texgen/index.js')]: 'TG'
    }
}
