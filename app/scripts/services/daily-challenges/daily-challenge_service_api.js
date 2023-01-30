'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('dailyChallengeServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_daily_challenges = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'daily_challenges',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_daily_challenge_by_id = function (daily_challenge_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'daily_challenges/' + daily_challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_daily_challenge = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'daily_challenges',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_daily_challenge = function (daily_challenge_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'daily_challenges/' + daily_challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_daily_challenge = function (daily_challenge_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'daily_challenges/' + daily_challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
