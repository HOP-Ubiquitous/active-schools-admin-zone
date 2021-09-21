'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('newRouteCtrl', ['$location', function ($location) {

    var vm = this;
    vm.goToRoute = function(){
      $location.path('/routes');
    }

    vm.deleteRow = function(i){
      vm.routes.splice(i, 1);
    };


    vm.routes = [
      { 'id': '01', 'date': '05/06/2021', 'name': 'Ruta 1', 'city': 'Archena', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge #1" },
      { 'id': '02', 'date': '06/07/2021','name': 'Ruta 2', 'city': 'Ricote', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge #2" },
      { 'id': '03', 'date': '07/08/2021', 'name': 'Ruta 3', 'city': 'Ojós', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge #3" },
      { 'id': '04', 'date': '08/09/2021','name': 'Ruta 4', 'city': 'Villanuea', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge #4" },
      { 'id': '05', 'date': '09/03/2021','name': 'Ruta 5', 'city': 'Ceuti', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge #5" }

   ]


   vm.save = function(){
debugger;
     vm.routes.push({
       name:vm.name,
       city:vm.city,
       province:vm.province,
       country:vm.country,


     });


   }

   vm.saveChallenge = function(){
    let challenges = [];
    vm.challenges.push({
      challenges:vm.challenges
    });

  }



console.log(vm.routes);
  }]);
