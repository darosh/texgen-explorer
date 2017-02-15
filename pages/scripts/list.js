'use strict';

var config;

function renderList(list, cfg) {
    config = cfg;
    config.list = list;
    config.count = 0;
    config.total = 0;
    var workers = TG.getWorkers(config.worker, config.workers);
    var wrap = d3.select('#list');

    config.list.forEach(function (recipe, i) {
        var err;

        try {
            var fnc = TG.recipeToBody(recipe.render, config.proportional);
        } catch (ign) {
            err = ign || true;
        }

        var block = wrap.append('div')
            .attr('class', 'block')
            .attr('id', 'id' + i);
        block.append('div')
            .attr('class', 'clear');
        block.append('a')
            .attr('target', '_blank')
            .attr('href', './editor.html?' + 'e=' + encodeParams(recipe))
            .append('canvas')
            .attr('width', config.size[0])
            .attr('height', config.size[1]);
        block.append('div')
            .attr('class', 'title bottom')
            .text('#' + (recipe.id ? recipe.id : (i + 1)));
        block.append('div')
            .attr('class', 'time bottom')
            .html('&nbsp;');

        if (!err) {
            var worker = workers.worker();
            worker.onmessage = rendered;
            worker.postMessage({fnc: fnc, width: config.size[0], height: config.size[1], id: i});
        }
    });

    d3.selectAll('[name="size"]').on('click', function () {
        var s = this.value.split(',');
        config.size = [parseInt(s[0]), parseInt(s[1])];
        update();
    });

    d3.select('#proportional').on('click', function () {
        config.proportional = d3.select(this).property('checked');
        update();
    });

    function update() {
        config.count = 0;
        config.total = 0;
        workers.terminate();
        workers = TG.getWorkers(config.worker, config.workers);

        config.list.forEach(function (recipe, i) {
            var worker = workers.worker();
            var fnc = TG.recipeToBody(recipe.render, config.proportional);

            var canvas = d3.select('#id' + i + ' canvas').node();

            if ((canvas.width) !== config.size[0] || (canvas.height !== config.size[1])) {
                canvas.width = config.size[0];
                canvas.height = config.size[1];
            }

            worker.onmessage = rendered;
            worker.postMessage({fnc: fnc, width: config.size[0], height: config.size[1], id: i});
        });
    }
}

function rendered(e) {
    var w = e.data.width;
    var h = e.data.height;

    if (w !== config.size[0] || h !== config.size[1]) {
        return;
    }

    var canvas = d3.select('#id' + e.data.id + ' canvas').node();

    if ((canvas.width) !== w || (canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
    }

    TG.bufferToCanvas(e.data.buffer, w, h, canvas);
    e.data.buffer = null;
    d3.select('#id' + e.data.id).select('.time').text(d3.format(',')(Math.round(e.data.time)) + ' ms');
    config.total += e.data.time;
    config.count++;
    d3.select('.status').html('images: <b>' + config.count + '</b>'
        + ', total: <b>' + d3.format(',')(Math.round(config.total)) + ' ms</b>'
        + ', average: <b>' + d3.format(',')(Math.round(config.total / config.count)) + ' ms</b>');
}
