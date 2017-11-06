var transform = require('.');

console.log(transform("https://app.cinchapi.engineering/analyze/name, email, company, phone_number, age, job_title, salary, years_employed, friends WHERE salary > 1?results-data-view=chart", "account.$hostname(1)/$pathname/$hostname(1,2)/$hostname(0,4)"))
