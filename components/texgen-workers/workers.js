export function getWorkers(path, max) {
    var workers = [];
    var waiting = [];

    function worker() {
        var free = workers.filter(function (d) {
            return d.free;
        });

        if (free.length) {
            free[0].free = false;
            return free[0];
        }

        var w = wrap(!(workers.length < max));
        w.free = false;

        if (workers.length < max) {
            workers.push(w);
        } else {
            waiting.push(w);
        }

        return w;
    }

    function wrap(queue) {
        var o = {
            free: true,
            worker: queue ? null : new Worker(path),
            onmessage: null,
            toBePosted: null,
            postMessage: postMessage
        };

        function postMessage(msg) {
            if (o.worker) {
                o.worker.onmessage = function (e) {
                    o.onmessage(e);

                    setTimeout(function () {
                        o.free = true;
                        o.toBePosted = null;
                        o.onmessage = null;

                        if (waiting.length) {
                            o.free = false;
                            var w = waiting.shift();
                            o.onmessage = w.onmessage;
                            o.postMessage(w.toBePosted);
                        }
                    });
                };
                o.worker.postMessage(msg);
            } else {
                o.toBePosted = msg;
            }
        }

        return o;
    }

    return {
        worker: worker,
        terminate: function () {
            waiting = [];
            workers.forEach(function (o) {
                if(o.worker) {
                    o.worker.onmessage = null;
                    o.worker.terminate();
                    o.worker = null;
                }
            });
            workers = [];
        }
    }
}
