'use strict';

var config;

function explorer(cfg) {
    config = cfg;
    config.list = list;
    config.total = 0;
    config.count = 0;
    var workers = TG.getWorkers(config.worker, config.workers);

    for (var i = 0; i < config.limit; i++) {
        d3.select('#list')
            .append('div')
            .attr('id', 'id' + i)
            .attr('class', 'block')
            .style('display', 'none')
            .append('a')
            .attr('target', '_blank')
            .append('canvas')
            .attr('width', config.size[0])
            .attr('height', config.size[1]);
    }

    var count = 0;

    function iter() {
        if (count++ >= config.limit) {
            return;
        }

        var random = TG.getRandom();
        var fnc = TG.recipeToBody(random.render);
        var worker = workers.worker();
        worker.onmessage = function (e) {
            if (e.data.passed) {
                rendered(e)
            } else {
                count--;
                count--;
                iter();
            }
        };
        worker.postMessage({
            fnc: fnc,
            width: config.size[0],
            height: config.size[1],
            test: config.testSize,
            formula: random
        });
        iter();
    }

    iter();

    d3.select('#refresh').on('click', function () {
        count = 0;
        config.count = 0;
        config.total = 0;
        d3.selectAll('.block').style('display', 'none');
        iter();
    });
}

function rendered(e) {
    var w = e.data.width;
    var h = e.data.height;

    if (w !== config.size[0] || h !== config.size[1]) {
        return;
    }

    var canvas = d3.select('#id' + config.count + ' canvas').node();

    if ((canvas.width) !== w || (canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
    }

    TG.bufferToCanvas(e.data.buffer, w, h, canvas);

    var block = d3.select('#id' + config.count);
    block.style('display', null)
        .select('a')
        .attr('href', './pages/editor.html?' + 'e=' + encodeParams(e.data.formula));

    config.total += e.data.time;
    config.count++;
    d3.select('.status').html('images: <b>' + config.count + '</b>'
        + ', total: <b>' + d3.format(',')(Math.round(config.total)) + ' ms</b>'
        + ', average: <b>' + d3.format(',')(Math.round(config.total / config.count)) + ' ms</b>');
}
