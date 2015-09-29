# lex-compare
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Code Climate](https://codeclimate.com/github/voltrevo/lex-compare/badges/gpa.svg)](https://codeclimate.com/github/voltrevo/lex-compare)
> Implements lexicographical comparison.


## Install

```sh
$ npm install --save lex-compare
```


## Usage

```js
'use strict';

// You need to call lexCompare to get a comparator. It takes an element
// comparator as an optional argument.
var lexCompare = require('lex-compare')();

var superArray = [
  [1, 20, 3],
  [1, 3, 7],
  [5, 7, 8]
];

console.log(superArray.sort(lexCompare));
// [ [1,  3, 7],
//   [1, 20, 3],
//   [5,  7, 8] ]
```

```js
'use strict';

// Takes arrays of strings and compares them lexicographically by the position
// of 't' in each string.
var tPosLexComparator = require('lex-compare')(function(a, b) {
  var aPos = a.indexOf('t');
  var bPos = b.indexOf('t');
  
  return (aPos < bPos ? -1 : aPos > bPos ? 1 : 0);
});

console.log(
  // -1 because [0] < [3]
  tPosLexComparator(['tetris'], ['flute']),
  
  // 1 because [0, 1] > [0, 0]
  tPosLexComparator(['tetris', 'strobe'], ['trail', 'top'])
);
```

```js
'use strict';

var assert = require('assert');
var lexCompare = require('lex-compare');

var compareVersions = (function() {
  var lc = lexCompare();
  var regex = /^[0-9]+.[0-9]+.[0-9]+$/;
  
  return function(vA, vB) {
    assert(regex.test(vA) && regex.test(vB));
    
    return lc(
      vA.split('.').map(Number),
      vB.split('.').map(Number)
    );
  };
})();

console.log(
  compareVersions('1.0.0', '1.1.1'), // -1
  compareVersions('1.20.0', '1.7.0') // 1
);
```

## License

MIT © [Andrew Morris](http://andrewmorris.io/)


[npm-image]: https://badge.fury.io/js/lex-compare.svg
[npm-url]: https://npmjs.org/package/lex-compare
[travis-image]: https://travis-ci.org/voltrevo/lex-compare.svg?branch=master
[travis-url]: https://travis-ci.org/voltrevo/lex-compare
[daviddm-image]: https://david-dm.org/voltrevo/lex-compare.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/voltrevo/lex-compare
[coveralls-image]: https://coveralls.io/repos/voltrevo/lex-compare/badge.svg
[coveralls-url]: https://coveralls.io/r/voltrevo/lex-compare
