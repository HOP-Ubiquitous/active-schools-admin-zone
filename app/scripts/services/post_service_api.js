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
      url: apiURL + 'news',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_post_by_id = function (id) {
    return $http({
      method: 'GET',
      url: apiURL + 'news/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_post = function (post) {
    return $http({
      method: 'POST',
      data: post,
      url: apiURL + 'news',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_post = function (id, post) {
    return $http({
      method: 'PUT',
      data: post,
      url: apiURL + 'news/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_post = function (id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'news/' + id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
