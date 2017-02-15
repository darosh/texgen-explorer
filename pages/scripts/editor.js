'use strict';

var config;

var updateAll = function (v) {
};

function editor(cfg) {
    config = cfg;
    var workers = TG.getWorkers(config.worker, config.workers);
    var original = decodeParams(location.search.slice(3));
    var current = editorUpdated(original, workers);

    updateAll = function (v) {
        var x = {
            render: v.map(function (d) {
                return d.item;
            })
        };

        current = editorUpdated(x, workers);
    };

    d3.selectAll('[name="size"]')
        .on('click', function () {
            config.size = parseInt(this.value);
            updateAll(current);
        });

    d3.selectAll('[name="view"]')
        .on('click', function () {
            d3.select('body').attr('class', 'view-' + this.value);
        });

    d3.select('#button-save')
        .on('click', function () {
            addStorage({
                render: current.map(function (d) {
                    return d.item;
                })
            });
        });

    d3.select('#button-delete')
        .on('click', function () {
            removeStorage(original);
        });
}

function editorUpdated(v, workers) {
    config.total = 0;
    config.count = 0;

    d3.select('.status').text('');

    var fnc = TG.recipeToBody(v.render);
    d3.select('textarea#data').text(JSON.stringify(v.render, null, 2));
    d3.select('textarea#code').text(fnc);
    var canvas = d3.select('#img canvas').node();

    if (canvas.width !== config.size) {
        canvas.width = config.size;
        canvas.height = config.size;
    }

    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    d3.select('.time').html('&nbsp;');
    var worker = workers.worker();
    worker.onmessage = rendered;
    worker.postMessage({fnc: fnc, width: config.size, height: config.size});
    var components = mapComponents(v.render);
    updatePartsUi(components, workers);
    return components;
}

function mapComponents(render) {
    let parent = [];

    (render || []).forEach((p, i) => {
        if (!p) {
            return;
        }

        let on = TG.componentOnIndex(render, i);
        let to = TG.componentToIndex(render, i);

        parent.push({
            index: i,
            parent: parent,
            item: p,
            on: on,
            onFnc: on ? TG.recipeToBody(on) : null,
            to: to,
            toFnc: TG.recipeToBody(to)
        });
    });

    return parent;
}

function rendered(e) {
    var s = e.data.width;
    var wrap = d3.select(isNaN(e.data.id) ? '#img' : ('#id' + e.data.id + ' .' + e.data.target));
    var canvas = wrap.select('canvas').node();

    if (!canvas) {
        return;
    }

    if (canvas.width !== s) {
        canvas.width = s;
        canvas.height = s;
    }

    TG.bufferToCanvas(e.data.buffer, s, s, canvas);
    e.data.buffer = null;

    if (e.data.target) {
        wrap.select('a').attr('href', 'editor.html?' + 'e=' + encodeParams(e.data.formula));
    }

    canvas._fnc = e.data.fnc;

    wrap.select('.time').text(d3.format(',')(Math.round(e.data.time)) + ' ms');

    config.total += e.data.time;
    config.count++;
    d3.select('.status').html('images: <b>' + config.count + '</b><br>'
        + 'total: <b>' + d3.format(',')(Math.round(config.total)) + ' ms</b><br>'
        + 'average: <b>' + d3.format(',')(Math.round(config.total / config.count)) + ' ms</b>');
}

