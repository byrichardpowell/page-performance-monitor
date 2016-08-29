post    = require('helpers/post');
extend  = require('helpers/extend');

module.exports = function(events) {
    post(config.endpoint, extend({unit: 'ms'}, events));
};
