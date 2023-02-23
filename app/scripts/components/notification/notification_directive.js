app.directive('notification', function () {

  return {
    restrict: 'EA',
    scope: {
      text: '@',
      showCondition: '='
    },
    controller: 'notificationCtrl',
    controllerAs: 'notification',
    templateUrl: 'views/notification.html'
  };

});
