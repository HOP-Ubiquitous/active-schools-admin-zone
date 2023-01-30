'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.service('schoolServiceApi', ['$http', 'API_URL', function($http, API_URL) {

  var apiService = {};
  var apiURL = API_URL.url;

  apiService.get_schools = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'schools',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_school_by_id = function (school_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_school = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'schools',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_school = function (school_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'schools/' + school_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_school = function (school_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'schools/' + school_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  //---- COURSES ----//

  apiService.get_courses_by_school = function (school_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_course_by_id = function (school_id, course_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_course = function (school_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_course = function (school_id, course_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_course = function (school_id, course_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  //---- STUDENTS ----//

  apiService.get_students_by_course = function (school_id, course_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.get_student_by_id = function (school_id, course_id, student_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.add_student = function (school_id, course_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.edit_student = function (school_id, course_id, student_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  apiService.delete_student = function (school_id, course_id, student_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };


  return apiService;

}]);
