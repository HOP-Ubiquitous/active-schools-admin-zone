app.directive('subsectionHeader', function () {

  return {
    restrict: 'EA',
    scope: {
      title: '@',
      icon: '@',
      mapButtons: '=',
      iconRoute: '@',
      clickRoute: '&',
      routeStatus: '=',
      iconChallenge: '@',
      clickChallenge: '&',
      challengeStatus: '=',
      newButtonTitle: '@',
      newButtonIcon: '@',
      newButtonFunction: '&',
      hideButtonCondition: '='
    },
    controller: 'subsectionHeaderCtrl',
    controllerAs: 'subsectionHeader',
    templateUrl: 'views/subsection-header.html'
  };

});
