'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('editRouteCtrl', ['$location', 'routeServiceData', 'challengeServiceData', '$routeParams', function ($location, routeServiceData, challengeServiceData, $routeParams) {

    var vm = this;
    let challengeName = [];
    vm.goToRoute = function(){
      $location.path('/routes');
    }


vm.editRoute = function() {

    routeServiceData.forEach(function(row) {
      if(row.id === $routeParams.route_id) {

      row.date = new Date();
      row.name = vm.name;
      row.city = vm.city;
      row.province = vm.province;
      row.country = vm.country;
      row.challenges = challengeName.toString();

      }

    })

  }


  vm.saveChallenge = function(name){
    //debugger;
   challengeName.push(name);

 }

 vm.challengeServiceData = challengeServiceData;
 vm.challenges = vm.challengeServiceData;
 console.log(vm.challenges);

 vm.routeServiceData = routeServiceData;
 vm.routes = vm.routeServiceData;
 console.log(vm.routes);

  }]);
