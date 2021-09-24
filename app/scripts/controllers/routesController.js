'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
angular.module('activeSchoolsAdminZoneApp')
  .controller('routesCtrl', ['$location', 'routeServiceData', '$routeParams', function ($location, routeServiceData, $routeParams) {
    var vm = this;

    vm.goToNewRoute = function(){
      $location.path('routes/new_route');
    }
    vm.goToRoute = function(){
      $location.path('routes');
    }

    vm.deleteRow = function(i){

      if (confirm("¿Quieres borrar la ruta seleccionada?")) {
        vm.routeServiceData.deleteRow(i);
      }

    }


    vm.editRoute = function(route_id){
      $routeParams.route_id = route_id;
      $location.path('routes/edit_route/' + $routeParams.route_id);
    }

    var show = false;
      var div = document.getElementById("table-2");
    vm.show = function(){

      if(show ^= true){
        div.style.display = "block";
      }else {
        div.style.display = "none";
      }

    }
    /*
    vm.routes = [
       { 'id': '01', 'date': '05/06/2021', 'name': 'Ruta 1', 'city': 'Archena', 'province': 'Murcia', 'country': 'España', 'challenges': 1 },
       { 'id': '02', 'date': '06/07/2021','name': 'Ruta 2', 'city': 'Ricote', 'province': 'Murcia', 'country': 'España', 'challenges': 2 },
       { 'id': '03', 'date': '07/08/2021', 'name': 'Ruta 3', 'city': 'Ojós', 'province': 'Murcia', 'country': 'España', 'challenges': 3 },
       { 'id': '04', 'date': '08/09/2021','name': 'Ruta 4', 'city': 'Villanuea', 'province': 'Murcia', 'country': 'España', 'challenges': 4 },
       { 'id': '05', 'date': '09/03/2021','name': 'Ruta 5', 'city': 'Ceuti', 'province': 'Murcia', 'country': 'España', 'challenges': 5 }

    ]*/
    //debugger;

    vm.routeServiceData = routeServiceData;
    vm.routes = vm.routeServiceData.getData();
    console.log(vm.routes);
  }]);

