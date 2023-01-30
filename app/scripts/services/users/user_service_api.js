'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('userServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_users = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'users',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_user_by_id = function (user_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'users/' + user_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_user = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'users',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_user = function (user_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'users/' + user_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_user = function (user_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'users/' + user_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.success_route = function (user_id, route_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'users/' + user_id + '/routes/' + route_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.success_challenge = function (user_id, route_id, challenge_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'users/' + user_id + '/routes/' + route_id + '/challenges/' + challenge_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
