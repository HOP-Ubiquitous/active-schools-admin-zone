'use strict';

app.service('userServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_users = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'users',
      headers: headers
    });
  };

  apiService.get_user_by_id = function (user_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'users/' + user_id,
      headers: headers
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
      headers: headers
    });
  };

  apiService.delete_user = function (user_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'users/' + user_id,
      headers: headers
    });
  };

  apiService.success_route = function (user_id, route_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'users/' + user_id + '/routes/' + route_id,
      headers: headers
    });
  };

  apiService.success_challenge = function (user_id, route_id, challenge_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'users/' + user_id + '/routes/' + route_id + '/challenges/' + challenge_id,
      headers: headers
    });
  };

  apiService.login = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'login',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.logout = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'logout',
      headers: headers
    });
  };

  apiService.refresh_token = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'refresh_token',
      headers: headers
    });
  };

  return apiService;

}]);
