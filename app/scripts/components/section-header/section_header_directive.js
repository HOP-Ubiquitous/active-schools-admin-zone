app.directive('sectionHeader', function () {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      icon: '@',
      showClose: '@',
      closeFunction: '&',
      showSearchInput: '='
    },
    controller: 'sectionHeaderCtrl',
    controllerAs: 'sectionHeader',
    templateUrl: 'views/section-header.html'
  };

});
