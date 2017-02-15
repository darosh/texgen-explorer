# texgen

Procedural Texture Generator

Modified version of https://github.com/mrdoob/texgen.js

## Changes

* refactored to _ES6 modules_ and _classes_, using [rollup.js](http://rollupjs.org/) bundling
* added [advanced operations](./operations/advanced.js)
* added [SimplexNoise](./programs/generators/SimplexNoise.js), [Distort](./programs/filters/Distort.js), ...
* added layer optional alpha opacity ```Texture.tint(r, g, b, [a])```
* added ```Program.params.param.type``` types ```TG.Type``` and ```Program.examples```
* consolidated program and param [names](./test-params.html)
