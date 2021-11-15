app.filter('matcher', function() {
  return function(arr1, arr2) {
    if (arr1 !== undefined && arr2 !== undefined) {
      return arr1.filter(function(val) {
        return arr2.indexOf(val) === -1;
      });
    }
  };
});
