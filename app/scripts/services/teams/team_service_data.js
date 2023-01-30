'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('teamServiceData', ['$cookies', function($cookies){

  var serviceTeam = {};

  serviceTeam.teamList = [];
  serviceTeam.teamById = {};

 return serviceTeam;

}]);
