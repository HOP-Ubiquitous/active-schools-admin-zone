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

    vm.deleteRow = function(){
      console.log();
      debugger;
      vm.challengeServiceData.splice(vm.deleteIndex, 1);
    }

    vm.editChallenge = function(challenge_id){
      $routeParams.challenge_id = challenge_id;
      $location.path('challenges/edit_challenge/' + $routeParams.challenge_id);
    }

    //mostrar popup

    vm.mostrarPopUp = function(status){
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }



    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;
    console.log(vm.challenges);

  }]);
