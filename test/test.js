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

describe('url-transform', function() {
  'use strict'

  var assume = require('assume');
  var transform = require('../');

  it('exposes transform as a function', function() {
    assume(transform).is.a('function');
  });

  it('can transform with no variables', function() {
    var url = "https://app.cinchapi.engineering/analyze/which%20contacts%20have%20worked%20at%20the%20same%20company%20for%20a%20while?results-data-view=charts"
    var pattern = "https://google.com";
    var transformed = transform(url, pattern);
    assume(transformed).equals("https://google.com");
  });

  it('can transform with full replace', function() {
    var url = "https://app.cinchapi.engineering/analyze/which%20contacts%20have%20worked%20at%20the%20same%20company%20for%20a%20while?results-data-view=charts"
    var pattern = "https://app.cinchapi.com$pathname";
    var transformed = transform(url, pattern);
    assume(transformed).equals("https://app.cinchapi.com/analyze/which%20contacts%20have%20worked%20at%20the%20same%20company%20for%20a%20while");
  });

  it('can transform with partial replace', function() {
    var url = "https://app.cinchapi.engineering/analyze/which%20contacts%20have%20worked%20at%20the%20same%20company%20for%20a%20while?results-data-view=charts"
    var pattern = "https://account.$hostname(1)";
    var transformed = transform(url, pattern);
    assume(transformed).equals("https://account.cinchapi.engineering");
  });

  it('can transform with range replace', function() {
    var url = "https://app.staging.cinchapi.engineering/analyze/which%20contacts%20have%20worked%20at%20the%20same%20company%20for%20a%20while?results-data-view=charts"
    var pattern = "https://account.$hostname(1,2).com";
    var transformed = transform(url, pattern);
    assume(transformed).equals("https://account.staging.cinchapi.com");
  });

  it('can transform with all kind of variables', function () {
    var url = "https://app.staging.cinchapi.engineering/analyze/which%20contacts%20have%20worked%20at%20the%20same%20company%20for%20a%20while?results-data-view=charts"
    var pattern = "https://account.$hostname(1,2).com/$pathname(1,1)/$hostname";
    var transformed = transform(url, pattern);
    assume(transformed).equals("https://account.staging.cinchapi.com/analyze/app.staging.cinchapi.engineering");
  });

  it('can work with localhost URLs', function() {
    var url = "http://localhost:32478/analyze/name,%20email,%20company,%20phone_number,%20age,%20job_title,%20salary,%20years_employed,%20friends%20WHERE%20salary%20%3E%201"
    var pattern = "http://account.$hostname";
    var transformed = transform(url, pattern);
    assume(transformed).equals('http://account.localhost');
  });

});
