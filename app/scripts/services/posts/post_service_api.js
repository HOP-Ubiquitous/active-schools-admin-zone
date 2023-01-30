'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('postServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_posts = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'posts',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_post_by_id = function (post_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'posts/' + post_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_post = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'posts',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_post = function (post_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'posts/' + post_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_post = function (post_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'posts/' + post_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
