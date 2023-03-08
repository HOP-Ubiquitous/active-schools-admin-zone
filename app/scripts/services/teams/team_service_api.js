'use strict';

app.service('teamServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_teams = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'teams',
      headers: headers
    });
  };

  apiService.get_team_by_id = function (id) {
    return $http({
      method: 'GET',
      url: apiURL + 'teams/' + id,
      headers: headers
    });
  };

  apiService.add_team = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'teams',
      headers: headers
    });
  };

  apiService.edit_team = function (data, id) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'teams/' + id,
      headers: headers
    });
  };

  apiService.delete_team = function (id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'teams/' + id,
      headers: headers
    });
  };

  return apiService;

}]);
