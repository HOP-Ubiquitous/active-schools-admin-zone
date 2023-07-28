"use strict";

app.controller("editTeamCtrl", [
  "$scope",
  "$location",
  "teamService",
  "teamServiceData",
  "$routeParams",
  "ICONS",
  'languageService',
  function (
    $scope,
    $location,
    teamService,
    teamServiceData,
    $routeParams,
    ICONS,
    languageService
  ) {

    var vm = this;
    vm.icons = ICONS;
    vm.id = $routeParams.team_id;

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

    teamService.getTeamById(vm.id);

    function getTeam() {
      vm.team = teamServiceData.teamById;
      debugger;
    }

    vm.edit = function () {
      let team = {
        creator_id : vm.team.creator_id,
        team_name: vm.team.team_name
      };

      teamService.editTeam(team, vm.id);

    };

    vm.goToTeams = function () {
      $location.path("teams");
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

      vm.teamWatcher = $scope.$watch(
        function () {
          return teamService.teamByIdLoaded;
        },function (newValue) {
          if (newValue === true) {
            getTeam();
            teamService.teamByIdLoaded = false;
          }
        }
      );

    }

    initWatchers();

}]);
