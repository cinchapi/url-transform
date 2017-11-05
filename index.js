'use strict';

var parse = require('url-parse');

console.log(parse("https://app.cinchapi.engineering/analyze/name, email, company, phone_number, age, job_title, salary, years_employed, friends WHERE salary > 1?results-data-view=charts"));
