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
    vm.mostrarPopUp = function(status){
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }

    vm.deleteRow = function(){
      vm.challengeServiceData.splice(vm.deleteIndex, 1);
    }

    vm.save = function(){
      challengeServiceData.push({
             date: new Date(),
             name:vm.name,
             bonus:vm.bonus,
             minMax:vm.minMax,
             maxMin:vm.maxMin,

             video:vm.video
           });
         }

        /* vm.count = 0;
         vm.uploadVideo = function() {
           vm.count++;
         }*/


    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;

  }]);
