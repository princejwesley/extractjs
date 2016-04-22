/*!The MIT License (MIT)

Copyright (c) 2015 Prince John Wesley (princejohnwesley@gmail.com)
**/
;(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.extractjs = factory();
  }
}(this, function(undefined) {
  'use strict';

  var defaults = {
    startExtract: '{',
    endExtract: '}',
    initValue: undefined,
    extractors: {}
  };

  function escapseRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function overrideProperties(dest, src) {
    dest.startExtract = src.startExtract && src.startExtract.length ? src.startExtract :
      defaults.startExtract;
    dest.endExtract = src.endExtract && src.endExtract.length ? src.endExtract : defaults
      .endExtract;
    dest.initValue = src.initValue;
    dest.extractors = src.extractors ? src.extractors : defaults.extractors;
  }

  function clone(o) {
    var output = {},
      attr;
    for (attr in o) {
      //string & numbers are immutatble
      output[attr] = o[attr];
    }
    return output;
  }


  function extract(context) {

    return function(template, input, settings) {

      if (typeof template !== 'string') throw 'Expected string template, Found ' + (typeof template);
      var result = {};
      var properties = {};
      var keys = [],
        match, idx, pattern = '',
        loc = 0;

      overrideProperties(properties, settings || context);

      var extractorPattern = new RegExp(escapseRegExp(properties.startExtract) + '(.*?)' +
        escapseRegExp(properties.endExtract), 'g');

      template.replace(extractorPattern, function(match, token, offset, str) {
        token = token.trim();
        if (token !== '') {
          result[token] = properties.initValue;
          keys.push(token);
        }
        pattern += escapseRegExp(str.substring(loc, offset));
        loc = offset + match.length;

        if (token === '') return '';
        pattern += '((?:.*?|\r?\n?)*)';
        if (offset + match.length !== str.length) return '';
        pattern += '$';
        return '';
      });

      if (loc < template.length) {
        pattern += escapseRegExp(template.substring(loc));
      }

      if (typeof input !== 'string') {
        return {
          'extract': matcher,
          'bind': interpolate,
          'interpolate': interpolate
        };
      }

      function defaultExtractor(input) {
        return +input && parseInt(input) ? +input : input;
      }

      function extractor(output, token, value) {
        var fun = output.extractors[token] || defaultExtractor;
        if(typeof fun !== 'function')
          return value;
        return fun(value);
      }

      function interpolate(o) {
        var token, output = template,
          pattern;
        var endExtract = escapseRegExp(properties.endExtract);
        var startExtract = escapseRegExp(properties.startExtract);
        for (token in o) {
          if (result.hasOwnProperty(token)) {
            pattern = new RegExp(startExtract + '\\s*' + escapseRegExp(token) + '\\s*' +
              endExtract, 'g');
            output = output.replace(pattern, o[token]);
          }
        }
        for (token in result) {
          pattern = new RegExp(startExtract + escapseRegExp(token) + endExtract, 'g');
          output = output.replace(pattern, properties.initValue);
        }
        return output;
      }

      function matcher(input) {
        var output = clone(result);
        if (typeof input !== 'string') return output;
        match = input.match(pattern);
        if (match) {
          match.shift();
          for (idx in keys) {
            output[keys[idx]] = extractor(properties, keys[idx], match[idx]);
          }
        }
        return output;
      }

      pattern = new RegExp(pattern);
      return matcher(input);
    };
  }
  return function(settings) {
    var context = {};
    if (settings) overrideProperties(context, settings);
    else context = defaults;
    return extract(context);
  };
}));
