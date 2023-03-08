'use strict';

app.service('medicalCenterServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_medical_centers = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers',
      headers: headers
    });
  };

  apiService.get_medical_center_by_id = function (medical_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers/' + medical_id,
      headers: headers
    });
  };

  apiService.add_medical_center = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'medical_centers',
      headers: headers
    });
  };

  apiService.edit_medical_center = function (medical_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'medical_centers/' + medical_id,
      headers: headers
    });
  };

  apiService.delete_medical_center = function (medical_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'medical_centers/' + medical_id,
      headers: headers
    });
  };

  apiService.get_doctors_by_center = function (medical_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers/' + medical_id + '/doctors',
      headers: headers
    });
  };

  apiService.get_doctor_by_id = function (medical_id, doctor_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
      headers: headers
    });
  };

  apiService.add_doctor = function (medical_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'medical_centers/' + medical_id + '/doctors',
      headers: headers
    });
  };

  apiService.edit_doctor = function (medical_id, doctor_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
      headers: headers
    });
  };

  apiService.delete_doctor = function (medical_id, doctor_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
      headers: headers
    });
  };

  return apiService;

}]);
