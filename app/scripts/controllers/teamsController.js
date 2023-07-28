'use strict';

app.controller('teamsCtrl', ['$scope', '$location', 'teamService', 'teamServiceData', 'userService', 'userServiceData', '$routeParams', 'ICONS', 'languageService',
    function ($scope, $location, teamService, teamServiceData, userService, userServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.users = userServiceData.userList;
    vm.challenges = [];

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

    teamService.getTeams();

    function getTeams () {
      vm.teams = teamServiceData.teamList;
    }

    vm.getUsername = function (id) {
      let obj = vm.users.find(o => o.id === id);
      
      if (obj !== undefined) {
        return obj.personal_data.name + ' ' + obj.personal_data.surname;
      } else {
        return;
      }

    }

    vm.goToNewTeam = function(){
      $location.path('teams/new_team');
    };

    vm.goToTeams = function(){
      $location.path('teams');
    };

    vm.deleteTeam = function(id){
      teamService.deleteTeam(id);
    };

    vm.editTeam = function(team_id){
      $routeParams.team_id = team_id;
      $location.path('teams/edit_team/' + $routeParams.team_id);
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

      vm.teamWatcher = $scope.$watch(
        function () {
          return teamService.teamsLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getTeams();
            teamService.teamsLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
