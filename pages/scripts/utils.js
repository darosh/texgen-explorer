'use strict';

var defaultRecipe = {
    render: [{
        program: {
            type: 'Number'
        },
        tint: [.5, .5, .5]
    }]
};

function decodeParams(str) {
    return JSON.parse(decodeURIComponent(str).replace(/([$a-zA-Z0-9]+):/g, '"$1":').replace(/\*/g, '"') || JSON.stringify(defaultRecipe));
}

function encodeParams(obj) {
    if (!obj || !obj.render) {
        return '';
    }

    obj.render.forEach(function (d) {
        if (d && d.$hide) {
            delete d.$hide;
        }
    });

    return JSON.stringify({id: obj.id, render: obj.render}).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '*');
}

function getTintColor(tint) {
    return '#' + tint.slice(0, 3).map(function (v) {
            return ('0' + Math.round(v * 255).toString(16)).slice(-2)
        }).join('');

}

function getStorage() {
    var list = JSON.parse(localStorage.getItem('TG') || '[]');

    return {
        list: list,
        id: maxId(list)
    };
}

function addStorage(obj) {
    var list = JSON.parse(localStorage.getItem('TG') || '[]');
    var id = maxId(list);
    obj.id = ++id;
    list.unshift(obj);
    localStorage.setItem('TG', JSON.stringify(list));

    return {
        list: list,
        id: id
    };
}

function removeStorage(obj) {
    var list = JSON.parse(localStorage.getItem('TG') || '[]');

    var f = list.filter(function (d) {
        return d.id === obj.id;
    });

    if (f[0]) {
        list.splice(list.indexOf(f[0]), 1);
    }

    localStorage.setItem('TG', JSON.stringify(list));

    return {
        list: list
    };
}

function maxId(list) {
    var id = 0;
    var missing = false;

    list.forEach(function (l) {
        if (l && l.id) {
            id = Math.max(id, l.id);
        } else {
            missing = true;
        }
    });

    if (missing) {
        list.reverse();
        list.forEach(function (l, i) {
            if (!(l && l.id)) {
                list[i] = list[i] || {};
                list[i].id = ++id;
            }
        });
        list.reverse();
    }

    return id;
}

function changeProgramType(program, type) {
    var params = TG[type].params;

    if (params) {
        Object.keys(params).forEach(function (name) {
            var param = params[name];

            if (isNaN(program[name])) {
                program[name] = param.val;
            } else {
                var sourceVal = program[name];
                var targetVal = param.val;

                if (param.type === TG.Type.COLOR_POINT) {
                    program[name] = program[name];
                } else if (Array.isArray(sourceVal) && !Array.isArray(targetVal)) {
                    program[name] = program[name][0];
                } else if (!Array.isArray(sourceVal) && !Array.isArray(targetVal)) {
                    program[name] = [program[name], program[name]];
                } else {
                    program[name] = program[name];
                }
            }
        });
    }

    program.type = type;
}

// http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
function deepCompare() {
    var i, l, leftChain, rightChain;

    function compare2Objects(x, y) {
        var p;

        // remember that NaN === NaN returns false
        // and isNaN(undefined) returns true
        if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
            return true;
        }

        // Compare primitives and functions.
        // Check if both arguments link to the same object.
        // Especially useful on the step where we compare prototypes
        if (x === y) {
            return true;
        }

        // Works in case when functions are created in constructor.
        // Comparing dates is a common scenario. Another built-ins?
        // We can even handle functions passed across iframes
        if ((typeof x === 'function' && typeof y === 'function') ||
            (x instanceof Date && y instanceof Date) ||
            (x instanceof RegExp && y instanceof RegExp) ||
            (x instanceof String && y instanceof String) ||
            (x instanceof Number && y instanceof Number)) {
            return x.toString() === y.toString();
        }

        // At last checking prototypes as good as we can
        if (!(x instanceof Object && y instanceof Object)) {
            return false;
        }

        if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
            return false;
        }

        if (x.constructor !== y.constructor) {
            return false;
        }

        if (x.prototype !== y.prototype) {
            return false;
        }

        // Check for infinitive linking loops
        if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
            return false;
        }

        // Quick checking of one object being a subset of another.
        // todo: cache the structure of arguments[0] for performance
        for (p in y) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }
        }

        for (p in x) {
            if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                return false;
            }
            else if (typeof y[p] !== typeof x[p]) {
                return false;
            }

            switch (typeof (x[p])) {
                case 'object':
                case 'function':

                    leftChain.push(x);
                    rightChain.push(y);

                    if (!compare2Objects(x[p], y[p])) {
                        return false;
                    }

                    leftChain.pop();
                    rightChain.pop();
                    break;

                default:
                    if (x[p] !== y[p]) {
                        return false;
                    }
                    break;
            }
        }

        return true;
    }

    if (arguments.length < 1) {
        return true; //Die silently? Don't know how to handle such case, please help...
        // throw "Need two or more arguments to compare";
    }

    for (i = 1, l = arguments.length; i < l; i++) {

        leftChain = []; //Todo: this can be cached
        rightChain = [];

        if (!compare2Objects(arguments[0], arguments[i])) {
            return false;
        }
    }

    return true;
}
