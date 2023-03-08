'use strict';

app.service('postServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_posts = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'posts',
      headers: headers
    });
  };

  apiService.get_post_by_id = function (post_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'posts/' + post_id,
      headers: headers
    });
  };

  apiService.add_post = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'posts',
      headers: headers
    });
  };

  apiService.edit_post = function (post_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'posts/' + post_id,
      headers: headers
    });
  };

  apiService.delete_post = function (post_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'posts/' + post_id,
      headers: headers
    });
  };

  return apiService;

}]);