function updatePartsUi(components, workers) {
    var selection = d3.select('#editor').selectAll('.edit-component').data(components, function (d) {
        return d.index;
    });

    selection.exit().remove();

    var all = selection.enter()
        .append('div')
        .attr('class', 'edit-component')
        .attr('id', function (d, i) {
            return 'id' + i;
        });

    var block = all.append('div')
        .attr('class', 'block block-small a');

    block
        .append('a')
        .attr('target', '_blank')
        .append('canvas')
        .attr('width', config.smallSize)
        .attr('height', config.smallSize);

    block
        .append('div')
        .attr('class', 'time bottom')
        .html('&nbsp;');

    d3.selectAll('.a canvas').data(components).each(function (d, i) {
        if (!d.item.$hide) {
            if (this._fnc !== d.toFnc) {
                // this.getContext('2d').clearRect(0, 0, this.width, this.height);
                d3.select(this.parentElement.parentElement).select('.time').html('&nbsp;');
                var worker = workers.worker();
                worker.onmessage = rendered;
                worker.postMessage({
                    fnc: d.toFnc,
                    width: config.smallSize,
                    height: config.smallSize,
                    id: i,
                    target: 'a',
                    formula: {render: d.to}
                });
            }
        } else {
            this._fnc = null;
            d3.select(this.parentElement.parentElement).select('.time').html('&nbsp;');
            this.getContext('2d').clearRect(0, 0, this.width, this.height);
        }
    });

    block = all.append('div')
        .attr('class', 'block block-small b');

    block.append('a')
        .attr('class', 'b')
        .attr('target', '_blank')
        .append('canvas')
        .attr('width', config.smallSize)
        .attr('height', config.smallSize);

    block
        .append('div')
        .attr('class', 'time bottom')
        .html('&nbsp;');

    d3.selectAll('.b canvas').data(components).each(function (d, i) {
        if (d.on) {
            if (this._fnc !== d.onFnc) {
                // this.getContext('2d').clearRect(0, 0, this.width, this.height);
                d3.select(this.parentElement.parentElement).select('.time').html('&nbsp;');
                var worker = workers.worker();
                worker.onmessage = rendered;
                worker.postMessage({
                    fnc: d.onFnc,
                    width: config.smallSize,
                    height: config.smallSize,
                    id: i,
                    target: 'b',
                    formula: {render: d.on}
                });
            }
        } else {
            this._fnc = null;
            d3.select(this.parentElement.parentElement).select('.time').html('&nbsp;');
            this.getContext('2d').clearRect(0, 0, this.width, this.height);
        }
    });

    var entered = all.append('div').attr('class', 'sub-form');
    all = d3.selectAll('.sub-form').data(components);

    addSelectOperation(entered, all, TG.getSchema().definitions.operation.enum);
    addSelectProgram(entered, all, programs());
    addInputColor(entered, all);
    addRange(entered, all);
    addCheck(entered, all);
    addButtonUp(entered, all);
    addButtonDown(entered, all);
    addButtonPlus(entered, all);
    addButtonRemove(entered, all);
}

function programs() {
    var ret = [];

    Object.keys(TG.Programs).forEach(function (g) {
        Object.keys(TG.Programs[g]).forEach(function (p) {
            ret.push(p);
        })
    });

    return ret;
}

function addButtonRemove(entered, all) {
    var element = entered.append('button')
        .attr('class', 'topcoat-icon-button small button-remove');

    var icon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-0.5 0.5 42 42">'
        + '<path fill="rgba(0,0,0,0.87)" transform="translate(0,1)" d="M39.5,21.5v-3c0-1.48-0.43-2-2-2h-34c-1.48,0-2,0.49-2,2v3c0,1.55,0.52,2,2,2h34C39.01,23.5,39.5,23.02,39.5,21.5z"/>'
        + '</svg>';

    element.append('span')
        .attr('class', 'topcoat-icon')
        .style('background', 'url(\'data:image/svg+xml;utf8,' + icon + '\') no-repeat');

    all.select('.button-remove')
        .property('disabled', function (d) {
            return d.parent.length === 1;
        })
        .on('click', function (d) {
            d.parent.splice(d.parent.indexOf(d), 1);
            d3.select(this.parentElement.parentElement).remove();
            updateAll(d.parent);
        });
}

function addButtonUp(entered, all) {
    var element = entered.append('button')
        .attr('class', 'topcoat-icon-button small button-up');

    var icon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-0.5 0.5 42 42">' +
        '<path fill="rgba(0,0,0,0.87)" d="M15.5,40.5h10c2.529,0,3-0.529,3-3v-15h12l-20-20l-20,20h12v15C12.5,39.939,13,40.5,15.5,40.5z"/>' +
        '</svg>';

    element.append('span')
        .attr('class', 'topcoat-icon')
        .style('background', 'url(\'data:image/svg+xml;utf8,' + icon + '\') no-repeat');

    all.select('.button-up')
        .property('disabled', function (d) {
            return d.parent.indexOf(d) === 0;
        })
        .on('click', function (d) {
            var i = d.parent.indexOf(d);
            d.parent[i] = d.parent[i - 1];
            d.parent[i - 1] = d;
            updateAll(d.parent);
        });

    return element;
}

