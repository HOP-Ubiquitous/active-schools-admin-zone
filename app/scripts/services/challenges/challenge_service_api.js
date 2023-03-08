'use strict';

app.service('challengeServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_challenges = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'challenges',
      headers: headers
    });
  };

  apiService.get_challenge_by_id = function (challenge_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'challenges/' + challenge_id,
      headers: headers
    });
  };

  apiService.add_challenge = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'challenges',
      headers: headers
    });
  };

  apiService.edit_challenge = function (challenge_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'challenges/' + challenge_id,
      headers: headers
    });
  };

  apiService.delete_challenge = function (challenge_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'challenges/' + challenge_id,
      headers: headers
    });
  };

  return apiService;

}]);
