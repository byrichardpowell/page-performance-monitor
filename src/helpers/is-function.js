//  http://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type#answer-6000016
module.exports = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}
