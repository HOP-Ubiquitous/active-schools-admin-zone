'use strict';

/**
 * @ngdoc function
 * @name activeSchoolsAdminZoneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the activeSchoolsAdminZoneApp
 */

app.controller('medicalCtrl', ['$scope', '$location', 'medicalCenterService', 'medicalCenterServiceData', '$routeParams', 'ICONS', 'COUNTRIES',
    function ($scope, $location, medicalCenterService, medicalCenterServiceData, $routeParams, ICONS, COUNTRIES) {

    var vm = this;
    vm.icons = ICONS;
    vm.countries = COUNTRIES.countries;
    vm.medical_centers = [];

    medicalCenterService.getMedicalCenters();

    function getMedicalCenters () {
      vm.medical_centers = medicalCenterServiceData.medicalCenterList;
    }

    vm.goToNewMedicalCenter = function(){
      $location.path('medical_centers/new_medical_center');
    };

    vm.goToMedicalCenters = function(){
      $location.path('medical_centers');
    };

    vm.deleteMedicalCenter = function(id){
      medicalCenterService.deleteMedicalCenter(id);
    };

    vm.editMedicalCenter = function(medical_id){
      $routeParams.medical_id = medical_id;
      $location.path('medical_centers/edit_medical_center/' + $routeParams.medical_id);
    };

    function initWatchers() {

      vm.medicalCenterWatcher = $scope.$watch(
        function () {
          return medicalCenterService.medicalCentersLoaded;
        }, function (newValue) {
          if (newValue === true) {
            getMedicalCenters();
            medicalCenterService.medicalCentersLoaded = false;
          }
        }
      );

    }

    initWatchers();

  }]);
