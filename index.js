module.exports = function(source) {
  var re = /__\(\'(.*)\'\)/g
  var found = source.match(re);
  if (found) { console.log(found) }
  return source;
}
