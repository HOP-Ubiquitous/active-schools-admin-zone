'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('challengesCtrl', ['$scope', '$location', 'challengeService', 'challengeServiceData', '$routeParams',
    function ($scope, $location, challengeService, challengeServiceData, $routeParams) {

    var vm = this;

    vm.challenges = [];

    challengeService.getChallenges();

    function getChallenges () {
      vm.challenges = challengeServiceData.challengeList;
    }

    vm.goToNewChallenge = function(){
      $location.path('challenges/new_challenge');
    };

    vm.goToChallenges = function(){
      $location.path('challenges');
    };

    vm.deleteChallenge = function(id){
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
