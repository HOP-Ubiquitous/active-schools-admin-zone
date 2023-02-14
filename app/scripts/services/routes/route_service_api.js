'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('routeServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_routes = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'routes',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_route_by_id = function (route_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'routes/' + route_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_challenges_by_route_id = function (route_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'routes/' + route_id + '/challenges',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_route = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'routes',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_route = function (route_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'routes/' + route_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_route = function (route_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'routes/' + route_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
