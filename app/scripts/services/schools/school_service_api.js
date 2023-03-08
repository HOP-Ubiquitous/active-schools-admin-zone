'use strict';


app.service('schoolServiceApi', ['$http', 'API_URL', 'userServiceData', function($http, API_URL, userServiceData) {

  var apiService = {};
  var apiURL = API_URL.url;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + userServiceData.accessToken
  }

  apiService.get_schools = function () {
    return $http({
      method: 'GET',
      url: apiURL + 'schools',
      headers: headers
    });
  };

  apiService.get_school_by_id = function (school_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id,
      headers: headers
    });
  };

  apiService.add_school = function (data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'schools',
      headers: headers
    });
  };

  apiService.edit_school = function (school_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'schools/' + school_id,
      headers: headers
    });
  };

  apiService.delete_school = function (school_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'schools/' + school_id,
      headers: headers
    });
  };

  //---- COURSES ----//

  apiService.get_courses_by_school = function (school_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses',
      headers: headers
    });
  };

  apiService.get_course_by_id = function (school_id, course_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id,
      headers: headers
    });
  };

  apiService.add_course = function (school_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses',
      headers: headers
    });
  };

  apiService.edit_course = function (school_id, course_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id,
      headers: headers
    });
  };

  apiService.delete_course = function (school_id, course_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id,
      headers: headers
    });
  };

  //---- STUDENTS ----//

  apiService.get_students_by_course = function (school_id, course_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students',
      headers: headers
    });
  };

  apiService.get_student_by_id = function (school_id, course_id, student_id) {
    return $http({
      method: 'GET',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
      headers: headers
    });
  };

  apiService.add_student = function (school_id, course_id, data) {
    return $http({
      method: 'POST',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students',
      headers: headers
    });
  };

  apiService.edit_student = function (school_id, course_id, student_id, data) {
    return $http({
      method: 'PUT',
      data: data,
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
      headers: headers
    });
  };

  apiService.delete_student = function (school_id, course_id, student_id) {
    return $http({
      method: 'DELETE',
      url: apiURL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
      headers: headers
    });
  };


  return apiService;

}]);
