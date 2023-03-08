'use strict';

app.service('dailyChallengeServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_daily_challenges = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'daily_challenges',
      headers: headers
    });
  };

  apiService.get_daily_challenge_by_id = function (daily_challenge_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'daily_challenges/' + daily_challenge_id,
      headers: headers
    });
  };

  apiService.add_daily_challenge = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'daily_challenges',
      headers: headers
    });
  };

  apiService.edit_daily_challenge = function (daily_challenge_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'daily_challenges/' + daily_challenge_id,
      headers: headers
    });
  };

  apiService.delete_daily_challenge = function (daily_challenge_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'daily_challenges/' + daily_challenge_id,
      headers: headers
    });
  };

  return apiService;

}]);
