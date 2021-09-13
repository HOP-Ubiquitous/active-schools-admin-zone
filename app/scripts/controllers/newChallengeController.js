'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('newChallengeCtrl', ['$location', function ($location) {

    var vm = this;
    vm.goToChallenge = function(){
      $location.path('/challenges');
    }



  }]);
