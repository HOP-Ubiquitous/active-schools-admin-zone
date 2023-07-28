'use strict';

app.controller('challengesCtrl', ['$scope', '$location', 'challengeService', 'challengeServiceData', '$routeParams', 'ICONS', 'languageService',
    function ($scope, $location, challengeService, challengeServiceData, $routeParams, ICONS, languageService) {

    var vm = this;
    vm.icons = ICONS;
    vm.challenges = [];

    languageService.getSelectedLanguage();

    function updateLanguage() {
      vm.language = languageService.language;
      vm.countries = languageService.countries;
    }

    updateLanguage();

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
      challengeService.deleteChallenge(id);
    };

    vm.editChallenge = function(challenge_id){
      $routeParams.challenge_id = challenge_id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
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
