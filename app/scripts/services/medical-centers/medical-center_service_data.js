'use strict';

app.service('medicalCenterServiceData', ['$cookies', function($cookies){

  var serviceMedicalCenter = {};

  serviceMedicalCenter.medicalCenterList = [];
  serviceMedicalCenter.medicalCenterById = {};
  serviceMedicalCenter.medicalCenterCreated = {};
  serviceMedicalCenter.doctorByMedicalCenter = [];
  serviceMedicalCenter.doctorById = {};

 return serviceMedicalCenter;

}]);
