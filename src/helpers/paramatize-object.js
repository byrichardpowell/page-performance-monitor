// http://stackoverflow.com/questions/6566456/how-to-serialize-a-object-into-a-list-of-parameters#answer-6566471
module.exports = function(obj) {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=";
        str += (typeof obj[key] === 'object') ? JSON.stringify(obj[key]) : encodeURIComponent(obj[key]);
    }
    return "?" + str;
}
