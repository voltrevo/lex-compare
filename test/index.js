'use strict';

/* global describe it */

var assert = require('assert');
var lexCompare = require('../lib');

describe('lex-compare', function() {
  var lc = lexCompare();

  it('should return 0 for equal inputs', function() {
    assert.strictEqual(lc([], []), 0);
    assert.strictEqual(lc([0], [0]), 0);
    assert.strictEqual(lc([1, 2, 3], [1, 2, 3]), 0);
    assert.strictEqual(lc(['one', 2, 'three'], [1, 2, 'three']), 0);
  });

  it('should order by first unequal element', function() {
    assert.strictEqual(lc([1, 2, 3], [1, 2, 4]), -1);
    assert.strictEqual(lc([1, 2, 3], [1, 2, 2]), 1);

    assert.strictEqual(lc([1, 2, 9], [1, 5, 3]), -1);
    assert.strictEqual(lc([1, 5, 3], [1, 2, 9]), 1);

    assert.strictEqual(lc([1, 9, 9], [5, 2, 3]), -1);
    assert.strictEqual(lc([5, 2, 3], [1, 9, 9]), 1);
  });

  it('shorter arrays come first', function() {
    assert.strictEqual(lc([1, 2, 3], [1, 2, 3, 4]), -1);
    assert.strictEqual(lc([1, 2, 3, 4], [1, 2, 3]), 1);

    assert.strictEqual(lc([], [0]), -1);
    assert.strictEqual(lc([0], []), 1);
  });

  it('supports custom comparison function for elements', function() {
    var strlenCmp = function(a, b) {
      var lenA = a.length;
      var lenB = b.length;

      return (lenA < lenB ? -1 : lenA > lenB ? 1 : 0);
    };

    // Compares arrays of strings. Only looks at string lengths.
    var lexStrlenCmp = lexCompare(strlenCmp);

    // Equal inputs produce 0
    assert.strictEqual(lexStrlenCmp(['one', 'two', 'three'], ['one', 'two', 'three']), 0);

    // Can produce a different result than default
    assert.strictEqual(lc(['eggs'], ['ham']), -1);
    assert.strictEqual(lexStrlenCmp(['eggs'], ['ham']), 1);

    // Elements deep in the array can still make a difference when earlier elements were not equal
    // under standard comparison, but are equal under custom comparison
    // (e.g. 'foo' !== 'bar' but lexStrlenCmp('foo', 'bar') === 0)
    assert.strictEqual(
      lexStrlenCmp(
        ['foo', 'blue', 'phoenix'],
        ['bar', 'grey', 'disk']
      ),
      1
    );

    assert.strictEqual(
      lexStrlenCmp(
        ['foo', 'blue', 'phoenix'],
        ['bar', 'grey', 'tangerine']
      ),
      -1
    );
  });
});
