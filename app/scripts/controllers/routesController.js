'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('routesCtrl', ['$location', '$scope',/* 'routeServiceData', */function ($location, $scope) {
    var vm = this;

    vm.goToNewRoute = function(){
      $location.path('routes/new_route');
    }
    vm.goToRoute = function(){
      $location.path('routes');
    }

    vm.deleteRow = function(i){
      vm.routes.splice(i, 1);
    };
    var vm = this;
    vm.editRoute = function(route_id){
      $location.path('routes/edit_route/:route_id');
    }

    vm.routes = [
       { 'id': '01', 'date': '05/06/2021', 'name': 'Ruta 1', 'city': 'Archena', 'province': 'Murcia', 'country': 'España', 'challenges': 1 },
       { 'id': '02', 'date': '06/07/2021','name': 'Ruta 2', 'city': 'Ricote', 'province': 'Murcia', 'country': 'España', 'challenges': 2 },
       { 'id': '03', 'date': '07/08/2021', 'name': 'Ruta 3', 'city': 'Ojós', 'province': 'Murcia', 'country': 'España', 'challenges': 3 },
       { 'id': '04', 'date': '08/09/2021','name': 'Ruta 4', 'city': 'Villanuea', 'province': 'Murcia', 'country': 'España', 'challenges': 4 },
       { 'id': '05', 'date': '09/03/2021','name': 'Ruta 5', 'city': 'Ceuti', 'province': 'Murcia', 'country': 'España', 'challenges': 5 }

    ]
  }]);

