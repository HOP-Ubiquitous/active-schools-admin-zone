'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('challengeServiceData', ['$cookies', function($cookies){
  var serviceChallenge = {};
  var vm = this;
  vm.getData = function(){
    serviceChallenge = [
      { 'id': '01', 'date': '05/06/2021', 'name': 'Ruta 1', 'video': 'https://youtube.com/video1', 'bonus': 50, 'minMax': '50/100', 'images': 'imagen1'},
      { 'id': '02', 'date': '06/06/2021', 'name': 'Ruta 2', 'video': 'https://youtube.com/video2', 'bonus': 60, 'minMax': '50/100', 'images': 'imagen2'},
      { 'id': '03', 'date': '07/06/2021', 'name': 'Ruta 3', 'video': 'https://youtube.com/video3', 'bonus': 70, 'minMax': '50/100', 'images': 'imagen3'},
      { 'id': '04', 'date': '08/06/2021', 'name': 'Ruta 4', 'video': 'https://youtube.com/video4', 'bonus': 80, 'minMax': '50/100', 'images': 'imagen4'},
      { 'id': '05', 'date': '09/06/2021', 'name': 'Ruta 5', 'video': 'https://youtube.com/video5', 'bonus': 90, 'minMax': '50/100', 'images': 'imagen5'},

   ]
   return serviceChallenge;
  }
  vm.addRow = function(row){
    serviceChallenge.push(row);
  }
  vm.deleteRow = function(row) {
    serviceChallenge.splice(row, 1);
  }

}]);
