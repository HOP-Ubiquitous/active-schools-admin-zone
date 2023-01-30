'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('challengeServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_challenges = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'challenges',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_challenge_by_id = function (challenge_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'challenges/' + challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_challenge = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'challenges',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_challenge = function (challenge_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'challenges/' + challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_challenge = function (challenge_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'challenges/' + challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
