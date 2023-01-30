'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */
app.service('medicalCenterServiceData', ['$cookies', function($cookies){

  var serviceMedicalCenter = {};

  serviceMedicalCenter.medicalCenterList = [];
  serviceMedicalCenter.medicalCenterById = {};
  serviceMedicalCenter.medicalCenterCreated = {};
  serviceMedicalCenter.doctorByMedicalCenter = [];
  serviceMedicalCenter.doctorById = {};

 return serviceMedicalCenter;

}]);
