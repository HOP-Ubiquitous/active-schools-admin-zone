'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
 app.service('routeServiceData', ['$cookies', function($cookies){
  var serviceRoute = {};
  var vm = this;

  /*
  vm.getData = function(){

  }
  vm.addRow = function(row){
    serviceRoute.push(row);
  }

  vm.deleteRow = function(row){
    debugger;
    serviceRoute.splice(row, 1);
  }

  vm.editRoute = function(row){
    debugger;
    //serviceRoute.splice(row, 1);
    //serviceRoute.push(row);

    for(var i=0; i<serviceRoute.length; i++){

      if(row.id === parseInt(serviceRoute[i].id)){
        serviceRoute.splice(i,1);

      break;
        }

      }
      serviceRoute.push(row);


  }
*/

  serviceRoute = [
    { 'id': '01', 'date': '05/06/2021', 'name': 'Ruta 1', 'city': 'Archena', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 1" },
    { 'id': '02', 'date': '06/07/2021','name': 'Ruta 2', 'city': 'Ricote', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 2" },
    { 'id': '03', 'date': '07/08/2021', 'name': 'Ruta 3', 'city': 'Ojós', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 3" },
    { 'id': '04', 'date': '08/09/2021','name': 'Ruta 4', 'city': 'Villanuea', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 4" },
    { 'id': '05', 'date': '09/03/2021','name': 'Ruta 5', 'city': 'Ceuti', 'province': 'Murcia', 'country': 'España', 'challenges': "challenge 5" },

]
  return serviceRoute;





}]);
