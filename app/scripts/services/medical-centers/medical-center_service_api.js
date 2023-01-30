'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('medicalCenterServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_medical_centers = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_medical_center_by_id = function (medical_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers/' + medical_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_medical_center = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'medical_centers',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_medical_center = function (medical_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'medical_centers/' + medical_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_medical_center = function (medical_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'medical_centers/' + medical_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };



  apiService.get_doctors_by_center = function (medical_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers/' + medical_id + '/doctors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_doctor_by_id = function (medical_id, doctor_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_doctor = function (medical_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'medical_centers/' + medical_id + '/doctors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_doctor = function (medical_id, doctor_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_doctor = function (medical_id, doctor_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  return apiService;

}]);
