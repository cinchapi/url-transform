# url-transform
A node module to transform URLs.

## Installation
This module is based on [url-parse](https://github.com/unshiftio/url-parse) and is therefore designed to be used with either browserify or Node.js.
```bash
npm install @cinchapi/url-transform
```
You can also declare the dependency in the `package.json` file
```
"dependencies": {
    "@cinchapi/url-transform": "^1.0.0"
}
```

## Usage
All examples assume the module is bootstrapped using:
```javascript
'use strict'

var transform = require('url-transform');
```
