'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('newRouteCtrl', ['$location', 'routeServiceData', 'challengeServiceData', function ($location, routeServiceData,challengeServiceData) {


    var vm = this;
    let challengeName = [];

    vm.goToRoute = function(){
      $location.path('/routes');
    }

    vm.deleteRow = function(i){
      vm.routes.splice(i, 1);
    };


   vm.save = function(){
debugger;
routeServiceData.push({
       date: new Date(),
       name:vm.name,
       city:vm.city,
       province:vm.province,
       country:vm.country,
       challenges: vm.challenges[2].name
     });
   }

   vm.saveChallenge = function(id){
     debugger;

     challengeName.push({
      challenges:vm.challenges[id].name
    });

    console.log(challengeName);

  }

debugger;

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;

  }]);
