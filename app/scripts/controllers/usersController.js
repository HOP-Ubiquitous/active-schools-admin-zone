'use strict';

app.controller('usersCtrl', ['$scope', '$location', 'userService', 'userServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
    function ($scope, $location, userService, userServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.loggedUser = userServiceData.loggedUser;
    vm.users = [];
    vm.userServiceData = userServiceData;

    userService.getUsers();

    function getUsers () {
      vm.users = userServiceData.userList;
    }

    vm.checkIfOwnUser = function(id) {
      if (id === vm.loggedUser.id) {
        return '(YOU)';
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
