# extractjs

[![Build Status](https://travis-ci.org/princejwesley/extractjs.svg)](https://travis-ci.org/princejwesley/extractjs) [![npm version](https://badge.fury.io/js/extractjs.svg)](http://badge.fury.io/js/extractjs) [![Bower version](https://badge.fury.io/bo/extractjs.svg)](http://badge.fury.io/bo/extractjs) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

Extract/interpolate strings.

##Usage

###Node.js and Browserify

Install from npm

> npm install extractjs

```javascript

var extractjs = require('extractjs'),
    extractor = extractjs();

var captured = extractor("This is a {name} library",
    "This is a extractjs library");
// > { name: 'extractjs'}

```

#### Template Settings
##### Default Settings
```javascript
    var defaults = {
        startExtract: '{',
        endExtract: '}',
        extractors: { /* capture functions */ }
        initValue: void 0
    }
```

Templates can be redefined as below:
```javascript
var extractjs = require('extractjs'),
    settings = { startExtract: '[[', endExtract: ']]'}
    extractor = extractjs(settings);

var captured = extractor("This is [[name]], [[age]] years old", 
    "This is John, 26 years old");
// > { name: 'John', age: 26 } <-- age is no longer string

// Settings can be overridden at the time of extraction
var date = extractor("Date is |date|/|month|/|year|", "Date is 26/04/2015",
    { startExtract: '|', endExtract: '|'})
// > { date: 26, month: 4, year: 2015 }
```

Its possible to build a pattern before extract/interpolate data.
```javascript
var extractjs = require('extractjs'),
    extractor = extractjs();

var loginPattern = extractor("You are logged in as {name}.");

var name = loginPattern.extract('You are logged in as John. Last login: Today')
    .name;
// > John

var output = loginPattern.interpolate({name: 'John'});
//> You are loggin in as John.
```

extractors are used to override or manipulate captured values.
```javascript
var extractjs = require('extractjs'),
    settings = {
        extractors: {
            name: function(value) {
                var names = value.split(' ');
                return {
                    firstName: names[0],
                    lastName: value.substring(names[0].length).trim(),
                    fullName: value
                };
            }
        }
    },
    extractor = extractjs(settings);

var captured = extractor("This is {name}, {age} years old",
    "This is John Wesley, 26 years old");
// > { name: {
//      firstName: 'John',
//      lastName: 'Wesley',
//      fullName: 'John Wesley'
//     }, age: 26 }
```

###Web page
Access from window/global as extractjs.
