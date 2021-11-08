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
    let selectedChallenge = [];

    vm.goToRoute = function(){
      $location.path('/routes');
    }

    vm.deleteRow = function(){
      vm.challengeServiceData.splice(vm.deleteIndex, 1);
    }


   vm.save = function(){
routeServiceData.push({
       date: new Date(),
       name:vm.name,
       city:vm.city,
       province:vm.province,
       country:vm.country,
       challenges: selectedChallenge.toString()
     });
   }

   vm.saveChallenge = function(name){

     /*challengeName.push({
      challenges:vm.challenges[id].name
    });*/
    selectedChallenge.push(name);


  }

  vm.mostrarPopUp = function(status){
   // debugger;
    vm.deletePopUp = ! vm.deletePopUp;
    vm.deleteIndex = status;

  }

    vm.challengeServiceData = challengeServiceData;
    vm.challenges = vm.challengeServiceData;

    vm.routeServiceData = routeServiceData;
    vm.routes = vm.routeServiceData;

  }]);
