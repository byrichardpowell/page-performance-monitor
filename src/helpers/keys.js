// http://stackoverflow.com/questions/3068534/getting-javascript-object-key-list#3068534
module.exports = function(obj) {
    var keys = [];
    for(var k in obj) keys.push(k);
    return keys
}
