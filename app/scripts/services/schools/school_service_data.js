'use strict';

app.service('schoolServiceData', ['$cookies', function($cookies){

  var serviceSchool = {};

  serviceSchool.schoolList = [];
  serviceSchool.schoolById = {};
  serviceSchool.coursesBySchool = [];
  serviceSchool.courseById = {};
  serviceSchool.studentsByCourse = [];
  serviceSchool.studentById = {};

  serviceSchool.selectedSchool = {};

 return serviceSchool;

}]);
