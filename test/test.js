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
});
