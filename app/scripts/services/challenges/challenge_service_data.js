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

  serviceChallenge.challengeList = [];
  serviceChallenge.challengeById = {};

 return serviceChallenge;

}]);
