# extractjs [![Build Status](https://travis-ci.org/princejwesley/extractjs.svg)](https://travis-ci.org/princejwesley/extractjs)
Extract string from input and bind it to variable

##Usage

###Node.js and Browserify

Install from npm

> npm install extractjs

```javascript

var extractjs = require('extractjs'),
    extractor = extractjs();

var captured = extractor("This is a {name} library", "This is a extractjs library");
// > { name: 'extractjs'}

```

#### Template Settings
##### Default Settings
```javascript
    var defaults = {
        startExtract: '{',
        endExtract: '}',
        initValue: void 0
    }
```

Templates can be redefined as below:
```javascript
var extractjs = require('extractjs'),
    settings = { startExtract: '[[', endExtract: ']]'}
    extractor = extractjs(settings);

var captured = extractor("This is [[name]], [[age]] years old", "This is John, 26 years old");
// > { name: 'John', age: 26 } <-- age is no longer string

// Settings can be overridden at the time of extraction
var date = extractor("Date is |date|/|month|/|year|", "Date is 26/04/2015", { startExtract: '|', endExtract: '|'})
// > { date: 26, month: 4, year: 2015 }
```

Its possible to build a pattern before extract/interpolate data.
```javascript
var extractjs = require('extractjs'),
    extractor = extractjs();

var loginPattern = extractor("You are logged in as {name}.");

var name = loginPattern.extract('You are logged in as John. Last login: Yesterday').name;
// > John

var output = loginPattern.interpolate({name: 'John'}); // Alias 'bind' -> interpolate
//> You are loggin in as John.
```

###Web page
Access from window/global as extractjs.