function addButtonDown(entered, all) {
    var element = entered.append('button')
        .attr('class', 'topcoat-icon-button small button-down');

    var icon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-0.5 0.5 42 42">' +
        '<path fill="rgba(0,0,0,0.87)" d="M25.5,2.5h-10c-2.53,0-3,0.529-3,3v15h-12l20,20l20-20h-12v-15C28.5,3.061,28,2.5,25.5,2.5z"/>' +
        '</svg>';

    element.append('span')
        .attr('class', 'topcoat-icon')
        .style('background', 'url(\'data:image/svg+xml;utf8,' + icon + '\') no-repeat');

    all.select('.button-down')
        .property('disabled', function (d) {
            return d.parent.indexOf(d) === (d.parent.length - 1);
        })
        .on('click', function (d) {
            var i = d.parent.indexOf(d);
            d.parent[i] = d.parent[i + 1];
            d.parent[i + 1] = d;
            updateAll(d.parent);
        });
}

function addButtonPlus(entered, all) {
    var element = entered.append('button')
        .attr('class', 'topcoat-icon-button small button-plus');

    var icon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="-0.5 0.5 42 42">' +
        '<path fill="rgba(0,0,0,0.87)" d="M39.5,22.5v-3c0-1.48-0.43-2-2-2h-13v-13c0-1.48-0.49-2-2-2h-3c-1.55,0-2,0.52-2,2v13h-14c-1.48,0-2,0.49-2,2v3 c0,1.55,0.52,2,2,2h14v14c0,1.51,0.48,2,2,2h3c1.48,0,2-0.43,2-2v-14h13C39.01,24.5,39.5,24.02,39.5,22.5z"/>' +
        '</svg>';

    element.append('span')
        .attr('class', 'topcoat-icon')
        .style('background', 'url(\'data:image/svg+xml;utf8,' + icon + '\') no-repeat');

    all.select('.button-plus')
        .on('click', function (d) {
            var p = d.parent;
            delete d.parent;
            var copy = JSON.parse(JSON.stringify(d));
            d.parent = p;
            d.parent.splice(d.parent.indexOf(d), 0, copy);
            updateAll(d.parent);
        });
}

function addInputColor(entered, all) {
    var wrap = entered.append('div')
        .attr('class', 'color-picker topcoat-button');

    wrap
        .append('input')
        .attr('type', 'color');

    all.select('.color-picker input')
        .on('change', function (d) {
            d3.select(this.parentElement).style('background-color', this.value);
            var c = d3.rgb(this.value);
            if (isNaN(d.item.tint[3])) {
                d.item.tint = [c.r / 255, c.g / 255, c.b / 255];
            } else {
                d.item.tint = [c.r / 255, c.g / 255, c.b / 255, d.item.tint[3]];
            }
            updateAll(d.parent);
        })
        .attr('value', function (d) {
            var c = getTintColor(d.item.tint);
            d3.select(this.parentElement).style('background-color', c);

            return c;
        });
}

function addSelectProgram(entered, all, data) {
    entered.append('select')
        .attr('class', 'topcoat-select select-program')
        .selectAll('option').data(data)
        .enter()
        .append('option')
        .text(function (d) {
            return d;
        });

    all.select('.select-program')
        .property('value', function (d) {
            return d.item.program.type;
        })
        .on('change', function (d) {
            changeProgramType(d.item.program, this.value)
            updateAll(d.parent);
        });
}

function addSelectOperation(entered, all, data) {
    entered
        .append('select')
        .attr('class', 'topcoat-select select-operation')
        .selectAll('option').data(data)
        .enter()
        .append('option')
        .text(function (d) {
            return d;
        });

    all.select('.select-operation')
        .on('change', function (d) {
            d.item.operation = this.value;
            updateAll(d.parent);
        })
        .property('value', function (d) {
            return d.item.operation;
        });
}

function addCheck(entered, all) {
    var label = entered.append('label')
        .attr('class', 'topcoat-checkbox');

    label.append('input')
        .attr('type', 'checkbox');

    label.append('div')
        .attr('class', 'topcoat-checkbox__checkmark');

    all.select('.topcoat-checkbox input')
        .property('checked', function (d) {
            return !d.item.$hide;
        })
        .on('click', function (d) {
            d.item.$hide = !d3.select(this).property('checked');
            updateAll(d.parent);
        });
}

function addRange(entered, all) {
    entered.append('input')
        .attr('class', 'topcoat-range opacity')
        .attr('min', 0)
        .attr('max', 1)
        .attr('type', 'range')
        .attr('step', 0.05);

    all.select('.opacity')
        .property('value', function (d) {
            return d.item.tint.length > 3 ? d.item.tint[3] : 1;
        })
        .on('change', function (d) {
            d.item.tint[3] = parseFloat(this.value);
            updateAll(d.parent);
        });
}
