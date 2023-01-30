'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('dailyChallengeServiceData', ['$cookies', function($cookies){

  var serviceDailyChallenge = {};

  serviceDailyChallenge.dailyChallengeList = [];
  serviceDailyChallenge.dailyChallengeById = {};

 return serviceDailyChallenge;

}]);
