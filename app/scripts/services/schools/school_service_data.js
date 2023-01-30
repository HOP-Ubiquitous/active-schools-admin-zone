'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('schoolServiceData', ['$cookies', function($cookies){

  var serviceSchool = {};

  serviceSchool.schoolList = [];
  serviceSchool.schoolById = {};
  serviceSchool.coursesBySchool = [];
  serviceSchool.courseById = {};
  serviceSchool.studentsByCourse = [];
  serviceSchool.studentById = {};

 return serviceSchool;

}]);
