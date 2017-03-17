var helperVar="This is helper Class";
var toMb = function (f) {
  return (Math.round((f / 1024 / 1024) * 100) / 100);
}
module.exports.toMb=toMb;
module.exports.helperVar=helperVar;