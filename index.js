var path = require('path');
var fs = require('fs');
var loaderUtils = require('loader-utils');

module.exports = function(source) {

  this.cacheable();

  var pattern = /__\(\'(.*)\'\)/g
  var translations = source.match(pattern);

  var loaderOptions = loaderUtils.parseQuery(this.query);
  var output = loaderOptions.hasOwnProperty('output') ? loaderOptions.output : __dirname

  var translationsPath = path.resolve(output + '/jsx-translations.js');
  this.addDependency(translationsPath);

  if (translations) {

    try {    
      var data = fs.readFileSync(translationsPath, 'utf8')
      translations = translations.concat(data.split('\n')).join('\n');
      
    } catch (e){
      translations = translations.join('\n')
    }

    fs.writeFileSync(translationsPath, translations);
  }

  return source;
}
