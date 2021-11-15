'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('editChallengeCtrl', ['$location', 'challengeServiceData', '$routeParams',
  function ($location, challengeServiceData, $routeParams) {

    var vm = this;
    vm.goToChallenge = function(){
      $location.path('/challenges');
    }

    vm.mostrarPopUp = function(status){
      debugger;
      vm.deletePopUp = ! vm.deletePopUp;
      vm.deleteIndex = status;

    }

    vm.deleteRow = function(){

      debugger;
      vm.challengeServiceData.splice(vm.deleteIndex, 1);
    }

    vm.save = function(){
      debugger;
      challengeServiceData.push({
             date: new Date(),
             name:vm.name,
             bonus:vm.bonus,
             minTime:vm.minTime,

             video:vm.video
           });
         }

    vm.editChallenge = function() {
      debugger;

    challengeServiceData.forEach(function(row) {
      if(row.id === $routeParams.challenge_id) {

      row.date = new Date();
      row.name = vm.name;
      row.video = vm.video;
      row.bonus = vm.bonus;
      row.minMax = vm.minMax;
      row.maxMin = vm.maxMin;

      }

    })

  }

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;

  }]);
