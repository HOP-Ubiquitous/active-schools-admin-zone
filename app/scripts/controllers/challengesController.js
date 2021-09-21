'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('challengesCtrl', ['$location', 'challengeServiceData', function ($location, challengeServiceData) {
    var vm = this;
    vm.challengeServiceData = challengeServiceData;
    vm.goToNewChallenge = function(){
      $location.path('challenges/new_challenge');
    }
    vm.goToChallenges = function(){
      $location.path('challenges');
    }

    vm.deleteRow = function(i){
      vm.challenges.splice(i, 1);
    };
    //debugger;
    vm.challenges = vm.challengeServiceData.challenges;
    console.log(vm.challenges);
/*
    function getChallenge(){
      return challengeServiceData.challenges;
    }

    getChallenge();
    console.log(getChallenge());
*/



  }]);
