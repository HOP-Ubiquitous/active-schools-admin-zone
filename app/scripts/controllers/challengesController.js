'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('challengesCtrl', ['$location', 'challengeServiceData', '$routeParams', function ($location, challengeServiceData, $routeParams) {
    var vm = this;

    vm.goToNewChallenge = function(){
      $location.path('challenges/new_challenge');
    }
    vm.goToChallenges = function(){
      $location.path('challenges');
    }

    vm.deleteRow = function(i){
      vm.challenges.splice(i, 1);
    };

    vm.editChallenge = function(challenge_id){
      $routeParams.challenge_id = challenge_id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    }

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData.getData();
    console.log(vm.challenges);

  }]);
