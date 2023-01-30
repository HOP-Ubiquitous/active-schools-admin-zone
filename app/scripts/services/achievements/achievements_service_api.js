'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('achievementsServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_achievements = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'achievements',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_achievement_by_id = function (achievement_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'achievements/' + achievement_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_achievement = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'achievements',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_achievements = function (achievement_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'achievements/' + achievement_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_challenge = function (achievement_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'achievements/' + achievement_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
