/*
 * Copyright (c) 2017 Cinchapi Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var parse = require('url-parse');

var separators = new Object();
separators["hostname"] = ".";
separators["pathname"] = "/";
separators["query"] = "&";

/**
 * Transform a URL based on a specified pattern, using variable substition.
 * <p>
 * <h2>Variable Patterns</h2>
 * <ul>
 * <li>$variable</li> - Selects the entire variable from the URL.
 * <li>$variable(start)</li> - Selects all the components of the variable from the URL, starting at index {@code start}.
 * <li>$variable(start,end)</li> - Selects the components of the variables from the URL, starting at index {@code start} and ending with {@code end} (both inclusive).
 * </ul>
 * </p>
 * <h2>Variables</h2>
 * Generally speaking, variables made availabe via the url-parse library can be
 * added to the pattern using the rules specified above. There is explicit support for
 * <ul>
 * <li>hostname</li> - host name without port number
 * <li>pathname</li> - URL path
 * </ul>
 * </p>
 * <p>
 * <h2>Variable Components<h2>
 * Some variables can be referenced by indivdual components. For example, the hostname can be selected in its entirety or granularly by specifying specific parts of the hostname using the "." as a separator. 
 * </p>
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
