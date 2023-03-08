'use strict';

app.service('achievementsServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_achievements = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'achievements',
      headers: headers
    });
  };

  apiService.get_achievement_by_id = function (achievement_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'achievements/' + achievement_id,
      headers: headers
    });
  };

  apiService.add_achievement = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'achievements',
      headers: headers
    });
  };

  apiService.edit_achievements = function (achievement_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'achievements/' + achievement_id,
      headers: headers
    });
  };

  apiService.delete_challenge = function (achievement_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'achievements/' + achievement_id,
      headers: headers
    });
  };

  return apiService;

}]);
