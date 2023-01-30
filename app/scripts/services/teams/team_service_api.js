'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('teamServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_teams = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'teams',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_team_by_id = function (id) {
    return $http({
      method: 'GET',
      url: apiURL + 'teams/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_team = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'teams',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_team = function (data, id) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'teams/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_team = function (id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'teams/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
