app.directive('sectionHeader', function () {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      icon: '@',
      showClose: '@',
      closeFunction: '&',
    },
    controller: 'sectionHeaderCtrl',
    controllerAs: 'sectionHeader',
    templateUrl: 'views/section-header.html'
  };

});
