paramatize  = require('helpers/paramatize-object')
config      = require('config');
extend      = require('helpers/extend')

module.exports = function(url, events) {
    xhr     = new XMLHttpRequest();
    params  = paramatize({
        sessionId: config.sessionId,
        events: events
    });

    xhr.open('POST', encodeURI(url) + params);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Request succeeeded.')
        }
        else if (xhr.status !== 200) {
            console.log('Request failed.  Returned status of ' + xhr.status);
            console.log(xhr.response)
        }
    };
    xhr.send();
};
