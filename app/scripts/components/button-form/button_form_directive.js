app.directive('buttonForm', function () {

  return {
    restrict: 'EA',
    scope: {
      showButton: '=',
      clickButton: '&',
      textButton: '@'
    },
    controller: 'buttonFormCtrl',
    controllerAs: 'buttonForm',
    templateUrl: 'views/button-form.html'
  };

});
