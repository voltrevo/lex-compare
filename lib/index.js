'use strict';

var defaultComparator = function(a, b) {
  return (a < b ? -1 : a > b ? 1 : 0);
};

module.exports = function(comparatorParam) {
  var comparator = comparatorParam || defaultComparator;

  return function(arr1, arr2) {
    var minLen = Math.min(arr1.length, arr2.length);

    for (var i = 0; i !== minLen; i++) {
      var cmp = comparator(arr1[i], arr2[i]);

      if (cmp !== 0) {
        return cmp;
      }
    }

    return defaultComparator(arr1.length, arr2.length);
  };
};
