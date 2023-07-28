'use strict';

app.controller('profileCtrl', ['$scope', '$location', 'userService', 'userServiceData', '$routeParams', 'ICONS', 'languageService',
    function ($scope, $location, userService, userServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.loggedUser = userServiceData.loggedUser;
    vm.users = [];
    vm.userServiceData = userServiceData;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    vm.checkIfOwnUser = function(id) {
      if (id === vm.loggedUser.id) {
        return languageService.language.USERS.me;
      }
    }

    vm.goToNewUser = function(){
      $location.path('users/new_user');
    };

    vm.goToUsers = function(){
      $location.path('users');
    };

    vm.deleteProfile = function(){
      userService.deleteUser(vm.loggedUser.user_id, 'profile');
    };

    vm.editProfile = function(){
      $location.path('profile/edit_profile/' + vm.loggedUser.user_id);
    };

    function initWatchers() {

      vm.languageWatcher = $scope.$watch(
        function () {
          return languageService.languageUpdated;
        }, function (newValue) {
          if (newValue === true) {
            updateLanguage();
            languageService.languageUpdated = false;
          }
        }
      );

    }

    initWatchers();

  }]);
