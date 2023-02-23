app.directive('formSectionHeader', function () {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      icon: '@',
      closeIcon: '@',
      closeFunction: '&',
      hideCloseButton: '='
    },
    controller: 'formSectionHeaderCtrl',
    controllerAs: 'formSectionHeader',
    templateUrl: 'views/form-section-header.html'
  };

});
