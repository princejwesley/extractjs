# extractjs
Extract string from input and bind it to variable

##Usage

###Node.js and Browserify

Install from npm

> npm install extractjs

```javascript

var extractjs = require('extractjs'),
    extract = extractjs();

var captured = extract("This is a {name} library", "This is a extractjs library");
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
    extract = extractjs(settings);

var captured = extract("This is [[name]], [[age]] years old", "This is John, 26 years old");
// > { name: 'John', age: 26 } <-- age is no longer string

// Settings can be overridden at the time of extraction
var date = extract("Date is |date|/|month|/|year|", "Date is 26/04/2015", { startExtract: '|', endExtract: '|'})
// > { date: 26, month: 4, year: 2015 }
```

Its possible to build a pattern before extract data.
```javascript
var loginPattern = extract("You are logged in as {name}.");

var name = loginPattern('You are logged in as John. Last login: Yesterday').name;
// > John
```

###Web page
Access from window/global as extractjs.


#TODO unit tests