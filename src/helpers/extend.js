getKeys = require('helpers/keys')

module.exports = function(obj1, obj2) {
    keys = getKeys(obj2)

    for (i = 0; i < keys.length; i++) {
        obj1[keys[i]] = obj2[keys[i]]
    }

    console.log(obj1)

    return obj1
}
