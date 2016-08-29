var isFunction  = require('helpers/is-function')
var Config      = require('config.js')

var setNavigationStart = function() {
    if (!window.performance.timing) {
        try {
            return sessionStorage.setItem('navigationStart', Date.now());
        } catch (e) {}
    }
};

var getResults = function(callback) {
    return setTimeout(function() {
        var results = (window.performance.timing) ? window.performance.timing : {}

        results['crossBrowserLoadEvent'] = Date.now();

        if (window.chrome && window.chrome.loadTimes && window.chrome.loadTimes()) {
            results['chromeFirstPaintTime'] = Math.round(window.chrome.loadTimes().firstPaintTime * 1000);
        }

        if (!window.performance.timing) {
            var navStart = (function() {
                try {
                    return sessionStorage.getItem('navigationStart');
                } catch (e) {}
            })();
            if (navStart) {
                results['simulatedNavigationStart'] = parseInt(navStart, 10);
            }
        }

        parseResults(results, callback)
    }, 0);
};

var parseResults = function(results, callback) {
    callback({
        tag: "load",
        x: results.navigationStart || Config.startX,
        y: {
            unloadEnd:              (results.unloadEventStart - results.navigationStart) < 0 ? 0 : results.unloadEventStart - results.navigationStart,
            redirectEnd:            (results.redirectEnd || results.navigationStart)  - results.navigationStart,
            requestStart:           results.requestStart - results.navigationStart,
            responseEnd:            results.responseEnd - results.navigationStart,
            domLoading:             results.domLoading - results.navigationStart,
            domInteractive:         results.domInteractive - results.navigationStart,
            domContentLoadedEnd:    results.domContentLoadedEventEnd - results.navigationStart,
            domComplete:            results.domComplete - results.navigationStart,
            loadEnd:                (results.loadEventEnd || crossBrowserLoadEvent) - results.navigationStart
        }
    })
}

module.exports = function(callback) {

    if (window.addEventListener) {
        var addEventListener = 'addEventListener';
    } else if (window.attachEvent) {
        var addEventListener = 'attachEvent';
    }

    if (!isFunction(callback)) {
        callback = function(results) {
            console.warn('PagePerf: no callback provided for load time. To record results please provide a reporter')
            console.info('PagePerf: load time results:', results.events)
        }
    }

    window[addEventListener]('pagehide', setNavigationStart);
    window[addEventListener]('load', getResults(callback));
}
