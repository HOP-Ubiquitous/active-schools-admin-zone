'use strict';

app.controller('newTeamCtrl', ['$location', '$scope', 'userService', 'userServiceData', 'teamService', 'ICONS', 'languageService',
  function ($location, $scope, userService, userServiceData, teamService, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.users = [];
    vm.team = {};

    vm.userServiceData = userServiceData;
    vm.user = userServiceData.loggedUser;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    userService.getUsers();

    vm.getUsers = function () {
      vm.users = userServiceData.userList;
      return vm.users;
    }

    vm.save = function(){

      let team =  {
        team_name: vm.team.name,
        creator_id: vm.user.rol === 'superadmin' ? vm.team.creator_id : vm.user.user_id
      };

      teamService.addTeam(team);
    };

    vm.goToTeams = function(){
      $location.path('teams');
    };

    function initWatchers() {

      vm.languageWatcher = $scope.$watch(
        function () {
          return languageService.formLanguageUpdated;
        }, function (newValue) {
          if (newValue === true) {
            updateLanguage();
            languageService.formLanguageUpdated = false;
          }
        }
      );

      vm.userWatcher = $scope.$watch(
        function () {
          return userService.usersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            vm.getUsers();
            userService.usersLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
