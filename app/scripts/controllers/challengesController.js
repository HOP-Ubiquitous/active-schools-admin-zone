'use strict';

app.controller('challengesCtrl', ['$scope', '$location', 'challengeService', 'challengeServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
    function ($scope, $location, challengeService, challengeServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
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
          return challengeService.allChallengesLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getChallenges();
            challengeService.allChallengesLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
