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
  }

  function extract(template, input, settings) {
    if (typeof template !== 'string') throw 'Expected string template, Found ' + (typeof template);
    var result = {};
    var properties = {};
    var keys = [],
      match, idx, val;

    overrideProperties(properties, settings || defaults);

    var extractorPattern = new RegExp(escapseRegExp(properties.startExtract) + '(.*?)' +
      escapseRegExp(properties.endExtract), 'g');

    var pattern = template.replace(extractorPattern, function(match, token, offset, str) {
      if (token !== '') {
        result[token] = properties.initValue;
        keys.push(token);
      }
      if (token === '') return '';
      if (offset + match.length === str.length) return '(.*?)$';
      return '(.*?)';
    });

    if (!input || typeof input !== 'string') return matcher;

    function matcher(input) {
      if (!input || typeof input !== 'string') return result;
      match = input.match(pattern);
      if (match) {
        match.shift();
        for (idx in keys) {
          val = match[idx]
          result[keys[idx]] = +val ? +val : val;
        }
      }
      return result;
    }

    return matcher(input);
  }

  return function(settings) {
    if (settings) overrideProperties(defaults, settings);
    return extract;
  };
}));
