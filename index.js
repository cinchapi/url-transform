'use strict';

var parse = require('url-parse');

var separators = new Object();
separators["hostname"] = ".";
separators["pathname"] = "/";
separators["query"] = "&";

/**
 *
 */
function transform(url, pattern) {
  var components = parse(url, true)
  var regex;
  var match;

  var regexs = [
    new RegExp(/\$(\w+)\((\d+),(\d+)\)/g), // $variable(start,end)
    new RegExp(/\$(\w+)\((\d+)\)/g), // $variable(start)
    new RegExp(/\$(\w+)/g) // $variable
  ];
  regexs.forEach(function(regex){
    var match;
    while((match = regex.exec(pattern)) !== null) {
      var search = match[0];
      var variable = match[1];
      var start = match[2];
      var end = match[3];
      var replace = "";
      if(start !== undefined) {
        var separator = separators[variable];
        var parts = components[variable].split(separator);
        end = end !== undefined ? Number(end) + 1 : parts.length;
        for(var i = start; i < end; i++) {
          replace += parts[i] + separator;
        }
        replace = replace.substring(0, replace.length - 1);
      }
      else {
        replace = components[variable];
      }
      pattern = pattern.replace(search, replace);
    }
  });

  return pattern;
}

module.exports = transform;
