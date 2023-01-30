'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('avatarServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_avatar_levels = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'avatar_levels',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_avatar_level_by_id = function (avatar_level_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'avatar_levels/' + avatar_level_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_avatar_level = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'avatar_levels',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_avatar_level = function (avatar_level_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'avatar_levels/' + avatar_level_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_avatar_level = function (avatar_level_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'avatar_levels/' + avatar_level_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_avatar_accessories = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'avatar_accessories',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_avatar_accessory_by_id = function (avatar_accessory_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'avatar_accessories/' + avatar_accessory_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_avatar_accessory = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'avatar_accessories',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_avatar_accessory = function (avatar_accessory_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'avatar_accessories/' + avatar_accessory_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_avatar_accessory = function (avatar_accessory_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'avatar_accessories/' + avatar_accessory_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
