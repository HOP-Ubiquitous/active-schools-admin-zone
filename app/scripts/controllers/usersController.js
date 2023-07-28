'use strict';

app.controller('usersCtrl', ['$scope', '$location', 'userService', 'userServiceData', '$routeParams', 'ICONS', 'languageService',
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

    userService.getUsers();

    function getUsers () {
      vm.users = userServiceData.userList;
    }

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

    vm.deleteUser = function(user_id){
      userService.deleteUser(user_id);
    };

    vm.editUser = function(user_id){
      $routeParams.user_id = user_id;
      $location.path('users/edit_user/' + $routeParams.user_id);
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

      vm.userWatcher = $scope.$watch(
        function () {
          return userService.usersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getUsers();
            userService.usersLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
