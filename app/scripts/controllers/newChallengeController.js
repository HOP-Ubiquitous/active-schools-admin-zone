'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('newChallengeCtrl', ['$location', "challengeServiceData", function ($location, challengeServiceData) {

    var vm = this;
    vm.goToChallenge = function(){
      $location.path('/challenges');
    }

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData.getData();

  }]);
