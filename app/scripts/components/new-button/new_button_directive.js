app.directive('newButton', function () {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      icon: '@',
      buttonFunction: '&'
    },
    controller: 'newButtonCtrl',
    controllerAs: 'newButton',
    templateUrl: 'views/new-button.html'
  };

});
