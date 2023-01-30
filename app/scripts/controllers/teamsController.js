'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('teamsCtrl', ['$scope', '$location', 'challengeService', 'challengeServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
    function ($scope, $location, challengeService, challengeServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;

    vm.challenges = [];

    challengeService.getChallenges();

    function getChallenges () {
      vm.challenges = challengeServiceData.challengeList;
    }

    vm.goToNewTeam = function(){
      $location.path('teams/new_team');
    };

    vm.goToTeams = function(){
      $location.path('teams');
    };

    vm.deleteTeam = function(id){
      //Con backend
      challengeService.deleteChallenge(id);

      //Sin backend
      // vm.challenges.forEach(function (challenge, index) {
      //   if (id === challenge.id) {
      //     vm.challenges.splice(index, 1);
      //   }
      // });

    };

    vm.editChallenge = function(challenge_id){
      $routeParams.challenge_id = challenge_id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    };

    function initWatchers() {

      vm.challengeWatcher = $scope.$watch(
        function () {
          return challengeService.challengesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallenges();
            challengeService.challengesLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
